/**
 * Created by max_tolstykh on 01/08/14.
 */
var utils = new require('./allboxx_utils');

module.exports.run = function (user, message, client) {
    if (user.messages.length == 0) {
        //первый ответ от клиента - его имя
        //похер что лежит в сообщении просто пишем его как имя
        user.name = message.charAt(0).toUpperCase() + message.slice(1);
        user.messages.push(message);
        client.send(message);
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
            client.send("Allboxx: Супер! Отправляем вам SMS с кодом активации...: " + message);
            utils.twilioReg(user.phone, user.name);
        }
    } else if (user.messages.length == 2) {
        // третье - код активации
        if (message === utils.activationKey) {
            user.activated = true;
            client.send(user.name + ": " + message);
            client.send("Allboxx: Это просто замечательно! Вы активировали вашу подписку! ВЫ НАСТОЯЩИЙ ГОВНАРЬ!!!!");
            user.messages.push(message);
        }
    } else if (messages.length > 3) {
        user.messages.push(message);
        client.send(message);
    }
};