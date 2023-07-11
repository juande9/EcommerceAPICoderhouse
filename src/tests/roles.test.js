import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing Roles Endpoints', () => {
    let roleId = '';

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

    it('Should create a new role /api/roles', function () {

        const payload = {
            name: faker.person.jobTitle(),
            permissions: ['getUsers']
        }

        return this.requester
            .post('/api/roles')
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(201);
                roleId = body.role.id
            });
    });

    it('Should get all created roles /api/roles', function () {
        return this.requester
            .get('/api/roles')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(Array.isArray(body.roles)).to.be.true;
                expect(status).to.be.equals(200);
            });
    });

    it('Should get a role by id /api/roles/{{ROLE_ID}}', function () {
        return this.requester
            .get(`/api/roles/${roleId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.payload.id).to.be.equal(roleId)
                expect(status).to.be.equal(200)
            });
    });

    it('Should modify a role /api/roles/{{ROLE_ID}}', function () {
        const payload = {
            "permissions": [
                "getUsers"
            ]
        }

        return this.requester
            .put(`/api/roles/${roleId}`)
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equals('success');
                expect(status).to.be.equal(200)
            });
    });

    it('Should delete the cart /api/roles/{{ROLE_ID}}', function () {
        return this.requester
            .delete(`/api/roles/${roleId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equals('success');
                expect(status).to.be.equal(200)
            });
    });

});
