const express = require('express');

const peopleRouter = require('./people.router');

const router = express.Router();

router.use('/people', peopleRouter);

module.exports = router;
