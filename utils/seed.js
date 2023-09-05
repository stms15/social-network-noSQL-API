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

  const users = [
    {
      username: 'FirstUser',
      email: 'first@example.ca',
    },
    {
      username: 'ExampleUser',
      email: 'example@gmail.com',
    },
  ];
  const thoughts = [
    {
      thoughtText: 'This is my first thought.',
      username: 'FirstUser',
    },
    {
      thoughtText: 'This is my second thought.',
      username: 'FirstUser',
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

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
