import initServer from './index.js'
import { faker } from '@faker-js/faker'
import supertest from 'supertest';

describe('Testing User Endpoints', () => {
    let requester, app, db

    before(async function () {
        const server = await initServer()
        const application = server.app.callback()
        requester = supertest.agent(application)
        app = server.app
        db = server.db
    });

    after(async function () {
        await db.drop();
        await db.close();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    test('Should respond a status code 200', async () => {
        const response = await requester.get('api/users').send()
        console.log(response)
    })



    /*     it('Repository must be an instance of UsersMongooseRepository', async function () {
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
                password: faker.internet.password(),
                role: "64a4dadecb0b36e5d2a27881",
                isAdmin: false,
            }
            const result = await this.usersRepository.createUser(data)
            expect(result).to.not.be.empty;
            expect(result).to.have.property('id')
        });
    
        it('Repository must found a user by id', async function () {
            const existingUser = await this.usersRepository.getUsers({ limit: 1, page: 1 });
            expect(existingUser.users.length).to.be.at.least(1);
            const id = existingUser.users[0].id;
    
            const result = await this.usersRepository.getUserById(id)
            expect(result).to.not.be.null;
        });
    
        it('Repository must found update any field', async function () {
            const existingUser = await this.usersRepository.getUsers({ limit: 1, page: 1 });
            expect(existingUser.users.length).to.be.at.least(1);
            const id = existingUser.users[0].id;
    
            const updatedDto = {
                firstName: 'John',
                lastName: 'Doe',
            }
            const result = await this.usersRepository.updateUser(id, updatedDto)
            expect(result).to.not.be.null;
            expect(result.firstName).to.equal(updatedDto.firstName);
            expect(result.lastName).to.equal(updatedDto.lastName);
        });
    
        it('Repository must delete a user document ', async function () {
            const existingUser = await this.usersRepository.getUsers({ limit: 1, page: 1 });
            expect(existingUser.users.length).to.be.at.least(1);
            const id = existingUser.users[0].id;
    
            const result = await this.usersRepository.deleteUser(id)
            expect(result).to.not.be.null;
        }); */

});
