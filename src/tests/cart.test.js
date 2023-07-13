import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing Cart Endpoints', () => {
    let cartId = '';

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

    it('Should create a new cart /api/carts', function () {
        return this.requester
            .post('/api/carts')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(200);

                cartId = body.id
            });
    });

    it('Should get all created carts /api/carts', function () {
        return this.requester
            .get('/api/carts')
            .then(result => {
                const { body, status } = result;
                expect(Array.isArray(body.payload.carts)).to.be.true;
                expect(status).to.be.equals(200);
            });
    });

    it('Should get a cart by id carts /api/carts/{{CART_ID}}', function () {
        return this.requester
            .get(`/api/carts/${cartId}`)
            .then(result => {
                const { body, status } = result;
                expect(Array.isArray(body.payload.cart)).to.be.true;
                expect(status).to.be.equals(200);
            });
    });

    it('Should get add a product to the cart /api/carts/{{CART_ID}}/products/{{PRODUCT_ID}}', function () {
        const pid = '645c27196db46f0e76038fc3'
        const cid = cartId

        return this.requester
            .post(`/api/carts/${cid}/products/${pid}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(200);
                expect(body.status).to.be.equals('success');
                expect(body.payload.cart).to.have.length.above(0);
                expect(body.payload).to.be.an('object');
            });
    });

    it('Should get modify the quantity of a product in a cart /api/carts/{{CART_ID}}/products/{{PRODUCT_ID}}', function () {
        const pid = '645c27196db46f0e76038fc3'
        const cid = cartId

        const newQuantity = {
            "quantity": 5
        }

        return this.requester
            .put(`/api/carts/${cid}/products/${pid}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .send(newQuantity)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(200);
                expect(body.payload).to.be.an('object');
                expect(body.payload.cart[0].quantity).to.be.equal(newQuantity.quantity)
            });
    });

    it('Should get delete a product from the cart /api/carts/{{CART_ID}}/products/{{PRODUCT_ID}}', function () {
        const pid = '645c27196db46f0e76038fc3'
        const cid = cartId

        return this.requester
            .delete(`/api/carts/${cid}/products/${pid}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(200);
                expect(body.status).to.be.equals('success');
                expect(body.payload.cart).to.have.length(0);
                expect(body.payload).to.be.an('object');
            });
    });

    it('Should delete the cart /api/carts/{{CART_ID}}', function () {
        const cid = cartId;

        return this.requester
            .delete(`/api/carts/${cid}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;
                expect(status).to.be.equals(200);
                expect(body.status).to.be.equals('success');
            });
    });

});
