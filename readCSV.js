class Info {
    #values

    constructor(line) {
        this.#values = {}

        this.#values.campus = line[0];
        this.#values.title = line[1];
        this.#values.name = line[2];
        this.#values.nusp = line[3];
        this.#values.startDay = line[4];
        this.#values.startMonth = line[5];
        this.#values.startYear = line[6];
        this.#values.endDay = line[7];
        this.#values.endMonth = line[8];
        this.#values.endYear = line[9];
        this.#values.totalHours = line[10];
    }

    get values() {
        return this.#values;
    }

}

const fs = require('fs')
const path = require('path')
const csvPath = path.join(__dirname, "info.csv")
const encoding = "utf8"

function readCSV() {
    let lista = []

    try {
        const data = fs.readFileSync(csvPath, encoding) // Faz a leitura do arquivo
        
        const lines = data.replace(/\r\n/g,'\n').split('\n') 

        for (let i = 1; i < lines.length; i++) { // Passa para o objeto as informações de cada linha do csv
            const line = lines[i].split(',')
            const info = new Info(line)

            lista.push(info.values)
        }

        return lista // Retorna a lista de objetos
        
    } catch (err) {
        console.log(err)
    }
}

lista = readCSV()

for (const el of lista) {
    console.log(el)
}