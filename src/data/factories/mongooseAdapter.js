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
            console.log('Error closing the server', error)
        }
    }

    async drop() {
        try {
            await mongoose.connection.db.dropDatabase()
            console.log('Database dropped successfully');
        } catch (error) {
            console.log('Error dropping the database:', error);
        }
    }


}

export default MongooseAdapter