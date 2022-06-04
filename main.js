const fs = require('fs')
const pdf = require('dynamic-html-pdf');
let path = require('path');

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

const months = {
    1: "Janeiro",
    2: "Fevereiro"
}

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
    presidentRole: `Presidente do ${campusInfo.sanca.name}`,
    professorName: campusInfo.sanca.professor,
    professorRole: `Prof. Tutora do ${campusInfo.sanca.name}`
}

console.log(context)
console.log(months)

let templatePath = path.join(__dirname, 'template.html');

let html = fs.readFileSync(templatePath, 'utf8');

let options = {
    orientation: "portrait",
    width: "30cm",
    height: "21cm"
};

let document = {
    type: 'file',     // 'file' or 'buffer'
    template: html,
    context: context,
    path: "./certificate.pdf"    // it is not required if type is buffer
};

pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });