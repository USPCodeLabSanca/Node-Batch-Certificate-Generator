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
        professor: "Não sei UFABC Professor"
    }
}

let context = {
    campus: campusInfo.sanca.name,
    title: "dev.learn(2019.1)",
    name: "Nome Sobrenome",
    nusp: "00000000",
    startDay: "14",
    startMonth: "Março",
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