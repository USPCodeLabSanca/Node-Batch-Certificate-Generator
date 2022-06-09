const fs = require('fs')
const pdf = require('dynamic-html-pdf'); //objto no sentido de instancia de classes
let path = require('path');
const csv_parser = require('./csv-parser');

const campusInfo = {
    "sanca": {
        name: "USPCodeLab São Carlos",
        president: "Gabriel Freitas Ximenes de Vasconcelos",
        vicePresident: "Raíssa Torres Barreira",
        professor: "Sarita Mazzini Bruschi"
    },
    "leste": {
        name: "USPCodeLab Leste",
        president: "Rodrigo Dorneles Ferreira de Souza",
        vicePresident: "Yago Silva",
        professor: "Daniel De Angelis Cordeiro"
    },
    "butanta": {
        name: "USPCodeLab Butanta",
        president: "Gabriel Fernandes Mota",
        vicePresident: "Luiz Carlos Costa da Silva",
        professor: "Alfredo Goldman"
    },
    "ufabc": {
        name: "CodeLab UFABC",
        president: "Não sei UFABC Presidente",
        vicePresident: "Não sei UFABC Vice",
        professor: "Não sei UFABC Professor",
    }, 
}


let info = csv_parser(path.join(__dirname,"info.csv"), "utf-8")

for (const line of info) {
    line.presidentName = campusInfo[line.campus].president
    line.professorName = campusInfo[line.campus].professor
	line.presidentRole = `Presidente do ${campusInfo[line.campus].name}`
    line.professorRole = `Prof. Tutora do ${campusInfo[line.campus].name}`
    
	//line.campusName = campusInfo[line.campus].name
	//line.campusVicePresident = campusInfo[line.campus].vicePresident
}

let templatePath = path.join(__dirname, 'template1.html');
let infoPath = [];
for (const line of info) 
	infoPath.push({info: line, path: path.join(__dirname, `certificados/${line.title}-${line.name}-${line.nusp}-${line.endYear}.pdf`)});

let html = fs.readFileSync(templatePath, 'utf8');

let options = {
    orientation: "landscape", // portrait or landscape 
    width: "30cm",
    height: "21cm"
};

// batch (processamento em lotes)
let document = {
    type: 'file',     // 'file' or 'buffer'
    template: html,
    context: '',
    path: ''   // it is not required if type is buffer
};

for(const ip of infoPath) {
	document.context = ip.info
	document.path = ip.path
	pdf.create(document, options)
		.then(res => {
			console.log(res)
		})
		.catch(error => {
			console.error(error)
		});
}