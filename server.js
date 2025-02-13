const http = require('http');
const config = require('./common/config/env.config.js');
const express = require('express');
const bodyParser = require('body-parser');
var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

const app = express();

//var API = require('./app/routes/route');
//const authRouter = require('./app/routes/api/authRoute');
//const UsersRouter = require('./app/routes/api/user/route');

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

//app.use(router.API);
//API(app);
//authRouter.routesConfig(app);
//UsersRouter.routesConfig(app);

app.use('/',express.static(path.join(__dirname, 'public')));
//app.use(Router.Api)
app.set('case sensitive routing', true);
var Routes = require('./app/routes/route'); //importing route


Routes.API.authRoute.authRoute(app);
Routes.API.usersRoute.userRoute(app);
Routes.API.shopsRoute.shopRoute(app);
Routes.API.smsRoute.routesConfig(app);
//api.authRouter(app);
const port = config.port || 3000;
app.listen(9908, function () {
    console.log('app listening at port %s', port);
});


