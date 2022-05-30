const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

const appRouter = require('./routes/appRoutes');
const userRouter = require('./routes/userRoutes');


dotenv.config({ path: path.join(__dirname, 'config/.env') });

const PORT = process.env.PORT

const app = express();


// app config
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// app middleware


// routes
app.use('/', appRouter);
app.use('/auth', userRouter);




app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));

