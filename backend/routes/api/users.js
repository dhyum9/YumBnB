const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('The provided email is invalid.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required.'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required.'),
  handleValidationErrors
];

// Sign up
router.post(
  '',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    let dupeUserEmail = await User.findOne({
      where: {
        email
      }
    });

    let dupeUserUsername = await User.findOne({
      where: {
        username
      }
    });

    if(dupeUserEmail){

      const err = new Error("User already exists");
      return res.status(500).json({
        message: err.message,
        errors: {
          email: "User with that email already exists."
        }
      });

    } else if (dupeUserUsername) {

      const err = new Error("User already exists");
      return res.status(500).json({
        message: err.message,
        errors: {
          email: "User with that username already exists."
        }
      });

    } else {

      const user = await User.create({ email, username, hashedPassword, firstName, lastName});

      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  }
);

module.exports = router;
