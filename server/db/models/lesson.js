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
  editor: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  console: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  // markdown: {
  //   type: Sequelize.TEXT,
  // },
});

module.exports = Lesson;
