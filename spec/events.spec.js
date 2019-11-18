const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const auth = require("../middleware/auth");
const Event = require('../models/event');
const User = require('../models/user');
const mongoose = require('mongoose');
const { cleanUpEventDatabase } = require('./utils');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'changeme';

// Before each test, make sur the database is clean for your initial test state to be always the same

beforeEach(cleanUpEventDatabase);

describe('POST /events', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' })
  });

  it('should not be able to create an event if no token was sent', async function () {
    const res = await supertest(app)
      .post('/events/')
      .send({
        "name": "TestEvent",
        "date": "2020-04-16",
        "adress": "Zone 51",
        "time": "00h00",
        "description": "Just be there",
        "public": true,
        "member": []
      })
      .expect(401);
  });

  it('should create a event', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .post('/events')
      .set('Authorization', 'Bearer ' + user_jwt)
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
    expect(res.body).to.have.all.keys('__v', '_id', 'admin', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;
  });
});

describe('POST /events/_id/member', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Marlan', email: 'marlan@heig-vd.ch', password: 'biensur' })
  });

  let event;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    event = await Event.create({ name: "Concert de Y2K", date: "2020-07-09", adress: "Chachacha", time: "00h32", description: "Just be there", public: true })
  });

  it('should not be able to add the user to an event if no token was sent', async function () {
    const res = await supertest(app)
      .post('/events/' + event.id + '/member')
      .send({
        "name": "Marlan",
      })
      .expect(401);
  });

  it('should not be able to add the user to an event with unvalid event ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .post('/events/9391/member')
      .send({
        "name": "Marlan",
      })
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should not be able to add the user to an event with unvalid user ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .post('/events/5dc4121df5c89ef55cf2eca0/member')
      .send({
        "name": "Marlan",
      })
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should add a user to an event', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .post('/events/' + event.id + '/member')
      .set('Authorization', 'Bearer ' + user_jwt)
      .send({
        "name": "Marlan",
      })
      .expect(200)
      .expect('Content-Type', /json/);
    const body = res.body;
    expect(res.body).to.be.an('object');
    expect(res.body.member).to.be.an('array');
    expect(body.member).to.have.lengthOf(1);
  });
});

describe('GET /events', function () {

  beforeEach(async function () {
    await Promise.all([
      Event.create({ name: "TestEvent", date: "2020-04-16", adress: "Zone 51", time: "00h00", description: "Just be there", public: true, member: [] }),
      Event.create({ name: "TestEvent2", date: "2020-04-17", adress: "Zone 52", time: "00h01", description: "Just be there", public: true, member: [] })
    ]);
  });

  it('should retrieve the list of events', async function () {
    const res = await supertest(app)
      .get('/events')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');

    expect(res.body).to.have.all.keys('page', 'pageSize', 'data');
    expect(res.body.data[0]._id).to.be.a('string');
    expect(res.body.data[0].name).to.equal('TestEvent');
    expect(res.body.data[0].date).to.equal('2020-04-16');
    expect(res.body.data[0].adress).to.equal('Zone 51');
    expect(res.body.data[0].description).to.equal('Just be there');
    expect(res.body.data[0]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

    expect(res.body.data[1]._id).to.be.a('string');
    expect(res.body.data[1].name).to.equal('TestEvent2');
    expect(res.body.data[1].date).to.equal('2020-04-17');
    expect(res.body.data[1].adress).to.equal('Zone 52');
    expect(res.body.data[1].description).to.equal('Just be there');
    expect(res.body.data[1]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

  });
});

describe('GET /events/_id', function () {

  let event;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    event = await Event.create({ name: "Concert de Y2K", date: "2020-07-09", adress: "Chachacha", time: "00h32", description: "Just be there", public: true })
  });

  it('should not be able to retrieve a event information with invalid ID', async function () {
    const res = await supertest(app)
      .get('/events/1033')
      .expect(404)
      .expect('Content-Type', "text/html; charset=utf-8")
    //expect(res.body).to.eql("This ID is not valid");;
  });

  it('should not be able to retrieve an event information with a non existing ID', async function () {
    const res = await supertest(app)
      .get('/events/5dc4121df5c89ef55cf2eca0')
      .expect(404)
      .expect('Content-Type', "text/html; charset=utf-8")
      //expect(res.body).to.eql("The event doesn't exist")
      ;;
  });

  it('should retrieve the first event information', async function () {
    const res = await supertest(app)
      .get('/events/' + event.id)
      .expect(200)
      .expect('Content-Type', /json/);

    // Check that the response body is an array.
    const body = res.body;
    expect(body, 'res.body').to.be.an('object');
    // Check that the event's informations are the correct ones.

    expect(res.body._id).to.be.a('string');
    expect(res.body.name).to.equal('Concert de Y2K');
    expect(res.body.date).to.equal('2020-07-09');
    expect(res.body.adress).to.equal('Chachacha');
    expect(res.body.time).to.equal('00h32');
    expect(res.body.description).to.equal('Just be there');
    expect(res.body).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;
  });
});

describe('GET /events?name=', function () {

  beforeEach(async function () {
    await Promise.all([
      Event.create({ name: "Parachutechannel", date: "2019-11-15", adress: "Cheseaux", time: "22h08", description: "assoifez de reconnaissance, g la gourde vide", public: true, member: [] }),
      Event.create({ name: "Dame Nation", date: "2006-06-06", adress: "Paris", time: "00h02", description: "Collapse now", public: true, member: [] })
    ]);
  });

  it('should retrieve the event Parachute Channel', async function () {
    const res = await supertest(app)
      .get('/events?name=Parachutechannel')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');

    expect(res.body.data[0]._id).to.be.a('string');
    expect(res.body.data[0].name).to.equal('Parachutechannel');
    expect(res.body.data[0].date).to.equal('2019-11-15');
    expect(res.body.data[0].adress).to.equal('Cheseaux');
    expect(res.body.data[0].time).to.equal('22h08');
    expect(res.body.data[0].description).to.equal('assoifez de reconnaissance, g la gourde vide');
    expect(res.body.data[0]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

    // Check that only the first event was retrieved 
    expect(body.data).to.have.lengthOf(1);

  });
});

describe('GET /events?public=', function () {

  beforeEach(async function () {
    await Promise.all([
      Event.create({ name: "CrayonVie", date: "2012-11-15", adress: "Trousse", time: "22h18", description: "taille", public: true, member: [] }),
      Event.create({ name: "Zombie Nation", date: "2002-06-06", adress: "Colette", time: "10h02", description: "ca va ensemble", public: false, member: [] })
    ]);
  });

  it('should retrieve a list of public event', async function () {
    const res = await supertest(app)
      .get('/events?public=1')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');

    expect(res.body.data[0]._id).to.be.a('string');
    expect(res.body.data[0].name).to.equal('CrayonVie');
    expect(res.body.data[0].date).to.equal('2012-11-15');
    expect(res.body.data[0].adress).to.equal('Trousse');
    expect(res.body.data[0].time).to.equal('22h18');
    expect(res.body.data[0].description).to.equal('taille');
    expect(res.body.data[0]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

    // Check that only the first event was retrieved 
    expect(body.data).to.have.lengthOf(1);

  });
  it('should retrieve a list of private event', async function () {
    const res = await supertest(app)
      .get('/events?public=0')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');

    expect(res.body.data[0]._id).to.be.a('string');
    expect(res.body.data[0].name).to.equal('Zombie Nation');
    expect(res.body.data[0].date).to.equal('2002-06-06');
    expect(res.body.data[0].adress).to.equal('Colette');
    expect(res.body.data[0].time).to.equal('10h02');
    expect(res.body.data[0].description).to.equal('ca va ensemble');
    expect(res.body.data[0]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

    // Check that only the first event was retrieved 
    expect(body.data).to.have.lengthOf(1);

  });
});

describe('GET /events?adress=', function () {

  beforeEach(async function () {
    await Promise.all([
      Event.create({ name: "Concert de Lomepal", date: "2020-04-16", adress: "Lausanne", time: "20h00", description: "Amina", public: true, member: [] }),
      Event.create({ name: "Concert de Jazzybazz", date: "2020-04-17", adress: "Bienne", time: "00h01", description: "Just be there", public: true, member: [] })
    ]);
  });

  it('should retrieve the list of events located in Lausanne', async function () {
    const res = await supertest(app)
      .get('/events?adress=Lausanne')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');

    expect(res.body.data[0]._id).to.be.a('string');
    expect(res.body.data[0].name).to.equal('Concert de Lomepal');
    expect(res.body.data[0].date).to.equal('2020-04-16');
    expect(res.body.data[0].adress).to.equal('Lausanne');
    expect(res.body.data[0].time).to.equal('20h00');
    expect(res.body.data[0].description).to.equal('Amina');
    expect(res.body.data[0]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

    // Check that only the first event was retrieved 
    expect(body.data).to.have.lengthOf(1);

  });
});

describe('GET /events?name=', function () {

  beforeEach(async function () {
    await Promise.all([
      Event.create({ name: "Ma cousin", date: "2019-11-19", adress: "Double Platine", time: "23h08", description: "moteur de jet", public: true, member: [] }),
      Event.create({ name: "200", date: "2200-06-06", adress: "Orage", time: "20h02", description: "la haine des jaloux", public: true, member: [] })
    ]);
  });

  it('should retrieve the event Parachute Channel', async function () {
    const res = await supertest(app)
      .get('/events?date=2019-11-19')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');

    expect(res.body.data[0]._id).to.be.a('string');
    expect(res.body.data[0].name).to.equal('Ma cousin');
    expect(res.body.data[0].date).to.equal('2019-11-19');
    expect(res.body.data[0].adress).to.equal('Double Platine');
    expect(res.body.data[0].time).to.equal('23h08');
    expect(res.body.data[0].description).to.equal('moteur de jet');
    expect(res.body.data[0]).to.have.all.keys('__v', '_id', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;

    // Check that only the first event was retrieved 
    expect(body.data).to.have.lengthOf(1);

  });
});

describe('PATCH /events/_id', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' })
  });

  let event;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    event = await Event.create({ name: "Planete Rap", date: "2020-04-16", adress: "Nouvelle Caledonie", time: "04h20", description: "Just be there", admin: user.id, public: true })
  });

  //console.log(event);

  it('should not be able to update an event if no token was sent', async function () {
    const res = await supertest(app)
      .patch('/events/' + event._id)
      .send({
        "name": "TestEventntr",
        "date": "2020-04-19",
      })
      .expect(401);
  });

  it('should not be able to update an event with unvalid event ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .patch('/events/9391')
      .send({
        "name": "TestEventntr",
        "date": "2020-04-19",
      })
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should not be able to update an event with unvalid user ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .patch('/events/5dc4121df5c89ef55cf2eba0')
      .send({
        "name": "TestEventntr",
        "date": "2020-04-19",
      })
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should update an event information', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    // Make a PATCH request on manevent/users/_id.
    const res = await supertest(app)
      .patch('/events/' + event._id)
      .send({
        "name": "TestEventntr",
      })
      .set('Authorization', 'Bearer ' + user_jwt)
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
      .expect('Content-Type', /json/);
    const body = res.body;
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.be.a('string');
    //expect(res.body.name).to.equal('TestEventntr');
    expect(res.body.date).to.equal('2020-04-16');
    expect(res.body.adress).to.equal('Nouvelle Caledonie');
    expect(res.body.time).to.equal('04h20');
    expect(res.body.description).to.equal('Just be there');
    expect(res.body).to.have.all.keys('__v', '_id','admin', 'name', 'date', 'adress', 'time', 'description', 'public', 'member');;
  });
});

describe('DELETE /events/_id', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' })
  });

  let event;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    event = await Event.create({ name: "Planete Rap", date: "2020-04-16", adress: "Nouvelle Caledonie", time: "04h20", description: "Just be there", admin: user.id, public: true })
  });

  it('should not be able to delete a user if no token was sent', async function () {
    const res = await supertest(app)
      .delete('/events/' + event._id)
      .expect(401);
  });

  it('should not be able to delete an event with unvalid event ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .delete('/events/9391')
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should not be able to delete an event with unvalid user ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .delete('/events/5dc4121df5c89ef55cf2eba0')
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should delete a user', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    // Make a DELETE request on manevent/users/_id.
    const res = await supertest(app)
      .delete('/events/' + event._id)
      .set('Authorization', 'Bearer ' + user_jwt)
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
    expect(res.body).to.eql({});
  });
});

after(mongoose.disconnect);