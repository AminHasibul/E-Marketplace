const User = require('../../model/user')
const route = require('express').Router()

route.get('/',(req,res) =>
{
    User.findALl().then((Users) =>
    {
        res.status(200).send(Users)
    })
    .catch((err) =>
    {
        res.status(500).send({
            error: "could not retrive user" + err
        })
    })     
})

route.post('/',(req,res) =>
{
    User.create(
    {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        status : req.body.status,
        created_at : req.body.created_at,
        updated_at : req.body.updated_at
    }).then((users) =>
        {
            res.status(201).send(users)
        })
        .catch((err) =>
        {
            res.status(501).send({
                error: "could not add user" + err
            })
        })     
})

exports = module.exports = route;