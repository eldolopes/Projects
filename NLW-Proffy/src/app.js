const express = require('express')
const app = express()
app.use(express.json())

const routes = require('../routes/routes')

const db = require('knex') ({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'proffys'
    }
})

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: app,
    noCache: true,
    watch: true
})

app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'))

app.use(routes(db))

app.use(express.static('public'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server online: http://localhost:${port}`))