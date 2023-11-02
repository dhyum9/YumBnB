const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking } = require('../../db/models');

const router = express.Router();

//get-all-of-the-users-current-bookings
router.get('/current', requireAuth, async (req, res, next) => {
  let userId = req.user.id;

  const bookings = await Booking.findAll({
    where: {
      userId
    },
    include: [
      {
        model: Spot,
        attributes:["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
      }
    ]
  });

  let bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })

  let finalBookings = [];
  for (let booking of bookingsList){
    const spotId = booking.spotId;

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

    let spot = await Spot.findOne({
      where: {
        id: spotId
      }
    });

    let owner = await User.findOne({
      where: {
        id: spot.ownerId
      }
    })

    const newSpot = {
      id: spot.id,
      Owner: owner,
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

    let finalBooking = {
      id: booking.id,
      spotId: booking.spotId,
      Spot: newSpot,
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
});

//get-details-of-a-booking-from-an-id
router.get('/:bookingId', async (req, res, next) => {
  let bookingId = req.params.bookingId;

  const booking = await Booking.findOne({
    where: {
      id: bookingId
    }
  });

  if (!booking) {

    const err = new Error("Booking couldn't be found");
    return res.status(404).json({
      message: err.message
    });

  }

  let easyBooking = booking.toJSON();

  res.json(easyBooking);
});

//edit-a-booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  let {startDate, endDate} = req.body;

  const bookingId = parseInt(req.params.bookingId);
  let targetBooking = await Booking.findByPk(bookingId);

  let currentUserId = req.user.id;

  if (!targetBooking) {

    const err = new Error("Booking couldn't be found");
    return res.status(404).json({
      message: err.message
    });

  } else if (currentUserId !== targetBooking.toJSON().userId) {

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
        endDate: 'Checkout date cannot be on or before Check-In date.'
      }
    });
  }

  const spotId = targetBooking.toJSON().spotId;

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

    if(booking.id === bookingId) continue;

    let existingStartDate = new Date (booking.startDate);
    let finalExistingStartDate = existingStartDate.getTime();

    let existingEndDate = new Date (booking.endDate);
    let finalExistingEndDate = existingEndDate.getTime();

    if (finalStartDate >= finalExistingStartDate && finalStartDate <= finalExistingEndDate){
      const err = new Error('Sorry, this spot is already booked for the specified dates');
      return res.status(403).json({
        message: err.message,
        errors: {
          startDate: 'Start date conflicts with an existing booking'
        }
      });
    }
    if (finalEndDate >= finalExistingStartDate && finalEndDate <= finalExistingEndDate){
      const err = new Error('Sorry, this spot is already booked for the specified dates');
      return res.status(403).json({
        message: err.message,
        errors: {
          startDate: 'End date conflicts with an existing booking'
        }
      });
    }
  };

  let nowDate = new Date();
  let finalNowDate = nowDate.getTime();
  let targetBookingEndDate = new Date (targetBooking.endDate);
  let finalTargetBookingEndDate = targetBookingEndDate.getTime();

  if (finalNowDate >= finalTargetBookingEndDate){
    const err = new Error("Past bookings can't be modified");
    return res.status(403).json({
      message: err.message
    });
  }

  targetBooking.startDate = startDate;
  targetBooking.endDate = endDate;

  await targetBooking.save();

  res.json(targetBooking);
});

//delete-a-booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  let bookingId = req.params.bookingId;
  let targetBooking = await Booking.findByPk(bookingId);

  let currentUserId = req.user.id;

  if (!targetBooking){

    const err = new Error("Booking couldn't be found");
    return res.status(404).json({
      message: err.message
    });

  }

  let spotId = targetBooking.toJSON().spotId;

  let targetSpot = await Spot.findOne({
    where: {
      id: spotId
    }
  });

  if (currentUserId !== targetBooking.userId && currentUserId !== targetSpot.ownerId){

    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message
    });

  }

  let nowDate = new Date();
  let finalNowDate = nowDate.getTime();
  let targetStartDate = new Date (targetBooking.toJSON().startDate);
  let finalTargetStartDate= targetStartDate.getTime();

  if (finalNowDate >= finalTargetStartDate){
    const err = new Error("Bookings that have been started can't be deleted");
    return res.status(403).json({
      message: err.message
    });
  }

    await targetBooking.destroy();

    res.json({
      message: "Successfully deleted"
    });
  });


module.exports = router;
