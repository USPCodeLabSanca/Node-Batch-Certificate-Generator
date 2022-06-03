const fs = require('fs');
let path = require('path');

const filePath = path.join(__dirname, 'data.csv')
console.log(filePath)

// https://stackoverflow.com/questions/6831918/node-js-read-a-text-file-into-an-array-each-line-an-item-in-the-array
// .replace(/\r\n/g,'\n').split('\n')

fs.readFile(filePath, 'utf8', (err, data)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(data)
})