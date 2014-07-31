var WebSocketServer = new require('ws');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/allboxx');
var db = mongoose.connection;
var userSchema;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    userSchema = mongoose.Schema({
      name: String,
      phone: String,
      uid: String
    });

    var User = mongoose.model('User', userSchema);
    var user = new User({name: "test", phone: "1234", uid: guid()});
    user.save();
});
// db.open();
// db.close();
// подключенные клиенты
var clients = {};
var activationKey = "ГОВНАРЬ";
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});

webSocketServer.on('connection', function(ws) {
  var messages = [];
  var id = guid();
  var name = "";
  var phone = "";
  // userIp = ws.upgradeReq.connection.remoteAddress;
  // console.log(userIp);
  clients[id] = ws;
  
  console.log("новое соединение " + id);
    
  // history(id);    

  hello(clients[id]);
  
  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);    
    if (messages.length == 0) {
      //первый ответ от клиента - его имя
      //похер что лежит в сообщении просто пишем его как имя
      name = message;
      messages.push(message);
      getPhone(clients[id], name);
      // clients[id].send(message);      
    } else if (messages.length == 1) {
      // второе сообщение - телефон
      phone = message;
      messages.push(message);         
      tryToReg(phone, name);
    } else if (messages.length == 2) {              
      // третье - код активации
      if(message === activationKey) {
        clients[id].send("Это просто замечательно! Вы активировали вашу подписку! ВЫ НАСТОЯЩИЙ ГОВНАРЬ!!!!")
        messages.push(message);        

      }      
    } else if (messages.length > 3) {
      messages.push(message);
      clients[id].send(message);
    }      
  });
 
  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });
});

function history(id) {
  var i=0;
  for(i; i < messages.length; i++) {
    clients[id].send(messages[i]);
  }
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
function guid() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
} 

function hello(client){
  client.send("Здравствуйте, мы очень рады, что вы джонирнулись к нам! Как вас зовут?");
}

function getPhone(client, name){
  client.send("Отлично, " + name + "! Напишите, пожалуйста, номер телефона (в формате +Х(ХХХ)ХХХ-ХХ-ХХ), на который мы вышлем код подтверждения того, что вы действительно хотите чтобы мы серанули вам в голову?");
}

function tryToReg(phone, name){
  var accountSid = 'AC3ca6c387eb9a625ae00bcb58600df5ba';
  var authToken = "36956d4fd14b2943075a7fd0317184b6";
  var twilio = require('twilio');
  var client = new twilio.RestClient(accountSid, authToken);
 
  client.messages.create({
    body: "Привет, " + name + "! Ваш код активации: " + activationKey,
    to: phone,
    from: "+15083324849"
  }, function(err, message) {
    console.log("error " + err);
    console.log("twillo message " + message);
  });
}