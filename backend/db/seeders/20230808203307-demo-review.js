'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3,
        review: "Comfy and will visit again, great deal!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: "too pricey but beautiful property",
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: "terrible experience, almost got jumped",
        stars: 1
      },
      {
        spotId: 4,
        userId: 2,
        review: "Log Cabin was beautiful, but power outage affected our stay.",
        stars: 3
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {});
  }
};
