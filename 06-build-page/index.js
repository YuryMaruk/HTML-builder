const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { mkdir } = require('node:fs/promises');
const { rm } = require('node:fs/promises');
const { copyFile } = require('node:fs/promises');

const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToStyles = path.join(__dirname, 'styles');
const pathToStyle = path.join(__dirname, 'project-dist', 'style.css');
const pathToAssets = path.join(__dirname, 'assets');

makeDirectory(pathToProjectDist); 


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
        containFiles(pathToStyles, 'css', pathToStyle);
        await mkdir(path.join(src, 'assets'), { recursive: false });
        cloneFile(pathToAssets, path.join(src, 'assets'));
    } catch {
        console.log('dir already created');
        await removeDir(src);
        console.log('dir already deleted');
        await mkdir(src, { recursive: false });
        containFiles(pathToStyles, 'css', pathToStyle);
        await mkdir(path.join(src, 'assets'), { recursive: false });
        cloneFile(pathToAssets, path.join(src, 'assets'));
        //добавить копирование ассетов
    }
}

async function createDir(src){
    try {
        await mkdir(src, { recursive: false });
     
    } catch {
        console.log('dir already created in assets');
       
    }
}

async function cloneFile(path1, path2) {
    let items = await readdir(path1, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
    })

    items.forEach(file => {
        if (file.isDirectory()) {
            createDir(path.join(path2, file.name));
            cloneFile(path.join(path1, file.name), path.join(path2, file.name));
        } else {
            try {
                copyFile(path.join(path1, file.name),  path.join(path2, file.name));
              } catch {
                console.log('The file could not be copied');
              }
        }
    });
}
async function removeDir(src) {
    try {
        await rm(src, { recursive: true, force: true });
        console.log('removing')
    } catch {
        console.log('не получилось удалить папку')
    }
}