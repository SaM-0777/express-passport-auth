const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../config/passport-config');

const users = []


// method  @desc
// get     render home page
const home = (req, res) => {
    res.status(200).render('index', {
        title: 'express-passport',
        name: req.user.name,
    })
};

// method  @desc
// get     render login page
const login = (req, res) => {
    res.status(200).render('login', {
        title: 'express-passport-login',
    })
};

// method  @desc
// get     render register page
const register = (req, res) => {
    res.status(200).render('register', {
        title: 'express-passport-register',
    })
};

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// method  @desc
// post    login user
const postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})

// method  @desc
// post    register user
const postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            passowrd: hashedPassword
        })
        res.status(200).redirect('/login')
    } catch (error) {
        res.status(200).redirect('/register')
    }
    console.log(users)
};

// method  @desc
// delete  logout user
const logout = (req, res) => {
    req.logOut()
    res.status(200).redirect('/login')
};


module.exports = {
    home,
    login,
    register,
    postLogin,
    postRegister,
    logout
};

