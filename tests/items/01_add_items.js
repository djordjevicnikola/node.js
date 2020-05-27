const request = require('supertest');
const faker = require('faker');
const app = require('../../app');
const { createUser } = require('../helpers/userHelper');
const { createManyCategory } = require('../helpers/categoryHelper');

describe('Add Item', () => {
  it('POST /items Should return missing parameters', (done) => {
    Promise.all([createUser(), createManyCategory({ numberOfListItems: 2 })])
      .then(([{ token }, category]) => {
        const body = {};
        return request(app)
          .post(`/api/v1/items?categoryId=${category[0]._id}&subcategoryId=${category[1]._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(body)
          .expect(400)
          .then((res) => {
            res.body.message.should.equal('Missing parameters');
            done();
          });
      })
      .catch(done);
  });

  it('POST /items Should return title must be between 1 and 30 characters long', (done) => {
    Promise.all([createUser(), createManyCategory({ numberOfListItems: 2 })])
      .then(([{ token }, category]) => {
        const body = {
          title: faker.internet.password((min_length = 31)),
          condition: 'unused',
          description: faker.lorem.sentences((sentenceCount = 3)),
          status: 'active',
          photos: [
            {
              url: faker.internet.url(),
              fileName: faker.lorem.word(),
              originalname: faker.lorem.word(),
              mimetype: faker.lorem.word(),
              thumbnail: {
                url: faker.internet.url(),
                fileName: faker.lorem.word(),
                originalname: faker.lorem.word(),
                mimetype: faker.lorem.word(),
              },
            },
          ],
        };
        return request(app)
          .post(`/api/v1/items?categoryId=${category[0]._id}&subcategoryId=${category[1]._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(body)
          .expect(406)
          .then((res) => {
            res.body.message.should.equal('Not acceptable');
            done();
          });
      })
      .catch(done);
  });

  it('POST /items Should return description cannot be more than 500 characters', (done) => {
    Promise.all([createUser(), createManyCategory({ numberOfListItems: 2 })])
      .then(([{ token }, category]) => {
        const body = {
          title: faker.lorem.word(),
          condition: 'unused',
          description: faker.internet.password((min_length = 501)),
          status: 'active',
          photos: [
            {
              url: faker.internet.url(),
              fileName: faker.lorem.word(),
              originalname: faker.lorem.word(),
              mimetype: faker.lorem.word(),
              thumbnail: {
                url: faker.internet.url(),
                fileName: faker.lorem.word(),
                originalname: faker.lorem.word(),
                mimetype: faker.lorem.word(),
              },
            },
          ],
        };
        return request(app)
          .post(`/api/v1/items?categoryId=${category[0]._id}&subcategoryId=${category[1]._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(body)
          .expect(406)
          .then((res) => {
            res.body.message.should.equal('Not acceptable');
            done();
          });
      })
      .catch(done);
  });

  it('POST /items Should return successfully added new item', (done) => {
    Promise.all([createUser(), createManyCategory({ numberOfListItems: 2 })])
      .then(([{ token }, category]) => {
        const body = {
          title: faker.lorem.word(),
          condition: 'unused',
          description: faker.lorem.sentences((sentenceCount = 3)),
          status: 'active',
          photos: [
            {
              url: faker.internet.url(),
              fileName: faker.lorem.word(),
              originalname: faker.lorem.word(),
              mimetype: faker.lorem.word(),
              thumbnail: {
                url: faker.internet.url(),
                fileName: faker.lorem.word(),
                originalname: faker.lorem.word(),
                mimetype: faker.lorem.word(),
              },
            },
          ],
        };
        return request(app)
          .post(`/api/v1/items?categoryId=${category[0]._id}&subcategoryId=${category[1]._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(body)
          .expect(200)
          .then((res) => {
            res.body.message.should.equal('Successfully added new item!');
            done();
          });
      })
      .catch(done);
  });
});
