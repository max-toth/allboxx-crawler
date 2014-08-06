/**
 * Created by max_tolstykh on 01/08/14.
 */
var utils = new require('./allboxx_utils');
var db = new require('./allboxx_db');

var findedUser;
module.exports.run = function (user, message, client, clients, users, msgCount) {
    console.log("messageCount=" + msgCount);

    if (user.messages.length == 1) {
        //первый ответ от клиента - его имя
        //похер что лежит в сообщении просто пишем его как имя
        user.name = message.charAt(0).toUpperCase() + message.slice(1);
        console.log("user.name=" + user.name);
        user.messages.push(user.name);
        client.send(user.name + ": " + user.name);
        utils.getPhone(client, user);
        console.log(user);
        msgCount += 2;
    } else if (user.messages.length == 3) {
        // второе сообщение - телефон
        user.phone = utils.phoneTrim(message);
        if (utils.phoneValidation(user.phone)) {
            user.phone = utils.phoneProcessing(user.phone);
            if (user.name != undefined && user.phone != undefined) {
                console.log({name: user.name, phone: user.phone});
                db.findUser({name: user.name, phone: user.phone}, function (err, res) {
                    if (!err)
                        if (res != undefined) {
                            console.log(res);
                            user.code = res.code;
                            user.acc = res.acc;
                            user.messages = res.messages;
                            user.activated = res.activated
                            user._id = res._id;
                            users[user.acc] = user;
                            findedUser = user;
                            clients[user.acc] = client;
                            client.send(user.name + ": " + message);
                            client.send("Allboxx: Вижу Вы уже были у нас ;) \n " +
                                "Будьте добры посмотрите еще раз в то сообщение, что мы Вам послали в первый раз. \n " +
                                "Код подтверждения будет Вашим паролем. \nЕсли все верно то Вы увидете ваши прошлые сообщения.");
                            msgCount += 2;
                        }
                    console.log("Finded user", user);
                });

                if (user._id == undefined) {
                    user.messages.push(user.name + ": " + message);
                    client.send(user.name + ": " + message);
                    var msg1 = "Allboxx: Супер! Отправляем вам SMS с кодом активации на номер " + user.phone;
                    user.messages.push(msg1);
                    client.send(msg1);
                    utils.twilioReg(user.phone, user.name, user.code);
                    var msg2 = "Allboxx: Готово! Сообщение улетело. Как только получите его сразу пишите нам код!";
                    user.messages.push(msg2);
                    client.send(msg2);
                }
            }
        }
    } else if (user.messages.length == 6) {
        console.log("user: ", user);
        // третье - код активации
        if (message == user.code) {
            user.activated = true;
            client.send(user.name + ": " + message);
            var msg3 = "Allboxx: Это просто замечательно! Вы активировали вашу подписку!" +
                "Сейчас я схожу позову кого-нибудь из людей. А пока вы можете начать писать все то, " +
                "что хотели бы найти в нашей коробке после доставки ;) Удачи!";
            client.send(msg3);
            user.messages.push(user.name + ": " + message);
            user.messages.push(msg3);
            db.save(user);
            for (var key in users) {
                var c = users[key];
                if (c.operator) {
                    console.log("user registered: " + "{user.add.list:" + JSON.stringify(user) + "}")
                    clients[c.acc].send("user.add.list:" + JSON.stringify(user));
                }
            }
            client.send("set:cookie:" + user.acc);
        }
    } else if (user.messages.length >=8 ) {
        console.log("just a message from " + user.name + " " + user.acc + " " + user.phone);
        user.messages.push(user.name + ": " + message);
        client.send(user.name + ": " + message);
        for (var key in users) {
            if (users[key].operator && key != user.acc) {
                console.log(users[key]);
                clients[key].send(user.acc + ":" + user.name + ":" + message);
            }
        }
    } else if( msgCount == 5 ) {
        if (user.activated) {
            console.log(user);
            if (message == user.code) {
                for (var i = 0; i < user.messages.length; i++) {
                    clients[user.acc].send(user.messages[i]);
                }
            }
            msgCount = 0;
            return;
        }
    }

    if (user.messages.length > 6) {
        db.updateUser(user, function (err, res) {
            console.log(res);
        });
    }
};