var authRoute = require('./api/authRoute');
var usersRoute = require('./api/user/route');
var shopsRoute = require('./api/shop/route');
var smsRoute = require('../../libs/NexmoMesseging/SMSRoute/route');

module.exports.API =
{
    authRoute,
    usersRoute,
    smsRoute,
    shopsRoute
}