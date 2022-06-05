// .replace(/\r\n/g,'\n').split('\n')

const fs = require('fs')
const path = require('path')

const csvPath = path.join(__dirname, "example.csv")
const encoding = "utf8"

fs.readFile(csvPath, encoding, (err, data)=>{
    if(err){
        console.log(err)
    } else{
        dataLines = data.replace(/\r\n/g,'\n').split('\n')
        for(line of dataLines){
            console.log("line: ", line)
        }
    }
})