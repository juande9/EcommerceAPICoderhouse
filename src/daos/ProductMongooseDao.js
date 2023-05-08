import productShema from "./models/productShema.js";

class ProductMongooseDao {

  async getProducts(params) {
    try {
      const { limit = 10, sort, type, page } = params
      const limitValue = limit || 10
      const options = {
        enabled: true,
        ...(type && { title: type })
      };

      console.log(options)

      const productsDocument =
        await productShema
          .find(options)
          .limit(limitValue)
          .sort({ price: sort });

      return productsDocument.map(document => ({
        _id: document._id,
        title: document.title,
        description: document.description,
        price: document.price,
        thumbnail: document.thumbnail,
        code: document.code,
        stock: document.stock,
        enabled: document.enabled,
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
        enabled: productDocument.enabled,
      }
    }
    catch (e) {
      return e
    }
  }

  async getProductById(uid) {
    try {
      const productDocument = await productShema.findOne({ _id: uid });
      return {
        _id: productDocument._id,
        title: productDocument.title,
        description: productDocument.description,
        price: productDocument.price,
        thumbnail: productDocument.thumbnail,
        code: productDocument.code,
        stock: productDocument.stock,
        enabled: productDocument.enabled,
      }
    }
    catch (e) {
      return e
    }
  }

  async updateProduct(uid, updatedData) {
    try {
      const productDocument = await productShema.updateOne({ _id: uid }, updatedData);
      return {
        _id: productDocument._id,
        title: productDocument.title,
        description: productDocument.description,
        price: productDocument.price,
        thumbnail: productDocument.thumbnail,
        code: productDocument.code,
        stock: productDocument.stock,
        enabled: productDocument.enabled,
      }
    }
    catch (e) {
      return e
    }
  }

  async deleteProduct(uid) {
    try {
      return productShema.updateOne({ _id: uid }, { enabled: false });
    }
    catch (e) {
      return e
    }
  }

}

export default ProductMongooseDao