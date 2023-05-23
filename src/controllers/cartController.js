import CartManager from "../managers/CartManager.js";
import { idValidationCart, idValidationProduct } from "../middleware/idValidation.js";

export const createCart = async (req, res) => {
    try {
        const manager = new CartManager();
        const newCart = await manager.createCart({
            cart: [],
            enabled: true,
        }

        )
        return res.status(200).send({ status: "success", message: `Nuevo carrito creado con exito` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const getCarts = async (req, res) => {
    try {
        const manager = new CartManager();
        const carts = await manager.getCarts()
        res.status(200).send({ status: "success", payload: carts })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const getCartById = async (req, res) => {
    try {

        await idValidationCart.parseAsync(req.params);
        const { uid } = req.params

        const manager = new CartManager();
        const cartFound = await manager.getCartById(uid);
        res.status(200).send({ status: "success", payload: cartFound })
    }
    catch (e) {
        next(e);
    }
}

export const addProduct = async (req, res) => {
    try {
        await idValidationCart.parseAsync(req.params);
        await idValidationProduct.parseAsync(req.params)
        const { cid, pid } = req.params

        const manager = new CartManager();
        const cartUpdated = await manager.addProduct(cid, pid);

        res.status(200).send({ status: "success", message: `Producto agregado correctamente.` })
    }
    catch (e) {
        next(e);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await idValidationCart.parseAsync(req.params);
        const { cid, pid } = req.params

        const manager = new CartManager();
        const cartDeleted = await manager.deleteProduct(cid, pid);

        res.status(200).send({ status: "success", message: `Producto eliminado correctamente.` })
    }
    catch (e) {
        next(e);
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const manager = new CartManager();
        const { quantity } = req.body
        const { cid, pid } = req.params
        const newQuantity = await manager.updateQuantity(cid, pid, quantity);

        res.status(200).send({
            status: "success",
            message: `Cantidad modificada correctamente. Producto: ${newQuantity.product}. Nueva cantidad: ${quantity}`
        })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const emptyCart = async (req, res) => {
    try {
        const manager = new CartManager();
        const { cid } = req.params
        const emptiedCart = await manager.emptyCart(cid);

        res.status(200).send({
            status: "success", message: `Se han eliminado los productos del carrito.`
        })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

