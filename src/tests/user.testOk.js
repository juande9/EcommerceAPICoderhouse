import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing User Endpoints', () => {

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

    it('Should get an array of users /api/users', function () {
        return this.requester
            .get('/api/users')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                expect(Array.isArray(_body.users)).to.be.true;
                expect(status).to.be.equals(200);
            });
    });

    it('Should get a user /api/users/{id}', function () {
        const id = '6497c0181db412e3bccc8de0'
        return this.requester
            .get(`/api/users/${id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { _body, status } = result;
                expect(_body.payload).to.be.an('object')
                expect(status).to.be.equals(200);
            })
    });

    it('Should update an user key /api/users/{id}', function () {
        const id = '6497c0181db412e3bccc8de0'
        const updatedData = {
            "age": 85
        }
        return this.requester
            .put(`/api/users/${id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(updatedData)
            .then(result => {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.status).to.be.equals('success');
            })
    });

    it('Should assing client role to an user /api/users/{id}', function () {
        const id = '6497c0181db412e3bccc8de0'
        const updatedData = {
            "role": "647e6757f16ff85ac7ec7c0d"
        }
        return this.requester
            .put(`/api/users/${id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(updatedData)
            .then(result => {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.status).to.be.equals('success');
            })
    });

});
