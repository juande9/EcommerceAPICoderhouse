import mongoose from "mongoose"

class MongooseAdapter {

    async init(uri) {
        this.connection = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }

    async close() {
        try {
            await mongoose.disconnect();
        }
        catch (error) {
            req.logger.error('Error closing the server', error)
        }
    }

    async drop() {
        try {
            await mongoose.connection.db.dropDatabase()
            req.logger.info('Database dropped successfully');
        } catch (error) {
            req.logger.error('Error dropping the database:', error);
        }
    }


}

export default MongooseAdapter