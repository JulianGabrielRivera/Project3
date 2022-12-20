const router = require("express").Router();
const { checkAdmin } = require("./../middleware/roles.middleware");

const Place = require("../models/Place.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const User = require("../models/User.model");

router.get("/places", (req, res, next) => {
  // .find gets all the documents if we dont specify what we want.
  Place.find({})
    .then((allPlaces) => {
      // console.log(allPlaces);
      console.log(req.session.email, "hiiii");
      console.log(req.payload, "hiiii");

      // res.send(response);
      // when we use postman we get console.log in our terminal
      // response here so you can see it on postman
      res.json({ message: allPlaces });
    })
    .catch((err) => console.log(err));
});

router.get("/places/:placeId", (req, res, next) => {
  const { placeId } = req.params;
  // .find gets all the documents if we dont specify what we want.
  console.log(req.payload);
  Place.findById(placeId)

    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })

    .then((response) => {
      console.log(response);
      // how we give it to our front end with res.json
      // dont double nest, already an object
      res.json(response);
    })
    .catch((err) => console.log(err));
});

router.post("/places/create", isAuthenticated, checkAdmin, (req, res, next) => {
  const { name, url, description, rating, continent, price } = req.body;
  console.log(price, "hey");
  console.log(name, "hey");
  Place.create({
    name,
    url,
    description,
    rating,
    comments: [],
    continent,
    price,
    isLiked: false,
  })
    .then((newPlace) => {
      console.log(newPlace);
      res.json({ message: newPlace });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to create" });
    });
});

router.delete("/places/:placeId", isAuthenticated, (req, res, next) => {
  const { placeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
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
