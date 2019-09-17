'use strict';
/*module.exports = function(app) 
{
  var User = require('../..../../controllers/userController');

  app.route('/users')
    .get(User.list_all_user)
    .post(User.create_user);

  app.route('/users/:userId')
    .get(User.get_a_user)
    .put(User.patch_user)
    .delete(User.delete_a_user);
};
*/

const UsersController = require('../../../controllers/userController');
const PermissionMiddleware = require('../../../../common/middleware/authPermission');
const ValidationMiddleware = require('../../../../common/middleware/authValidation');
const config = require('../../../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.create_user
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list_all_user
    ]);
    app.get('/usersList', [
      ValidationMiddleware.validJWTNeeded,
      //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
      UsersController.listUsers
  ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
       // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.get_a_user
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
       // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patch_user
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.delete_a_user
    ]);
};