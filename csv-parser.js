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
const csv_parser = (filepath,encoding) => {
    //Error handling
    try {
        //Gets the entire file on a string
        data = fs.readFileSync(filepath, encoding)

        var keys
        var dictionary_array = []
        
        //Standardises the line breaks
        dataLines = data.replace(/\r\n/g,'\n').split('\n')
        
        //Splits the keys and removes spaces
        keys = dataLines[0].replace(/ /g,'').split(',')
        dataLines.shift()

        //For each line, builds a dictionary and adds to the dictionary array
        for(const line of dataLines) {
            var dictionary = {}
            values = line.split(',')
            
            for(let i = 0; i < values.length; i++)
                dictionary[keys[i]] = values[i]                
            dictionary_array.push(dictionary)                                     
        }        
            
        return dictionary_array
    } catch(err) {
        console.log(err)
    }
}

module.exports = csv_parser

