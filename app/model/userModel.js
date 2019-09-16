'user strict';
var sql = require('../../libs/dbConnect/mysqlCon.js');

//Task object constructor
var User = function(user){
    this.id = 3;
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
User.getUserById = function (uid, result) {
   console.log(uid);
        sql.query("Select *from Users where id=?",uid,function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log (id);
                    result(null, res);
                    
                }
            });   
};
User.getAllUser = function (result) {
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
};
User.updateById = function(id, email, result){
  sql.query("UPDATE Users SET email = ? WHERE id = ?", [user.email, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.remove = function(id, result){
     sql.query("DELETE FROM Users WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= User;