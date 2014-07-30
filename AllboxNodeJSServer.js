var WebSocketServer = new require('ws');
// подключенные клиенты
var clients = {};
var messages = [];
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function(ws) {
 
  var id = guid();
  userIp = ws.upgradeReq.connection.remoteAddress;
  console.log(userIp);
  clients[id] = ws;
  console.log("новое соединение " + id);
  var i=0;
  for(i; i < messages.length; i++) {
    clients[id].send(messages[i]);
  }  
 
  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);    
    messages.push(userIp + ": " + message);
    for(var key in clients) {
      clients[key].send(userIp + ': ' + message);
    }
  });
 
  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });
});

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
function guid() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
} 