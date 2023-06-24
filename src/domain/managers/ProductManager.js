import container from "../../container.js";

class ProductManager {

  constructor() {
    this.ProductRepository = container.resolve('ProductRepository')
  }

  async getProducts(params) {
    return this.ProductRepository.getProducts(params);
  }

  async addProduct(data) {
    return this.ProductRepository.addProduct(data);
  }

  async getProductById(uid) {
    return this.ProductRepository.getProductById(uid);
  }

  async updateProduct(uid, updatedData) {
    return this.ProductRepository.updateProduct(uid, updatedData);
  }

  async deleteProduct(uid) {
    return this.ProductRepository.deleteProduct(uid);
  }
}

export default ProductManager