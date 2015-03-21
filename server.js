/**
 * Created by antoine on 19/01/15.
 */
var express = require('express');

var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[environment];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);

console.log('Listening on port : ' + config.port + '...');