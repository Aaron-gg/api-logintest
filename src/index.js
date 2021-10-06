const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
//const flash = require('connect-flash');

// Initializations
const app = express();
require('./database');
require('./passport/local-auth');

// settings
app.set('port', process.env.PORT || 3777);
app.use(bodyParser.json());

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    //app.locals.signupMessage = req.flash('signupMessage');
    //app.locals.signinMessage = req.flash('signinMessage');
    app.locals.users = req.user;
    next();
})

// routes
app.use('/', require('./routes/index'));

// start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});