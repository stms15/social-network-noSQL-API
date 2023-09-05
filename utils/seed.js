const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: 'thoughts' })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db
    .listCollections({ name: 'users' })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const thoughts = [
    {
      thoughtText: 'This is my first thought.',
      username: 'FirstUser',
      reactions: [],
    },
    {
      thoughtText: 'My username is ExampleUser and this is my thought.',
      username: 'ExampleUser',
      reactions: [
        {
          reactionBody: 'Hi ExampleUser, my username is FirstUser.',
          username: 'FirstUser',
        },
      ],
    },
  ];

  // add thoughts first
  await Thought.collection.insertMany(thoughts);

  let thoughtCollection = connection.collection('thoughts').find();
  let thoughtIds = [];
  await thoughtCollection.forEach((el) => {
    thoughtIds.push(el._id.toString());
  });

  // add users with associated thought ids
  const users = [
    {
      username: 'FirstUser',
      email: 'first@example.ca',
      thoughts: [thoughtIds[0]],
    },
    {
      username: 'ExampleUser',
      email: 'example@gmail.com',
      thoughts: [thoughtIds[1]],
    },
  ];
  await User.collection.insertMany(users);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
