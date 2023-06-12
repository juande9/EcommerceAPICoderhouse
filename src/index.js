import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose";
import { resolve } from 'path';
import cookieParser from "cookie-parser";
import { engine } from 'express-handlebars';

import pmRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import sessionRouter from "./routes/sessionRouter.js";
import usersRouter from "./routes/usersRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import roleRouter from "./routes/roleRouter.js";

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

        const viewsPath = resolve('src/views');
        app.engine('handlebars', engine({
          layoutsDir: `${viewsPath}/layouts`,
          defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));
        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);

        app.use('/api/products', pmRouter);
        app.use('/api/carts', cartRouter);
        app.use('/api/roles', roleRouter)
        app.use('/api/session', sessionRouter);
        app.use('/api/users', usersRouter)
        
        app.use(errorHandler)

        app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`);
        });

    }
    catch (e) {
        console.log(e)
    }
})()


