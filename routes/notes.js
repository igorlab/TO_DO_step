const router = require('express').Router();
const Todo = require('../models/todo');
const monogoose = require('mongoose');

// /notes
module.exports = function () {
    router.get('/:clientId', function (req, res) {
        Todo.findById(req.params.clientId, function (err, note) {
            // console.log(note);
            res.json({
               note
            });
        });
    });

    return router;
};
