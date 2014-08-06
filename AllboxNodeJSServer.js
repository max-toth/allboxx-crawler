var utils = new require('./site/allboxx_utils');
var logic = new require('./site/allboxx_logic');
var db = new require('./site/allboxx_db');

var WebSocketServer = new require('ws');
// подключенные клиенты
var clients = {};
var operators = {};
var users = {};
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});
db.connect();
webSocketServer.on('connection', function (ws) {

//    console.log("ws", ws.upgradeReq.headers.Cookie);
    var user = {
        messages: []
    };

    if (ws.upgradeReq.headers['user-agent'] === 'operator') {
        user.operator = true
    } else {
        user.acc = utils.guid();
        user.activated = false;
        user.code = utils.code();
        clients[user.acc] = ws;
        users[user.acc] = user;
    }

    console.log("новое соединение ", user);

    var msgCount = 1;

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);

        if (utils.strsta(message, "uid:")) {
            if (user.operator) {
                user.acc = message.substring("uid:".length)
                clients[user.acc] = ws;
                users[user.acc] = user;
                console.log("operator", user.acc);
                db.users(function (err, result) {
                    if (!err) {
                        // console.log(result);
                        if (result != undefined)
                            clients[user.acc].send("user.list:" + JSON.stringify(result));
                    }
                });
            }
        } else if (utils.strsta(message, "user:cookie:")) {
            console.log(message);
            var userId = message.substring("user:cookie:".length);
            db.findUser({acc: userId}, function (err, result) {
                if (!err) {
                    if (result != undefined) {
                        clients[result.acc] = ws;
                        user.code = result.code;
                        user.acc = result.acc;
                        user.phone = result.phone;
                        user.name = result.name;
                        user.messages = result.messages;
                        user.activated = result.activated
                        user._id = result._id;
                        users[user.acc] = user;
                        console.log(result.messages);
                        for (var i = 0; i < result.messages.length; i++) {
                            clients[result.acc].send(result.messages[i]);
                        }
                    } else {
                        if (user.messages.length == 0) {
                            utils.hello(clients[user.acc], user);
                        }
                    }
                }
            });
        } else if (utils.strsta(message, "operator|")) {
            message = message.substring("operator|".length);
            var index = message.indexOf("|");
            userId = message.substring(0, index);
            message = message.substring(index + 1);
            console.log("message for " + userId, user, users[userId]);
            user = users[userId];
            user.messages.push("Allboxx: " + message);
            if (clients[userId] != undefined) {
                clients[userId].send("Allboxx: " + message);
            }
            db.updateUser(user, function (err, res) {
                console.log(res);
            });
        } else if (utils.strsta(message, "user:new:")) {
            utils.hello(clients[user.acc], user);
        } else {
            console.log(user.acc + user.name + "run logic...");
            logic.run(user, message, clients[user.acc], clients, users, msgCount);
        }
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + user.acc + " " + user.name);
        for (var key in users) {
            if (users[key].operator && key != user.acc) {
                console.log(users[key]);
                clients[key].send("user.del.list:" + user.acc);
            }
        }
        delete clients[user.acc];
        delete users[user.acc];
    });
});


