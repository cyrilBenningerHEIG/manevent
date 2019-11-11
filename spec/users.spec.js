const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');


describe('POST /users', function() {
  it('should create a user', async function()  {
    const res = await supertest(app)
    .post('/users')
    .send({
      "name": 'John Doe',
      "email": "John.doe@gmail.com",
      "password": '1234'
    })
    .expect(201)
    .expect('Content-Type', /json/);
  });
});

describe('GET /users', function() {
  it('should retrieve the list of users', async function()  {
    const res = await supertest(app)
    .get('/users')
    .expect(200)
    .expect('Content-Type', /json/);
  });
});

after(mongoose.disconnect);