const request = require('supertest');

const index = require('./index.js');

describe('index.js', () => {
  describe('home route', () => {
    it('should return a 200 status code and a "Server operational" message from the home route', async () => {
      const expectedStatus = 200;
      const expectedMessage = "Server operational";

      const response = await request(index).get('/');

      expect(response.status).toEqual(expectedStatus);
      expect(response.text).toEqual(expectedMessage);
    }) 
  })
})