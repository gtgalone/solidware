const express = require('express');
const peopleModel = require('../database/model/people.model');

const router = express.Router();

router.get('/', (req, res) => {
  peopleModel.find((err, data) => {
    if (err) {
      return res.status(500).send({ error: 'database failure' });
    }
    return res.json(data);
  });
});

router.get('/:name', (req, res) => {
  const { name } = req.params;
  peopleModel.findOne({ name }, (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'database failure' });
    }
    return res.json(data);
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  peopleModel.create({ name }, (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'database failure' });
    }
    return res.json(data);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  peopleModel.findByIdAndRemove(id, (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'database failure' });
    }
    return res.json(data);
  });
});

module.exports = router;
