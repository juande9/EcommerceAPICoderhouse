import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const rtProdRouter = Router()
const pm = new ProductManager()

//Sin websocket
rtProdRouter.get("/", async (req, res) => {
    const data = await pm.getProducts()
    res.render("home", { data })
})

//Con websocket
rtProdRouter.get("/realtimeproducts", async (req, res) => {
    const data = await pm.getProducts()
    res.render("realTimeProducts", { data })
})

export default rtProdRouter