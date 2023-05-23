import productShema from "./models/productShema.js";

class ProductMongooseDao {

  async getProducts(params) {
    try {
      const { limit = 10, sort, type, page } = params

      const paginateOptions = {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort },
      }

      const queryOptions = { enabled: true };
      if (type) {
        queryOptions.title = type;
      }

      const productsDocument = await productShema
        .paginate(queryOptions, paginateOptions)

      productsDocument.docs = productsDocument.docs.map(document => ({
        id: document._id,
        title: document.title,
        description: document.description,
        price: document.price,
        thumbnail: document.thumbnail,
        code: document.code,
        stock: document.stock,
        enabled: document.enabled,
      }))
      return productsDocument
    }
    catch (e) {
      return e
    }
  }

  async addProduct(data) {
    try {
      const productDocument = await productShema.create(data);
      return {
        id: productDocument._id,
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
        id: productDocument._id,
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
    const productDocument = await productShema.updateOne({ _id: uid }, updatedData);

    if (!productDocument) {
      throw new Error('Product not found')
    }
  }


  async deleteProduct(uid) {
    const productDocument = await productShema.deleteOne({ _id: uid, enabled: true });

    if (productDocument.deletedCount === 0) {
      throw new Error('Product not found');
    }

  }
}

export default ProductMongooseDao