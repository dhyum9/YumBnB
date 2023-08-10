const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

//delete-a-spot-image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  let imageId = req.params.imageId;
  let spotImage = await SpotImage.findByPk(imageId);

  if (!spotImage){

    const err = new Error("Spot Image couldn't be found");
    return res.status(404).json({
      message: err.message
    });

  }

  let spotId = spotImage.toJSON().spotId;
  let spot = await Spot.findByPk(spotId);
  let ownerId = spot.toJSON().ownerId;

  let currentUserId = req.user.id;

  if (currentUserId !== ownerId){

    const err = new Error("Forbidden");
    return res.status(403).json({
      message: err.message
    });

  } else {

    await spotImage.destroy();

    res.json({
      message: "Successfully deleted"
    });
  }
});

module.exports = router;
