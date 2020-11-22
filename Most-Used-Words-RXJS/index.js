const path = require('path')
const way = path.join(__dirname, 'subtitles')
const fn = require('./functions')

const { first, toArray } = require('rxjs/operators')

fn.readerDirectory(way)
    .pipe(
        fn.getElementsWithEnd('.srt'),
        fn.readFile(),
        fn.splitStringsBy('\n'),        
        fn.removeEmptyValue(),
        //fn.removeElementsIfIncludes('-->'),
        fn.removeElementsIfStartWithNumbens(),
        fn.removeSymblos(fn.symbols),
        fn.splitStringsBy(' '),
        fn.removeEmptyValue(),
        fn.removeElementsIfStartWithNumbens(),
        toArray(),
        fn.accElements(),
        fn.sortByAttribute('qtd')
        //first()
    )
    .subscribe(console.log)

/* const getMostWords = fn.composefunctions(
    fn.readDirectory,
    fn.getElementsWithEnd('.srt'),
    fn.replaceValue('\\', '/'),
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
    .catch(console.log) */

    
    