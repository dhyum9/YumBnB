'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-08-22",
        endDate: "2023-08-24"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2023-08-23",
        endDate: "2023-08-27"
      },
      {
        spotId: 3,
        userId: 4,
        startDate: "2023-12-01",
        endDate: "2023-12-03"
      },
      {
        spotId: 4,
        userId: 3,
        startDate: "2023-10-17",
        endDate: "2023-10-19"
      },
      {
        spotId: 4,
        userId: 1,
        startDate: "2023-10-20",
        endDate: "2023-10-21"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
