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

const deleteSpace = () => {
    return createPipeOperator(subscriber => ({
        next(data) {
            subscriber.next(data.trim())
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

const removeElementsIfContentNumbens = () => {
    return createPipeOperator(subscriber => ({
        next(data) {
            let num = parseInt(data.trim())
            if (num !== num) {
                subscriber.next(data)
            }           
        }
    }))
}

module.exports = {
    readerDirectory,
    getElementsWithEnd,
    readFile,
    splitStringsBy,
    deleteSpace,
    removeElementsIfIncludes,
    removeElementsIfContentNumbens
}