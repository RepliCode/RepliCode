const router = require('express').Router();
const runCodeSnippet = require('../Docker/runCodeSnippet');

router.post('/', async (req, res, next) => {
  const name = `someSalt_${Date.now()}`;
  try {
    const evaluation = await runCodeSnippet(req.body.code, name);
    res.json(evaluation);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
