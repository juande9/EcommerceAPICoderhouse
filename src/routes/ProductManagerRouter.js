import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const pmRouter = Router()
const pm = new ProductManager()

// Obtiene los productos
pmRouter.get("/", async (req, res) => {
    const limit = req.query.limit
    const data = await pm.getProducts()    

    if (limit) {
        const filtredLimit = data.slice(0, limit)
        return res.status(200).send( filtredLimit )
    }

    if (!limit) { return res.status(200).send(data) }

})

// Obtiene producto por ID
pmRouter.get("/:pid", async (req, res) => {
    const id = req.params.pid
    const foundProduct = await pm.getProductById(id)

    if (foundProduct instanceof Error) {
        return res.status(400).send({ status: "error", message: `${foundProduct.message}` })
    } else {
        return res.status(200).send(foundProduct)
    }
})

// Agrega producto
pmRouter.post("/", async (req, res) => {
    const newProduct = req.body
    const prodAdded = await pm.addProduct(newProduct)

    if (prodAdded instanceof Error) {
        return res.status(400).send({ status: "error", message: `${prodAdded.message}` })
    } else {
        return res.status(200).send({ status: "success", message: `Producto cargado correctamente` })
    }

})

// Actualiza producto por id
pmRouter.put("/:pid", async (req, res) => {
    const newData = req.body
    const id = req.params.pid
    const modifiedProduct = await pm.updateProduct(id, newData)

    if (modifiedProduct instanceof Error) {
        return res.status(400).send({ status: "error", message: `${modifiedProduct.message}` })
    } else {
        return res.status(201).send({ status: "success", message: "Producto modificado" })
    }
})

// Elimina producto por id
pmRouter.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const deletedProduct = await pm.deleteProduct(id)

    if (deletedProduct instanceof Error) {
        return res.status(400).send({ status: "error", message: `${deletedProduct.message}` })
    } else {
        return res.status(201).send({ status: "success", message: `Producto ${id} eliminado` })
    }
})

export default pmRouter