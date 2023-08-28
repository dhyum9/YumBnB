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
        url: "https://metrodom.hu/uploads/images/Madar%C3%A1sz38/Mintalak%C3%A1s/MWP_0084.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://ktla.com/wp-content/uploads/sites/4/2023/03/GettyImages-506903162.jpg?strip=1",
        preview: true
      },
      {
        spotId: 2,
        url: "huge-mansion-backyard.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/albuquerque/Breaking-Bad-RV-Tours-21-cbb53c305056a36_cbb53d39-5056-a36a-0901a1132764be33.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://gallery.streamlinevrs.com/locations-images/image_48245.jpeg",
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
