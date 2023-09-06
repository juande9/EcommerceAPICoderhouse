import { Router } from "express";
import { createOrder } from "../controllers/paymentController.js";

const paymentRouter = Router()

paymentRouter.get('/create-order', createOrder)
paymentRouter.get('/success', (req, res) => res.send('success'))
paymentRouter.get('/failure', (req, res) => res.send('failure'))

export default paymentRouter