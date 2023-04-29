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

  async getProductById(uid) {
    try {
      return this.dao.getProductById(uid);
    }
    catch (e) {
      return e
    }
  }

  async updateProduct(uid, updatedData) {
    try {
      return this.dao.updateProduct(uid, updatedData);
    }
    catch (e) {
      return e
    }
  }

  async deleteProduct(uid) {
    try {
      return this.dao.deleteProduct(uid);
    }
    catch (e) {
      return e
    }
  }

}

export default ProductManager