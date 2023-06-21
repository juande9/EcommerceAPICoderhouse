import dotenv from 'dotenv'
dotenv.config()

import { createContainer, asClass, Lifetime } from 'awilix'
import UsersMongooseDao from './src/data/daos/UsersMongooseDao.js'
import RoleMongooseDao from './src/data/daos/RoleMongooseDao.js'
import ProductMongooseDao from './src/data/daos/ProductMongooseDao.js'
import CartMongooseDao from './src/data/daos/CartMongooseDao.js'

const container = createContainer()

container.register('UserDao', asClass(UsersMongooseDao), { Lifetime: Lifetime.SINGLETON })
container.register('RoleDao', asClass(RoleMongooseDao), { Lifetime: Lifetime.SINGLETON })
container.register('ProductDao', asClass(ProductMongooseDao), { Lifetime: Lifetime.SINGLETON })
container.register('CartDao', asClass(CartMongooseDao), { Lifetime: Lifetime.SINGLETON })

export default container