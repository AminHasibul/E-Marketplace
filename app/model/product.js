/*'user strict';
const connection = require('../../libs/dbConnect/mysqlCon.js');

const schemaProduct = new mysqlDb.Schema(
    {
        description: {
            type: String,
            allowNull: false,
            required:true,
            trim:true,
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mysqlDb.Schema.Types.ObjectID,
            required:true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        timestamps:true
    }
);

const Product = mysqlDb.model('Task',taskschema)
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
                    result(null, err);
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

//module.exports= Product;