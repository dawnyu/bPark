var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    autoRoutes = require('express-auto-routes'),
    CORS = require('./middlewares/CORS'),
    simpleLogger = require('./middlewares/simpleLogger'),
    session = require('express-session'),
    localReq = require('./local');

var app = express();
app.use(CORS);
app.use(simpleLogger);
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'love'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// auto mount routes
var routes = autoRoutes(app);
app.use(localReq);
// routes(path.join(__dirname, './controllers'));
// routes(path.join(__dirname, './local'));
// 404
app.use(function(req, res, next) {
    res.status(404);
    next({ _code: 404, _msg: 'Page not found' });
});

// global err handler
app.use(function(err, req, res, next) {
    console.error(err);

    if (err._status) res.status(err._status);

    res.json({
        _code: err._code || 1,
        _msg: err._msg || err
    });
});
var server;
if (!module.parent) {
    var PORT = 8990;
    console.log('[INFO] Msg board RESTful API listening at localhost:%s', PORT);
    server = app.listen(PORT);
} else {
    module.exports = app;
}
var io = require("socket.io").listen(server)
io.sockets.on('connection', function(socket) {
    console.log("Connection " + socket.id + " accepted.");
    socket.on('message', function(message) {
        console.log("Received message: " + message + " - from client " + socket.id);
        io.emit('message', message);
        setInterval(() => {
            io.emit('message', new Date().getTime());
        }, 10000)
    });
});