const router = require('express').Router();

const { home, login, register } = require('../controller/index');
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/index');

router.get('/', checkAuthenticated, home);
router.get('/login', checkNotAuthenticated, login);
router.get('/register', checkNotAuthenticated, register);


module.exports = router;
