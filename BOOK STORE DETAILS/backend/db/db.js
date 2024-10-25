const mongoose = require("mongoose");
require('dotenv').config();  // Load .env file

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,  // Optional but deprecated in latest Mongoose versions
            useUnifiedTopology: true, // Optional but deprecated in latest Mongoose versions
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDb;
