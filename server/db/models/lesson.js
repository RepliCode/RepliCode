const Sequelize = require('sequelize');
const db = require('../db');

const Lesson = db.define('lesson', {
  audioURL: {
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

module.exports = Lesson;
