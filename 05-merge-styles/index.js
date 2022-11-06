const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const styles = path.join(__dirname, 'styles');

containFiles(styles, 'css', bundle);

async function containFiles(src, extName, srcTo) {

    const writeFile = fs.createWriteStream(srcTo);

    let items = await readdir(src, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
    })

    items.forEach(file => {
        if (!file.isDirectory()) {
            let arr = [];
            arr = file.name.split('.');
            if (arr[1] === extName) {
                const readFile = fs.createReadStream(path.join(src, file.name), 'utf-8');
                readFile.pipe(writeFile);
            }
        }
    });
} 