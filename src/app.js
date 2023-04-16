import express from "express"
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from "socket.io"
import pmRouter from "./routes/ProductManagerRouter.js"
import cartRouter from "./routes/CartRouter.js"
import RealTimeProducts from "./routes/RealTimeProductsRouter.js"


void (async () => {
    try {
        const app = express()

        const SERVER_PORT = 8081;

        const httpServer = app.listen(SERVER_PORT, () => {
            console.log("Servidor escuchando en 8081")
        })

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(resolve('src/public')));
        
        const viewsPath = resolve('src/views');
        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));
        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);

        const socketServer = new Server(httpServer)

        socketServer.on("connection", socket => {
            console.log("Nuevo cliente conectado")

            socket.on("message",(data)=>{
                console.log(data)
            })

            socket.on("newProduct", (p)=>{
                socketServer.emit("newProduct", p)
            })
        })

        app.use('/api/products', pmRouter);
        app.use('/api/carts', cartRouter);
        app.use('/', RealTimeProducts);

    }
    catch (e) {
        console.log(e)
    }
})()


