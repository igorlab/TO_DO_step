const router = require('express').Router();
const Todo = require('../models/todo');
const List = require('../models/list');

module.exports = function () {

    router.get('/', function (req, res) {
        Todo.find({}).exec(function (err, todo) {
            List.find({}).exec(function (err, list) {
                res.render('index', {
                    todoes: todo,
                    lists: list
                })
            });
        });
    });
    return router;
};

