import productShema from "./models/productShema.js";

class ProductMongooseDao {

  async getProducts() {
    try {
      const productsDocument = await productShema.find({ enable: true });
      return productsDocument.map(document => ({
        _id: document._id,
        title: document.title,
        description: document.description,
        price: document.price,
        thumbnail: document.thumbnail,
        code: document.code,
        stock: document.stock,
        enable: document.enable,
      }))
    }
    catch (e) {
      return e
    }
  }

  async addProduct(data) {
    try {
      const productDocument = await productShema.create(data);
      return {
        _id: productDocument._id,
        title: productDocument.title,
        description: productDocument.description,
        price: productDocument.price,
        thumbnail: productDocument.thumbnail,
        code: productDocument.code,
        stock: productDocument.stock,
        enable: productDocument.enable,
      }
    }
    catch (e) {
      return e
    }
  }

  async getProductById(uid) {
    try {
      const productDocument = productShema.findOne({ _id: uid });
      return {
        _id: productDocument._id,
        title: productDocument.title,
        description: productDocument.description,
        price: productDocument.price,
        thumbnail: productDocument.thumbnail,
        code: productDocument.code,
        stock: productDocument.stock,
        enable: productDocument.enable,
      }
    }
    catch (e) {
      return e
    }
  }

  async updateProduct(uid, updatedData) {
    try {
      const productDocument = productShema.updateOne({ _id: uid }, updatedData);
      return {
        _id: productDocument._id,
        title: productDocument.title,
        description: productDocument.description,
        price: productDocument.price,
        thumbnail: productDocument.thumbnail,
        code: productDocument.code,
        stock: productDocument.stock,
        enable: productDocument.enable,
      }
    }
    catch (e) {
      return e
    }
  }

  async deleteProduct(uid) {
    try {
      productDocument
      return productShema.updateOne({ _id: uid }, { enable: false });
    }
    catch (e) {
      return e
    }
  }

}

export default ProductMongooseDao