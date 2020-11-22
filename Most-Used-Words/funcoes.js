const fs = require('fs')
const path = require('path')

const composefunctions = (...fns) => {
    return value => {
        return fns.reduce(async (acc, fn) => {
            return fn(await acc)
        }, value)
    }
}

const readDirectory = way => {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(way)
                .map(file => path.join(way, file))
            resolve(files)
        } catch (error) {
            reject(`Erro no processo: ${error}`)
        }
    })
}

const getElementsWithEnd = value => {
    return function (array) {
        return array.filter(el => el.endsWith(value))
    }
}

const replaceValue = (value, newvalue) => {
    return function (array) {
        return array.map(el => el.split(value).join(newvalue))
    }
}

const arrayToString = data => data.join(' ')

const splitStringsBy = value => {
    return function (data) {
        return data.split(value)
    }
}

const readFile = way => {
    return new Promise((resolve, reject) => {
        try {
            const data = fs.readFileSync(way, { encoding: 'utf-8' })
            resolve(data.toString())
        } catch (err) {
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
    return function (array) {
        return array.filter(el => !el.includes(value))
    }
}

const removeElementsIfContentNumbers = array => {
    return array.filter(el => {
        let num = parseInt(el.trim())
        return num !== num
    })
}

const symbols = [
    '.', ',', '/', '?', ';', ':', '~', '^',
    '{', '}', '[', ']', '=', '+', '-', '_',
    '(', ')', '*', '&', '¨', '%', '$', '#',
    '@', '!', '"', 'º', 'ª', '§', '¬', '¢',
    '£', '³', '²', '¹', '<i>', '<\i>', '\r',
    '♪', '"', 
]

const removeSimbols = symbols => {
    return function (array) {
        return array.map(el => {
            return symbols.reduce((acc, data) => {
                return acc.split(data).join('')
            }, el)
        })
    }
}

const accElements = data => {
    return Object.values(data.reduce((acc, value) => {
        const el = value.toLowerCase()
        const qtd = acc[el] ? acc[el].qtd + 1 : 1
        acc[el] = { element: el, qtd }        
        return acc
    }, {}))
}

const sortByAttr = (attr, order = 'desc') => {
    return function (array) {
        const asc = (o1, o2) => o1[attr] - o2[attr]
        const desc = (o1, o2) => o2[attr] - o1[attr]
        return array.sort(order === 'desc' ? desc : asc)
    }
}

module.exports = {
    composefunctions,
    readDirectory,
    getElementsWithEnd,
    replaceValue,
    arrayToString,
    splitStringsBy,
    readFiles,
    deleteSpace,
    removeElementsIfIncludes,
    removeElementsIfContentNumbers,
    removeSimbols,
    symbols,
    accElements,
    sortByAttr
} 