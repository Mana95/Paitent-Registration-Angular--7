const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { 
        type: String, 
        unique: true, 
        required: true
    },
    firstName: {
        type: String,
        required: true 

        },
        image: {
            type: String,
            required:true
        },

    lastName: {
        type: String,
        required: true
         },
         //Add the role for the user.model.js
    role: {
        type: String,
        required: true
            },
    createdDate: { 
        type: Date, 
        default: Date.now
      
     },
     email: {
        type: String,
        required: true
     },
     phonenumber: {
        type: String,
        required: true
     },
     address: {
        type: String,
        required: true
     }

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);