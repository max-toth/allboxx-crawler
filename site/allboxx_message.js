var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/allboxx');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    var user = mongoose.model('User', {});
    user.find({"name": 'Максим'}, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log(result);
        }
    });
//    user.find({"phone": "+79500255121"}, function(err, result){
//       console.log(result);
//    });

});

db.on('disconnected', function () {
    console.log('Mongoose default connection to DB disconnected');
});
