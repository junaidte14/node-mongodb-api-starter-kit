const jwt = require('jsonwebtoken');
const env = require('../config/env');

const secretKey = env.configVars.secretKey;

function sendInfoAndToken(user, res){
    const token = jwt.sign(user.email, secretKey); 
    res.status(200).json({email: user.email, token: token});
}

function sendAuthError(res){
    return res.status(404).json({success: false, message: 'Email or password is incorrect'}); 
}

function checkAdminAuthenticated(req, res, next){
    if(!req.header('authorization')){
        return res.status(401).send(JSON.stringify({message: "Unauthorized request! Missing authentication header"}));
    }
    const token = req.header('authorization').split(' ')[1];
    const payload = jwt.decode(token, secretKey);
    if(!payload){
        return res.status(401).send(JSON.stringify({message: "Unauthorized request! Authentication header is invalid."}));
    }
    if(payload == env.configVars.adminEmail){
        req.userEmail = payload;
        next();
    }else{
        return res.status(401).send(JSON.stringify({message: "Unauthorized request! You are not allowed to access the requested resource."}));
    }
}

module.exports = {sendInfoAndToken, sendAuthError, checkAdminAuthenticated};