'user strict';
var sql = require('../../libs/dbConnect/mysqlCon.js');

var CommonEnum = require('../../libs/helper/enums.js');
var {Sequelize} = require('sequelize');
var  mysqlSequelizeConDb = require('../../libs/dbConnect/mySqlConnect');

const DataTypes = Sequelize;

//Task object constructor
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

User.getAllUser = function (limit,skip,result)
 {
    var query = "Select count(*) as TotalRow from Users"; 
  
    sql.query(query, function(err, rows)
    {
        if(err)
        {
            console.log("error: ", err);
            result(null, err);
        }
        else
        {    
            let totalRow = rows[0].TotalRow
        
            
            sql.query("Select * from Users ORDER BY created_at DESC  limit ? OFFSET ?",[limit,skip],function (err, res) 
            {

                if(err)
                {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                    console.log('use : ', res);  

                    result( null ,res);
                }
            }); 
        }
    })  
};
/*/User.getAllUser = function (result) {
   sql.query("Select * from Users", function (err, res) {

        if(err) {
               console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('use : ', res);  

             result(null, res);
            }
        });   
};*/
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
User.listUser = function (limit, page,result)
{
    User.find()
        .limit(limit)
        .skip(limit * page)
        .exec(function (err, users) {
            if (err) {
                result(err, null);
            } else {
                result(err, null);
            }
        })
};

module.exports= User;