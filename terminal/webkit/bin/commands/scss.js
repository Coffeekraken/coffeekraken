const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __sass = require('sass');
const __globImporter = require('sass-glob-importer');
const __fs = require('fs');
const __path = require('path');
const __Bundler = require("scss-bundle").Bundler;
const __glob = require('glob');

module.exports = async () => {

  __log(`Generating the css file(s)...`, 'info');

  // Absolute project directory path.
  const projectDirectory = process.cwd();
  const bundler = new __Bundler(undefined, projectDirectory);

  const sourceFiles = __glob.sync(__path.resolve(__config.dist.css.sourceFolder + '/' + __config.dist.css.sourceFilesPattern));

  sourceFiles.forEach(async (srcFile) => {

    __log(`Compiling the "${srcFile.replace(process.cwd(), '')}" file...`, 'info');

    // Relative file path to project directory path.
    const result = await bundler.bundle(srcFile);

    __fs.writeFileSync(__path.resolve(__dirname, '../../.resources/bundledcss.scss'), result.bundledContent);

    if (__config.dist.css.importGlobPattern) {

      __fs.appendFileSync(__path.resolve(__dirname, '../../.resources/bundledcss.scss'), `
        /**
         * Glob import
         * Import some files defines in the __config.dist.css.importGlobPattern
         */
        @import '${__config.dist.css.importGlobPattern}';
      `);

    }

    __sass.render({
      file: __path.resolve(__dirname, '../../.resources/bundledcss.scss'),
      outputStyle: __config.dist.css.style || 'compressed',
      includePaths: __config.dist.css.loadPaths || ['node_modules'],
      importer: __globImporter()
    }, (error, result) => {
        if(!error){

          const outputFilePath = srcFile.replace(__config.dist.css.sourceFolder, __config.dist.css.outputFolder).replace('scss','css').replace('sass','css');

          try {
            __fs.unlinkSync(outputFilePath);
          } catch(e) {}

          // No errors during the compilation, write this result on the disk
          __fs.writeFileSync(outputFilePath, result.css.toString());

          __log(`The "${outputFilePath.replace(process.cwd(), '')}" file has been successfully compiled.`, 'success');
        } else {
          __log(error, 'error');
        }
    });

  });

};
