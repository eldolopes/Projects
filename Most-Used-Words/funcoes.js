const fs = require('fs')
const path = require('path')

const readDirectory = (way) => {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(way).map(file => path.join(way, file))
            resolve(files)
        } catch (error) {
            reject(`Erro no processo: ${error}`)
        }
    })
}

const elementsEndWith = (array, padrao) => {
    return array.filter(el => el.endsWith(padrao))
}

const replaceValue = (array, value, newvalue) => {
    return array.map(el => el.split(value).join(newvalue))
}

const readFile = (way) => {
    return new Promise((resolve, reject) => {
        try {
            const data = fs.readFileSync(way, { encoding: 'utf-8' })
            resolve(data.toString())
        } catch(err) {
            reject(`Erro ao ler arquivo: ${err}`)
        }
    })
}
const readFiles = (ways) => {
    return Promise.all(ways.map(data => readFile(data)))
}

module.exports = {
    readDirectory,
    elementsEndWith,
    replaceValue,
    readFiles
} 