var utils = new require('./site/allboxx_utils');
var logic = new require('./site/allboxx_logic');
var WebSocketServer = new require('ws');
// подключенные клиенты
var clients = {};
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function (ws) {
    var user = {
        messages: [],
        id: utils.guid(),
        name: "",
        phone: "",
        activated: false,
        code: utils.code()
    };
    clients[user.id] = ws;

    console.log("новое соединение " + user.id);

    const client = clients[user.id];
    utils.hello(client);

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);
        logic.run(user, message, client);
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + user.id + " " + user.name);
        delete clients[user.id];
    });
});


