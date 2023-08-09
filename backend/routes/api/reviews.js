const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {requireAuth } = require('../../utils/auth');
const { Review, Spot, Image, User } = require('../../db/models');

const router = express.Router();

//get-all-reviews-of-the-current-user




module.exports = router;
