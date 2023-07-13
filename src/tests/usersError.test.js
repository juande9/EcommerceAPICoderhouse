import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing user endpoints ERRORS', () => {

    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};

        const res = await this.requester.post('/api/session/login').send({ "email": "carlos555@gmail.com", "password": "adminCod3r123" });
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

    it('Should resolve in an error if the payload is empty or the type of data is invalid', function () {
        const payload = {
            firstName: 20,
        }

        return this.requester
            .post('/api/users')
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(400);
                expect(body.status).to.be.equals('error');
            });
    });

    it('Should resolve in an error if there is no session active', function () {
        return this.requester
            .get('/api/users')
            .then(result => {
                const { body, status } = result;
                expect(body.message).to.be.equals('Empty authentication header');
                expect(status).to.be.equals(401);
            });
    });

    it('Should resolve in an error if there user doesnt have the permition', function () {
        return this.requester
            .get('/api/users')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.message).to.be.equals('Authorization error');
                expect(status).to.be.equals(403);
            });
    });

    it('Should resolve in an error if there id is invalid', function () {
        let userId = 'invalid';

        return this.requester
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equal('error')
                expect(status).to.be.equals(400);
            });
    });

});
