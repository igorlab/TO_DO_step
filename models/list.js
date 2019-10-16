const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    Name: String, //, required: true
    Tasks:[]
});

const List = mongoose.model('listSchema', listSchema);

module.exports = List;