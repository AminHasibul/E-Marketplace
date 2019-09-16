'use strict';
module.exports = function(app) 
{
  var User = require('../controllers/userController.js');

  app.route('/getUsers')
    .post(User.list_all_user);

    app.route('/createUsers')
    .post(User.create_user);

    app.route('/getUsersByID?id')
    .get(User.get_a_user);

    app.route('/updateUser/id')
    .post(User.update_user);

    app.route('/getUsersByID/id')
    .delete(User.delete_a_user);
};