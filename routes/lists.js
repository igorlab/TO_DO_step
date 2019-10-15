const router = require('express').Router();
const List = require('../models/list');
const monogoose = require('mongoose');

module.exports = function () {
    router.get('/', function (req, res) {
        res.render('create_list', function (err, html) {
            res.send(html)
        })
    });

    router.post('/', function (req, res) {
        const listData = req.body;
        const newList = new List({
            Name: listData.listName,
            Tasks: listData.listTasks
        });
        newList.save(function () {
            res.json(newList);
        });
    });

    router.delete('/:listID', function (req, res) {
        List.findByIdAndRemove(req.params.listID, function (err) {
            if (err) throw err;
            res.json({
                massege: 'list was deleted'
            });
        });
    });

    router.put('/:listID', function (req, res) {
        const listData = req.body;
        List.findOneAndUpdate({_id: req.params.listID}, {
            Name: req.body.listName,
            Field: req.body.listField,
            Tasks: req.body.listTasks
        },function (err, list) {
            if(err) throw err;
            res.json(list)
        });
    });

    return router;
};
