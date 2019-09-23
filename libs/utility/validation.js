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



const isDefined = (value) => typeof value !== 'undefined' && value !== null;

const baseFilter = (reqBody, Model, localWhere) => {

    const where = localWhere ? localWhere : {};
    const modelAttributes = Object.keys(Model.rawAttributes);

    modelAttributes.map((attr) => {

        if (reqBody[attr]) {

            where[attr] = reqBody[attr];

        }

    });

    return where;

};

var getFileName = function(filename, dirname) 
{
    return filename.substring(dirname.length + 1, filename.lastIndexOf('.'));
}

module.exports = {
    ValidateEmail,
    validateUser,
    getFileName,
    baseFilter,
    isDefined
}