const { googleMapsAPIKey } = require('../../config');
const router = require('express').Router();

router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey });
});

module.exports = router;
