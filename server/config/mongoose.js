var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports =  function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error....'));
    db.once('open', function callback() {
        console.log('pluralsight_mean db opened');
    });

    var userSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        salt: String,
        hashedPassword: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPassword(this.salt,passwordToMatch) === this.hashedPassword;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err,collection){

        if(collection.length === 0){
            console.log('here');
            var salt = createSalt();
            var hashedPassword = hashPassword(salt,"antoine");
            User.create([{firstname:'Antoine',lastname:'Blancke',username:'Antoine', salt: salt,hashedPassword: hashedPassword, roles:['admin']}]);
            salt = createSalt();
            hashedPassword = hashPassword(salt,"mathilde");
            User.create([{firstname:'Mathilde',lastname:'Six',username:'Math', salt: salt,hashedPassword: hashedPassword, roles:[]}]);
            salt = createSalt();
            hashedPassword = hashPassword(salt,"test");
            User.create([{firstname:'Test',lastname:'Test',username:'test', salt: salt,hashedPassword: hashedPassword}]);
        }
    })
}

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, password){
    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(password).digest('hex');
}

