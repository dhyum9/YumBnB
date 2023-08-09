'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "apartment-living-room.png"
      },
      {
        reviewId: 2,
        url: "apartment-bathroom.heic"
      },
      {
        reviewId: 3,
        url: "mansion-balcony.jpg"
      },
      {
        reviewId: 4,
        url: "busted-RV-tire.jpg"
      },
      {
        reviewId: 5,
        url: "partner-getting-jumped-outside-RV.jpg"
      },
      {
        reviewId: 6,
        url: "cabin-pre-power-outage.jpg"
      },
      {
        reviewId: 6,
        url: "cabin-post-power-outage.jpg"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
