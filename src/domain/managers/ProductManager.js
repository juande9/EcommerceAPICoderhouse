
import { managerDependencies } from "../../config/managerDependencies.js";
import container from "../../container.js";

class ProductManager {

  constructor() {
    this.productDao = container.resolve(managerDependencies.productManager)
  }

  async getProducts(params) {
    return this.productDao.getProducts(params);
  }

  async addProduct(data) {
    return this.productDao.addProduct(data);
  }

  async getProductById(uid) {
    return this.productDao.getProductById(uid);
  }

  async updateProduct(uid, updatedData) {
    return this.productDao.updateProduct(uid, updatedData);
  }

  async deleteProduct(uid) {
    return this.productDao.deleteProduct(uid);
  }
}

export default ProductManager