import express from "express"
import cookieParser from "cookie-parser";
import { resolve } from 'path';

import pmRouter from "../../presentation/routes/productRouter.js";
import cartRouter from "../../presentation/routes/cartRouter.js";
import sessionRouter from "../../presentation/routes/sessionRouter.js";
import usersRouter from "../../presentation/routes/usersRouter.js";
import roleRouter from "../../presentation/routes/roleRouter.js";
import emailRouter from "../routes/emailRouter.js";

import errorHandler from "../../presentation/middlewares/errorHandler.js";
import compression from 'express-compression'
import { engine } from 'express-handlebars';

class AppExpress {

    init() {
        this.app = express();
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(resolve('src/public')));
        this.app.use(cookieParser(process.env.COOKIE_PASS))
        this.app.use(compression({
            brotli: {
                enabled: true,
                zlib: {}
            }
        }))
        const viewsPath = resolve('src/presentation/views');
        this.app.engine('hbs', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.hbs`,
        }));
        this.app.set('view engine', 'hbs');
        this.app.set('views', viewsPath);
    }

    build() {
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/products', pmRouter);
        this.app.use('/api/roles', roleRouter)
        this.app.use('/api/session', sessionRouter);
        this.app.use('/api/users', usersRouter)
        this.app.use('/api/email', emailRouter)
        this.app.use(errorHandler)
    }

    callback() {
        return this.app
    }

    close() {
        try {
            this.server.close();
            console.log('Server closed successfully');
        } catch (error) {
            console.log('Error closing the server:', error);
        }
    }


    listen() {
        const server = this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${process.env.SERVER_PORT}`);
        });

        return server
    }
}

export default AppExpress