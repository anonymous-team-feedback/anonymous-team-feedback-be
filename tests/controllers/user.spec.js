const user = require('../../controllers/user');
const mongoose = require('mongoose');
let testUserId = '';

beforeAll(async () => {
  const url =  process.env.MONGODB_URI || "mongodb://localhost/anonteamfeedback";
  await mongoose.connect(url, { useNewUrlParser: true });

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  const createdUser = await user.createUser({
        firstName: 'test_user',
        lastName: 'test',
        email: 'test@gmail.com',
        password: 'abcou'
  });
  if (createdUser._id)
    testUserId = createdUser._id;
});

describe('User controller', () => {
  it ('shall create a user', () => {

  })

  it ('shall find the user by email', async () => {
    const foundUser = await user.findUserByEmail('test@gmail.com');

    expect(foundUser.firstName).toBe('test_user');
  });

  it ('shall delete a user', () => {

  });

  it ('shall update a user', () => {

  })
});

afterAll(async () => {
  user.deleteUser(testUserId);
});
