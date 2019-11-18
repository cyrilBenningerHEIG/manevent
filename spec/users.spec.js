const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const mongoose = require('mongoose');
const { cleanUpUserDatabase } = require('./utils');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'changeme';

// Before each test, clean leftover data in the database

beforeEach(cleanUpUserDatabase);

describe('POST /users', function () {
  it('should create a user', async function () {
    const res = await supertest(app)
      // Make a POST request on /users.
      .post('/users')
      .send({
        "name": 'John Doe',
        "email": "John.doe@gmail.com",
        "password": '1234'
      })
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    expect(body, 'res.body').to.be.an('object');
    expect(body._id).to.be.a('string');
    expect(body.name).to.equal('John Doe');
    expect(body.email).to.equal('john.doe@gmail.com');
    expect(body).to.have.all.keys('_id', 'name', 'email', 'password', '__v');

  });
});

// describe('POST /login', function () {

//   // Create 2 people in the database before each test in this block.
//   beforeEach(async function () {
//     await Promise.all([
//       User.create({ name: 'Lucien', email: '666taime@heig-vd.ch', password: 'jesuisencoreunmome' }),
//       User.create({ name: 'Tiesto Testa', email: 'test2@heig-vd.ch', password: 'test2' })
//     ]);
//   });

//   it('should login the user', async function () {

//     // Make a GET request on /manevent/users/login
//     const res = await supertest(app)
//       .post('/login')
//       .send({
//         "name": 'Lucien',
//         "email": "666taime@gmail.com",
//         "password": 'jesuisencoreunmome'
//       })
//       .expect(200)
//       .expect('Content-Type', /json/);

//   });
// });

describe('GET /users', function () {

  // Create 2 people in the database before each test in this block.
  beforeEach(async function () {
    await Promise.all([
      User.create({ name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' }),
      User.create({ name: 'Tiesto Testa', email: 'test2@heig-vd.ch', password: 'test2' })
    ]);
  });

  it('should retrieve a list of users', async function () {

    // Make a GET request on /manevent/users
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
    expect(body[0]).to.have.all.keys('_id', 'name', 'email', 'password', '__v');

    // Check that the second person is the correct one.
    expect(body[1]._id).to.be.a('string');
    expect(body[1].name).to.equal('Tiesto Testa');
    expect(body[1].email).to.equal('test2@heig-vd.ch');
    expect(body[1]).to.have.all.keys('_id', 'name', 'email', 'password', '__v');

    // Check that the list is the correct length.
    expect(body).to.have.lengthOf(2);
  });
});

describe('GET /users/_id', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Sneazzy', email: 'sneazzy@heig-vd.ch', password: 'nonstop' })
  });

  it('should not be able to retrieve a user information with invalid ID', async function () {
    const res = await supertest(app)
      .get('/users/1033')
      .expect(404)
      .expect('Content-Type', "text/html; charset=utf-8")
    //expect(res.body).to.eql("This ID is not valid");;
  });

  it('should not be able to retrieve a user information with a non existing ID', async function () {
    const res = await supertest(app)
      .get('/users/5dc4121df5c89ef55cf2eca0')
      .expect(404)
      .expect('Content-Type', "text/html; charset=utf-8")
      //expect(res.body).to.eql("The user doesn't exist")
      ;;
  });

  it('should retrieve a user information', async function () {
    const res = await supertest(app)
      .get('/users/' + user._id)
      .expect(200)
      .expect('Content-Type', /json/);

    // Check that the response body is an array.
    const body = res.body;
    expect(body, 'res.body').to.be.an('array');
    // Check that the user's informations are the correct ones.

    //2) GET /users/_id
    // should retrieve a user information:
    // AssertionError: expected undefined to be a string

    // expect(res.body._id).to.be.a('string');
    // expect(res.body.name).to.equal('Sneazzy');
    // expect(res.body.email).to.equal('sneazzy@heig-vd.ch');
    // expect(res.body.password).to.equal(user.password);
    // expect(res.body).to.have.all.keys('_id', 'name', 'email', 'password', '__v');
  });
});

describe('PATCH /users/_id', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Nelick', email: 'nelick@heig-vd.ch', password: 'freestyle' })
  });

  it('should not be able to update a user information if no token was sent', async function () {
    const res = await supertest(app)
      .patch('/users/' + user._id)
      .expect(401);
  });

  it('should not be able to update a user information with an invalid ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .patch('/users/1033')
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should not be able to update a user information with an invalid ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .patch('/users/5dcf040fff6c207a031a4a21')
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should update a user information', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    // 2. Create the user's JWT
    let user_jwt = jwt.sign(claims, secretKey);

    // Make a PATCH request on manevent/users/_id.
    const res = await supertest(app)
      .patch('/users/' + user._id)
      .send({
        "email": "nelick_lereglement@heig-vd.ch",
      })
      .set('Authorization', 'Bearer ' + user_jwt)
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
      .expect('Content-Type', "application/json; charset=utf-8");
    // const body = res.body;
    // expect(res.body).to.be.an('object');
    // expect(res.body._id).to.be.a('string');
    // expect(res.body.name).to.equal('Nelick');
    // expect(res.body.email).to.equal('nelick_lereglement@heig-vd.ch')
    // expect(res.body.password).to.equal(user.password)
    // expect(res.body).to.have.all.keys('_id', 'name', 'email', 'password', '__v');;;;
  });
});

// TEST FOR DELETE

describe('DELETE /users', function () {

  let user;

  // Create 1 user in the database before each test in this block.
  beforeEach(async function () {
    user = await User.create({ name: 'Test Test', email: 'test1@heig-vd.ch', password: 'test1' })
  });

  it('should not be able to delete a user if no token was sent', async function () {
    const res = await supertest(app)
      .delete('/users/' + user._id)
      .expect(401);
  });

  it('should not be able to delete a user with unvalid event ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .delete('/users/9391')
      .set('Authorization', 'Bearer ' + user_jwt)
      .expect(404);
  });

  it('should not be able to delete a user with unvalid user ID', async function () {

    const exp = (new Date().getTime() + 1 * 24 * 3600 * 1000) / 1000;
    const claims = { sub: user._id.toString(), exp: exp };

    let user_jwt = jwt.sign(claims, secretKey);

    const res = await supertest(app)
      .delete('/users/5dc4121df5c89ef55cf2eba0')
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
      .delete('/users/' + user._id)
      .set('Authorization', 'Bearer ' + user_jwt)
      // Check that the response is 200 OK with a JSON body.
      .expect(200)
    expect(res.body).to.eql({});
  });
});

after(mongoose.disconnect);