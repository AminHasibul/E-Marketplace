'user strict';
var sql = require('../../../libs/dbConnect/mysqlCon.js');
var CommonEnum = require('../../../libs/helper/enums.js');
var logger = require('../../../libs/helper/logger');
var {Paging} = require('../../../libs/utility/pageSetup');

var User = function(user)
{
    //this.id = CommonEnum.NewMasterID.value;
    this.id = 1;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.status = user.status;
    this.created_at = new Date();;
    this.updated_at = new Date();
    this.deleted_at = null;
};
User.createUser = function (newUser, result)
{   
    // BaseModel.insertSingleData('Users', newUser,result, function (err, result)
    // {
    //     logger.info("Transaction insertSingleData " + newUser);
        
    //     if (err) 
    //     {
    //         logger.info("Transaction insertSingleData Eroor " + err);
    //         con.rollback(con, err);
    //         result(null, err);
    //     }
    //     else 
    //     {
    //         con.commit(con);
    //         result(null, result);          
    //     }
    // }); 
    BaseModel.insertData('testShipperBids',result, function (err, result)
    {
        logger.info("Transaction insertSingleData " );
        
        if (err) 
        {
            logger.info("Transaction insertSingleData Eroor " + err);
            con.rollback(con, err);
            result(null, err);
        }
        else 
        {
            con.commit(con);
            result(null, result);          
        }
    }); 
    
    // sql.query("INSERT INTO Users set ?", newUser, function (err, res) {
            
    //         if(err) {
    //             console.log("error: ", err);
    //             result(err, null);
    //         }
    //         else{
    //             console.log(res.insertId);
    //             result(null, res.insertId);
    //         }
    //     });           
};


User.getUserById = function (userId, result)
 {
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

// lood test list 
User.getAlllist = function (result)
 {
    let sqlSP = `CALL spGetAllList ()`;
    sql.query(sqlSP,function (err, res) 
    {

        if(err)
        { 
            logger.info("Getting User List error:"+ err.message);
            console.log("error: ", err);
            result(null, err);
        }
        else{
            logger.info("Getting User List ");
            console.log('use:', res); 
            result( null ,res);
        }
    }); 
};
User.getAllUser = function (limit,skip,result)
 {
     logger.info("Getting User List");
    var query = "Select count(*) as TotalRow from Users"; 
  
    sql.query(query, function(err, rows)
    {
        logger.info("Getting TotalRow from getAllUser method"+rows[0].TotalRow +"  " +skip);
        if(err)
        {
            logger.info("Getting User List error: " + err);
            console.log("error: ", err);
            result(null, err);
        }
        else
        {    
            logger.info("Getting User List : " + rows[0].TotalRow);
            let totalRow = rows[0].TotalRow
             
            sql.query("Select * from Users ORDER BY created_at DESC  limit ? OFFSET ?",[limit,skip],function (err, res) 
            {

                if(err)
                { 
                     logger.info("Getting User List error:"+ err.message);
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                    logger.info("Getting User List : " + rows[0].TotalRow);
                    console.log('use:', res); 

                    
                    var data = Paging(skip,limit,totalRow);
                    res.push("TotalRow:"+totalRow);
                    res.push("Showing:"+data);
                    result( null ,res);
                }
            }); 
        }
    })  
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
module.exports= User;