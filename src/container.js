import dotenv from 'dotenv'
dotenv.config()

import { createContainer, asClass, Lifetime } from 'awilix'

import UsersMongooseRepository from './data/repository/mongoose/UsersMongooseRepository.js'
import RoleMongooseRepository from './data/repository/mongoose/RoleMongooseRepository.js'
import ProductMongooseRepository from './data/repository/mongoose/ProductMongooseRepository.js'
import CartMongooseRepository from './data/repository/mongoose/CartMongooseRepository.js'

const container = createContainer()

container.register('UsersRepository', asClass(UsersMongooseRepository), { Lifetime: Lifetime.SINGLETON })
container.register('RoleRepository', asClass(RoleMongooseRepository), { Lifetime: Lifetime.SINGLETON })
container.register('ProductRepository', asClass(ProductMongooseRepository), { Lifetime: Lifetime.SINGLETON })
container.register('CartRepository', asClass(CartMongooseRepository), { Lifetime: Lifetime.SINGLETON })

export default container