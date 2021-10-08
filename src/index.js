const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// Initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 3777);
app.use(bodyParser.json());

// middlewares
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    app.locals.users = req.user;
    next();
})

// routes
app.use('/', require('./routes/index'));

// start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});