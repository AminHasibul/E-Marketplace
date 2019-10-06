const UserModel = require('../../../model/Security/userModel');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body)
    {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => 
{
    UserModel.findByEmail(req.body.email, function(err, user)
     {
        if(!user[0])
        {
            res.status(404).send({});
        }else{
            let passwordFields = user[0].password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            if (hash === passwordFields[1]) {
                req.body = {
                    id: user[0]._id,
                    email: user[0].email,
                    //permissionLevel: user[0].permissionLevel,
                    provider: 'email',
                    username: user[0].username,
                };
                return next();
            } else {
                return res.status(400).send({errors: ['Invalid e-mail or password']});
            }
        }
    });
};