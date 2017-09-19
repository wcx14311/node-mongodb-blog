var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 网站的favicon.ico放在/public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 将/public目录下的静态资源做缓存
app.use(express.static(path.join(__dirname, 'public'),{maxAge:1000*60*60}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: '炖萝卜',
    name: 'sessionId', 
    cookie: {maxAge: 2*60*60*1000 }, 
    resave: false,
    saveUninitialized: true,
})); 

app.use('/', index);
app.use('/admin', admin);

// 抓取404并转发到错误处理程序
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理程序
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
