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





module.exports = router;
