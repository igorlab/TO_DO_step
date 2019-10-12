const router = require('express').Router();
const Todo = require('../models/todo');
const monogoose = require('mongoose');
// api/notes
module.exports = function () {
    router.get('/', function (req, res) {
        // поиск карточек
        // res.send('hello world');
        res.render('create_todo', function (err, html) {
            res.send(html)
        })
    });

    router.post('/', function (req, res) {
        const todoData = req.body;
        const toDoNote = new Todo({
            Name: todoData.toDoName,
            Text: todoData.toDoText,
            created_at: new Date(),
            updated_at: new Date()
        });
        toDoNote.save(function () {
            // if (err) throw err;
            res.json(toDoNote);
        });


    });
    // DELETE
    router.delete('/:cardID', function (req, res) {
        Todo.findByIdAndRemove(req.params.cardID, function (err) {
            if (err) throw err;
            res.json({
                massege: 'card was deleted'
            });
        });
    });
    // EDIT
    router.delete('/:cardID', function (req, res) {
        Todo.findByIdAndRemove(req.params.cardID, function (err) {
            if (err) throw err;
            res.json({
                massege: 'card was deleted'
            });
        });
    });

    router.put('/:cardID', function (req, res) {
        const todoData = req.body;
        Todo.findOneAndUpdate({_id: req.params.cardID}, {
                Name: req.body.toDoName,
                Text: req.body.toDoText,
                updated_at: new Date()
        },function (err, client) {
            if(err) throw err;
            res.json(client)
        });
    });

    return router;
};
