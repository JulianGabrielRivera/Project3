const router = require('express').Router();
const User = require('../models/User.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

// router.get('/user', (req, res, next) => {
//   const { userId } = req.params;

//   User.find()
//     .then((allUsers) => {
//       console.log(allUsers);
//       // res.send(response);
//       // when we use postman we get console.log in our terminal
//       // response here so you can see it on postman
//       res.json({ message: allUsers });
//     })
//     .catch((err) => console.log(err));
// });

router.get('/user', (req, res, next) => {
  // req.params is an object
  // const { userId } = req.params;

  const userId = req.payload._id;

  User.findById(userId)
    .then((foundUser) => {
      console.log(foundUser);
      // copies user document then remove password
      const foundUserCopy = foundUser.toObject();

      foundUserCopy.password = '';
      // res.send(response);
      // when we use postman we get console.log in our terminal
      // response here so you can see it on postman
      res.json(foundUserCopy);
    })
    .catch((err) => console.log(err));
});

// router.get('/currentUser', isAuthenticated, (req, res, next) => {
//   User.find({ _id: req.currentUser._id })
//     .then((allUsers) => {
//       console.log(allUsers);
//       // res.send(response);
//       // when we use postman we get console.log in our terminal
//       // response here so you can see it on postman
//       res.json({ currentUser: req.currentUser });
//     })
//     .catch((err) => console.log(err));
// });

router.put('/user', (req, res, next) => {
  const userId = req.payload._id;
  // const { userId } = req.params;
  // console.log(req.currentUser);
  const { name, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  if (password !== '') {
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);
    User.findOneAndUpdate(
      { _id: userId },
      { name: name, email: email, password: hashedPassword },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((error) => res.json(error));
  } else {
    User.findOneAndUpdate(
      { _id: userId },
      { name: name, email: email },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((error) => res.json(error));
  }
});

module.exports = router;
