/**
 * Created by antoine on 19/01/15.
 */
var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

if (environment === 'development') {
    mongoose.connect('mongodb://localhost/pluralsight_mean');
} else {
    mongoose.connect('mongodb://antoine:meanstack@ds029541.mongolab.com:29541/pluralsight_mean');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error....'));

db.once('open', function callback() {
    console.log('pluralsight_mean db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});


var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port : ' + port + '...');
