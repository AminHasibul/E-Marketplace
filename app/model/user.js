var {Sequelize} = require('sequelize');
//var {mysqlDb2} = require('../../libs/');
var  mysqlDb = require('../../libs/dbConnect/mySqlConnect');
const DataTypes = Sequelize;

var User = mysqlDb.define(
    'Users',
    {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER(4),
            allowNull: true
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
);

User.listUser = function (perPage, page,result){

        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    result(err, null);
                } else {
                    result(err, null);
                }
            })
};

mysqlDb.sync()
.then(() => console.log("Database has been synced"))
.catch((err) => console.error("Error creating databse"+err))

module.exports= User;