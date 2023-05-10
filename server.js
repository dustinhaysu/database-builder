// REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9005
require('dotenv').config()

// DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "star-trek-aliens",
    collection




// CONNECT TO MONGODB
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


//CRUD METHODS
app.get('/',(req, res) => {
     db.collection('alien-info').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            res.render('index.ejs', {info: nameList})

        })
        .catch(error => console.log(error))

    //console.log(contents)
})

app.post('/api', (req, res) => {
    console.log('POST heard')
    db.collection('alien-info').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})

app.put('/updateEntry', (req, res) => {
    console.log(req.body,'PUT heard')
    Object.keys(req.body).forEach(key => {
        if(req.body[key]===null || req.body[key]===undefined|| req.body[key]===''){
            delete req.body[key]
        }

    })
    console.log(req.body)
    db.collection('alien-info').findOneAndUpdate(
        {name: req.body.name},
        {
            $set: req.body
        }
    )
    .then(result => {
        console.log(result, 'Success')
        res.json('Success')
    })
    .catch(error => console.error(error,'SHIT'))

})

app.delete('/deleteEntry', (req, res) => {
    db.collection('alien-info').deleteOne(
        {name: req.body.name}
    )
    .then(result => {
        console.log('Entry Deleted')
        res.json('Entry Deleted')
    })
    .catch(error => console.error(error))

})


//SET UP LOCAL HOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})