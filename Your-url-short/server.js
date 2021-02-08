const express = require('express')
const app = express()
const path = require('path')
const ShortUrl = require('./models/shortUrl')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.set('views', path.join('views'))

app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ yourUrl: req.body.completeUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ goShortUrl: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.hits++
  shortUrl.save()

  res.redirect(shortUrl.yourUrl)
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at port: ${port}`))