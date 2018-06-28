const router = require('express').Router();
const { User, Lesson } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/:userId', (req, res, next) => {
  console.log('SESH', req.session);
  console.log('USE ME', req.user);
  res.send('Hello!');
});
