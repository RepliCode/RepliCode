const router = require('express').Router();
const runCodeSnippet = require('../Docker/runCodeSnippet');

router.post('/', async (req, res, next) => {
  try {
    const evaluation = await runCodeSnippet(req.body.code);
    res.json(evaluation);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
