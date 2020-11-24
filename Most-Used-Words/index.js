const path = require('path')
const way = path.join(__dirname, 'subtitles')
const fn = require('./funcoes')

const getMostWords = fn.composefunctions(
    fn.readDirectory,
    fn.getElementsWithEnd('.srt'),
    fn.readFiles,
    fn.arrayToString,
    fn.splitStringsBy('\n'),
    fn.deleteSpace,
    fn.removeElementsIfIncludes('-->'),
     fn.removeElementsIfIncludes('<b>'),
    fn.removeElementsIfIncludes('www'),
    fn.removeElementsIfContentNumbers,
    fn.removeSimbols(fn.symbols),
    fn.arrayToString,
    fn.splitStringsBy(' '),
    fn.deleteSpace,
    fn.removeElementsIfContentNumbers,
    fn.accElements,
    fn.sortByAttr('qtd'),
)

 getMostWords(way)   
    .then(console.log)
    .catch(console.log)

    
    