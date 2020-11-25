const Database = require('sqlite-sync')
Database.open(__dirname + '/database.sqlite').then(execute)
function execute() {
    console.log('primeiro')
}