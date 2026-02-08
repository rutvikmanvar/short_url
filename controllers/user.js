const {v4: uuidv4} = require('uuid')
const User = require('../models/user')
const { setUser } = require('../services/auth')

async function handleUserSignUp(req,res) {
    const {name ,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.json({
        message: 'success',
    });
}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.json({
            message: 'Invalid email or password',
        })
    } 
    const token = setUser(user);
    res.cookie("token",token)
    return res.json({
        message: 'success',
        token,
    });
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}