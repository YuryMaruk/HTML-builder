const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const pathToFile = path.join(__dirname, 'text.txt');

fs.writeFile(pathToFile,
    'Hello, enter text...', (err) => {
        if (err) throw err;
    });

const readAbleFile = fs.createReadStream(pathToFile, 'utf-8');
readAbleFile.on('data', chunk => console.log(chunk));
stdin.on('data', data => {
    let str = data.toString();
    if (str.slice(0, 4) === 'exit') {
        process.exit();
    } else {
        fs.appendFile(pathToFile, data, (err) => {
            if (err) throw err;
        })
    }
})

process.on('SIGINT', () => {
    deleteFile(pathToFile);
    process.exit();
})

process.on('exit', () => {
   deleteFile(pathToFile);
    stdout.write('Bye-bye!')
});

function deleteFile(path){
    fs.unlink(path, (err) => {
        if (err) throw err;
    })
}





