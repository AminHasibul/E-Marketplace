'use strict';

const purchaseController = require('../../../controllers/Shop/purchaseController');
const PermissionMiddleware = require('../../../../common/middleware/authPermission');
const ValidationMiddleware = require('../../../../common/middleware/authValidation');
const config = require('../../../../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

var shopRoute = function (app)
{
    app.post('/api/createpurchase', 
    [
        purchaseController.insertPurchaseDetails
    ]);
};

module.exports = {shopRoute};