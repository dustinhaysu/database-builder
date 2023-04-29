const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9005
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "star-trek-aliens",
    collection





MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

//MIDDLEWARE
app.set("view engine", 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})