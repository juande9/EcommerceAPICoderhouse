import ProductMongooseDao from "../daos/ProductMongooseDao.js";

class ProductManager {

  constructor() {

    this.dao = new ProductMongooseDao()

  }

  async getProducts() {
    try {
      return this.dao.getProducts();
    }
    catch (e) {
      return e
    }
  }

  async addProduct(data) {
    try {
      return this.dao.addProduct(data);
    }
    catch (e) {
      return e
    }
  }

  async getProductById(pid) {
    try {
      return this.dao.getProductById(pid);
    }
    catch (e) {
      return e
    }
  }

  async updateProduct(pid, updatedData) {
    try {
      return this.dao.updateProduct(pid, updatedData);
    }
    catch (e) {
      return e
    }
  }

  async deleteProduct(pid) {
    try {
      return this.dao.deleteProduct(pid);
    }
    catch (e) {
      return e
    }
  }

}

export default ProductManager