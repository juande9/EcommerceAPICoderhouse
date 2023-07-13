import { faker } from "@faker-js/faker";
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing Cart Endpoints', () => {
    let userId = '64a07d82cbd4849ec8d04d6e';

    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};

        const res = await this.requester.post('/api/session/login').send({ "email": "diego167@gmail.com", "password": "adminCod3r123" });
        this.jwt = res.body.accessToken;
    });

    after(async function () {
        await this.db.close();
        this.requester.app.close();
    });

    beforeEach(async function () {
        this.timeout(1000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it('Should create a new user admin /api/users', function () {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 85 }),
            password: '123456789',
            role: "",
            isAdmin: true,
        }

        return this.requester
            .post('/api/users')
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.payload.firstName).to.be.equal(payload.firstName)
                expect(status).to.be.equals(201);
                userId = body.payload.id
            });
    });

    it('Should get all created users /api/users', function () {
        return this.requester
            .get('/api/users')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(Array.isArray(body.users)).to.be.true;
                expect(status).to.be.equals(200);
            });
    });

    it('Should get a user by id /api/users/{{USER_ID}}', function () {
        return this.requester
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.payload.id).to.be.equal(userId)
                expect(status).to.be.equals(200);
            });
    });

    it('Should modify a user /api/users/{{USER_ID}}', function () {
        const payload = {
            "firstName": "Jose",
            "age": 74,
        }

        return this.requester
            .put(`/api/users/${userId}`)
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equal('success')
                expect(status).to.be.equal(200)
            });
    });

    it('Should assing client role to an user /api/users/{id}', function () {
        const updatedData = {
            "role": "647e6757f16ff85ac7ec7c0d"
        }
        return this.requester
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(updatedData)
            .then(result => {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.status).to.be.equals('success');
            })
    });

    it('Should delete a user by id /api/users/{{USER_ID}}', function () {
        return this.requester
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equals('success');
                expect(status).to.be.equal(200)
            });
    });

});
