const router = require('express').Router();
const User = require('../models/User');

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id).populate('location')
    .then(user => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.status(200).json(user);
      }
    })
});

module.exports = router;