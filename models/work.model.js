
const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
        
    },
    status:{
        type: Boolean,
        default: false      
    },   
    dueDate: {
        type: Date,
        default: null
    } 

},
        { timestamps: true }
); 

const workModel = mongoose.model("Work", workSchema);

module.exports = workModel;