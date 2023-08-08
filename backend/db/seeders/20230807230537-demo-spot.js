'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "711 E Mineral Ave",
        city: "Littleton",
        state: "Colorado",
        country: "United States Of America",
        lat: 12.0199287,
        lng: -121.1232832,
        name: "Monte Vista Apartment",
        description: "Budget One Bedroom Apartment",
        price: 90.00
      },
      {
        ownerId: 2,
        address: "1234 Basic Ave",
        city: "San Jose",
        state: "California",
        country: "United States Of America",
        lat: 39.1132837,
        lng: 10.9228372,
        name: "Luxury Mansion",
        description: "10 Bedrooms, 8.5 Bathrooms",
        price: 1290.99
      },
      {
        ownerId: 3,
        address: "1234 NW Bobcat Lane",
        city: "Houston",
        state: "Texas",
        country: "United States Of America",
        lat: 32.0192247,
        lng: 164.1238372,
        name: "Trap RV",
        description: "RV in the middle of nowhere",
        price: 23.01
      },
      {
        ownerId: 4,
        address: "9681 Montclair Dr",
        city: "Highlands Ranch",
        state: "Colorado",
        country: "United States Of America",
        lat: -87.0592827,
        lng: -141.1208372,
        name: "Beautiful Log Cabin",
        description: "Three bedrooms, two bathrooms",
        price: 209.50
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['Monte Vista Apartment', 'Luxury Mansion', 'Trap RV', 'Beautiful Log Cabin']
      }
    }, {});
  }
};
