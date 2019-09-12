const agent = require('supertest');
const index = require('../index');

const request = agent(index);

describe('index.js', () => {
  describe('home route', () => {
    it('should return a 200 status code and a "Server operational" message from the home route', () => {
      const expectedStatus = 200;
      const expectedMessage = "Server operational";

      request
        .get('/')
        .expect(res => expectedMessage == res.message )
        .expect(expectedStatus);
    });
  });
});

module.exports = request;
