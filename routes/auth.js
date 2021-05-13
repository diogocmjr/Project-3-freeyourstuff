const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    return res.status(400).json({ message: 'Your password has to be 8 chars min' });
  }
  if (username === '') {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }
  User.findOne({ username: username })
    .then(userFromDB => {
      if (userFromDB !== null) {
        return res.status(400).json({ message: 'This username is already taken' });
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        User.create({ username: username, password: hash })          
      }
    })
    .catch(err => {
      res.json(err);
    })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Error while logging in' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error while logging in' });
      }
      return res.status(200).json(user);
    })
  })(req, res)
});

// this checks if we have a logged in user -> returns this user as json or null
router.get('/loggedin', (req, res) => {
  res.json(req.user);
})

router.delete('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Successful Logout' });
})

module.exports = router;