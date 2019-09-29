'user strict';
const con = require('../../../libs/dbConnect/mysqlCon.js');
const BaseModel = require('../baseModel');
var logger = require('../../../libs/helper/logger');

const InsertData = function (purchaseMasterList,purchaseDetailsList, callback)
{
    try
    {
        con.beginTransaction(function (err)
        {
            logger.info("Transaction Begin");
            if (err)
            {   logger.info("Transaction Error " + err );
                throw err;
            }
            var tableList = [];
            tableList.push("PurchaseMaster");
            tableList.push("PurchaseDetails");
           
            var dataValueList = [purchaseMasterList,purchaseDetailsList]
            
            BaseModel.insertMasterChildData(tableList,dataValueList,con,callback,function (err, result)
            {
                logger.info("Transaction insertSingleData " + purchaseDetailsList);

                console.log("Transaction insertSingleData " + purchaseDetailsList);
                if (err)
                {
                    logger.info("Transaction insertSingleData Eroor " + err);
                    con.rollback(con, err);
                    callback(null,err);
                }
                else
                {
                   
                    con.commit(con);
                    callback(null,result);
                    BaseModel.insertChildData('PurchaseDetails',purchaseDetailsList,true, function (err, data)
                    {
                        logger.info("Transaction insertChildData " + purchaseDetailsList);
                        if (err)
                        {
                            logger.info("Transaction insertChildData" +err +" "+ purchaseDetailsList);
                            con.rollback(con, err);
                        } else 
                        {
                            con.commit(con);
                        }
                    });
                }
            });
            if(err)
            {
                logger.info("err"+ err);
            }
        });     
    }
    catch(ex)
    {
        logger.info("Exceptionm from the model before called");
        throw ex;
    }
};
  





/*const Product = mysqlDb.model('Task',taskschema)
User.createUser = function (newUser, result) {    
        sql.query("INSERT INTO Users set ?", newUser, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
User.getUserById = function (userId, result) {
   console.log(userId);
        sql.query("Select * from Users where id = ? " ,[userId],function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log (userId);
                    result(null, res);
                    
                }
            });   
};

exports.listUser = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};


User.getAllUser = function (result) {
        sql.query("Select * from Users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);purchase
                }
                else{
                  console.log('use : ', res);  

                 result(null, res);
                }
            });   
};
User.patchUserById = function(userId, email, result){
  sql.query("UPDATE Users SET email = ? WHERE id = ?", [email, userId], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};


User.findByEmail = function(email, result)
{
    sql.query("Select * from Users where email = ?", [email], function (err, res) 
    {
        if(err)
        {
            console.log("error: ", err);
            result(null, err);
        }
        else
        {   
            result(null, res);
        }
    }); 
};


User.remove = function(userId, result)
{
     sql.query("DELETE FROM Users WHERE id = ?", [userId], function (err, res)
     {

        if(err)
        {
            console.log("error: ", err);
            result(null, err);
        }
        else
        {
            result(null, res);
        }
    }); 
};

mysqlDb.sync()
.then(() => console.log("Database has been synced"))
.catch((err) => console.error("Error creating databse"+err))
*/
module.exports= {BaseModel,InsertData};