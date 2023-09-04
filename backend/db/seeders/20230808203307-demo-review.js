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
        spotId: 1,
        userId: 4,
        review: "Been to better but overall good stay.",
        stars: 4
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
        spotId: 3,
        userId: 2,
        review: "partner almost got jumped but RV had a lot of gas",
        stars: 2
      },
      {
        spotId: 4,
        userId: 2,
        review: "Log Cabin was beautiful, but power outage affected our stay.",
        stars: 3
      },
      {
        spotId: 7,
        userId: 1,
        review: "Very cool house! Lot’s to do with the bowling and all of the games. HUGE tv and poolside tv. Had some small issues getting some things working right, but they responded promptly to the main issues that came up. Pool and spa were clean and worked great. Highly recommend for large groups/families!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 3,
        review: "This house was huge. Games and amenities to keep the kids busy. Huge kitchen. Lots of space in every room. Even have to have the maximum amount of people to WILL NOT BE CLUTTERED!",
        stars: 4
      },
      {
        spotId: 7,
        userId: 4,
        review: "This was a really fun stay! Our girls loved the bowling alley and the arcade so much. And the pool was great too! FYI you can pay an extra small fee to have the pool heated if that's necessary.",
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: "What a beautiful and magical place to stay. Feels like you own a canyon or you're truly part of this huge space. The night brings amazing stars and the day is just so beautiful and peaceful. Definitely a special place and the home has everything you need! The HomePod was so fun to use - first time!! Between the home itself and the environment, this place was amazing to do a solo trip. The drive into it and out is something I still miss!!!",
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: "One of the most unique and beautiful Airbnb I've stayed in! Wow!",
        stars: 5
      },
      {
        spotId: 8,
        userId: 4,
        review: "Do NOT book your reservation here. The owner refused to answer any of my phone call and texts upon arrivals. No contact, just took my money and left. Take your time and energy elsewhere.",
        stars: 1
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
