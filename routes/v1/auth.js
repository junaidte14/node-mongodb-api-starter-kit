const express = require('express');
const auth = express.Router();
const authFuncs = require('../../functions/auth');

const env = require('../../config/env');

auth.post('/login', (req, res) => {
    if(req.body.email == env.configVars.adminEmail && req.body.password == env.configVars.adminPassword){
        let user = req.body;
        authFuncs.sendInfoAndToken(user, res);
    }else{
        authFuncs.sendAuthError(res);
    }
});

module.exports = auth;