let document = {
    type: 'file',     // 'file' or 'buffer'
    template: html,
    context: {
        campus: "sanca",
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
        presidentName: "Rafael Doering Soares",
        presidentRole: "Presidente do USPCodelab Sanca",
        professorName: "Sarita Mazzini Bruschi",
        professorRole: "Prof. Tutora do USPCodelab Sanca"
    },
    path: "./certificate.pdf"    // it is not required if type is buffer
};