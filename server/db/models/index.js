const User = require('./user');
const Lesson = require('./lesson');
const Category = require('./category');
const Subscription = require('./subscription');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Lesson.belongsTo(User);
User.hasMany(Lesson);

Lesson.belongsToMany(Category, { through: 'categoryLinks' });
Category.belongsToMany(Lesson, { through: 'categoryLinks' });

//this must be aliased since we're already doing one to many association with lessons and users above.
Lesson.belongsToMany(User, { as: 'saved', through: 'favorites' });
User.belongsToMany(Lesson, { as: 'saved', through: 'favorites' });

User.belongsToMany(User, { as: 'subscriber', through: Subscription });
// User.belongsToMany(User, { as: 'subscriber', through: 'subscribers' });
// User.addSubscriber() User.removeSubscriber() to add/remove subscriber on the lesson creator. User.getSubscribers()

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
  Subscription,
};
