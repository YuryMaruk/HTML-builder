const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { mkdir } = require('node:fs/promises');
const { rm } = require('node:fs/promises');
const { copyFile } = require('node:fs/promises');

const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToStyles = path.join(__dirname, 'styles');
const pathToStyle = path.join(__dirname, 'project-dist', 'style.css');

makeDirectory(pathToProjectDist);
containFiles(pathToStyles, 'css', pathToStyle); //contain and redirict .css files to 'project-dist' folder


async function containFiles(src, extName, srcTo) {
    let writeFile;
    try {
        writeFile = fs.createWriteStream(srcTo);
    } catch {
        console.log('error creating write stream');
    }

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

async function makeDirectory(src) {

    try {
        await mkdir(src, { recursive: false });
    } catch {
        console.log('dir already created');
        await removeDir(src);
        console.log('dir already deleted');
        await mkdir(src, { recursive: false });
        containFiles(pathToStyles, 'css', pathToStyle);
    }
}

async function cloneFile(path1, path2) {
    try {
        await copyFile(path1, path2);
    } catch {
        console.log('The file could not be copied');
    }
}
async function removeDir(src) {
    try {
        await rm(src, { recursive: true, force: true });
        console.log('removing')
    } catch {
        console.log('не получилось удалить папку')
    }
}