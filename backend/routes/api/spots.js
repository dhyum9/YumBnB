const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking } = require('../../db/models');

const router = express.Router();

//get-all-spots
router.get('/', async (req, res) => {
  let spots = await Spot.findAll();

  let spotsList = [];
  spots.forEach(spot => {
    spotsList.push(spot.toJSON());
  });

  let finalSpots = [];
  for (let spot of spotsList) {
    const spotId = spot.id;

    const previewImage = await SpotImage.findOne({
      where: {
        spotId,
        preview: true
      }
    });

    const previewImageUrl = previewImage.toJSON().url;

    let sumStars = 0;

    const reviews = await Review.findAll({
      where: {
        spotId
      }
    });

    let reviewsList = [];
    reviews.forEach(review => {
      reviewsList.push(review.toJSON());
    })

    for (let review of reviewsList) {
      let reviewStars = review.stars;
      sumStars += reviewStars;
    }

    let avgRating = sumStars / reviewsList.length;

    let finalSpot = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating,
      previewImage: previewImageUrl
    }

    finalSpots.push(finalSpot);
  };

  res.json({
    Spots: finalSpots
  });
});

//get-all-spots-of-current-user
router.get('/current', requireAuth, async (req, res) => {
  let ownerId = req.user.id;

  let spots = await Spot.findAll({
    where: {
      ownerId
    }
  });

  let spotsList = [];
  spots.forEach(spot => {
    spotsList.push(spot.toJSON());
  });

  let finalSpots = [];
  for (let spot of spotsList) {
    const spotId = spot.id;

    const previewImage = await SpotImage.findOne({
      where: {
        spotId,
        preview: true
      }
    });

    const previewImageUrl = previewImage.toJSON().url;

    let sumStars = 0;

    const reviews = await Review.findAll({
      where: {
        spotId
      }
    });

    let reviewsList = [];
    reviews.forEach(spotReview => {
      reviewsList.push(spotReview.toJSON());
    })

    for (let review of reviewsList) {
      let reviewStars = review.stars;
      sumStars += reviewStars;
    }

    let avgRating = sumStars / reviewsList.length;

    let finalSpot = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating,
      previewImage: previewImageUrl
    }

    finalSpots.push(finalSpot);
  };

  res.json({
    Spots: finalSpots
  });
});

//get-details-of-a-spot-from-an-id
router.get('/:spotId', async (req, res, next) => {
  let spotId = req.params.spotId;

  const spot = await Spot.findOne({
    where: {
      id: spotId
    },
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"]
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"]
      }
    ]
  });

  if (!spot) {

    const err = new Error("Spot couldn't be found");
    res.status(404).json;
    res.json({
      message: err.message
    });
  }

  let easySpot = spot.toJSON();

  let sumStars = 0;

  const reviews = await Review.findAll({
    where: {
      spotId
    }
  });

  let reviewsList = [];
  reviews.forEach(review => {
    reviewsList.push(review.toJSON());
  })

  for (let review of reviewsList) {
    let reviewStars = review.stars;
    sumStars += reviewStars;
  }

  let avgRating = sumStars / reviewsList.length;

  let newSpot = {
    id: easySpot.id,
    ownerId: easySpot.ownerId,
    address: easySpot.address,
    city: easySpot.city,
    state: easySpot.state,
    country: easySpot.country,
    lat: easySpot.lat,
    lng: easySpot.lng,
    name: easySpot.name,
    description: easySpot.description,
    price: easySpot.price,
    createdAt: easySpot.createdAt,
    updatedAt: easySpot.updatedAt,
    numReviews: reviewsList.length,
    avgStarRating: avgRating,
    SpotImages: easySpot.SpotImages,
    Owner: easySpot.User
  }

  res.json(newSpot);
});







module.exports = router;
