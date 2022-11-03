const fs = require('fs');
const path = require('path');

const pathToReadableFile  = path.join(__dirname, 'text.txt');
const readFile = fs.createReadStream(pathToReadableFile, 'utf-8');
readFile.on('data', chunk => console.log(chunk));
