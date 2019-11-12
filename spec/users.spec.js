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
    .expect(200)
    .expect('Content-Type', /json/);
  });
});

after(mongoose.disconnect);