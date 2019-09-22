const Joi = require('joi');
const  errorPlaceHolder = (status, success, message, data) => ({
    status,
    success,
    message,
    data
});
const  placeHolder = (success, message, data) => ({
    success,
    message,
    data
});

var ValidateEmail =function(mailAddress)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailAddress.match(mailformat))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function validateUser(user)
{
    const schema =
    {
        username : Joi.string().min(2).required()  
       // email : Joi.email().required()
    };
    return result =Joi.validate(user,schema);
}

module.exports = {
    ValidateEmail,
    validateUser
}