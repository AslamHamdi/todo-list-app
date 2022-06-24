require('dotenv').config({path: __dirname + '../../.env'})
const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const app = express()
const port = process.env.PORT || 5000
const passport = require('passport')
const flash = require('express-flash')
require('../Config/passport-config')(passport)
let users = {
    id: 64,
    name: 'wokle',
    email: 'wokle08@gmail.com',
    password: 123,
}

app.use('/dist', express.static(__dirname + '../../dist/'))
app.use('/ClientApp', express.static(__dirname + '../../ClientApp/'))
app.use('/assets', express.static(__dirname + '../../ClientApp/src/assets/'))
app.use('/Views', express.static(__dirname + '../../Views/'))
app.use('/Config', express.static(__dirname + '../../Config/'))

app.use(morgan('dev'));
app.use(cookieParser()); 
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
// app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Default route to todo page
app.get('/', isLoggedIn, function(req, res){
    res.sendFile(path.join(__dirname, '../Views/Shared/layout.html'), {
        user: req.user
    })
})

//Route to login page
app.get('/login', function(req, res){
    console.log("USER:: ", req.user)
    if(req.user){
        res.redirect('/');
    }else{
        res.sendFile(path.join(__dirname, '../Views/Auth/Login.html'))
    }
})

// app.post('/loginLocal', passport.authenticate('local-login', {
//     successRedirect : '/', // redirect to the secure profile section
//     failureRedirect : '/loginFailJson', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// },(err, user, options) => {
//     console.log(options) // options will be the complete object you pass in done()
// }));

app.post('/loginLocal', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/loginFailJson', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}),
function(req, res) {
    console.log("hello");

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
res.send('/');
});

app.get('/loginFailJson', function(req, res) {
    res.status(401).json({ message: 'Email or password are incorrect' })
});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
        return next();
    }else{
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
	
	
}

//Api Route
app.use('/api', require('./ApiRouter'))
//Auth router
app.use('/auth', require('./AuthRouter'))

app.listen(port, () => console.log(`Server is live on ${port}`))


