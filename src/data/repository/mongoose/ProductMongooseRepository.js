import Product from "../../../domain/entities/product.js";
import productSchema from "../../models/productSchema.js";

class ProductMongooseRepository {

  async getProducts(params) {

    const { limit = 10, sort, type, page } = params
    const paginateOptions = {
      limit: limit || 10,
      page: page || 1,
      sort: { price: sort },
    }

    const queryOptions = { enabled: true };
    if (type) { queryOptions.title = type; }

    const productsDocument = await productSchema.paginate(queryOptions, paginateOptions)
    const { docs, ...pagination } = productsDocument

    const products = docs.map(document => new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      enabled: document.enabled,
    }))

    return {
      products,
      pagination
    }

  }

  async addProduct(data) {
    const productDocument = await productSchema.create(data);

    return new Product({
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      enabled: productDocument.enabled,
    })
  }

  async getProductById(uid) {
    const productDocument = await productSchema.findOne({ _id: uid });

    return new Product({
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      enabled: productDocument.enabled,
    })
  }

  async updateProduct(uid, updatedData) {
    const productDocument = await productSchema.updateOne({ _id: uid }, updatedData);

    if (!productDocument) {
      throw new Error('Product not found')
    }
  }

  async deleteProduct(uid) {
    const productDocument = await productSchema.deleteOne({ _id: uid, enabled: true });

    if (productDocument.deletedCount === 0) {
      throw new Error('Product not found');
    }
  }

  async updateStock(uid, updatedNumber) {
    const productDocument = await productSchema.updateOne({ _id: uid }, { stock: updatedNumber });

    if (productDocument.nModified === 0) {
      throw new Error('Product not found');
    }
  }


}

export default ProductMongooseRepository