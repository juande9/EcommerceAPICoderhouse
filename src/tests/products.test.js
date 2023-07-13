import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing Products Endpoints', () => {
    let productId = '';

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

    it('Should create a new product /api/products', function () {

        const payload = {
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.number.int({ min: 0, max: 1000 }),
            thumbnail: faker.image.url(),
            code: faker.number.hex({ min: 0, max: 65535 }),
            stock: faker.number.int({ min: 0, max: 100 }),
            enabled: true,
        };

        return this.requester
            .post('/api/products')
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(201);
                productId = body.payload.id
            });
    });

    it('Should get 2 created products using pagination query: limit /api/products', function () {
        const queryParams = {
            limit: 2
        }
        return this.requester
            .get('/api/products')
            .query(queryParams)
            .then(result => {
                const { body, status } = result;
                expect(Array.isArray(body.products)).to.be.true;
                expect(body.pagination.limit).to.be.equals(queryParams.limit);
                expect(status).to.be.equals(200);
            });
    });

    it('Should get a product by id /api/products/{{PRODUCT_ID}}', function () {
        return this.requester
            .get(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equal('success')
                expect(body.payload.id).to.be.equal(productId)
                expect(status).to.be.equal(200)
            });
    });

    it('Should modify a product /api/products/{{PRODUCT_ID}}', function () {
        const payload = {
            "title": "Yerba Mate Amanda",
            "price": 100,
            "stock": 20
        }

        return this.requester
            .put(`/api/products/${productId}`)
            .send(payload)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equal('success')
                expect(status).to.be.equal(200)
            });
    });

    it('Should delete a product by id /api/products/{{PRODUCT_ID}}', function () {
        return this.requester
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(body.status).to.be.equals('success');
                expect(status).to.be.equal(200)
            });
    });

});
