'use strict';

const UsersController = require('../../../controllers/Security/userController');
const PermissionMiddleware = require('../../../../common/middleware/authPermission');
const ValidationMiddleware = require('../../../../common/middleware/authValidation');
const config = require('../../../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

const userRoute = function (app)
 {
    app.post('/users', [
        UsersController.create_user
    ]);
    app.get('/users', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list_all_user
    ]);
    app.get('/listAllUsers', [
      //ValidationMiddleware.validJWTNeeded,
      //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
      UsersController.listAllUsers
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

module.exports ={userRoute};