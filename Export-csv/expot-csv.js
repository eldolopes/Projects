const mysql = require('mysql')

const { Console } = require('console')
//ESTABELECE A CONEXÃO COM O BANCO DE DADOS
const connetion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const fs = require('fs')
//CRIA UM ARQUIVO EM STREAM PARA SER ESCRITO
const writeCSV = fs.createWriteStream('cadastro.cvs')
//ADICIONADO O 'ID' E 'NOME' NO CABEÇALHO DO ARQUIVO (O '\n' É PRA PASSAR PRA LINHA DE BAIXO)
writeCSV.write('id,nome\n', () => {
    //CONECTA AO CONTEUDO DE 'PESSOAS' DENTRO DA TABELA E PASSAR PARA UMA VARIAVEL
    connetion.connect((err) => {
        const query = connetion.query('SELECT * FROM pessoas')
        //PEGA O RESULTADO DA CONEXÃO DE 'PESSOAS'  E JOGA DENTRO DA VARIAVEL 'writeCSV' QUE VAI GERAR UM ARQUIVO COM A FUNÇÃO 'CREATEWRITESTREAM'
        query.on('result', (conteudo) => {
            //PAUSA A CONEXÃO PARA DAR TEMPO DE ENTRAR O CONTEUDO EM CACHE CASO SEJA PESADO
            connetion.pause()
            //PAREMETRO PARA ORGANOZAÇÃO DOS DADOS DENTRO COM BUSCA DO 'ID', 'NOME' e 'CARGO'
            const formatoDados = conteudo.id+','+conteudo.nome+','+conteudo.cargo+'\n' 
            //'JSON.stringify(contaudo)' NO LUGAR DE 'formatoDados' TRASNFORMA O CONTEUDO EM STRING PARA LEITURA, PORÊM FICA SEM ORDEM
            writeCSV.write(formatoDados, () => {
                //TIRA A PAUSE PARA COPIAR O PROXIMO
                connetion.resume()                
            })            
        })        
        //FECHA A CONEXÃO APÓS PEGAR OS DADOS
        query.on('end', () =>{
            writeCSV.end()
            connetion.end()
            console.log('Dados copiados')
        })
    })   
})
