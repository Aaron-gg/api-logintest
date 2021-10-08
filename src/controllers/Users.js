const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/modelUsers');

const controller = {
    logIn: async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send('User not found');
        }
        if(!user.comparePassword(password)){
            return res.status(404).send('Incorrect password');
        }
        else{
            jwt.sign({user}, 'secretkey', (err, token) => {
                res.status(200).json({
                    token: token
                });
            });
        }
    },
    signUp: async(req, res) => {
        const { name, email, password } = req.body;
        const user = await User.findOne({email: email});
        if(user){
            return res.status(400).send('E-mail already exists');
        }
        else{
            const newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            await newUser.save();
            return res.status(201).send('User created');
        }
    },
    logToken: (req, res) => {
        const user = {
            id: 1,
            nombre: "test",
            email: "test@test"
        }
        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
                token: token
            });
        });
    },
    accessToken: (req, res) => {
        //jwt.verify(req.token, 'secretkey', {expiresIn: '30s'}, (err, authData) => { // Token with expiration
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err){
                res.sendStatus(403);
            }
            else{
                res.json({
                    message: "OK",
                    authData: authData
                })
            }
        });
    },
}

// Authorization: Bearer <Token>
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}
module.exports = {
    controller,
    verifyToken
}