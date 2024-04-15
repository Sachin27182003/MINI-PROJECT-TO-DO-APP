const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Task:String,
    Description:String,
    Time:String,
    Completed:Boolean,
    Task_no:Number,
},{timestamps:true, versionKey : false})

const userModel = mongoose.model('TO DO APP',userSchema);


module.exports = userModel;