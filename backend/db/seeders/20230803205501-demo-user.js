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
        hashedPassword: bcrypt.hashSync('dannypassword')
      },
      {
        firstName: 'Abi',
        lastName: 'Virag',
        username: 'abivirag123',
        email: 'aevpaws@gmail.com',
        hashedPassword: bcrypt.hashSync('iLovePippin')
      },
      {
        firstName: 'Phil',
        lastName: 'Parker',
        username: 'spidey',
        email: 'spiderman@gmail.com',
        hashedPassword: bcrypt.hashSync('notpeterparkerlmao')
      },
      {
        firstName: 'Clark',
        lastName: 'Brown',
        username: 'NotSuperman',
        email: 'superman@gmail.com',
        hashedPassword: bcrypt.hashSync('notclarkkentlmao')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        email: 'demo@userio.com',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['dhyum9', 'abivirag123', 'spidey', 'NotSuperman'] }
    }, {});
  }
};
