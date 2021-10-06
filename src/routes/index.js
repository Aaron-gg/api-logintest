const express = require('express');
const router = express.Router();

const { singup, singin, logout, test } = require('../controllers/Users');

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
})
//------------------------------------------------
router.post('/singup', singup);

router.post('/singin', singin);

router.get('/logout', logout);

//ejemplo multiples rutas autenticación
    router.use((req, res, next) => {
        checkAuthentication(req, res, next);
        next();
    });
// Las rutas debajo seran verificadas
/*router.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
});*/

// router.get('/profile', checkAuthentication, (req, res, next) => {     // Manera de verificar una sola ruta
/*router.get('/profile', (req, res, next) => {
    res.render('profile');
});*/

function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    //res.redirect('/signin');
    res.res('nop');
}

module.exports = router;