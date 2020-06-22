// coffeekraken-imagemin -s src/img -o dist/img -q 80

const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __getSize = require('get-folder-size');
const { execSync } = require('child_process');
const __processPath = require('./processPath');
const __path = require('path');

module.exports = (cwd = process.cwd()) => {

  const sourceFolder = __processPath(__config.dist.img.sourceFolder);
  const outputFolder = __processPath(__config.dist.img.outputFolder);

  __log(`Getting the source folder "${sourceFolder}" size...`, 'info');

  __getSize(cwd + '/' + sourceFolder, (e, sourceFolderSize) => {

    __log(`Compressing images from folder "${sourceFolder}"...`, 'info');

    try {
      execSync(`${__path.resolve(__dirname + '/../../node_modules/@coffeekraken/imagemin/bin/coffeekraken-imagemin.js')} -s ${sourceFolder} -o ${outputFolder} -q ${__config.dist.img.quality}`, {
          cwd: cwd
      });
    } catch(error) {

      if (error) {
        __log(error, 'error');
        process.exit();
      }

    }

    __log(`The images have been optimized.`, 'success');

    __log(`Getting the output folder "${outputFolder}" size...`, 'info');

    __getSize(cwd + '/' + outputFolder, (e, outputFolderSize) => {

      __log(`The output folder make "${(outputFolderSize / 1024 / 1024).toFixed(2)}MB" and the source folder make "${(sourceFolderSize / 1024 / 1024).toFixed(2)}MB".`, 'success');

    });

  });

}
