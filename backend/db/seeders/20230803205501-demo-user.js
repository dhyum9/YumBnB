'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'dhyum9@gmail.com',
        username: 'dhyum9',
        hashedPassword: bcrypt.hashSync('Dy5229894676')
      },
      {
        email: 'kyum272099@aol.com',
        username: 'kyum272099',
        hashedPassword: bcrypt.hashSync('xxxx0831')
      },
      {
        email: 'richstud@gmail.com',
        username: 'richstud',
        hashedPassword: bcrypt.hashSync('iamrich')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['dhyum9', 'kyum272099', 'richstud'] }
    }, {});
  }
};
