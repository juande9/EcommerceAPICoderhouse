import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;

describe('Testing ticket generation', () => {
    let product
    let user
    let cart

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
        this.timeout(3000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it('Should get the product stock, price and title', function () {
        const productId = '645c27196db46f0e76038fc3';

        return this.requester
            .get(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body } = result;
                product = body.payload;
            })
    })

    it('Should get the current user email', function () {
        return this.requester
            .get('/api/session/current')
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body } = result;
                user = body.payload.email
            })
    })

    it('Should get a cart', function () {
        const cid = "64ab77684fba9e2ba50f66d4"
        return this.requester
            .get(`/api/carts/${cid}`)
            .then(result => {
                const { body } = result;
                cart = body.payload
            });
    });

    it('Should add a product to the cart', function () {
        return this.requester
            .post(`/api/carts/${cart.id}/products/${product.id}`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body,status } = result;
                expect(status).to.be.equals(200);
                expect(body.payload).to.be.an('object');
            });
    });

    it("Should create a ticket", function () {
        const stock = product.stock;

        return this.requester
            .post(`/api/carts/${cart.id}/purchase`)
            .set('Authorization', `Bearer ${this.jwt}`)
            .then(result => {
                const { body, status } = result;

                // Verificar que el ticket se haya creado correctamente
                expect(status).to.be.equals(201);
                expect(body.ticket.purchaser).to.be.equals(user);

                // Verificar que la cantidad correcta se haya restado del stock del producto
                return this.requester
                    .get(`/api/products/${product.id}`)
                    .set('Authorization', `Bearer ${this.jwt}`);
            })
            .then(result => {
                const { body } = result;
                const updatedStock = body.payload.stock
                expect(updatedStock).to.be.equals(stock - 1);
            });
    });
});
