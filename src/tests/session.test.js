import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;
let jwt = "";

describe('Testing Session Endpoints', () => {

    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
    });

    after(async function () {
        await this.db.close();
        this.requester.app.close();
    });

    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it('Should sign up an unique user /api/sessions/signup', function () {

        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 85 }),
            password: '123456789',
            role: "64a4dadecb0b36e5d2a27881",
            isAdmin: false,
        }

        return this.requester
            .post('/api/session/signup')
            .send(payload)
            .then(result => {
                const { _body, status } = result;
                expect(_body.payload.email).to.be.equals(payload.email)
                expect(status).to.be.equals(201);
            })
    });

    it('Should log in the admin /api/sessions/login', function () {

        const payload = {
            "email": "diego167@gmail.com",
            "password": "adminCod3r123"
        }

        return this.requester
            .post('/api/session/login')
            .send(payload)
            .then(result => {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals(`${payload.email} logged in.`)

                jwt = _body.accessToken;
            })
    });

    it('Current /api/sessions/current', function () {

        const payload = {
            "email": "diego167@gmail.com",
            "password": "adminCod3r123"
        }

        return this.requester
            .get('/api/session/current')
            .set('Authorization', `Bearer ${jwt}`)
            .then(result => {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.payload.email).to.be.equals(payload.email)
            })
    });

});
