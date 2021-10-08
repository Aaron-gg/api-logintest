const express = require('express');
const router = express.Router();

const { controller, verifyToken } = require('../controllers/Users');

router.get('/', (req, res, next) => {
    res.send('OK');
});

// TEST ------------------------------------------

const User = require('../models/modelUsers');

router.post('/testsup', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({email: email});
    if(user){
        return res.send('ya existe');
    }
    else{
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        res.json({
            message: 'user created',
            json: {
                user: {name, email, password}
            }
        });
    }
});

router.post('/testsin', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.send('No User found');
    }
    if(!user.comparePassword(password)){
        return res.send('Incorrect Password');
    }
    res.send('OK!!!');
});


router.post('/testlog', controller.logToken);

router.post('/testaccess', verifyToken, controller.accessToken);
//------------------------------------------------

router.post('/singin', controller.logIn);

router.post('/singup', controller.signUp);

module.exports = router;