const router = require('express').Router();
const List = require('../models/list');
const monogoose = require('mongoose');

module.exports = function () {
    router.get('/:listId', function (req, res) {
        List.findById(req.params.listId, function (err, note) {
            res.json({
                note
            });
        });
    });
    return router;
};