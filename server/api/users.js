const router = require('express').Router();
const { User, Lesson } = require('../db/models');

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

//PUT route for '/api/users/:userId/subscriptions'

router.put('/:userId/subscriptions', async (req, res, next) => {
  try {
    let { userId } = req.params;
    console.log('dog');
  } catch (err) {
    next(err);
  }
});
