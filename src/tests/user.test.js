import dotenv from 'dotenv';
dotenv.config();

import chai from 'chai';
import { faker } from '@faker-js/faker';
import DbFactory from '../data/factories/dbFactory.js';

import UsersMongooseRepository from '../data/repository/mongoose/UsersMongooseRepository.js';
import roleSchema from "../data/models/roleSchema.js"


const expect = chai.expect;
const db = DbFactory.create(process.env.BD);

describe('Testing User Mongoose Repository', () => {
    before(async function () {
        await db.init(process.env.DB_URI_TEST);
        this.usersRepository = new UsersMongooseRepository();
    });

    after(function () {
        db.drop();
        db.close();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    it('Repository must be an instance of UsersMongooseRepository', async function () {
        const result = await this.usersRepository
        expect(result).to.be.an.instanceOf(UsersMongooseRepository);
    });
    it('Repository must return an array', async function () {
        const result = await this.usersRepository.getUsers({ limit: 5, page: 1 })
        expect(Array.isArray(result.users)).to.be.equals(true)
        expect(result.users.length).to.be.at.most(5)
        expect(result.pagination.page).to.be.equal(1)
    });
    it('Repository must create an unique user', async function () {
        const data = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 65 }),
            password: "Hola",
            role: "64a4dadecb0b36e5d2a27881",
            isAdmin: false,
        }
        const result = await this.usersRepository.createUser(data)
        expect(result).to.not.be.empty;
        expect(result).to.have.property('id')
    });
    /*     it('Repository must found a role by id', async function () {
            const id = "64a4dadecb0b36e5d2a27881"
            const result = await this.usersRepository.getOne(id)
            expect(result).to.not.be.null;
        }); */
});
