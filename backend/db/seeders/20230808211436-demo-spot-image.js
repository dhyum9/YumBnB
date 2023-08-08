'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "modest-apartment-outside.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "huge-mansion-entrance.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "huge-mansion-backyard.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "crappy-RV.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "log-cabin-outside.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "log-cabin-kitchen.jpg",
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      preview: {
        [Op.in]: [true, false]
      }
    }, {});
  }
};
