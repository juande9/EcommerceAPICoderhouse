import dotenv from 'dotenv';
dotenv.config();

import chai from 'chai';
import { faker } from '@faker-js/faker';
import DbFactory from '../data/factories/dbFactory.js';

import RoleMongooseRepository from '../data/repository/mongoose/RoleMongooseRepository.js';


const expect = chai.expect;
const db = DbFactory.create(process.env.BD);

describe('Testing Role Mongoose Repository', () => {
    before(async function () {
        await db.init(process.env.DB_URI_TEST);
        this.roleRepository = new RoleMongooseRepository();
    });

    after(function () {
        db.drop();
        db.close();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    it('Repository must be an instance of RoleMongooseRepository', async function () {
        const result = await this.roleRepository
        expect(result).to.be.an.instanceOf(RoleMongooseRepository);
    });
    it('Repository must return an array', async function () {
        const result = await this.roleRepository.getRoles({ limit: 5, page: 1 })
        expect(Array.isArray(result.roles)).to.be.equals(true)
        expect(result.roles.length).to.be.at.most(5)
        expect(result.pagination.page).to.be.equal(1)
    });
    it('Repository must create an unique role', async function () {
        const data = {
            name: faker.person.jobTitle(),
            permissions: ['getUsers']
        }
        const result = await this.roleRepository.createRole(data)
        expect(result).to.not.be.empty;
        expect(result).to.have.property('id');
        expect(result.permissions).to.be.an('array')
    });
    it('Repository must found a role by id', async function () {
        const id = "64a4dadecb0b36e5d2a27881"
        const result = await this.roleRepository.getOne(id)
        expect(result).to.not.be.null;
    });
});
