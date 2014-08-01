/**
 * Created by max_tolstykh on 01/08/14.
 */
this.activationKey = "ГОВНАРЬ";

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

// then to call it, plus stitch in '4' in the third group
module.exports.guid = function () {
    return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3)
        + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
};

module.exports.hello = function (client) {
    client.send("Allboxx: Здравствуйте, мы очень рады, что вы джонирнулись к нам! Как вас зовут?");
};

module.exports.getPhone = function (client, name) {
    client.send("Allboxx: Отлично, " + name + "! Напишите, пожалуйста, номер телефона, на который мы вышлем код подтверждения.");
};

const prefix_7 = "7";
const prefix_8 = "8";

module.exports.phoneTrim = function(phone) {
    phone = phone.replace(/\(/g, '');
    phone = phone.replace(/\)/g, '');
    phone = phone.replace(/-/g, '');
    phone = phone.replace(/ /g, '');
    return phone;
};

module.exports.phoneProcessing = function (phone) {
    if (this.strsta(phone, prefix_8) && phone.length == 11) {
        phone = "+7" + phone.substring(prefix_8.length);
    } else if (phone.length == 10){
        phone = "+7" + phone;
    } else if (this.strsta(phone, prefix_7) && phone.length == 11)  {
        phone = "+" + phone;
    }

    console.log(phone);

    return phone;
};

this.strsta = function (string, prefix) {
    return string.substring(0, prefix.length) === prefix;
};

module.exports.twilioReg = function (phone, name) {
    var accountSid = 'AC3ca6c387eb9a625ae00bcb58600df5ba';
    var authToken = "36956d4fd14b2943075a7fd0317184b6";
    var twilio = require('twilio');
    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
        body: "Привет, " + name + "! Ваш код активации: " + this.activationKey,
        to: phone,
        from: "+15083324849"
    }, function (err, message) {
        console.log("error ", err);
        console.log("twillo message ", message);
    });
};