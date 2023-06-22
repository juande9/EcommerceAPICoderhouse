import dotenv from 'dotenv'
dotenv.config()

import { createContainer, asClass, Lifetime } from 'awilix'

import UsersMongooseDao from './data/daos/UsersMongooseDao.js'
import RoleMongooseDao from './data/daos/RoleMongooseDao.js'
import ProductMongooseDao from './data/daos/ProductMongooseDao.js'
import CartMongooseDao from './data/daos/CartMongooseDao.js'

const container = createContainer()

container.register('UsersDao', asClass(UsersMongooseDao), { Lifetime: Lifetime.SINGLETON })
container.register('RoleDao', asClass(RoleMongooseDao), { Lifetime: Lifetime.SINGLETON })
container.register('ProductDao', asClass(ProductMongooseDao), { Lifetime: Lifetime.SINGLETON })
container.register('CartDao', asClass(CartMongooseDao), { Lifetime: Lifetime.SINGLETON })

export default container