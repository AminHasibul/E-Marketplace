'use strict';

var User = require('../model/userModel.js');

exports.list_all_user = function(req, res) {
    User.getAllUser(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};



exports.create_user = function(req, res) {
  var new_user = new User(req.body);

  //handles null error 
   if(!new_user.username || !new_user.password 
      || !new_user.email || !new_user.status ){

            res.status(400).send({ error:true, message: 'Please provide username/password/status' });

        }
else{
  
  User.createUser(new_user, function(err, user) {
    
    if (err)
      res.send(err);
    res.json(user);
  });
}
};


exports.get_a_user = function(req, res) {
  User.getUserById(req.params.id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_user = function(req, res) {
  User.updateById(req.params.id, new User(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {


  User.remove( req.params.taskId, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};