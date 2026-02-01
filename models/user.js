const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        required : true,
        type : String
    },
    email:{
        required : true,
        type : String,
        unique:true,
    },
    password:{
        required : true,
        type : String
    },
    role:{
        type : String,
        required : true,
        default : 'NORMAL'
    }
},{
    timestamps: true
})

const User = mongoose.model('user',userSchema)

module.exports = User;