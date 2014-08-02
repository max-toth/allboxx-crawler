var utils = new require('./site/allboxx_utils');
var logic = new require('./site/allboxx_logic');
var WebSocketServer = new require('ws');
// подключенные клиенты
var clients = {};
var operators = {};
var users = {};
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function (ws) {
    console.log("ws", ws.upgradeReq.headers['user-agent']);
    var user = {
            messages: []            
        };    
            
    if (ws.upgradeReq.headers['user-agent'] === 'operator') {
        user.operator = true        
    } else {
        user.id = utils.guid();
        user.name = "";
        user.phone = "";
        user.activated = false;
        user.code = utils.code();        
        clients[user.id] = ws;
        users[user.id] = user;
        utils.hello(ws);
    }
    
    console.log("новое соединение ", user);    

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);        
        if (user.operator) {
            var prefix = "uid:";
            utils.strsta(message, prefix);
            user.id = message.substring(prefix.length)
            clients[user.id] = ws;
            console.log("operator", user.id);        
            for (var key in users) {
                 c = users[key];   
                 if (!c.operator) {
                    console.log("c", c);
                    clients[user.id].send("userList:" + JSON.stringify(c));
                 }
            }
            
        } else {
            logic.run(user, message, client);    
        }
        
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + user.id + " " + user.name);
        delete clients[user.id];
    });
});


