/**
 * Created by max_tolstykh on 01/08/14.
 */
var utils = new require('./allboxx_utils');
var db = new require('./allboxx_db');

module.exports.run = function (user, message, client) {
    if (user.messages.length == 0) {
        //первый ответ от клиента - его имя
        //похер что лежит в сообщении просто пишем его как имя
        user.name = message.charAt(0).toUpperCase() + message.slice(1);
        user.messages.push(user.name);
        client.send(user.name);
        utils.getPhone(client, user.name);
        // clients[id].send(message);
    } else if (user.messages.length == 1) {
        // второе сообщение - телефон
        user.phone = message;
        user.phone = utils.phoneTrim(user.phone);
        if (utils.phoneValidation(user.phone)) {
            user.phone = utils.phoneProcessing(user.phone);
            user.messages.push(message);
            client.send(user.name + ": " + message);
            client.send("Allboxx: Супер! Отправляем вам SMS с кодом активации на номер " + user.phone);
            utils.twilioReg(user.phone, user.name, user.code);            
            client.send("Allboxx: Готово! Сообщение улетело. Как только получите его сразу пишите нам код!");
        }
    } else if (user.messages.length == 2) {
        console.log("user: ", user);
        // третье - код активации
        if (message == user.code) {
            user.activated = true;
            client.send(user.name + ": " + message);
            client.send("Allboxx: Это просто замечательно! Вы активировали вашу подписку!" +  
                "Сейчас я схожу позову кого-нибудь из людей. А пока вы можете начать писать все то, " +
                "что хотели бы найти в нашей коробке после доставки ;) Удачи!");
            user.messages.push(message);
            db.connect();
            db.save(user);
            db.disconnect();
            client.send("set:cookie:" + user.acc);
        }
    } else if (messages.length > 3) {
        user.messages.push(message);
        client.send(message);
    }
};