import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose";
import { resolve } from 'path';
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import pmRouter from "./routes/ProductManagerRouter.js"
import cartRouter from "./routes/CartRouter.js"
import sessionRouter from "./routes/sessionRouter.js";
import usersRouter from "./routes/usersRouter.js";

void (async () => {
    try {

        const SERVER_PORT = 8081;

        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(resolve('src/public')));
        app.use(cookieParser(process.env.COOKIE_PASS))
        app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_DB_URI,
                ttl: 15,
            }),
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
        }))

        app.use('/api/products', pmRouter);
        app.use('/api/carts', cartRouter);
        app.use('/api/session', sessionRouter);
        app.use('/api/users', usersRouter)

        app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
        });

    }
    catch (e) {
        console.log(e)
    }
})()


