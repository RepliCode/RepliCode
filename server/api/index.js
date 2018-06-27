const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/aws', require('./aws'));
router.use('/sandBox', require('./sandBox'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
