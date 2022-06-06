const csv_parser = require('./csv-parser')
const path = require('path')

console.log(csv_parser(path.join(__dirname,'data.csv'),'utf8'))
console.log(csv_parser(path.join(__dirname,'example.csv'),'utf8'))
