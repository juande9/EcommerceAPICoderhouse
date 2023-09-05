import { Command } from "commander";
import { createHash } from "../utils/auth.js";
import UsersManager from "../domain/managers/UsersManager.js";

const AddUserComand = new Command('addUser')

AddUserComand
    .version('0.0.1')
    .description('Add Admin')
    .option('-e, --email <email>', 'Admin Email')
    .option('-fn, --firstName <firstName>', 'First Name')
    .option('-ln, --lastName <lastName>', 'Last Name')
    .option('-p, --password <password>', 'Password')
    .option('-a, --age <age>', 'Age')
    .option('-ia, --isAdmin < isAdmin>', 'User is Admin')
    .action(async (env) => {
        const dto = {
            ...env,
            password: await createHash(env.password, 10),
            age: parseInt(env.age)
        };

        const manager = new UsersManager()
        const newAdmin = await manager.createUserAdmin(dto)

        if (newAdmin) {
            console.log('Admin created successfully')
        }
    })

export default AddUserComand