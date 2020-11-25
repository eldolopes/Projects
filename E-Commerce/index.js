//DB - KNEX
const db = require('knex') ({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'myecommerce'
    }
});

//QUERY TEST
db.on('query', query => {
    console.log(`SQL: ${query.sql}`)
});

//APP
const app = require('./app')(db)
//PORT
const port = process.env.PORT || 3000;

//LISTEN
app.listen(port, err => {
    if(err){
        console.log('Erro ao iniciar: ', err)
    }else{
        console.log(`Server online: http://localhost:${port}`)
    }
});
