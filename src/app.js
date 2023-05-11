import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose";
import { resolve } from 'path';
import cookieParser from "cookie-parser";
import pmRouter from "./routes/ProductManagerRouter.js"
import cartRouter from "./routes/CartRouter.js"

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

        app.use('/api/products', pmRouter);
        app.use('/api/carts', cartRouter);

        app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
        });

    }
    catch (e) {
        console.log(e)
    }
})()


