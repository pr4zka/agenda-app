const mongoose = require('mongoose')
const { PASSWORD, DB, HOST, USER, DB_PORT } = require('./config/index')

const connection = async () => {
    const db = await mongoose.connect(
        `mongodb://${USER}:${PASSWORD}@${HOST}/${DB}:${DB_PORT}`
    )
    console.log('Connected to db', db.connection.host)
}

module.exports = {connection, mongoose}
