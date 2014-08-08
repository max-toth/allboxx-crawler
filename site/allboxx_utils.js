/**
 * Created by max_tolstykh on 01/08/14.
 */
module.exports.phoneValidation = function (phone) {
    if (phone.length < 10) return false;
    return phone.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gm);
};

this.history = function (id) {
    var i = 0;
    for (i; i < messages.length; i++) {
        clients[id].send(messages[i]);
    }
};

/**
 * @return {string}
 */
this.S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

module.exports.code = function () {
    return Math.floor(Math.random() * 9000) + 1000;
};

// then to call it, plus stitch in '4' in the third group
module.exports.guid = function () {
    return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3)
        + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
};

module.exports.hello = function (client, user) {
    var msg = "Allboxx: Здравствуйте, мы очень рады, что вы обратили на нас внимание! Как вас зовут?";
    user.messages.push(msg);
    client.send(msg);
};

module.exports.getPhone = function (client, user) {
    var msg = "Allboxx: Отлично, " + user.name + "! Напишите, пожалуйста, номер телефона, на который мы вышлем код подтверждения.";
    user.messages.push(msg);
    client.send(msg);
};

const prefix_7 = "7";
const prefix_8 = "8";

module.exports.phoneTrim = function (phone) {
    phone = phone.replace(/\(/g, '');
    phone = phone.replace(/\)/g, '');
    phone = phone.replace(/-/g, '');
    phone = phone.replace(/ /g, '');
    return phone;
};

module.exports.phoneProcessing = function (phone) {
    if (this.strsta(phone, prefix_8) && phone.length == 11) {
        phone = "+7" + phone.substring(prefix_8.length);
    } else if (phone.length == 10) {
        phone = "+7" + phone;
    } else if (this.strsta(phone, prefix_7) && phone.length == 11) {
        phone = "+" + phone;
    }

    console.log(phone);

    return phone;
};

module.exports.strsta = function (string, prefix) {
    return string.substring(0, prefix.length) === prefix;
};

module.exports.twilioReg = function (phone, name, code) {
    var accountSid = 'AC3ca6c387eb9a625ae00bcb58600df5ba';
    var authToken = "36956d4fd14b2943075a7fd0317184b6";
    var twilio = require('twilio');
    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
        body: "Привет, " + name + "! Ваш код активации: " + code,
        to: phone,
        from: "+15083324849"
    }, function (err, message) {
        console.log("error ", err);
        console.log("twillo message ", message);
    });
};

module.exports.signal = function (name, phone) {
    var accountSid = 'AC3ca6c387eb9a625ae00bcb58600df5ba';
    var authToken = "36956d4fd14b2943075a7fd0317184b6";
    var twilio = require('twilio');
    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
        body: "Новый пользователь " + name + " " + phone,
        to: "+79213061049",
        from: "+15083324849"
    }, function (err, message) {
        console.log("error ", err);
        console.log("twillo message ", message);
    });
};