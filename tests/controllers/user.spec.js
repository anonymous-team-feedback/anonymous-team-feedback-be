const user = require('../../controllers/user');
const mongoose = require('mongoose');
let testUserId = '';

beforeAll(async () => {
  const url =  process.env.MONGODB_URI || "mongodb://localhost/anonteamfeedback";
  await mongoose.connect(url, { useNewUrlParser: true });

  mongoose.set('useFindAndModify', false);
  mongoose.set('createIndexs', true);

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
  it ('shall create a user', async () => {
    const testUser = await user.findUserByEmail('test@gmail.com');

    expect(testUser.firstName).toBe('test_user');
    expect(testUser.lastName).toBe('test');
    expect(testUser.email).toBe('test@gmail.com');
  });

  it ('shall find the user by email', async () => {
    const foundUser = await user.findUserByEmail('test@gmail.com');

    expect(foundUser.firstName).toBe('test_user');
    expect(foundUser.lastName).toBe('test');
  });

  it ('shall delete a user', async () => {
    const dummyUser = await user.createUser({
      firstName: 'dummy user',
      lastName: 'dummy last name',
      email: 'dummy@gmail.com',
      password: 'otnuh'
    });

    await user.deleteUser(dummyUser._id);
    expect(await user.findUserByEmail('dummy@gmail.com')).toBe(null);
  });

  it ('shall update a user', async () => {
    await user.findUserAndUpdate(testUserId, {
      lastName: 'test_lastName'
    });

    const userTest = await user.findUserByEmail('test@gmail.com');
    expect(userTest.lastName).toBe('test_lastName');
  });
});

afterAll(async () => {
  user.deleteUser(testUserId);
});
