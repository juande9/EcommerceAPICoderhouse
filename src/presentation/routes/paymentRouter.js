import { Router } from "express";
import { createOrder } from "../controllers/paymentController.js";

const paymentRouter = Router()

paymentRouter.get('/create-order', createOrder)

export default paymentRouter