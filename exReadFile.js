// .replace(/\r\n/g,'\n').split('\n')

const fs = require('fs')
let path = require('path');

let csvPath = path.join(__dirname, 'example.csv');
const charset = "utf8";
fs.readFile(csvPath, charset, (err, data)=>{
    if(err){
        console.log(err)
    } else{
        dataArray = data.replace(/\r\n/g,'\n').split('\n')
        for(line of dataArray){
            console.log("line: ", line)
        }
    }
})