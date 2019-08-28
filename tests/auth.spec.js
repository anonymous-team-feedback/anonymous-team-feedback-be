const request = require('./index.spec');
const winston = require('winston');

describe('register()', () => {
  it ('success', async () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "password": "abcde",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/register')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it ('missing param firstName', () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "password": "abcde",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/register')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"firstName" is required`)
      .expect(200);
  });

  it ('missing param lastName', () => {
    const params = {
      "lastName": "mukkamala",
      "password": "abcde",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/register')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"lastName" is required`)
      .expect(200);
  });

  it ('missing param password', () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/register')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"password" is required`)
      .expect(200);
  });

  it ('missing param email', () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "password": "abcde"
    };

    request
      .post('/api/auth/register')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"email" is required`)
      .expect(200);
  });
});

describe('login()', () => {
  it ('success', async () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "password": "abcde",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/login')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it ('missing param firstName', () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "password": "abcde",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/login')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"firstName" is required`)
      .expect(200);
  });

  it ('missing param lastName', () => {
    const params = {
      "lastName": "mukkamala",
      "password": "abcde",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/login')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"lastName" is required`)
      .expect(200);
  });

  it ('missing param password', () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "email": "kamalnrf@gmail.com"
    };

    request
      .post('/api/auth/login')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"password" is required`)
      .expect(200);
  });

  it ('missing param email', () => {
    const params = {
      firstName: "kamal",
      "lastName": "mukkamala",
      "password": "abcde"
    };

    request
      .post('/api/auth/login')
      .send(params)
      .expect('Content-Type', /json/)
      .expect(res => res.body === `"email" is required`)
      .expect(200);
  });
});
