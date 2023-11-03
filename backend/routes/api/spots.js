const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

const validateQuery = [
  check('page')
    .optional()
    .isInt({min: 1})
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({min: 1})
    .withMessage('Size must be greater than or equal to 1'),
  check('maxLat')
    .optional()
    .isFloat({min: -90, max: 90})
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .optional()
    .isFloat({min: -90, max: 90})
    .withMessage('Minimum latitude is invalid'),
  check('maxLng')
    .optional()
    .isFloat({min: -180, max: 180})
    .withMessage('Maximum longitude is invalid'),
  check('minLng')
    .optional()
    .isFloat({min: -180, max: 180})
    .withMessage('Minimum longitude is invalid'),
  check('minPrice')
    .optional()
    .isInt({min: 0})
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isInt({min: 0})
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
];

//get-all-spots
router.get('/', validateQuery, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  if (!page) page = 1;
  if (!size) size = 20;

  if (page >= 10) page = 10;
  if (size >= 20) size = 20;

  page = parseInt(page);
  size = parseInt(size);

  let pagination = {};

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  let where = {};

  if (minLat){
    where.lat = {
      [Op.gte]: minLat
    }
  }

  if(maxLat){
    where.lat = {
      [Op.lte]: maxLat
    }
  }

  if(minLng){
    where.lng = {
      [Op.gte]: minLng
    }
  }

  if(maxLng){
    where.lng = {
      [Op.lte]: maxLng
    }
  }

  if(minPrice){
    where.price = {
      [Op.gte]: minPrice
    }
  }

  if(maxPrice){
    where.price = {
      [Op.lte]: maxPrice
    }
  }

  let spots = await Spot.findAll({
    where,
    ...pagination
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

    let previewImageUrl = null;

    if(previewImage){
      previewImageUrl = previewImage.toJSON().url;
    }

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
    Spots: finalSpots,
    page: page,
    size: size
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

    let previewImageUrl = null;

    if(previewImage){
      previewImageUrl = previewImage.toJSON().url;
    }

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
    return res.status(404).json({
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
    .withMessage('Street address is required.'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required.'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required.'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Country is required.'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude is not valid.'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude is not valid.'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name is required.'),
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters.'),
  check('description')
    .isLength({ min: 30 })
    .withMessage('Description needs a minimum of 30 characters.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required.'),
    check('previewImageUrl')
      .custom(value =>
        (value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".jpeg")))
      .withMessage('Image URL must end in .png, .jpg, or .jpeg'),
  check('previewImageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Preview Image is required.'),
  check('imageUrl2')
    .optional({ checkFalsy: true })
    .custom(value =>
      (value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".jpeg")))
    .withMessage('Image URL must end in .png, .jpg, or .jpeg'),
  check('imageUrl3')
    .optional({ checkFalsy: true })
    .custom(value =>
      (value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".jpeg")))
    .withMessage('Image URL must end in .png, .jpg, or .jpeg'),
  check('imageUrl4')
    .optional({ checkFalsy: true })
    .custom(value =>
      (value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".jpeg")))
    .withMessage('Image URL must end in .png, .jpg, or .jpeg'),
  check('imageUrl5')
    .optional({ checkFalsy: true })
    .custom(value =>
      (value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".jpeg")))
    .withMessage('Image URL must end in .png, .jpg, or .jpeg'),
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
    return res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    return res.status(403).json({
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
    return res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    return res.status(403).json({
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
    return res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    return res.status(403).json({
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
    return res.status(404).json({
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
    return res.status(404).json({
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

//get-all-bookings-for-a-spot-based-on-the-spots-id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const currentUserId = req.user.id;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  let bookings = await Booking.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  let bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    return res.status(404).json({
      message: err.message
    });
  }

  if (spot.toJSON().ownerId === currentUserId){

    let finalBookings = [];

    for (let booking of bookingsList){
      let finalBooking = {
        User: booking.User,
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }
      finalBookings.push(finalBooking);
    }

    res.json({
      Bookings: finalBookings
    });

  } else {

    let finalBookings = [];

    for (let booking of bookingsList){
      let finalBooking = {
        id: booking.id,
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate
      }
      finalBookings.push(finalBooking);
    }

    res.json({
      Bookings: finalBookings
    });
  }
});

//create-a-booking-from-a-spot-based-on-the-spots-id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  let {startDate, endDate} = req.body;

  const spotId = parseInt(req.params.spotId);
  const spot = await Spot.findByPk(spotId);

  let currentUserId = req.user.id;

  if (!spot) {

    const err = new Error("Spot couldn't be found");
    return res.status(404).json({
      message: err.message
    });

  } else if (currentUserId === spot.toJSON().ownerId) {

    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message
    });
  }

  let newStartDate = new Date (startDate);
  let finalStartDate = newStartDate.getTime();

  let newEndDate = new Date (endDate);
  let finalEndDate = newEndDate.getTime();

  if ((finalEndDate - finalStartDate) < 86400000) {
    const err = new Error('Bad Request');
    return res.status(400).json({
      message: err.message,
      errors: {
        endDate: 'endDate cannot be on or before startDate'
      }
    });
  }

  const bookings = await Booking.findAll({
    where:{
      spotId
    }
  });

  let bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })

  for (let booking of bookingsList){
    let existingStartDate = new Date (booking.startDate);
    let finalExistingStartDate = existingStartDate.getTime();

    let existingEndEvent = new Date (booking.endDate);
    let finalExistingEndDate = existingEndEvent.getTime();

    if (finalStartDate >= finalExistingStartDate && finalStartDate <= finalExistingEndDate){
      const err = new Error('Sorry, this spot is already booked for the specified dates');
      return res.status(403).json({
        message: err.message,
        errors: {
          startDate: 'Start date conflicts with an existing booking'
        }
      });
    }
    if (finalEndDate >= finalExistingStartDate){
      const err = new Error('Sorry, this spot is already booked for the specified dates');
      return res.status(403).json({
        message: err.message,
        errors: {
          startDate: 'End date conflicts with an existing booking'
        }
      });
    }
  };

  const newBooking = await Booking.create({
    spotId,
    userId: currentUserId,
    startDate,
    endDate
  });

  res.json(newBooking);
});


module.exports = router;
