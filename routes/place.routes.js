const router = require('express').Router();
const { checkAdmin } = require('./../middleware/roles.middleware');

const Place = require('../models/Place.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const mongoose = require('mongoose');

router.get('/places', (req, res, next) => {
  // .find gets all the documents if we dont specify what we want.
  Place.find({})
    .then((allPlaces) => {
      console.log(allPlaces);
      // res.send(response);
      // when we use postman we get console.log in our terminal
      // response here so you can see it on postman
      res.json({ message: allPlaces });
    })
    .catch((err) => console.log(err));
});

router.get('/places/:placeId', (req, res, next) => {
  const { placeId } = req.params;
  // .find gets all the documents if we dont specify what we want.
  Place.findById(placeId)

    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    })
    .then((response) => {
      console.log(response);
      // res.send(response);
      // when we use postman we get console.log in our terminal
      // response here so you can see it on postman
      // dont double nest, already an object
      res.json(response);
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

router.delete('/places/:placeId', (req, res, next) => {
  const { placeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Place.findByIdAndRemove(placeId)
    .then((response) => {
      Place.find({})
        .then((allPlaces) => {
          console.log(allPlaces);
          // res.send(response);
          // when we use postman we get console.log in our terminal
          // response here so you can see it on postman
          res.json({ message: allPlaces });
        })
        .catch((err) => console.log(err));
      // console.log(response);
      // res.json({
      //   message: `Project with ${placeId} is removed successfully.`,
      // });
    })
    .catch((error) => res.json(error));
});

module.exports = router;
