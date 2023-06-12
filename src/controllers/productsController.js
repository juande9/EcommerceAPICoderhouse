import ProductManager from "../managers/ProductManager.js";
import { idValidation } from "../middleware/idValidation.js";
import productValidation from "../middleware/productValidation.js";

export const getProducts = async (req, res, next) => {
    try {
        const manager = new ProductManager();
        const params = req.query
        const products = await manager.getProducts(params);
        res.status(200).send({ status: "success", payload: products.docs, ...products, docs: undefined });
    } catch (e) {
        next(e)
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const manager = new ProductManager();
        const verifiedData = await productValidation.parseAsync(req.body)
        const newProduct = await manager.addProduct(verifiedData);
        res.status(200).send({ status: "success", message: `${newProduct.title} cargado correctamente` });
    } catch (e) {
        next(e)
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { pid } = req.params
        const validatedProdId = await idValidation.parseAsync(pid)

        const manager = new ProductManager();
        const productFound = await manager.getProductById(validatedProdId);
        res.status(200).send({ status: "success", payload: productFound });
    } catch (e) {
        next(e)
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const validatedProdId = await idValidation.parseAsync(pid)

        const manager = new ProductManager();
        const newData = req.body

        const productUpdated = await manager.updateProduct(validatedProdId, newData);
        res.status(200).send({ status: "success", message: `${productUpdated.title} ha sido modificado`, payload: productUpdated })
    }
    catch (e) {
        next(e)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const validatedProdId = await idValidation.parseAsync(pid)

        const manager = new ProductManager();
        const productDeleted = await manager.deleteProduct(validatedProdId);
        res.status(200).send({ status: "success", message: `Producto ${productDeleted.title} eliminado` })
    }
    catch (e) {
        next(e)
    }
}