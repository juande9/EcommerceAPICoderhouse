import fs from "fs/promises"
import productShema from "./models/productShema.js";

class ProductManager {

  path = ``;
  autoId = 1;
  #products = [];

  constructor() {
    this.#products = [];
    this.path = `./src/db/products.json`;
  }

  async getProducts() {
    try {
      const productsFile = await fs.readFile(this.path, "utf-8")
      return JSON.parse(productsFile)
    }
    catch (e) {
      await fs.writeFile(this.path, "[]")
    }
  }

  async addProduct(data) {
    try {
      const newProduct = await productShema.create(data);

      return newProduct
    }
    
    catch (e) {
      return e
    }
  }

  async getProductById(productId) {

    try {
      const productsFile = await fs.readFile(this.path, "utf-8")
      let productList = JSON.parse(productsFile)
      let productFound = productList.find(prod => prod.id == productId)

      if (!productFound) {
        throw new Error(`No se encontraron productos con el id: ${productId}`)
      }
      return productFound

    }
    catch (e) {
      return e
    }
  }

  async updateProduct(id, updatedData) {
    try {
      const productsFile = await fs.readFile(this.path, "utf-8")
      let productList = JSON.parse(productsFile)

      const productToUpdate = await this.getProductById(id)
      const keys = Object.keys(productToUpdate)
      const keysToUpdate = Object.keys(updatedData)

      if (productToUpdate instanceof Error) {
        throw new Error(`${productToUpdate.message}`)
      }

      keysToUpdate.forEach(key => {
        const validKey = keys.some(k => k === key)
        if (!validKey) {
          throw new Error(`La key "${key}" no es válida.`)
        }
      }
      )

      productList.find((p, i) => {
        if (p.id === parseInt(id)) Object.assign(productList[i], updatedData)
      });

      await fs.writeFile(this.path, JSON.stringify(productList, null, 2))

    }
    catch (e) {
      return e
    }
  }

  async deleteProduct(id) {
    try {

      const productsFile = await fs.readFile(this.path, "utf-8")
      let productList = JSON.parse(productsFile)

      const deletedProduct = productList.filter(prod => prod.id != parseInt(id))

      if (productList.length === deletedProduct.length) {
        throw new Error(`Producto no encontrado o ya eliminado.`)
      } else {
        await fs.writeFile(this.path, JSON.stringify(deletedProduct, null, 2))
      }

    }
    catch (e) {
      return e
    }
  }

}

export default ProductManager