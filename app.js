var express = require('express');
var app = express();
var partials = require('express-partials');
var cookieParser = require('cookie-parser');
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');

app.set('view engine', 'ejs');
app.set('view options', { defaultLayout: 'layout' });

app.use(partials());
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);
app.get('/error', function(req, res, next) {
  next(new Error('A contrived error'));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3100);
console.log('App server running on port 3100');