const User = require('./user');
const Project = require('./project');
const Category = require('./category');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Project);
Project.belongsTo(User);

Project.belongsToMany(Category, { through: 'categoryLinks' });
Category.belongsToMany(Project, { through: 'categoryLinks' });

Project.belongsToMany(User, { through: 'saved' });
User.belongsToMany(Project, { through: 'saved' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Project,
  Category,
};
