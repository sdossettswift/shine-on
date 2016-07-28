const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const questionsSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String},
    authorId: {type: String, required: true},
    // answered: {type: Boolean, required: true, default: false}, //this is commented out because I don't know how to add it in the object in askview
    tags: {type: [String], required: true}
},
{
    timestamp: true
})

module.exports = {
  User: createModel('User', usersSchema),
  Question: createModel('Question', questionsSchema)
}


