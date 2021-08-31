const Sequelize = require('sequelize');
const db = require('../db');

const UserGroup = db.define('userGroup', {
  group: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: true,
  },
});

module.exports = UserGroup;
