const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();

//delete-a-review-image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  let imageId = req.params.imageId;
  let reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage){

    const err = new Error("Review Image couldn't be found");
    return res.status(404).json({
      message: err.message
    });

  }

  let reviewId = reviewImage.toJSON().reviewId;
  let review = await Review.findByPk(reviewId);
  let userId = review.toJSON().userId;

  let currentUserId = req.user.id;

  if (currentUserId !== userId){

    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message
    });

  } else {

    await reviewImage.destroy();

    res.json({
      message: "Successfully deleted"
    });
  }
});

module.exports = router;
