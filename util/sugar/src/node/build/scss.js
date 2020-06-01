const __parseArgs = require('../../node/cli/parseArgs');
const __appPath = require('app-root-path');
const __path = require('path');
const __parseHtml = require('../../node/terminal/parseHtml');
const __sass = require('sass');
const __chokidar = require('chokidar');
const __writeFile = require('../../node/fs/writeFile');
const __fs = require('fs');
const __postcss = require('postcss');
const __autoprefixer = require('autoprefixer');
const __precss = require('precss');
const __postcssPresetEnv = require('postcss-preset-env');
const __cssnano = require('cssnano');
const __Bundler = require('scss-bundle').Bundler;
const __sugarConfig = require('../../node/config/sugar');
const __packageRoot = require('../../node/path/packageRoot');
const __tmpDir = require('../../node/fs/tmpDir');
const __child_process = require('child_process');
const __isInPackage = require('../../node/path/isInPackage');
const __deepMerge = require('../../node/object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __glob = require('glob');

/**
 * @name                scss
 * @namespace           sugar.node.build
 * @type                Function
 *
 * This function take care of the build of scss|sass files with some nice features.
 *
 * @param         {Object}          [settings={}]         The settings object to configure the build process. Here's the list of available settings:
 * - input (<appRoot>/src/scss/*.scss): Specify the inputs files to compile. Accept glob patterns
 * - outputDir: (<appRoot>/dist/css): Specify the output folder in which to save the files in
 * - style (expanded) {String}: Specify the output style you want between nested,expanded,compact,compressed
 * - map (true) {Boolean}: Specify if you want a sourcemap to be generated or not
 * - prod (false) {Boolean}: Specify if you want a ```<filename>.prod.css``` to be generated. This file is optimized to be the smallest possible, etc...
 * - include.sugar (true) {Boolean}: Specify if you want to include automatically the sugar scss toolkit
 * - vendor.sass ({}) {Object}: Override some Sass compiler (https://www.npmjs.com/package/sass) settings if you want. Be carefull by doing this cause this function take care of setting up these followings options: data,includePaths,sourceMap,outFile
 * @return        {SPromise}                An SPromise instance on which you can subscribe for "compiled" stack as well as the normal Promise stacks like "then, catch" etc... Here's the "events" you can subscribe on:
 * - stdout.data: Triggered when a log message has to be displayed
 * - resolve: Triggered when the compilation has finished successfully
 *
 * @example       js
 * const buildScss = require('@coffeekraken/sugar/node/build/scss');
 * buildScss({
 *    input: 'my/cool/input.scss',
 *    outputDir: 'my/cool/output'
 * }).on('resolve', files => {
 *    // do something...
 * });
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

module.exports = (settings = {}) => {
  return new __SPromise(async (resolve, reject, trigger, cancel) => {
    settings = __deepMerge(__sugarConfig('build.scss'), settings);

    let inputPath = settings.input;
    let outputPath = settings.outputDir;
    const inputFolderPath = inputPath
      .split('/')
      .filter((path) => {
        if (path.includes('**') || path.includes('*') || path.includes('.'))
          return false;
        return true;
      })
      .join('/');

    // check if the input and output path are relative or not
    if (inputPath.slice(0, 1) === '.') {
      inputPath = __path.resolve(process.cwd(), inputPath);
    } else if (inputPath.slice(0, 1) !== '/') {
      inputPath = __path.resolve(__appPath.path, inputPath);
    }
    if (outputPath.slice(0, 1) === '.') {
      outputPath = __path.resolve(process.cwd(), outputPath);
    } else if (outputPath.slice(0, 1) !== '/') {
      outputPath = __path.resolve(__appPath.path, outputPath);
    }

    let scssConfigString = '';
    if (settings.include.sugar) {
      const scssConfig = await __sugarConfig('scss');
      if (scssConfig) {
      }
    }

    // get all the files to compile
    let filesToCompile = __glob.sync(inputPath);
    let compiledFiles = {};
    for (let i = 0; i < filesToCompile.length; i++) {
      await renderScss(filesToCompile[i]);
    }

    // resolve the promise with all the compiled files
    resolve(compiledFiles);

    function renderScss(path) {
      return new Promise(async (renderResolve, renderReject) => {
        const smallPath = path.replace(
          __packageRoot(process.cwd()),
          '<appRoot>'
        );
        trigger(
          'stdout.data',
          `Start building the file <yellow>${smallPath}</yellow>...`
        );
        const writingPath =
          outputPath +
          path
            .replace(inputFolderPath, '')
            .replace('.scss', '.css')
            .replace('.sass', '.css');
        const writingMapPath = writingPath.replace('.css', '.css.map');
        const smallWritingPath = writingPath.replace(
          __packageRoot(process.cwd()),
          '<appRoot>'
        );
        trigger(
          'stdout.data',
          `Bundling the files together before actually compiling them...`
        );
        const bundler = new __Bundler(undefined, inputPath);
        let bundledScssString = await (await bundler.bundle(path))
          .bundledContent;
        let importAndSetupSugar = '';
        if (settings.include.sugar) {
          importAndSetupSugar = `
            @use '@coffeekraken/sugar/index' as Sugar;
            @include Sugar.setup($sugarUserSettings);
          `;
          if (__isInPackage('@coffeekraken/sugar')) {
            const relativePath = __path.relative(
              inputFolderPath,
              __packageRoot(__dirname)
            );
            importAndSetupSugar = `
              @use '${relativePath}/index' as Sugar;
              @include Sugar.setup($sugarUserSettings);
            `;
          }
        }
        // prepend the scssConfigString if exists
        bundledScssString = `
          ${scssConfigString}
          ${importAndSetupSugar}
          ${bundledScssString}
        `;
        trigger(
          'stdout.data',
          `Start compiling the file <yellow>${smallPath}</yellow>...`
        );
        // render sass
        __sass.render(
          __deepMerge(
            {
              data: bundledScssString,
              includePaths: [
                inputFolderPath,
                `${__packageRoot(process.cwd())}/node_modules`
              ],
              sourceMap: settings.map,
              outFile: settings.map ? writingPath : null
            },
            settings.vendor.sass
          ),
          async function (err, result) {
            if (err) {
              reject(err);
              return;
            }
            const fileObj = {};
            trigger(
              'stdout.data',
              `Writing the file <yellow>${smallPath}</yellow> to <green>${smallWritingPath}</green>...`
            );
            await __writeFile(writingPath, result.css.toString());
            fileObj.css = writingPath;
            if (result.map) {
              trigger(
                'stdout.data',
                `Writing the sourcemap of the file <yellow>${smallPath}</yellow> to <green>${smallWritingPath.replace(
                  '.css',
                  '.css.map'
                )}</green>...`
              );
              await __writeFile(writingMapPath, result.map.toString());
              fileObj.map = writingMapPath;
            }
            if (settings.prod) {
              const css = __fs.readFileSync(writingPath);
              trigger(
                'stdout.data',
                `Minifying and optimizing the file <yellow>${smallPath}</yellow>...`
              );
              const postCssResult = await __postcss([
                __precss,
                __autoprefixer,
                __postcssPresetEnv,
                __cssnano
              ]).process(css, {
                from: writingPath,
                to: writingPath.replace('.css', '.prod.css')
              });
              trigger(
                'stdout.data',
                `Writing the minified/optimized file to <green>${smallWritingPath.replace(
                  '.css',
                  '.prod.css'
                )}</green>...`
              );
              __fs.writeFileSync(
                writingPath.replace('.css', '.prod.css'),
                postCssResult.css
              );
              fileObj.prodCss = writingPath.replace('.css', '.prod.css');
              if (postCssResult.map) {
                trigger(
                  'stdout.data',
                  `Writing the sourcemap of the production file to <yellow>${smallWritingPath.replace(
                    '.css',
                    '.prod.css'
                  )}</yellow> to <green>${smallWritingPath.replace(
                    '.css',
                    '.prod.css.map'
                  )}</green>...`
                );
                __fs.writeFileSync(
                  writingPath.replace('.css', '.prod.css.map'),
                  result.map
                );
                fileObj.prodMap = writingPath.replace('.css', '.prod.css.map');
              }
            }
            // add the file to the "compiledFiles" stack
            compiledFiles[path] = fileObj;
            trigger(
              'stdout.data',
              `Compilation of the file <yellow>${smallPath}</yellow> finished <green>successfully</green>!`
            );
            renderResolve(fileObj);
          }
        );
      });
    }
  }).start();
};
