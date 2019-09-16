
var express = require('express');
var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/api',require('./app/routes/api').route)
app.set('case sensitive routing', true);
var routes = require('./app/routes/route'); //importing route
routes(app); //register the route
app.listen(9908, () => console.log("Server running at http://localhost:9906"));



