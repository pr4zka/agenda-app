const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const {connection} = require('./db')

const auth = require('./routes/auth')
const users = require('./routes/user')
const tasks = require('./routes/tasks')
const team = require('./routes/team')

const app = express()


//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

auth(app)
users(app)
tasks(app)
team(app)

//port
const port = process.env.PORT || 4000

//server
app.listen(port, () => {
    console.log(`server on port`, port)
})

connection()
