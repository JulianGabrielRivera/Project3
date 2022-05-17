const router = require('express').Router();
const { checkAdmin } = require('./../middleware/roles.middleware');

const Place = require('../models/Place.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.get('/places', (req, res, next) => {
  // .find gets all the documents if we dont specify what we want.
  Place.find({})
    .then((response) => {
      console.log(response);
      res.send(response);
      // when we use postman we get console.log in our terminal
      // response.data here so you can see it on postman
      res.json({ message: response });
    })
    .catch((err) => console.log(err));
});

router.post('/places/create', isAuthenticated, checkAdmin, (req, res, next) => {
  const { name, img, description, rating } = req.body;

  Place.create({ name, img, description, rating, comments: [] })
    .then((newPlace) => {
      console.log(newPlace);
      res.json({ message: 'success' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Failed to create' });
    });
});

module.exports = router;
