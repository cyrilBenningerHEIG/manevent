const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const mongoose = require('mongoose');
const { cleanUpUserDatabase } = require('./utils');

beforeEach(cleanUpUserDatabase);

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

describe('GET /users', function() {

  // Create 2 people in the database before each test in this block.
  beforeEach(async function() {
    await Promise.all([
      User.create({ name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' }),
      User.create({ name: 'Tiesto Testa', email: 'test2@heig-vd.ch', password: 'test2' })
    ]);
  });

  it('should retrieve a list of users', async function() {

    // Make a GET request on /api/people.
    const res = await supertest(app)
      .get('/users')
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
      .expect('Content-Type', /json/);

    // Check that the response body is an array.
    const body = res.body;
    expect(body, 'res.body').to.be.an('array');

    // Check that the first user is the correct one.

    expect(body[0]._id).to.be.a('string');
    expect(body[0].name).to.equal('Test Test');
    expect(body[0].email).to.equal('test1@heig-vd.ch');
    expect(body[0]).to.have.all.keys('_id','name', 'email', 'password', '__v');

    // Check that the second person is the correct one.
    expect(body[1]._id).to.be.a('string');
    expect(body[1].name).to.equal('Tiesto Testa');
    expect(body[1].email).to.equal('test2@heig-vd.ch');
    expect(body[1]).to.have.all.keys('_id','name', 'email', 'password', '__v');

    // Check that the list is the correct length.
    expect(body).to.have.lengthOf(2);
  });
});

describe('DELETE /users', function() {

  // Create 1 user in the database before each test in this block.
  beforeEach(async function() {
    await Promise.all([
      User.create({ _id:'5dc95b9d86d6c4131fedd779', name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' }),
    ]);
  });

  it('should delete a user', async function() {

    // Make a DELETE request on /api/people.
    const res = await supertest(app)
      .delete('/users/:id')
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
  });
});

after(mongoose.disconnect);