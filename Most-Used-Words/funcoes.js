const fs = require('fs')
const path = require('path')

const readDirectory = way => {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(way).map(file => path.join(way, file))
            resolve(files)
        } catch (error) {
            reject(`Erro no processo: ${error}`)
        }
    })
}

const getElementsWithEnd = value => {
    return function(array){
        return array.filter(el => el.endsWith(value))
    }
}

const replaceValue = (value, newvalue) => {
    return function(array){
        return array.map(el => el.split(value).join(newvalue))
    }
}

const addArrayInString = data => data.join('\n')

const stringInSubstringList = data => data.split('\n')

const readFile = way => {
    return new Promise((resolve, reject) => {
        try {
            const data = fs.readFileSync(way, { encoding: 'utf-8' })
            resolve(data.toString())
        } catch(err) {
            reject(`Erro ao ler arquivo: ${err}`)
        }
    })
}
const readFiles = ways => {
    return Promise.all(ways.map(data => readFile(data)))
}

const deleteSpace = array => {
    return array.filter(el => el.trim())
}

const removeElementsIfIncludes = value => {
    return function(array){
        return array.filter(el => !el.includes(value))
    }
}

const removeElementsIfContentNumbers = array => {
    return array.filter(el => {
        let num = parseInt(el.trim())
        return num !== num
    })
}

const removeSimbols = array => {
    return array.map(el => {
        let simbol = /[.,\/#!?$%\^&\*;:{}=\-_`"~()\r/0-9/<i></i>/♪/]/g
        return el.replace(simbol, '').trim()
    })
}

module.exports = {
    readDirectory,
    getElementsWithEnd,
    replaceValue,
    addArrayInString,
    stringInSubstringList,
    readFiles,
    deleteSpace,
    removeElementsIfIncludes,
    removeElementsIfContentNumbers,
    removeSimbols, 
} 