const router = require('express').Router();
const runCodeSnippet = require('../Docker/runCodeSnippet');

router.post('/', async (req, res, next) => {
  try {
    const evaluation = await runCodeSnippet(req.body);
    res.send(evaluation);
  } catch (err) {
    next(err);
  }
});
