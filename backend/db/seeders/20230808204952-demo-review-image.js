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
        url: "mansion-exterior.heic"
      },
      {
        reviewId: 3,
        url: "inside-of-RV.jpg"
      },
      {
        reviewId: 4,
        url: "cabin-pre-power-outage.jpg"
      },
      {
        reviewId: 4,
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
