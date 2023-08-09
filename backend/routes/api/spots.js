const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');

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
      state: spot.state,
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
      state: spot.state,
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
    res.status(404).json({
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

const validateCreateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude is not valid'),
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

//create-a-spot
router.post('/', requireAuth, validateCreateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  const finalSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  return res.status(201).json(finalSpot);
});

//add-an-image-to-a-spot-based-on-the-spots-id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  let { url, preview } = req.body;

  let spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId);

  let currentUserId = req.user.id;

  if (!spot) {

    const err = new Error("Spot couldn't be found");
    res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    res.status(403).json({
      message: err.message
    });

  } else {

    const newImage = await SpotImage.create({
      spotId,
      url,
      preview
    });

    let finalImage = {
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    }

    res.json(finalImage);
  }
});

//edit-a-spot
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res, next) => {
  let spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId);
  let { address, city, state, country, lat, lng, name, description, price } = req.body;

  let currentUserId = req.user.id;

  if (!spot) {

    const err = new Error("Spot couldn't be found");
    res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    res.status(403).json({
      message: err.message
    });

  } else {

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    res.json(spot);
  }
});

//delete-a-spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  let spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId);

  let currentUserId = req.user.id;

  if (!spot) {

    const err = new Error("Spot couldn't be found");
    res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    res.status(403).json({
      message: err.message
    });

  } else {

    await spot.destroy();

    res.json({
      message: "Successfully deleted"
    });
  }
});

//get-all-reviews-by-a-spots-id
router.get('/:spotId/reviews', async (req, res, next) => {
  let spotId = req.params.spotId;

  let spot = await Spot.findOne({
    where: {
      id: spotId
    }
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404).json({
      message: err.message
    });
  }

  const reviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"]
      }
    ]
  });

  let reviewsList = [];
  reviews.forEach(review => {
    reviewsList.push(review.toJSON());
  });

  res.json({
    Reviews: reviews
  });
});

const validateCreateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//create-a-review-for-a-spot-based-on-the-spots-id
router.post('/:spotId/reviews', requireAuth, validateCreateReview, async (req, res, next) => {
  const { review, stars } = req.body;
  const userId = req.user.id;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    res.status(404).json({
      message: err.message
    });
  }

  const dupeReview = await Review.findOne({
    where: {
      spotId,
      userId
    }
  });

  if (dupeReview) {

    const err = new Error("User already has a review for this spot");
    return res.status(500).json({
      message: err.message
    });

  } else {

    const newReview = await Review.create({
      userId,
      spotId: parseInt(spotId),
      review,
      stars
    });

    res.status(201).json(newReview);
  }
});

module.exports = router;
