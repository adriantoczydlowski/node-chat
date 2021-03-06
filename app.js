var express = require('express');
var app = express();
var partials = require('express-partials');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var flash = require('connect-flash');
var config = require('./config');
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var util = require('./middleware/utilities');

app.set('view engine', 'ejs');
app.set('view options', { defaultLayout: 'layout' });

app.use(partials());
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret));
app.use(session({ 
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  store: new RedisStore(
    {url: config.redisUrl})
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.use(flash());
app.use(util.templateRoutes);

app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get('/chat', [util.requireAuthentication], routes.chat);
app.get(config.routes.logout, routes.logOut);
app.get('/error', function(req, res, next) {
  next(new Error('A contrived error'));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(config.port);
console.log('App server running on port 3100');