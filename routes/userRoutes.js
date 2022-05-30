const router = require('express').Router();

const { postLogin, postRegister, logout } = require('../controller/index');
const { checkNotAuthenticated } = require('../middleware/index');


router.post('/login', checkNotAuthenticated, postLogin);
router.post('/register', checkNotAuthenticated, postRegister);
router.delete('/logout', logout);


module.exports = router;
