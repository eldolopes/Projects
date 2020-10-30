const express = require('express')
const app = express()  
const fn = require('./funcoes')


const path = require('path')
const way = path.join(__dirname, 'subtitles')

fn.readDirectory(way)
    .then(data => fn.getElementsWithEnd(data, '.srt'))
    .then(data => fn.replaceValue(data, '\\', '/'))
    .then(data => fn.readFiles(data))
    .then(data => data.join('\n'))
    .then(data => data.split('\n'))
    .then(data => fn.deleteSpace(data))
    .then(data => fn.removeIfIncludes(data, '-->'))
    .then(data => fn.removeIfContentNumbers(data))
    .then(console.log)
    .catch(console.log)