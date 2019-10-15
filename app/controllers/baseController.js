'use strict';
const BaseModel = require('../model/baseModel');
const utility = require('../../libs/utility/validation');
const logger = require('../../libs/helper/logger');
const { Helper } = require('../../libs/helper');
const crypto = require('crypto');
const Joi = require('joi');
logger.info("Writing from the user controler, Get controller name");

var controllerName = Helper.getFileName(__filename, __dirname);
logger.info("Writing from the user controler, Get controller name" + controllerName);

exports.insert_NewItemsAsCollection = function (req, res)
{
    //   logger.info("Creating new user from User API")
    //   const { error } = utility.validateUser(req.body);
    //   var new_user = req.body;
    //   if (error) {
    //     logger.info("Error Creating user from User API" + error.details[0].message)
    //     res.status(400).send(error.details[0].message);
    //   }
    //   else {

    //this.deleted_at = null;
    var itemList = req.body;
    BaseModel.insertDataAsCollection("testShipperBids",itemList, function (err, user) {
      if (err) {
        logger.log("Error Creating user from User API" + err.message)
        res.send(err);
      }
      else {
        res.json(user);
      }
    });
};

exports.insert_NewItems = function (req, res)
{
    logger.info("Creating new Items from Base API")
  
    var itemList = req.body;
    BaseModel.insertData("testShipperBids",function (err, Item)
    {
      if (err) 
      {
            logger.log("Error Creating user from User API" + err.message)
            res.send(err);
      }
      else 
      {
        res.json(Item);
      }
    });
};
