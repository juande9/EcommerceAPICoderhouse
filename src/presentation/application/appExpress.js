import express from "express"
import cookieParser from "cookie-parser";
import { resolve } from 'path';

import pmRouter from "../../presentation/routes/productRouter.js";
import cartRouter from "../../presentation/routes/cartRouter.js";
import sessionRouter from "../../presentation/routes/sessionRouter.js";
import usersRouter from "../../presentation/routes/usersRouter.js";
import roleRouter from "../../presentation/routes/roleRouter.js";
import emailRouter from "../routes/emailRouter.js";
import paymentRouter from "../routes/paymentRouter.js";

import errorHandler from "../../presentation/middlewares/errorHandler.js";
import checkDomain from "../middlewares/checkDomain.js";
import compression from 'express-compression'
import { engine } from 'express-handlebars';
import { addLogger } from "../../utils/logger.js";

import UsersManager from "../../domain/managers/UsersManager.js";

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
        this.app.use(addLogger)
    }

    build() {
        this.app.use(checkDomain)
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/products', pmRouter);
        this.app.use('/api/roles', roleRouter)
        this.app.use('/api/session', sessionRouter);
        this.app.use('/api/users', usersRouter)
        this.app.use('/api/email', emailRouter)
        this.app.use('/api/payment', paymentRouter)
        this.app.use(errorHandler)
        this.usersManager = new UsersManager();
    }

    callback() {
        return this.app
    }

    close() {
        try {
            this.server.close();
            this.logger.info('Server closed successfully');
        } catch (error) {
            this.logger.error('Error closing the server:', error);
        }
    }

    listen() {
        const port = process.env.PORT ?? 8080
        const server = this.app.listen(port, () => {
            console.log(`Conectado al server en el puerto: ${port}`);
        });

        return server
    }
}

export default AppExpress