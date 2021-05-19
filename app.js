// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// Session Configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = 'mongodb://localhost/projector'

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: DB_URL
    })
  })
)

//passport configuration
const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(dbUser => {
      done(null, dbUser)
    })
    .catch(err => {
      done(err);
    })
})

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then(userFromDB => {
        if (userFromDB === null) {
          done(null, false, { message: 'Wrong Credentials' });
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          done(null, userFromDB);
        }
      })
      .catch(err => {
        next(err);
      })
  })
)

app.use(passport.initialize());
app.use(passport.session());

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const auth = require('./routes/auth');
app.use('/api/auth', auth);

const item = require('./routes/item');
app.use('/api/items', item);

const user = require('./routes/user');
app.use('/api/user', user);

const person = require('./routes/person');
app.use('/api/person', person);

app.use('/api', require('./routes/cloudinary'));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;