const fs = require('fs')
const path = require('path')
const { Observable } = require('rxjs')


const readerDirectory = way => {
    return new Observable(subscriber => {
        try {
            fs.readdirSync(way).forEach(file => {
                subscriber.next(path.join(way, file))  
            })
            subscriber.complete()
        } catch (e) {
            subscriber.error(e)
        }
    })
}

const createPipeOperator = operatorFn => {
    return source => {
        return new Observable(subscriber => {
            const sub = operatorFn(subscriber)
            source.subscribe({
                next: sub.next,
                error: sub.error || (e => subscriber.error(e)),
                complete: sub.complete || (() => subscriber.complete())
            })
        })
    }
}

const getElementsWithEnd = value => {
    return createPipeOperator(subscriber => ({
        next(data) {
            if (data.endsWith(value)) {
                subscriber.next(data)
            }
        }
    }))
}

const readFile = () => {
    return createPipeOperator(subscriber => ({
        next(way) {
            try {
                const data = fs.readFileSync(way, { encoding: 'utf-8' })
                subscriber.next(data.toString())
            } catch (error) {
                subscriber.error(error)
            }
        }
    }))
}

const splitStringsBy = value => {
    return createPipeOperator(subscriber => ({
        next(data) {
            data.split(value).forEach(el => {
                subscriber.next(el)
            })            
        }
    }))
}

const removeEmptyValue = () => {
    return createPipeOperator(subscriber => ({
        next(data) {
            if (data.trim()) {
                subscriber.next(data)
            }            
        }
    }))
}

const removeElementsIfIncludes = value => {
    return createPipeOperator(subscriber => ({
        next(data) {
            if (!data.includes(value)) {
                subscriber.next(data)
            }            
        }
    }))
}

const removeElementsIfStartWithNumbens = () => {
    return createPipeOperator(subscriber => ({
        next(data) {
            const num = parseInt(data.trim())
            if (num !== num) {
                subscriber.next(data)
            }           
        }
    }))
}

const symbols = [
    '.', ',', '/', '?', ';', ':', '~', '^',
    '{', '}', '[', ']', '=', '+', '-', '_',
    '(', ')', '*', '&', '¨', '%', '$', '#',
    '@', '!', '"', 'º', 'ª', '§', '¬', '¢',
    '£', '³', '²', '¹', '<i>', '<\i>', '\r',
    '♪', '"', 
]

const removeSymblos = symbols => {
    return createPipeOperator(subscriber => ({
        next(data) {
            const res = symbols.reduce((acc, symbol) => {
                return acc.split(symbol).join('')
            }, data)
            subscriber.next(res)
        }
    }))
}

const accElements = () => {
    return createPipeOperator(subscriber => ({
        next(data) {
            const res = Object.values(data.reduce((acc, value) => {
                const el = value.toLowerCase()
                const qtd = acc[el] ? acc[el].qtd + 1 : 1
                acc[el] = { element: el, qtd }  
                return acc                            
            }, {}))
            subscriber.next(res)   
        }
    }))
}

const sortByAttribute = (attr, order = 'desc') => {
    return createPipeOperator(subscriber => ({
        next(data) {
            const asc = (o1, o2) => o1[attr] - o2[attr]
            const desc = (o1, o2) => o2[attr] - o1[attr]
            const res = data.sort(order === 'desc' ? desc : asc)
            subscriber.next(res)
        }
    }))
}

module.exports = {
    readerDirectory,
    getElementsWithEnd,
    readFile,
    splitStringsBy,
    removeEmptyValue,
    removeElementsIfIncludes,
    removeElementsIfStartWithNumbens,
    symbols,
    removeSymblos,
    accElements,
    sortByAttribute
}