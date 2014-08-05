/**
 * Created by max_tolstykh on 01/08/14.
 */
var utils = new require('./allboxx_utils');
var db = new require('./allboxx_db');

module.exports.run = function (user, message, client, clients, users) {
    if (user.messages.length == 0) {
        //первый ответ от клиента - его имя
        //похер что лежит в сообщении просто пишем его как имя
        user.name = message.charAt(0).toUpperCase() + message.slice(1);
        user.messages.push(user.name);
        client.send(user.name + ": " + user.name);
        utils.getPhone(client, user);
    } else if (user.messages.length == 1) {
        // второе сообщение - телефон
        user.phone = message;
        user.phone = utils.phoneTrim(user.phone);
        if (utils.phoneValidation(user.phone)) {
            user.phone = utils.phoneProcessing(user.phone);
            user.messages.push(user.name + ": " +message);
            client.send(user.name + ": " + message);
            var msg1 = "Allboxx: Супер! Отправляем вам SMS с кодом активации на номер " + user.phone;
            user.messages.push(msg1);
            client.send(msg1);
            utils.twilioReg(user.phone, user.name, user.code);
            var msg2 = "Allboxx: Готово! Сообщение улетело. Как только получите его сразу пишите нам код!";
            user.messages.push(msg2);
            client.send(msg2);
        }
    } else if (user.messages.length == 2) {
        console.log("user: ", user);
        // третье - код активации
        if (message == user.code) {
            user.activated = true;
            client.send(user.name + ": " + message);
            var msg3 = "Allboxx: Это просто замечательно! Вы активировали вашу подписку!" +
                "Сейчас я схожу позову кого-нибудь из людей. А пока вы можете начать писать все то, " +
                "что хотели бы найти в нашей коробке после доставки ;) Удачи!";
            client.send(msg3);
            user.messages.push(user.name + ": ");
            user.messages.push(msg3);
            db.save(user);
            for (var key in users) {
                 var c = users[key];
                 if (c.operator) {
                    console.log("user registered: "+ "{user.add.list:" + JSON.stringify(user) + "}")
                    clients[c.acc].send("user.add.list:" + JSON.stringify(user));
                 }
            }
            client.send("set:cookie:" + user.acc);
        }
    } else if (user.messages.length >= 3) {
        console.log("just a message from " + user.name + " " + user.acc + " " + user.phone);
        user.messages.push(user.name + ": " +message);
        client.send(user.name + ": " + message);
        for (var key in users) {
        if (users[key].operator && key != user.acc) {
                console.log(users[key]);
                clients[key].send(user.acc +":" + user.name + ":" + message);
            }
        }
    }
    db.update(user, function(err, res){
        console.log(res);
    });
};