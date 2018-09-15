const express = require('express')

var pug = require('pug')

var pdf = require('html-pdf')

const app = express()


app.set('view engine', 'pug')
app.get('/', (req, res) => {
    var html_options = {pretty: true, list_obj: "List Object"}
    var html = pug.renderFile('views/homepage.pug', html_options)
    var options = {format: 'Letter'}
    res.render('homepage', {list_obj: "List Object"})
    pdf.create(html, options).toFile('./pdf/sample.pdf', function(err, res) {
      if (err) return console.log(err)
      console.log(res)
    })
    console.log(html)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})
