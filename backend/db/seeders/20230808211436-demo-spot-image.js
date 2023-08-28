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
        url: "https://photos.zillowstatic.com/fp/017dbf7b708722b80bd6979136010c49-cc_ft_384.webp",
        preview: true
      },
      {
        spotId: 1,
        url: "https://photos.zillowstatic.com/fp/6a62fd0297bb76017f230b06ce128bc5-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "https://photos.zillowstatic.com/fp/73b9e5c07b6d40067ccb7fe24b9af407-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "https://photos.zillowstatic.com/fp/523c0bbf23d03259303e908d10dd0208-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/e998d30a3f1e7c656c1ab9ba0e97cd79-cc_ft_1344.webp",
        preview: true
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/3ab730de13a9661638048ed81b058135-uncropped_scaled_within_1344_1008.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/bf87e753d0a9fb22f25220763d20e541-uncropped_scaled_within_1344_1008.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/673868320635c86968cbbb93500bd449-uncropped_scaled_within_1344_1008.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/532ceb7baffa59505feff0299e798034-uncropped_scaled_within_1344_1008.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/albuquerque/Breaking-Bad-RV-Tours-21-cbb53c305056a36_cbb53d39-5056-a36a-0901a1132764be33.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://virtualbackgrounds.site/wp-content/uploads/2022/03/breaking-bad-rv-interior.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdnb.artstation.com/p/assets/images/images/045/954/561/large/daniel-wogan-breaking-bx-rv-scene-4-v1.jpg?1643928401",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/06cb219fa4c6d253a613c1d5aca365ca-uncropped_scaled_within_1344_1008.webp",
        preview: true
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/854aa23d96828b7c896d71750536f2b6-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/3609a78e2f3de5a4cb83cd9c3f059d74-uncropped_scaled_within_1344_1008.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/0f373439fd38f87ff8d00b69295c6bc4-uncropped_scaled_within_1344_1008.webp",
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
