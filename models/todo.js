const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const todoSchema = new Schema({
    Name: {type: String}, //, required: true
    Text: String,
    created_at: Date,
    updated_at: Date,
    notePicture: Buffer
});

/**
 *
 **/
todoSchema.methods.url = function() {
    return `/clients/${this._id.toString()}`;
};

todoSchema.methods.name = function() {
    return `${this.Name} ${this.Text}`;
};

// the schema is useless so far
// we need to create a model using it
const Todo = mongoose.model('todoSchema', todoSchema);

// make this available to our users in our Node applications
module.exports = Todo;