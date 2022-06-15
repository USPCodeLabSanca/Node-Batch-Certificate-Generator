const fs = require('fs')
const pdf = require('dynamic-html-pdf'); //objto no sentido de instancia de classes
let path = require('path');
const csv_parser = require('./csv-parser');

const campusInfo = {
    "sanca": {
        name: "USPCodeLab São Carlos",
        president: "Gabriel Freitas Ximenes de Vasconcelos",
        vicePresident: "Raíssa Torres Barreira",
        professor: "Sarita Mazzini Bruschi",
        image: "https://i.imgur.com/rhS164j.png",
        presidentSign: "https://i.imgur.com/wskh0W1.png",
        professorSign: "https://i.imgur.com/wskh0W1.png"
    },
    "leste": {
        name: "USPCodeLab Leste",
        president: "Rodrigo Dorneles Ferreira de Souza",
        vicePresident: "Yago Silva",
        professor: "Daniel De Angelis Cordeiro",
        image: "https://i.imgur.com/F40DizY.png", 
        presidentSign: "https://i.imgur.com/wskh0W1.png",
        professorSign: "https://i.imgur.com/wskh0W1.png"
    },
    "butanta": {
        name: "USPCodeLab Butanta",
        president: "Gabriel Fernandes Mota",
        vicePresident: "Luiz Carlos Costa da Silva",
        professor: "Alfredo Goldman",
        image: "https://i.imgur.com/5AXmSZK.png",
        presidentSign: "https://i.imgur.com/wskh0W1.png",
        professorSign: "https://i.imgur.com/wskh0W1.png"
    },
    "ufabc": {
        name: "CodeLab UFABC",
        president: "Não sei UFABC Presidente",
        vicePresident: "Não sei UFABC Vice",
        professor: "Não sei UFABC Professor",
        presidentSign: "https://i.imgur.com/wskh0W1.png",
        professorSign: "https://i.imgur.com/wskh0W1.png"
    }, 
}


let info = csv_parser(path.join(__dirname,"info.csv"), "utf-8")


for (const line of info) {
    line.campusName = campusInfo[line.campus].name
    line.campusPresident = campusInfo[line.campus].president
    line.campusVicePresident = campusInfo[line.campus].vicePresident
    line.campusProfessor = campusInfo[line.campus].professor
    line.campusImage = campusInfo[line.campus].image
    line.presidentSign = campusInfo[line.campus].presidentSign
    line.professorSign = campusInfo[line.campus].professorSign
}

let templatePath = path.join(__dirname, 'template.html');
let infoPath = [];
for (const line of info) 
	infoPath.push({info: line, path: path.join(__dirname, `certificados/${line.title}-${line.name}-${line.nusp}-${line.endYear}.pdf`)});


let html = fs.readFileSync(templatePath, 'utf8');

let options = {
    orientation: "landscape", // portrait or landscape 
    width: "30cm",
    height: "21cm"
};

let document = {
    type: 'file',     // 'file' or 'buffer'
    template: html,

    context: '',
    path: ''   // it is not required if type is buffer

};

let start = Date.now()

const promise_array = []
for(const ip of infoPath) {
	document.context = ip.info
	document.path = ip.path
	const promise = new Promise(() => pdf.create(document, options)
		.then(res => {
            let end = Date.now()
            console.log(end-start);
			//console.log(res)
		})
		.catch(error => {
			console.error(error)
		}))
    promise_array.push(promise)
}
Promise.all(promise_array)
let end = Date.now()
console.log(end-start, "miliseconds");