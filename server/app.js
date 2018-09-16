const express = require('express')

var pug = require('pug')

var pdf = require('html-pdf')

const app = express()

const cors = require('cors')

const fs = require('fs')

app.use(cors())
app.set('view engine', 'pug')
app.use(function (req, res, next) {
  var html_options = {pretty: true, list_obj: "List Object"}
  var html = pug.renderFile('views/homepage.pug', html_options)
  var options = {format: 'Letter'}
  pdf.create(html, options).toFile('./pdf/sample.pdf', function(err, res) {
    if (err) return //console.log(err)
    next()
  })
})
app.get('/', (req, res) => {
  res.download(__dirname + '/pdf/sample.pdf', function (err) {
    console.log(__dirname + '/pdf/sample.pdf')
    // console.log(err)
  })
  // console.log(html)
  console.log(__dirname + '/pdf/sample.pdf')
  // res.render('homepage', {list_obj: "List Object"})
  // res.send({hello: "hello world"})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})
