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



module.exports = router;
