const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
  audio: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  code: {
    type: Sequelize.JSON,
    allowNull: false,
  },
});

module.exports = Project;
