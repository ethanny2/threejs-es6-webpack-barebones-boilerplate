/*
    Run via Package.json script; compresses all .gtlf models
    via draco compression to reduce asset size. Done via
    glft-pipeline package.
*/
const fs = require('fs');
const path = require('path');
const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const processGltf = gltfPipeline.processGltf;
// const gltf = fsExtra.readJsonSync('model.gltf');
// const gltf;
const options = {
  dracoOptions: {
    compressionLevel: 10
  }
};
const modelsPathBase = './src/static/models/';
fs.readdir(modelsPathBase, function(err, files) {
  if (err) {
    console.error('Unable to search directory for models.', err);
    process.exit(1);
  }
  files.forEach(function(file, idx) {
    const currentFilePath = path.join(modelsPathBase, file);
    fs.stat(currentFilePath, function(err, stat) {
      if (err) {
        console.error('Error opening file.', err);
        return;
      }
      if (stat.isDirectory()) {
        console.log(`Found a directory at ${currentFilePath}!`);
        // Look in this directory for .gtlf
        fs.readdir(currentFilePath, function(err, files) {
          files.forEach((file, idx) => {
            if (path.extname(file) === '.gltf') {
              console.log('Found gltf file and read it!');
              const nestedFiles = path.join(currentFilePath, file);
              console.log((nestedFiles));
              let gltf = fsExtra.readJsonSync(nestedFiles);
              processGltf(gltf, options).then(function(results) {
                fsExtra.writeJSONSync('dracoScene.gltf', results.gltf);
              });
            }
          });
        });
      }
    });
  });
});
