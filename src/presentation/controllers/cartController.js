import CartManager from "../../domain/managers/CartManager.js";
import { idValidation } from "../../domain/validations/idValidation.js";

export const createCart = async (req, res) => {
    try {
        const manager = new CartManager();
        const newCart = await manager.createCart();

        console.log(newCart)

        return res.status(200).send({ status: "success", message: `Nuevo carrito creado con éxito`, id: newCart.id });
    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
};


export const getCarts = async (req, res, next) => {
    try {
        const manager = new CartManager();
        const carts = await manager.getCarts(req.query)
        res.status(200).send({ status: "success", payload: carts });
    }
    catch (e) {
        next(e);
    }
}

export const getCartById = async (req, res, next) => {
    try {
        const { cid } = req.params
        const validatedCartId = await idValidation.parseAsync(cid);

        const manager = new CartManager();
        const cartFound = await manager.getCartById(validatedCartId);
        res.status(200).send({ status: "success", payload: cartFound })
    }
    catch (e) {
        next(e);
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const { cid, pid } = req.params

        const validatedCartId = await idValidation.parseAsync(cid);
        const validatedProdId = await idValidation.parseAsync(pid)

        const manager = new CartManager();
        const updatedCart = await manager.addProduct(validatedCartId, validatedProdId);

        res.status(200).send({ status: "success", message: `Producto agregado correctamente`, payload: updatedCart })
    }
    catch (e) {
        next(e);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { cid, pid } = req.params

        const validatedCartId = await idValidation.parseAsync(cid);
        const validatedProdId = await idValidation.parseAsync(pid)

        const manager = new CartManager();
        const updatedCart = await manager.deleteProduct(validatedCartId, validatedProdId);
        res.status(200).send({ status: "success", message: `Producto eliminado correctamente.`, payload: updatedCart })
    }
    catch (e) {
        next(e);
    }
}

export const updateQuantity = async (req, res, next) => {
    try {
        const manager = new CartManager();
        const { quantity } = req.body
        const { cid, pid } = req.params
        const validatedCartId = await idValidation.parseAsync(cid);
        const validatedProdId = await idValidation.parseAsync(pid)

        const newQuantity = await manager.updateQuantity(validatedCartId, validatedProdId, quantity);

        console.log(newQuantity)

        res.status(200).send({
            status: "success", message: `Cantidad modificada correctamente. Producto: ${newQuantity.product}. Nueva cantidad: ${quantity}`
        })
    }
    catch (e) {
        next(e);
    }
}

export const emptyCart = async (req, res, next) => {
    try {
        const { cid } = req.params
        const validatedCartId = await idValidation.parseAsync(cid);
        const manager = new CartManager();
        const emptiedCart = await manager.emptyCart(validatedCartId);

        res.status(200).send({
            status: "success", message: `Se han eliminado los productos del carrito.`
        })
    }
    catch (e) {
        next(e);
    }
}

