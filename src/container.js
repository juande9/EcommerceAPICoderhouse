import dotenv from 'dotenv'
dotenv.config()

import { createContainer, asClass, Lifetime } from 'awilix'

import UsersMongooseDao from './data/daos/mongoose/UsersMongooseDao.js'
import RoleMongooseDao from './data/daos/mongoose/RoleMongooseDao.js'
import ProductMongooseDao from './data/daos/mongoose/ProductMongooseDao.js'
import CartMongooseDao from './data/daos/mongoose/CartMongooseDao.js'

import UsersMongooseRepository from './data/repository/mongoose/UsersMongooseRepository.js'
import RoleMongooseRepository from './data/repository/mongoose/RoleMongooseRepository.js'
import ProductMongooseRepository from './data/repository/mongoose/ProductMongooseRepository.js'
import CartMongooseRepository from './data/repository/mongoose/CartMongooseRepository.js'

const container = createContainer()

const pattern = process.env.DB_PATTERN;

if (pattern === 'Dao') {
    console.log('Using Dao')
    registerDaos(container);
} else if (pattern === 'Repository') {
    console.log('Using Repository')
    registerRepositories(container);
}

function registerDaos(container) {
    container.register({
        UsersDao: asClass(UsersMongooseDao, { Lifetime: Lifetime.SINGLETON }),
        RoleDao: asClass(RoleMongooseDao, { Lifetime: Lifetime.SINGLETON }),
        ProductDao: asClass(ProductMongooseDao, { Lifetime: Lifetime.SINGLETON }),
        CartDao: asClass(CartMongooseDao, { Lifetime: Lifetime.SINGLETON })
    });
}

function registerRepositories(container) {
    container.register({
        UsersRepository: asClass(UsersMongooseRepository, { Lifetime: Lifetime.SINGLETON }),
        RoleRepository: asClass(RoleMongooseRepository, { Lifetime: Lifetime.SINGLETON }),
        ProductRepository: asClass(ProductMongooseRepository, { Lifetime: Lifetime.SINGLETON }),
        CartRepository: asClass(CartMongooseRepository, { Lifetime: Lifetime.SINGLETON })
    });
}

export default container
