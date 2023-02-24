const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB