// Um dicionario/objecto/map/hashmap contem uma chave e um valor. 
// Cada chave é UNICA. mas podem haver valores repetidos. 
// "chave": "valor"
// Na chave você pode usar string ("chave") ou colocar direto string se for do tipo string
// Se for numerico ou outro tipo não da certo

/*
Você terá duas funções, uma para ler UMA linha do csv e outra para ler TODAS.
A função que le todas chama a função que le uma

// Você pode fazer uma classe se assim achar melhor. 
const readAllCsvLines = function(){
    // chamar fs
    // quebrar em array de linhas
    // passar uma linha do array pra readCsvLine(csvLine)
    allLinesData = []
    // chamar até len de csvArray
    const line = readCsvLine()
    allLinesData.push()
    
    return csvData
}

const readCsvLine(csvLine){
    const csvData = {
        campus: "campus extraido pela sua função",
        ....
    }

    return csvData
}
    
*/

const campusInfo = {
    "sanca": {
        name: "USPCodeLab São Carlos",
        president: "Gabriel Freitas Ximenes de Vasconcelos",
        vicePresident: "Raíssa Torres Barreira",
        professor: "Sarita Mazzini Bruschi"
    },
    "leste": {
        name: "USPCodeLab Leste",
        president: "Não sei Leste Presidente",
        vicePresident: "Não sei Leste Vice",
        professor: "Não sei Leste Professor"
    },
    "butanta": {
        name: "USPCodeLab Butanta",
        president: "Não sei Butanta Presidente",
        vicePresident: "Não sei Butanta Vice",
        professor: "Não sei Butanta Professor"
    },
    "ufabc": {
        name: "CodeLab UFABC",
        president: "Não sei UFABC Presidente",
        vicePresident: "Não sei UFABC Vice",
        professor: "Não sei UFABC Professor",
    }, 
}

// Se quiser pode completar esse objeto com 1..12 e seus meses equivalentes
// Assim no CSV a pessoa podera escrever 1 ao invés de Janeiro no campo
// E no objecto context você poderá acessar como months.1 ao inves de months.janeiro
const months = {
    1: "Janeiro",
    2: "Fevereiro"
    //...
}

// IMPLEMENTAR FUNÇÃO getCertificatePdf(title, name, nusp...) e pegar os valores dos campos do argumento. 
// Você pode fazer isso passando varios argumentos
// Ou você pode usar um objeto 
let context = {
    campus: campusInfo.sanca.name,
    title: "dev.learn(2019.1)",
    name: "Nome Sobrenome",
    nusp: "00000000",
    startDay: "14",
    startMonth: "Março", //substituir por months.3
    startYear: "2019",
    endDay: "25",
    endMonth: "Maio",
    endYear: "2019",
    totalHours: "50",
    presidentName: campusInfo.sanca.president,
    // Sintaxe do template literals, uma maneira boa de se construir strngs em js. 
    // Utiliza crase `` e dentro da crase
    // variaveis externas são acessadas entre ${}
    presidentRole: `Presidente do ${campusInfo.sanca.name}`,
    professorName: campusInfo.sanca.professor,
    professorRole: `Prof. Tutora do ${campusInfo.sanca.name}`
}

console.log(context)
console.log(months)