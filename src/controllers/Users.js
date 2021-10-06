const passport = require('passport');

const singup = passport.authenticate('local-signup', {
    successMessage: 'Singup ok',
    failureMessage: 'Singup error',
    passReqToCallback: true
});

const singin = passport.authenticate('local-signin', {
    successMessage: 'Singin ok',
    failureMessage: 'Singin error',
    passReqToCallback: true
});

const logout = (req, res, next) => {
    req.logout();
    res.send('logout');
};

module.exports = {
    singup,
    singin,
    logout
}