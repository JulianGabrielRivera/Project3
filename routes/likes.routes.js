const router = require('express').Router();
const User = require('../models/User.model');
const Place = require('../models/Place.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// user = {name: 'ffds', placeLiked:[{idOfThePlace:"554", isLiked :true}]}

router.post('/like/:placeId', (req, res, next) => {
  const { placeId } = req.params;

  Place.findByIdAndUpdate(placeId, { $inc: { likes: 1 } }, { new: true })
    .then((likedUser) => {
      console.log(likedUser);
      // object 2 keys, with value of true, key of likeduser matches user model which has all those keys/values
      res.json({ success: true, likedUser });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

router.post('/unlike/:placeId', (req, res, next) => {
  const { placeId } = req.params;

  Place.findByIdAndUpdate(placeId, { $inc: { likes: -1 } }, { new: true })
    .then((likedUser) => {
      console.log(likedUser);
      // object 2 keys, with value of true, key of likeduser matches user model which has all those keys/values
      res.json({ success: true, likedUser });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

module.exports = router;
