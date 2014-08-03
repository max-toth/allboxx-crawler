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
try {
    webSocketServer.on('connection', function (ws) {
        console.log("ws", ws.upgradeReq.headers.Cookie);
        var user = {
            messages: []            
        };
                
        if (ws.upgradeReq.headers['user-agent'] === 'operator') {
            user.operator = true        
        } else {
            user.acc = utils.guid();
            user.name = "";
            user.phone = "";
            user.activated = false;
            user.code = utils.code();        
            clients[user.acc] = ws;
            users[user.acc] = user;
            for (var key in users) {
                 c = users[key];   
                 if (c.operator) {
                    console.log("c", c);
                    clients[c.uid].send("user.add.list:" + JSON.stringify(user));
                 }
            }
            utils.hello(ws);
        }
        
        console.log("новое соединение ", user);    

        ws.on('message', function (message) {
            console.log('получено сообщение ' + message);        
            if (user.operator) {
                var prefix = "uid:";
                if(utils.strsta(message, prefix)) {
                    user.acc = message.substring(prefix.length)
                    clients[user.id] = ws;
                    users[user.id] = user;
                    console.log("operator", user.id);        
                    for (var key in users) {
                         c = users[key];   
                         if (!c.operator) {
                            console.log("c", c);
                            clients[user.acc].send("user.add.list:" + JSON.stringify(c));
                         }
                    }                
                }            
            } else {
                logic.run(user, message, clients[user.acc]);
            }
            if (utils.strsta(message, "operator|")) {
                message = message.substring("operator|".length);
                var index = message.indexOf("|");
                userId = message.substring(0, index);
                message = message.substring(index+1);
                console.log("message for " + userId);
                clients[userId].send("Allboxx: " + message);
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
            db.disconnect();
        });
    });
} catch (exception_var) {
    db.save_collection(users);    
} finally {
    db.disconnect();
}


