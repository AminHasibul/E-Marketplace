'use strict';

const UserModel = require('../../model/Security/userModel.js');
const utility = require('../../../libs/utility/validation');
const logger = require('../../../libs/helper/logger');
const {Helper} = require('../../../libs/helper');
const crypto = require('crypto');
const Joi = require('joi');

logger.info("Writing from the Purchase Controller");


exports.insertPurchjseDetails = function(req, res)
{
  //using object distructon
  logger.info("Creating New Purchase")
  //const {error} = utility.validateUser(req.body);

  //if(error)
  //{
    //logger.info("Error Creating user from User API"+ error.details[0].message)
    //res.status(400).send(error.details[0].message);
  //}
  var purchaseMaster = req[0].body;
  var purchaseChild = req[1].body;
  //if (!(utility.ValidateEmail(new_user.email)))
  //{
      //res.status(400).send({ error:true, message: 'Please provide a valid email' });
  //}
  //else
    //{

    //const cipher = crypto.createCipher('aes128', 'a password');
    //var encrypted = cipher.update(password, 'utf8', 'hex');
    // encrypted += cipher.final('hex');
    //let salt = crypto.randomBytes(16).toString('base64');
    //let hash = crypto.createHmac('sha512',salt)
                                  //.update(new_user.password)
                                  //.digest("base64");
    //new_user.password = salt + "$" + hash;
    var masterID = "";
    var childID = "";
    async.each(ItemList, function (Item, asyncCallback)
    {
        connection.query('INSERT INTO ? SET ?', [TableName,Item], function (err, data) {
            return asyncCallback(err, data);
        });
    }, 
    function (err) 
    {
        if (err)
        {
            return callback(err);
        }
        return callback();
    });
    UserModel.createUser(new_user, function(err, user)
    {   
        
      if (err)
      {
        logger.log("Error Creating user from User API"+ err.message)
        res.send(err);
      }
      else
      {
        res.json(user);
      }
    });
  }
};