const router = require("express").Router();
const User = require("../models/User.model");
const Place = require("../models/Place.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// user = {name: 'ffds', placeLiked:[{idOfThePlace:"554", isLiked :true}]}

router.get("/likedplaces", isAuthenticated, (req, res, next) => {
  User.findById(req.payload._id)
    .populate("places")
    .then((foundPlaces) => {
      console.log(foundPlaces);
      res.json({ foundPlaces });
    })
    .catch((err) => console.log(err));
});

router.post("/like/:placeId", isAuthenticated, (req, res, next) => {
  const { placeId } = req.params;
  const { totalLikes } = req.body;
  console.log(totalLikes);
  Place.findByIdAndUpdate(placeId, { $inc: { likes: 1 } }, { new: true })
    .then((likedUser) => {
      console.log(likedUser);
      console.log(req.payload);
      // object 2 keys, with value of true, key of likeduser matches user model which has all those keys/values
      console.log(likedUser);
      Place.findByIdAndUpdate(
        placeId,
        { $addToSet: { likedBy: req.payload._id } },
        { new: true }
      ).then((response) => {
        console.log(response);
      });

      User.findByIdAndUpdate(
        req.payload._id,
        { $addToSet: { places: likedUser._id } },
        { new: true }
      )
        .lean()
        .populate("places")
        .then((user) => {
          console.log(user.places, "hey");
          console.log(likedUser._id.toString());

          let newUser = user.places.map((place) => {
            console.log(place._id.toString());
            if (place._id.toString() === likedUser._id.toString()) {
              return {
                ...place,
                isLiked: true,
              };
            } else {
              return { ...place, isLiked: false };
            }
          });
          console.log(newUser, "yoooo");

          // console.log(user, "yes");
          // const newUser = req.payload;
          res.json({ success: true, likedUser, newUser });
        });
    })

    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

router.post("/unlike/:placeId", isAuthenticated, (req, res, next) => {
  const { placeId } = req.params;

  Place.findByIdAndUpdate(
    placeId,
    { $inc: { likes: -1 }, isLiked: false },
    { new: true }
  )
    .then((likedUser) => {
      Place.findByIdAndUpdate(
        placeId,
        { $pull: { likedBy: req.payload._id } },
        { new: true }
      ).then((response) => {
        console.log(response);
      });

      User.findByIdAndUpdate(
        req.payload._id,
        { $addToSet: { places: likedUser._id } },
        { new: true }
      )
        .lean()
        .populate("places")
        .then((user) => {
          console.log(user, "hey");
          let newUser = user.places.map((place) => {
            console.log(place._id.toString());
            if (place._id.toString() === likedUser._id.toString()) {
              return {
                ...place,
                isLiked: false,
              };
            } else {
              return { ...place, isLiked: true };
            }
          });
          console.log(newUser, "yoooo");

          res.json({ success: true, likedUser, newUser });
        });
      // object 2 keys, with value of true, key of likeduser matches user model which has all those keys/values
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

module.exports = router;
