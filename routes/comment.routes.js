const router = require('express').Router();

const Comment = require('../models/Comment.model');
const Place = require('../models/Place.model');
const User = require('../models/User.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

router.post('/comments/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  const author = req.payload._id;
  console.log(req.payload._id);
  console.log(id);
  console.log(author);

  const { content } = req.body;
  Comment.create({ author, content })

    .then((newComment) => {
      console.log(newComment);
      Place.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      )
        .then(() => {
          User.findByIdAndUpdate(
            author,
            { $push: { myComments: newComment._id } },
            { new: true }
          ).then(() => {
            let copyOfNewComment = newComment.toObject();

            copyOfNewComment.author = { name: req.payload.name };
            console.log(copyOfNewComment);
            res.json(copyOfNewComment);
          });
        })

        .catch((err) => {
          console.log(err);
        });

      console.log(newComment);
    })

    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
