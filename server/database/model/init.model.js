const peopleModel = require('./people.model');

const init = () => peopleModel.create([
  { name: 'Emma' },
  { name: 'Olivia' },
  { name: 'Noah' },
  { name: 'Liam' },
  { name: 'Ava' },
  { name: 'Sophia' },
  { name: 'William' },
  { name: 'Mason' },
  { name: 'James' },
  { name: 'Isabella' },
  { name: 'Benjamin' },
  { name: 'Jacob' },
  { name: 'Ethan' },
  { name: 'Alexander' },
  { name: 'Charlotte' },
  { name: 'Matthew' },
  { name: 'David' },
  { name: 'Joseph' },
]);

module.exports = init;
