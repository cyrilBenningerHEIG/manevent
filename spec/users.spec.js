const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { cleanUpDatabase } = require('./utils');

beforeEach(cleanUpDatabase);

describe('POST /users', function() {
  it('should create a user', async function()  {
    const res = await supertest(app)
    .post('/users')
    .send({
      "name": 'John Doe',
      "email": "John.doe@gmail.com",
      "password": '1234'
    })
<<<<<<< HEAD
=======
    .expect(200)
    .expect('Content-Type', /json/);
  });
});

/*describe('GET /users', function() {
  it('should retrieve the list of users', async function()  {
    const res = await supertest(app)
    .get('/users')
>>>>>>> 80eb725e7601326bf0965419645add087b0fa78b
    .expect(200)
    .expect('Content-Type', /json/);
  });
}); */

after(mongoose.disconnect);