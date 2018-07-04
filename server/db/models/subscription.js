const Sequelize = require('sequelize');
const db = require('../db');

const Subscription = db.define('subscription', {});

module.exports = Subscription;
