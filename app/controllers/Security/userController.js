'use strict';

const UserModel = require('../../model/Security/userModel.js');
const utility = require('../../../libs/utility/validation');
const logger = require('../../../libs/helper/logger');
const {Helper} = require('../../../libs/helper');
const crypto = require('crypto');
const Joi = require('joi');
logger.info("Writing from the user controler, Get controller name");
//const BaseController = require('../baseController');
var userController ={};
var controllerName = Helper.getFileName(__filename, __dirname);
logger.info("Writing from the user controler, Get controller name" + controllerName);
/*exports.userController = BaseController(controllerName,UserModel,{options: {
  include: [
      {
          model: UserModel,
          required: false,
          as: 'users'
      }    
  ]
}
});
*/
exports.list_all_user = function(req, res)
{
 
    UserModel.getAllUser(function(err, user) {
    if (err)
    {
     
      res.send(err);
    }
    else
    {
      console.log('res', user);
      res.send(user);
    }
  });
};



exports.create_user = function(req, res)
{
  //using object distructon
  logger.info("Creating new user from User API")
  const {error} = utility.validateUser(req.body);

  if(error)
  {
    logger.info("Error Creating user from User API"+ error.details[0].message)
    res.status(400).send(error.details[0].message);
  }
  var new_user = req.body;
  if (!(utility.ValidateEmail(new_user.email)))
  {
      res.status(400).send({ error:true, message: 'Please provide a valid email' });
  }
  else
  {

    //const cipher = crypto.createCipher('aes128', 'a password');
    //var encrypted = cipher.update(password, 'utf8', 'hex');
    // encrypted += cipher.final('hex');
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                  .update(new_user.password)
                                  .digest("base64");
    new_user.password = salt + "$" + hash;
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


exports.get_a_user = function(req, res) {
  UserModel.getUserById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.patch_user = function(req, res)
 {
  if (req.body.password){
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
}
    UserModel.patchUserById(req.params.userId, new UserModel(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) 
{
  UserModel.remove( req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.listAllUsers = function(req, res) 
{
  logger.info("Retriving users list from User API")
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  let skip =0;
  if (req.query)
   {
      if (req.query.page)
      {
          page = parseInt(req.query.page);
          page = Number.isInteger(page) ?page : 0;
          skip = limit*page;
      }
  }
  //UserModel.listUsers(limit,page,function(err,result)
  //UserModel.listUsers(limit,page,function(err,result)
  UserModel.getAllUser(limit,skip,function(err, result) 
  {
    if (err)
    {
      logger.info("Error Retriving users list from User API"+ err.message)
 
      res.send(err);
    }
    else
    {
      console.log('res', result);
      res.status(200).send(result);
    }
  });

};