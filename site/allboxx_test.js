/**
 * Created by max_tolstykh on 05/08/14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/allboxx');

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

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    // yay!
    var UserSchema = mongoose.Schema(User);
    var user = mongoose.model('User', UserSchema);

//User.find(function (err, result) {
//    console.log(result);
//});

//User.update({code: 3819}, {}, {$set:{ activated: false }}, {}, function (err, num) {
//    console.log(num);
////    console.error(raw);
//    console.error(err);
//});


    user.findOne({name: "Максим", phone: "+79500255121"}, function (err, res) {
        var u = res;
        console.log(u);
        console.log("===========================================");
//        u.activated = false;
//        console.log(res);
//        u.save();
    });

//    user.update({code: 3819}, {$set: { activated: true }}, {}, function(a,b,c) {
//        console.log(a);
//        console.log(b.activated);
//        console.log(c);
//    });
});
