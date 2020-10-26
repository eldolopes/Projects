const express = require('express')
const app = express()  
const fn = require('./funcoes') 

fn.readDirectory()
    .then(console.log)
    .catch(console.log)

/* fn.readSubtitles('01')
    .then(data => data.toString())
    .then(console.log)
    .catch(console.log) */ 