var authRoute = require('./api/authRoute');
var usersRoute = require('./api/user/route');
var smsRoute = require('../../libs/NexmoMesseging/SMSRoute/route');

module.exports.API =
{
    authRoute,
    usersRoute,
    smsRoute
}