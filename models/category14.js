const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const category15 = new Schema({
    name : String,
    photoName : String,
    content : String,
    created_at : {
        type : Date,
        default : Date.now()
    }
});


category15.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});


autoIncrement.initialize(mongoose.connection)
category15.plugin( autoIncrement.plugin , { model : "category15", field : "id" , startAt : 1 } );
module.exports = mongoose.model('category15' , category15);