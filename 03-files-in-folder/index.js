const path = require('path');
const fs = require('fs');

const pathToSecret = path.join(__dirname, 'secret-folder');

fs.readdir(pathToSecret, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (!file.isDirectory()) {
            let arr = [];
            arr = file.name.split('.');
            fs.stat(path.join(pathToSecret, file.name), (err, stats) => {
                if (err) throw err;
                let size = stats.size / 1000 + 'kb';

                console.log(`${arr[0]} - ${arr[1]} - ${size}`);
            })
        }
    });
});

