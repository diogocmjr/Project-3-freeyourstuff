const router = require("express").Router();
const Item = require('../models/Item');

router.post('/new', (req, res, next) => {
  const { title, description, imgUrl, owner, condition, status, postedDate, category } = req.body;
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
      res.status(201).json(item)
    })
    .catch(err => {
      res.json(err);
    })
});

<<<<<<< HEAD

router.get('/items', (req, res, next) => {
=======
router.get('/', (req, res, next) => {
>>>>>>> master
  Item.find()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => res.json(err))
});

<<<<<<< HEAD
router.get('item/:id', (req, res, next) => {
=======
router.get('/:id', (req, res, next) => {
>>>>>>> master
  Item.findById(req.params.id)
    .then(item => {
      if (!item) {
        res.status(404).json(item);
      } else {
        res.status(200).json(item);
      }
    })
});

<<<<<<< HEAD
router.put('item/:id', (req, res, next) => {
=======
router.put('/:id', (req, res, next) => {
>>>>>>> master
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

<<<<<<< HEAD
router.delete('item/:id', (req, res) => {
=======
router.delete('/:id', (req, res) => {
>>>>>>> master
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Item Deleted!' });
    })
})

module.exports = router;