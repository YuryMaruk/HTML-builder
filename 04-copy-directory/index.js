
const path = require('path');
const fs = require('fs');
const { mkdir } = require('node:fs/promises');
const { copyFile } = require('node:fs/promises');

const pathToFiles = path.join(__dirname, 'files');
const projectFolder = path.join(__dirname, 'files-copy');

makeDirectory();

async function makeDirectory() {

  try {
    const dirCreation = await mkdir(projectFolder, { recursive: false });
    createCopy();
  
  } catch {
    remover();
    createCopy();
  }
}

async function cloneFile(path1, path2) {
  try {
    await copyFile(path1, path2);
  } catch {
    console.log('The file could not be copied');
  }
}

function createCopy(){
  fs.readdir(pathToFiles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
  
    files.forEach(file => {
      cloneFile(path.join(pathToFiles, file.name), path.join(projectFolder, file.name))
    });
  });
}

function remover(){
  fs.readdir(projectFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
  
    files.forEach(file => {
      fs.unlink(path.join(projectFolder, file.name), err => {
        if(err) throw err;
      })
    });
  });
}