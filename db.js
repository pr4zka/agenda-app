const mongoose = require('mongoose')
const { PASSWORD, DB, HOST, USER } = require('./config/index')

const connection = async () => {
    const db = await mongoose.connect(
        `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB}`
    )
    console.log('Connected to db', db.connection.host)
}

module.exports = {connection, mongoose}
