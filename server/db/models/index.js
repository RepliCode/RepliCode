const User = require('./user');
const Lesson = require('./lesson');
const Category = require('./category');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Lesson);
Lesson.belongsTo(User);

Lesson.belongsToMany(Category, { through: 'categoryLinks' });
Category.belongsToMany(Lesson, { through: 'categoryLinks' });

Lesson.belongsToMany(User, { through: 'saved' });
User.belongsToMany(Lesson, { through: 'saved' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Lesson,
  Category,
};
