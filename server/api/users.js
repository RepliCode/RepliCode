const router = require('express').Router();
const { User, Lesson, Subscription } = require('../db/models');

module.exports = router;

// GET route for '/api/users/'
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      include: [{ model: Lesson }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST route for '/api/users/:userId'

router.post('/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (userId === Number(req.user.id)) {
      const user = await User.findById(userId);
      const lesson = await Lesson.create({
        audioURL: req.body.audioURL,
        title: req.body.title,
        description: req.body.description,
        editor: req.body.editor,
        console: req.body.console,
        userId: user.id,
      });
      res.status(201).send(lesson);
    }
  } catch (err) {
    next(err);
  }
});

// GET route for '/api/users/:userId/subscriptions'
router.get('/:userId/subscriptions', async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log('usrid', userId);
    let subscriptionsArray = await Subscription.findAll({
      where: {
        subscriberId: Number(userId),
      },
    });
    subscriptionsArray = subscriptionsArray.map(subscription => {
      return User.findOne({
        where: {
          id: subscription.userId,
        },
        include: [{ model: Lesson }],
      });
    });
    let subscriptionsAndLessons = await Promise.all(subscriptionsArray);
    res.json(subscriptionsAndLessons);
  } catch (err) {
    next(err);
  }
});

//PUT route for '/api/users/:userId/subscriptions'

router.put('/:userId/subscriptions', async (req, res, next) => {
  try {
    let { userId } = req.params;
    let user = await User.findOne({
      where: {
        id: Number(userId),
      },
      attributes: ['id', 'email'],
      include: [{ model: Lesson }],
    });
    // let subscriberId = Number(req.user.id);
    //this will need ot be updated to req.user.id;
    await user.addSubscriber(req.body.user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//DELETE route for '/api/users/:userId/subscriptions'

router.delete('/:userId/subscriptions', async (req, res, next) => {
  try {
    let { userId } = req.params;
    let user = await User.findOne({
      where: {
        id: Number(userId),
      },
      attributes: ['id', 'email'],
      include: [{ model: Lesson }],
    });
    // let subscriberId = Number(req.user.id);
    //this will need ot be updated to req.user.id;
    await user.unSubscriber(req.body.user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
