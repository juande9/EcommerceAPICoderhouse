import ProductManager from "../managers/ProductManager.js";
import { idValidationProduct } from "../middleware/idValidation.js";

export const getProducts = async (req, res) => {
    try {
        const manager = new ProductManager();
        const params = req.query
        const products = await manager.getProducts(params);
        res.status(200).send({ status: "success", payload: products.docs, ...products, docs: undefined });
    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const manager = new ProductManager();

        const { title, description, price, code, stock } = req.body;

        if (!title || !description || !price || !code || !stock) throw new Error("Hay campos incompletos")

        const newProduct = await manager.addProduct(req.body);
        res.status(200).send({ status: "success", message: `${newProduct.title} cargado correctamente` });
    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
};

export const getProductById = async (req, res, next) => {
    try {
        await idValidationProduct.parseAsync(req.params);
        const { pid } = req.params

        const manager = new ProductManager();
        const productFound = await manager.getProductById(pid);
        res.status(200).send({ status: "success", payload: productFound });

    } catch (e) {
        next(e)
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        await idValidationProduct.parseAsync(req.params);
        const { pid } = req.params

        const manager = new ProductManager();
        const newData = req.body

        const productUpdated = await manager.updateProduct(pid, newData);
        res.status(200).send({ status: "success", message: `${productUpdated.title} ha sido modificado`, payload: productUpdated })
    }
    catch (e) {
        next(e)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await idValidationProduct.parseAsync(req.params);
        const { pid } = req.params

        const manager = new ProductManager();
        const productDeleted = await manager.deleteProduct(pid);
        res.status(200).send({ status: "success", message: `Producto ${productDeleted.title} eliminado` })
    }
    catch (e) {
        next(e)
    }
}