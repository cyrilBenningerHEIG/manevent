const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const Event = require('../models/event');
const mongoose = require('mongoose');
const { cleanUpEventDatabase } = require('./utils');

beforeEach(cleanUpEventDatabase);

describe('POST /events', function () {
  it('should create a event', async function () {
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
  it('should retrieve the list of events', async function () {
    const res = await supertest(app)
      .get('/events')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('PUT /events', function () {

  let event;
  // Create 1 event in the database before each test in this block.
  beforeEach(async function () {
     event = await Event.create({name: "TestEvent", date: "2020-04-16", adress: "Zone 51", time: "00h00", description: "Just be there", public: true })
  });

  it('should update part of the data of an event', async function () {
    const res = await supertest(app)
      .put('/events/' + event._id) // attention pas mis à jour 
      .send({
        "name": "TestEventntr",
        "date": "2020-04-16",
      })
      .expect(200)
      //.expect('Content-Type', /json/);
    const body = res.body;
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.be.a('string');
    expect(res.body.name).to.equal('TestEventntr');
    expect(res.body.date).to.equal('2020-04-16');
    expect(res.body.adress).to.equal('Zone 51');
    expect(res.body.description).to.equal('Just be there');
    expect(res.body).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;
  });
});

// describe('/PUT/events/:id', () => {
//   it('it should UPDATE an event given the id', (done) => {
//       let event = new Event ({_id: "5dc2d30614b81bd6f50ea8a4", name: "TestEvent", date: "2020-04-16", adress: "Zone 51", time: "00h00", description: "Just be there", public: true, member: [] })
//       event.save((err, event) => {
//             chai.request(server)
//             .put('/book/' + event.id)
//             .send({name:'TestEvent-ouais'})
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.event.book.should.have.property('name').eql('TestEvent-ouais');
//               done();
//             });

describe('DELETE /events', function () {

  // Create 1 event in the database before each test in this block.
  beforeEach(async function () {
    await Promise.all([
      Event.create({ _id: "5db95c63eccde800179859e9", name: "TestEvent2", date: "2020-04-16", adress: "Zone 51", time: "00h00", description: "Just be there", public: true, member: [] }),
    ]);
  });

  it('should delete an event', async function () {

    // Make a DELETE request on /api/people.
    const res = await supertest(app)
      .delete('/events/:id')
      // Check that the response is 200 OK.
      .expect(200)
  });
});

after(mongoose.disconnect);