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
        firstName: 'Danny',
        lastName: 'Yum',
        username: 'dhyum9',
        email: 'dhyum9@gmail.com',
        hashedPassword: bcrypt.hashSync('Dy5229894676')
      },
      {
        firstName: 'Kyung',
        lastName: 'Yum',
        username: 'kyum272099',
        email: 'kyum272099@aol.com',
        hashedPassword: bcrypt.hashSync('xxxx0831')
      },
      {
        firstName: 'Peter',
        lastName: 'Parker',
        username: 'spidey',
        email: 'spiderman@gmail.com',
        hashedPassword: bcrypt.hashSync('notpeterparker')
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
