'use strict';

const purchaseModel = require('../../model/Shop/purchaseModel');
const utility = require('../../../libs/utility/validation');
const logger = require('../../../libs/helper/logger');
const {Helper} = require('../../../libs/helper');
const crypto = require('crypto');
const Joi = require('joi');

logger.info("Writing from the Purchase Controller");


exports.insertPurchaseDetails = function(req, res)
{
  //using object distructon
  logger.info("Creating New Purchase");
  console.log("Creating New Purchase");
  //const {error} = utility.validateUser(req.body);
  console.log(req.body);
  console.log( req.body.data);
  var purchaseList = req.body.PurchaseMaster;

  logger.info("Creating New Purchase"+purchaseList);
  console.log("Creating New Purchase"+purchaseList);
  //if(error)
  //{
    //logger.info("Error Creating user from User API"+ error.details[0].message)
    //res.status(400).send(error.details[0].message);
  //}
  //var purchaseMaster = req[0].body;
  //var purchaseChild = req[1].body;
 
  var totalRow = purchaseList.length;
  console.log("Creating New Purchase"+totalRow);
  var purchaseDetailsList = purchaseList.PurchaseDetails;
  logger.info("Creating New Purchase"+totalRow);
  purchaseList.forEach(function(items) 
  { 
      var masterID = "";
      masterID = purchaseModel.BaseModel.makeUniqueKeyForMaster("PurchaseMaster",totalRow,"PM");
      logger.info("Creating New Purchase"+masterID);
      var childSeq = 0
       
      console.log(items);
      
      items.PurchaseMasterID = masterID;
      purchaseDetailsList = items.PurchaseDetails;
      var totalChildRow = purchaseDetailsList.length;
      var childSeq = purchaseModel.BaseModel.getUniqueSeqForchild("PurchaseDetails",totalChildRow);
  
      purchaseDetailsList.forEach(function(itemDetails)
      {
          var childID = purchaseModel.BaseModel.makeUniqueKeyForchild(childSeq,"PD"); 
          itemDetails.PurchaseDetailsID = childID;
          itemDetails.PurchaseMasterID = masterID;

          childSeq ++;
          console.log(childID,childSeq);
      });
     // var itemMaster = items;
      let itemMaster = items;
      delete itemMaster.PurchaseDetails;
      console.log(purchaseDetailsList);
      console.log(masterID);
  });
  purchaseModel.InsertData(purchaseList,purchaseDetailsList, function(err, purchase)
  {   
    if (err)
    {
      logger.info("Error Purchase user from User API"+ err.message)
      res.send(err);
    }
    else
    {
      res.send(purchase);
    }
  });
};