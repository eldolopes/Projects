const express = require('express')
const app = express()  
const fn = require('./funcoes')


const path = require('path')
const way = path.join(__dirname, 'subtitles')

fn.readDirectory(way)
    .then(data => fn.elementsEndWith(data, '.srt'))
    .then(data => fn.replaceValue(data, '\\', '/'))
    .then(data => fn.readFiles(data))
    .then(console.log)
    .catch(console.log)

/* fn.readSubtitles('01')
    .then(data => data.toString())
    .then(console.log)
    .catch(console.log) */ 