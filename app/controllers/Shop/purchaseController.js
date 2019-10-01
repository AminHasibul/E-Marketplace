'use strict';

const purchaseModel = require('../../model/Shop/purchaseModel');
const utility = require('../../../libs/utility/validation');
const logger = require('../../../libs/helper/logger');
const { Helper } = require('../../../libs/helper');
const crypto = require('crypto');
const Joi = require('joi');

logger.info("***************Purchase Controller*******************");

var valueList = null;
exports.insertPurchaseDetails =  function (req, res)
{
    logger.info("*****Creating New Purchase*****");

    var purchaseList = req.body.PurchaseMaster;
    var totalRow = purchaseList.length;
    var purchaseDetailsList = purchaseList.PurchaseDetails;
    var valueList = [];

    purchaseList.forEach( function (items) 
    {
        var masterID = "";
        var childSeq = 0
      
        masterID =  purchaseModel.BaseModel.makeUniqueKeyForMaster("PurchaseMaster", totalRow, "PM");
        logger.info("Creating New Purchase" + masterID);
      

        items.PurchaseMasterID = masterID;
        purchaseDetailsList = items.PurchaseDetails;

        var totalChildRow = purchaseDetailsList.length;
        var childSeq =  purchaseModel.BaseModel.getUniqueSeqForchild("PurchaseDetails", totalChildRow);

        purchaseDetailsList.forEach(function (itemDetails)
        {
            var childID = purchaseModel.BaseModel.makeUniqueKeyForchild(childSeq, "PD");
          
            itemDetails.PurchaseDetailsID = childID;
            itemDetails.PurchaseMasterID = masterID;

            childSeq++;
          
            valueList.push(itemDetails);
        });

        let itemMaster = items;
        delete itemMaster.PurchaseDetails;
    });
    purchaseModel.InsertData(purchaseList, valueList, function (err, purchase) 
    {
        if (!err) 
        {
            res.json("New Record Inserted Successfully"+ purchase);
           
        }
        else 
        {
          logger.info("Error Purchase user from User API" + err.message)
          res.send(err);
        }
    });
};