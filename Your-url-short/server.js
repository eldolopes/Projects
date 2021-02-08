const express = require('express')
const app = express()
const path = require('path')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShortened', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at port: ${port}`))