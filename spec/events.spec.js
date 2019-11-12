const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { cleanUpDatabase } = require('./utils');

beforeEach(cleanUpDatabase);

describe('POST /events', function () {
  it('should create a user', async function () {
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
    const body = res.body;
    expect(res.body).to.be.an('object');
    expect(res.body.member).to.be.an('array');
    expect(res.body._id).to.be.a('string');
    expect(res.body.name).to.equal('TestEvent');
    expect(res.body.date).to.equal('2020-04-16');
    expect(res.body.adress).to.equal('Zone 51');
    expect(res.body.description).to.equal('Just be there');
    expect(res.body).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;
  });
});

describe('GET /events', function () {
  it('should retrieve the list of users', async function () {
    const res = await supertest(app)
      .get('/events')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

after(mongoose.disconnect);