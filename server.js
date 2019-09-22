const http = require('http');
const config = require('./common/config/env.config.js');
const express = require('express');
const bodyParser = require('body-parser');
var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

const app = express();

const authRouter = require('./app/routes/api/authRoute');
const UsersRouter = require('./app/routes/api/user/route');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());

authRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.use('/',express.static(path.join(__dirname, 'public')));
//app.use('/api',require('./app/routes/api').route)
app.set('case sensitive routing', true);
//var routes = require('./app/routes/api/user/route'); //importing route
//routes(app);
const port = config.port || 3000;
app.listen(port, function () {
    console.log('app listening at port %s', port);
});


