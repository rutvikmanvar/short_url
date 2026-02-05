const {getUser} = require('../services/auth')

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookie?.token;
    req.user = null;
    if(!tokenCookie){
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.json({message: 'Unauthorized user'});
        if(!roles.includes(req.user.role)) return res.json({message: 'Unauthorized user'});
        return next();
    }
}


module.exports = {
    checkForAuthentication,
    restrictTo,   
}