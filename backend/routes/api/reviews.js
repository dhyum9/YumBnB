const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {requireAuth } = require('../../utils/auth');
const { Review, Spot, ReviewImage, User, SpotImage } = require('../../db/models');

const router = express.Router();

//get-all-reviews-of-the-current-user
router.get('/current', requireAuth, async (req, res, next) => {
  let userId = req.user.id;

  const reviews = await Review.findAll({
    where: {
      userId
    },
    include: [
      {
        model: User,
        attributes:["id", "firstName", "lastName"]
      },
      {
        model: Spot,
        attributes:["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
      },
      {
        model: ReviewImage,
        attributes:["id", "url"]
      }
    ]
  });

  let reviewsList = [];
  reviews.forEach(review => {
    reviewsList.push(review.toJSON());
  })

  let finalReviews = [];
  for (let review of reviewsList){
    const spotId = review.spotId;

    const previewImage = await SpotImage.findOne({
      where: {
        spotId,
        preview: true
      }
    });

    const previewImageUrl = previewImage.toJSON().url;

    let spot = await Spot.findOne({
      where: {
        id: spotId
      }
    });

    const newSpot = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      price: spot.price,
      previewImage: previewImageUrl
    }

    let finalReview = {
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: review.User,
      Spot: newSpot,
      ReviewImages: review.ReviewImages
    }

    finalReviews.push(finalReview);
  }

  res.json({
    Reviews: finalReviews
  });
});

//add-an-image-to-a-review-based-on-the-reviews-id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  let { url } = req.body;

  let reviewId = req.params.reviewId;
  let review = await Review.findByPk(reviewId);

  let currentUserId = req.user.id;

  let reviewImages = await ReviewImage.findAll({
    where: {
      reviewId
    }
  });

  let imageList = [];
  reviewImages.forEach(reviewImage => {
    imageList.push(reviewImage.toJSON());
  })

  if(imageList.length >= 10){
    const err = new Error ("Maximum number of images for this resource was reached");
    res.status(403).json({
      message: err.message
    });
  }

  if (!review) {

    const err = new Error("Review couldn't be found");
    res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== review.toJSON().userId) {

    const err = new Error("Forbidden");
    res.status(403).json({
      message: err.message
    });

  } else {

    const newReviewImage = await ReviewImage.create({
      reviewId,
      url
    });

    let displayedImage = {
      id: newReviewImage.id,
      url: newReviewImage.url
    }

    res.json(displayedImage);
  }
});

module.exports = router;
