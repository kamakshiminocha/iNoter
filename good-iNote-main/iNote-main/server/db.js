const mongoose = require('mongoose')

const MONGODB_URI = "mongodb://localhost:27017/inoter"
const connectToMongo = ()=> {
    mongoose.connect(MONGODB_URI)
}

module.exports = connectToMongo