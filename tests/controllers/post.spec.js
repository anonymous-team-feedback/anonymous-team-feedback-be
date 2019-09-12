const post = require("../../controllers/posts");
const user = require("../../controllers/user");
const mongoose = require("mongoose");
let testUserId;
let colleagueUserId;

beforeAll(async () => {
  const url =  process.env.MONGODB_TEST_URI || "mongodb://localhost/anonteamfeedback-test";
  await mongoose.connect(url, { useNewUrlParser: true });

  mongoose.set('useFindAndModify', false);
  mongoose.set('createIndexs', true);

  const createdUser = await user.createUser({
        firstName: 'test_user',
        lastName: 'test',
        email: 'test@gmail.com',
        password: 'abcou'
  });

  const colleagueUser = await user.createUser({
    firstName: 'test_user2',
    lastName: 'test',
    email: 'test2@gmail.com',
    password: 'ohtnuou'
  });

  if (createdUser._id)
    testUserId = createdUser._id;

  if (colleagueUser._id)
    colleagueUserId = colleagueUser._id;
});

describe('Posts controller', () =>  {
  it ("Shall create a post", async () => {
    const dummyPost = {
      date: Date.now(),
      post: "Test post",
      poster: testUserId,
      colleague: colleagueUserId
    };

    const createdPost = await post.createPost(dummyPost);
    expect(createdPost.date).toBe(`${dummyPost.date}`);
    expect(createdPost.post).toBe(dummyPost.post);
    expect(createdPost.poster).toBe(dummyPost.poster);
    expect(createdPost.colleague).toBe(dummyPost.colleague);
  });

  it ("Shall find a post by id", async () => {
    const dummyPost = await post.createPost({
      date: Date.now(),
      post: "Test post",
      poster: testUserId,
      colleague: colleagueUserId
    });

    const postData = await post.findPostById(dummyPost._id);
    expect(postData.post).toBe("Test post");
  });

  it ("Shall update a post by id", async () => {
    const dummyPost = await post.createPost({
      date: Date.now(),
      post: "Test post",
      poster: testUserId,
      colleague: colleagueUserId
    });

    const updatedPost = await post.updatePostById(dummyPost._id, {
      post: "test update"
    });

    expect(updatedPost.post).toBe("test update");
  });

  it ("Shall delete a post by id", async () => {
    const dummyPost = await post.createPost({
      date: Date.now(),
      post: "Test post",
      poster: testUserId,
      colleague: colleagueUserId
    });

    expect(await post.deletePostById(dummyPost._id).post).toBe(undefined);
  });
});

afterAll(async () => {
  await user.deleteUser(testUserId);
  await user.deleteUser(colleagueUserId);
});
