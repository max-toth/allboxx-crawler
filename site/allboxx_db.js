/**
 * Created by max_tolstykh on 01/08/14.
 */
var mongoose = require('mongoose');
var db;

var User = {
    acc: String,
    name: String,
    phone: String,
    activated: Boolean,
    code: Number,
    messages: Array,
    operator: Boolean,
    cookie: String
};

var UserSchema;

/**
 *
 * @param _user
 */
module.exports.save = function (_user) {
    var user = mongoose.model('User', UserSchema);
    var u = new user(_user);
    console.log(u);
    u.save();
};

module.exports.save_collection = function (_collection) {
    for (var key in _collection) {
        var user = mongoose.model('User', _collection[key]);
        user.save();
    }
};


module.exports.connect = function () {
    mongoose.connect('mongodb://localhost/allboxx');
    db = mongoose.connection;
    UserSchema = mongoose.Schema(User);
};

module.exports.init = function () {

};

module.exports.disconnect = function () {
    mongoose.connection.close()
};



