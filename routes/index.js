const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const client = mongodb.MongoClient

const uri = 'mongodb://mongo/dummy-app'


/* GET home page. */
router.get('/', function(req, res) {
  res.send('welcome... or not so welcome...')
})

router.get('/data/from/db', function(req, res, next) {
  client.connect(uri, function (err, db) {
    if (err) return next(err)

    const collection = db.collection('dummy')
    collection.find({}).toArray(function(err, docs) {
      if (err) return next(err)
      return res.json(docs)
    })
  })
})

router.post('/data/into/db', function(req, res, next) {
  client.connect(uri, function (err, db) {
    if (err) return next(err)

    const collection = db.collection('dummy')
    collection.insertMany(req.body, function(err, result) {
      return res.json({ result })
    })
  })
})

module.exports = router
