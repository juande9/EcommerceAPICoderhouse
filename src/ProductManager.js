import fs from "fs/promises"

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

  async addProduct(product) {
    try {
      const productsFile = await fs.readFile(this.path, "utf-8")
      let productList = JSON.parse(productsFile)
      const requiredKeys = ["title", "description", "code", "price", "status", "stock", "category"]

      const keyExist = (k) => {
        return product.hasOwnProperty(k)
      }

      requiredKeys.forEach(key => {
        if (!keyExist(key)) {
          throw new Error(`Error cargar. El campo ${key} es requerido. `)
        }
      })

      const validCode = productList.find(
        (p) => p.id === product.id ||
          p.code === product.code
      )

      if (validCode) {
        throw new Error(`El código ${product.code} ya fue ingresado`)
      }

      if (productList.length > 0) {
        let lastProduct = productList[productList.length - 1];
        this.autoId = lastProduct.id + 1
      }

      productList.push({
        ...product,
        status: true,
        id: this.autoId++,
      })

      await fs.writeFile(this.path, JSON.stringify(productList, null, 2))

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