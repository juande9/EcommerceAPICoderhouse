import { exit } from 'shelljs'
import { program } from 'commander';
import dotenv from 'dotenv'
dotenv.config()

import DbFactory from "./data/factories/dbFactory.js";
import AddUserComand from './commands/AddUser.js';

void (async () => {
    const db = DbFactory.create(process.env.DB)
    db.init(process.env.DB_URI)

    program.addCommand(AddUserComand)
    await program.parseAsync(process.argv)

    exit()
})()
