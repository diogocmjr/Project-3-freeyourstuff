const router = require('express').Router();
const User = require('../models/User');
const Item = require('../models/Item');

//get user profile
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id).populate('favourites')
    .then(user => {
      if (!user) {
        res.status(404);
      } else {
        res.status(200).json(user)
      }
    })
})
  
//update user profile
router.put('/:id', (req, res, next) => {
  const { firstName, lastName, imgUrl, email, phoneNumber, street, number, city, country, postCode } = req.body;
  const location = {
    street,
    number,
    city,
    country,
    postCode
  } 
  User.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    imgUrl,
    email,
    phoneNumber,
    location
    }, { new: true })
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => res.json(err));
});

//add item to favourite
router.put('/:id/favourites', (req, res, next) => {
  const { favourites } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    $push: { favourites: favourites }
    }, { new: true })
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => res.json(err));
});

//add item to favourite
router.put('/:id/favourites/remove', (req, res, next) => {
  const { favourites } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    $pull: { favourites: favourites }
    }, { new: true })
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => res.json(err));
});

//delete account
router.delete('/:id', (req, res) => { 
  Item.deleteMany({
    owner: req.params.id
  })
  then(() => {
    Item.findByIdAndDelete(req.params.id)
      .then(() => {
        req.logout();
        req.session.destroy();
        res.status(200).json({ message: 'Account Deleted!' });
      })
      .catch(err => {
        res.json(err)
      })
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;

