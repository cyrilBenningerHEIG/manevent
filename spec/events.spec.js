const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { cleanUpDatabase } = require('./utils');

beforeEach(cleanUpDatabase);

describe('POST /events', function() {
  it('should create a user', async function()  {
    const res = await supertest(app)
    .post('/events')
    .send({
        "name": "TestEvent",
        "date": "2020-04-16",
       "adress": "Zone 51",
        "time": "00h00",
        "description": "Just be there",
       "public": true,
        "member": []
    })
    .expect(200)
    .expect('Content-Type', /json/);
  });
});

describe('GET /events', function() {
  it('should retrieve the list of users', async function()  {
    const res = await supertest(app)
    .get('/events')
    .expect(200)
    .expect('Content-Type', /json/);
  });
});

after(mongoose.disconnect);