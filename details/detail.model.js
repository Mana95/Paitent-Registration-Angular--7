const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uniqueId: { 
        type: String, 
        unique: true, 
        required: true
    },

    camImage: {
        type: String,
        required:true
    }
    
  
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Details', schema);