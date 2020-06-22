const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __sass = require('sass');
const __globImporter = require('sass-glob-importer');
const __fs = require('fs');
const __path = require('path');
const __Bundler = require("scss-bundle").Bundler;
const __glob = require('glob');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __autoprefixer = require('autoprefixer');
const __postcss = require('postcss');
const __precss = require('precss');
const __postcssPresetEnv = require('postcss-preset-env');
const __cssnano = require('cssnano');
const __rucksack = require('rucksack-css');

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
          const css = result.css.toString();

          try {
            __fs.unlinkSync(outputFilePath);
          } catch(e) {}

          __log('Writing the output raw css file...', 'info');
          // No errors during the compilation, write this result on the disk
          try {
            __writeFileSync(outputFilePath, css);
          } catch(e) {
            __log(e, 'error');
          }

          __log('Processing the output css using PostCSS and some plugins (precss, autoprefixer, postcss-preset-env, cssnext, cssnano and rucksack-css)...', 'info');

          // pass postcss with some useful plugins
          __postcss([
            __precss,
            __autoprefixer,
            __postcssPresetEnv,
            __cssnano,
            __rucksack
          ]).process(css, {
            from: outputFilePath,
            to: outputFilePath
          }).then(result => {
            __log('Writing the output processed css file...', 'info');
            __writeFileSync(outputFilePath, result.css);
          });

          __log(`The "${outputFilePath.replace(process.cwd(), '')}" file has been successfully compiled.`, 'success');
        } else {
          __log(error, 'error');
        }
    });

  });

};
