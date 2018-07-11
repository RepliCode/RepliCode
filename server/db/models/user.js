//const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  githubId: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('githubId');
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('name');
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    get() {
      return () => this.getDataValue('email');
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://secure.gravatar.com/avatar/90001b4c55a7e19f7a9486823c9e09b4?s=680&d=mm&r=g',
    vaildate: {
      isUrl: true,
    },
  },
  bio: {
    type: Sequelize.TEXT,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    get() {
      return () => this.getDataValue('isAdmin');
    },
  },

  // salt: {
  //   type: Sequelize.STRING,
  //   // Making `.salt` act like a function hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('salt')
  //   }
  // }
});

module.exports = User;

User.sync({ force: true }).then(() => console.log('done'));

/**
 * instanceMethods
 */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password();
// };

//copy for demo
User.prototype.correctPassword = function(candidatePwd) {
  return this.password() === candidatePwd;
  // User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
// User.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64');
// };

// User.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex');
// };

/**
 * hooks
 */
// const setSaltAndPassword = user => {
//   if (user.changed('password')) {
//     user.salt = User.generateSalt();
//     user.password = User.encryptPassword(user.password(), user.salt());
//   }
// };

// User.beforeCreate(setSaltAndPassword);
// User.beforeUpdate(setSaltAndPassword);
