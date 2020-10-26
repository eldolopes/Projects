const { error } = require('console')
const fs = require('fs')
const path = require('path')

const readDirectory = () => {    
    const way = path.join(__dirname, 'subtitles')   
    let files = fs.readdirSync(way)
    return new Promise((resolve, reject) => {
        try {
            resolve(files.map(file => path.join(way, file)))            
        } catch (error) {
            reject(`Erro no processo: ${error}`)
        }
    })  
}

module.exports = {
    readDirectory
} 