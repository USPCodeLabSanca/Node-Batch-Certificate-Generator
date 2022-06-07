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

/*
* csv_parser function
* 
* Parameters: filepath, encoding
*   filepath: string with the path to the csv file
*   encoding: string with the encoding used on the file
* 
* Returns an Array of dictionaries with each dictionary having the entries <key,value> of a line
*/
const csv_parser = (filepath, encoding) => {
    //Error handling
    try {
        //Gets the entire file on a string
        data = fs.readFileSync(filepath, encoding)

        var keys
        var dictionary_array = []
        
        //Standardises the line breaks
        dataLines = data.replace(/\r\n/g,'\n').split('\n')
        
        //Splits the keys and removes spaces
        keys = dataLines[0].split(',')
        dataLines.shift()

        //For each line, builds a dictionary and adds to the dictionary array
        for (const line of dataLines) {
            values = line.split(',')

            const info = new Info(values)

            dictionary_array.push(info.values)
                                                            
        }        
            
        return dictionary_array
    } catch(err) {
        console.log(err)
    }
}

module.exports = csv_parser

