'use strict';

var UserModel = require('../model/userModel.js');
var User = require('../model/user');
var utility = require('../../libs/helper/utility');
var crypto = require('crypto');


exports.list_all_user = function(req, res)
{
    UserModel.getAllUser(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};



exports.create_user = function(req, res)
{
    var new_user = new UserModel(req.body);
    if(!new_user.username || !new_user.password 
      || !new_user.email || !new_user.status )
    {
            res.status(400).send({ error:true, message: 'Please provide username/password/status' });
    }
    else if (!(utility.ValidateEmail(new_user.email)))
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
          res.send(err);
          res.json(user);
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


exports.delete_a_user = function(req, res) {


  UserModel.remove( req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.listUsers = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
      if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
  }
  User.find(limit, page).then((result) => {
      res.status(200).send(result);
  })
};