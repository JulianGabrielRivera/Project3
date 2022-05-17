const router = require('express').Router();

const Comment = require('../models/Comment.model');
const Place = require('../models/Place.model');

// router.get('/comments', (req, res, next) => {
//   const { id } = req.params;
//   console.log(id);
// });

router.post('/:id/comments', (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const { content, author } = req.body;
  Comment.create({ author, content })

    .then((newComment) => {
      Place.findByIdAndUpdate(
        id,
        { $push: { comments: newComment.content } },
        { new: true }
      )
        .then((response) => {
          console.log(response);
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
