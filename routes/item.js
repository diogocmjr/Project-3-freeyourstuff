const router = require("express").Router();
const Item = require('../models/Item');

router.post('/new', (req, res, next) => {
  const { title, description, imgUrl, owner, condition, status, postedDate, category } = req.body;
  console.log('back end route', title, category, description, condition, imgUrl, owner)
  Item.create({
    title,
    description,
    imgUrl,
    owner,
    condition,
    status,
    postedDate,
    category
  })
    .then(item => {
      console.log('succesful', item)
      res.status(201).json(item)
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/', (req, res, next) => {
  Item.find().populate('owner')
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => res.json(err))
});

router.get('/:id', (req, res, next) => {
  Item.findById(req.params.id).populate('owner')
    .then(item => {
      if (!item) {
        res.status(404).json(item);
      } else {
        res.status(200).json(item);
      }
    })
});

router.put('/:id', (req, res, next) => {
  const { title, description, imgUrl, condition, status, category } = req.body;
  Item.findByIdAndUpdate(
    req.params.id,
    { title, description, imgUrl, condition, status, category },
    { new: true }
  )
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => res.json(err));
});

router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Item Deleted!' });
    })
})

module.exports = router;