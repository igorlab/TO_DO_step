const router = require('express').Router();
const Todo = require('../models/todo');

module.exports = function () {
    router.get('/', function (req, res) {
        Todo.find({}).exec(function (err, todo) {
            res.render('index', {
                todoes: todo
            })
        });
    });


    return router;
};