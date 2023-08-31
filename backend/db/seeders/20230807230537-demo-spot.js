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
        country: "United States of America",
        lat: 12.0199287,
        lng: -121.1232832,
        name: "Monte Vista Apartment",
        description: "Budget One Bedroom Apartment! Enjoy your stay in this quaint city in one of the best spots in town.",
        price: 90.00
      },
      {
        ownerId: 2,
        address: "1234 Basic Ave",
        city: "San Jose",
        state: "California",
        country: "United States of America",
        lat: 39.1132837,
        lng: 10.9228372,
        name: "Luxury Mansion",
        description: "10 Bedrooms, 8.5 Bathrooms. You won't ever find a place like this.",
        price: 1290.99
      },
      {
        ownerId: 3,
        address: "1234 NW Bobcat Lane",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 32.0192247,
        lng: 164.1238372,
        name: "Trap RV",
        description: "RV in the middle of nowhere. Still cozy if you're stranded and need a budget option!",
        price: 23.01
      },
      {
        ownerId: 4,
        address: "9681 Montclair Dr",
        city: "Highlands Ranch",
        state: "Colorado",
        country: "United States of America",
        lat: -87.0592827,
        lng: -141.1208372,
        name: "Beautiful Log Cabin",
        description: "Three bedrooms, two bathrooms. Enjoy the beautiful views of Colorado in this luxurious stay-in experience.",
        price: 209.50
      },
      {
        ownerId: 1,
        address: "420 Blazin Dr",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: -82.2592227,
        lng: -121.1228372,
        name: "Beach Condo",
        description: "Two bedrooms, one bathroom. Beautiful view by the beach!",
        price: 349.99
      },
      {
        ownerId: 1,
        address: "111 York Ave.",
        city: "Manhattan",
        state: "New York",
        country: "United States of America",
        lat: 27.0592827,
        lng: 23.1208372,
        name: "NY Apartment in the City",
        description: "Enjoy one of the greatest views right in the middle of Manhattan.",
        price: 499.99
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
