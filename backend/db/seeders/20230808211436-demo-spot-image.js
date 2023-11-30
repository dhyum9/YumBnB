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
        url: "https://a0.muscache.com/im/pictures/5ba5c350-2b81-423d-aeba-4bd705f71177.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/f2a9d6ad-41f5-465c-836e-0c567b949fdc.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/cf2978df-bf58-4d08-b6b3-aa60b369c127.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/8d115e3d-799a-4bdd-aad7-f0beafef2b1a.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/b478fd54-c617-4feb-a627-3b28f7fdab1a.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/2bfa9fd4-08cc-4014-b7ec-898f80a24525.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/2ba6b606-5455-4cb6-979b-bfe52f305fc9.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/fc13ece6-aa87-488e-9571-79f27d1c0095.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/a38377fd-b3f0-4142-8876-ed87b82b6732.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/7b44dbb8-6300-411f-9865-787c7a5a3b6e.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686839643401226468/original/670c9db8-5967-4ff5-a2e2-aa9f1d2285b9.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686839643401226468/original/9398684c-3ca0-4736-ad11-87e3f5a73fd4.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686839643401226468/original/197df604-1f53-49c6-9a84-ddcf1f3417c3.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686839643401226468/original/ce61efaf-419b-4048-a2c0-e6e02ea479f4.jpeg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686839643401226468/original/e808cd72-73b5-49af-8a87-f97d57694c6a.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/2fa21497-e636-47f7-9b07-b11b4360c224.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/4297aca2-c6f5-4149-a8ed-159c743e9813.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-12592591/original/464878c5-9bf9-498e-8f94-2a7395d2558e.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/ea3e2e59-0f68-48a3-8b4c-e8ceba812ab4.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/bfeba333-1926-417d-bc81-f5837e808142.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-922706446618287469/original/9e379a83-64f6-4d6f-abad-c39570583ba7.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/c1a75ad8-7376-4bb0-b853-28555eefd6d1.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-922706446618287469/original/da9f9d1f-cde5-4f5d-9b49-50923697f7d4.jpeg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/cdd7ec27-6124-4049-9866-c58e5a3c31cd.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-922706446618287469/original/363ee678-12d5-44b1-99dc-c6f2d48e0fff.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-934905666925500794/original/d4c6f269-db5b-4aca-a4e1-38d215904523.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45688889/original/7116eef5-f35f-4237-9f2a-6903e58b293c.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45688889/original/f9f0af2f-0e38-4e82-ae1d-3f0f013d68cb.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45688889/original/edcdcaf6-b807-4c24-831b-d63b1f7dc870.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45688889/original/9a5ca54c-58b3-4440-b3e9-30550b755317.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-625432683746603216/original/4acea8e3-1927-4aa6-8cd5-5fdec9182e67.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-625432683746603216/original/51298636-5bd8-4fb4-825f-58d788d32b40.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-625432683746603216/original/386503f4-8585-45a1-ace4-aa9acc9b9c7b.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-625432683746603216/original/8604e4f5-541b-4d68-bdf4-60d3a140c31d.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url:"https://a0.muscache.com/im/pictures/miso/Hosting-625432683746603216/original/868b0ca8-4340-4bd8-b0f2-0bedc0752285.jpeg",
        preview: false
      },
      {
        spotId: 8,
        url:"https://a0.muscache.com/im/pictures/02a6b6df-bb89-4721-ba7f-c703d94a99d4.jpg",
        preview: true
      },
      {
        spotId: 8,
        url:"https://a0.muscache.com/im/pictures/794e91e5-32f5-4605-932f-0622d65c0cda.jpg",
        preview: false
      },
      {
        spotId: 8,
        url:"https://a0.muscache.com/im/pictures/802bc522-f1ee-414d-b224-d8fccf45dd87.jpg",
        preview: false
      },
      {
        spotId: 8,
        url:"https://a0.muscache.com/im/pictures/9e30417a-672e-4fd2-8510-d64a5a081bc6.jpg",
        preview: false
      },
      {
        spotId: 8,
        url:"https://a0.muscache.com/im/pictures/4e989c54-4927-497b-a25b-9dfd365a9d18.jpg",
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
