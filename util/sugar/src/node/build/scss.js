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

/**
 * @name                scss
 * @namespace           sugar.node.build
 * @type                Function
 *
 * This function take care of the build of scss|sass files with some nice features like watching files for changes, etc...
 *
 * @param         {Object}          [settings={}]         The settings object to configure the build process. Here's the list of available settings:
 * - input (<appRoot>/src/scss/*.scss): Specify the inputs files to compile. Accept glob patterns
 * - output: (<appRoot>/dist/css): Specify the output folder in which to save the files in
 * - watch (false) {Boolean}: Specify if you want to watch the files to compile them automatically on changes
 * - style (expanded) {String}: Specify the output style you want between nested,expanded,compact,compressed
 * - map (true) {Boolean}: Specify if you want a sourcemap to be generated or not
 * - prod (false) {Boolean}: Specify if you want a ```<filename>.prod.css``` to be generated. This file is optimized to be the smallest possible, etc...
 * - vendor.sass ({}) {Object}: Override some Sass compiler (https://www.npmjs.com/package/sass) settings if you want. Be carefull by doing this cause this function take care of setting up these followings options: data,includePaths,sourceMap,outFile
 * @return        {SPromise}                An SPromise instance on which you can subscribe for "compiled" stack as well as the normal Promise stacks like "then, catch" etc...
 *
 * @example       js
 * const buildScss = require('@coffeekraken/sugar/node/build/scss');
 * buildScss({
 *    input: 'my/cool/input.scss',
 *    output: 'my/cool/output',
 *    watch: true
 * }).on('compiled', file => {
 *    // do something...
 * });
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (settings = {}) => {
  return new __SPromise(
    async (resolve, reject, trigger, cancel) => {
      settings = __deepMerge(
        {
          input:
            (await __sugarConfig('cli.build.scss.input')) ||
            `${__appPath.path}/src/scss/[^_]*.scss`,
          output:
            (await __sugarConfig('cli.build.scss.output')) ||
            `${__appPath.path}/dist/css`,
          watch: (await __sugarConfig('cli.build.scss.watch')) || false,
          style: (await __sugarConfig('cli.build.scss.style')) || 'expanded',
          map: await __sugarConfig('cli.build.scss.map'),
          prod: await __sugarConfig('cli.build.scss.prod'),
          include: {
            sugar:
              (await __sugarConfig('cli.build.scss.include.sugar')) ===
              undefined
                ? true
                : await __sugarConfig('cli.build.scss.include.sugar')
          },
          vendor: {
            sass: (await __sugarConfig('cli.build.scss.vendor.sass')) || {}
          }
        },
        settings
      );

      let inputPath = settings.input;
      let outputPath = settings.output;
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
          await __writeFile(
            __tmpDir() + '/sugar.build.scss.config.json',
            JSON.stringify(scssConfig, null, 4)
          );

          const command = `npx --no-install json-to-scss ${__tmpDir()}/sugar.build.scss.config.json ${__tmpDir()}/sugar.build.scss.config.scss --mo`;
          __child_process.execSync(command);
          scssConfigString = __fs
            .readFileSync(`${__tmpDir()}/sugar.build.scss.config.scss`, 'ascii')
            .replace('$sugar:', '$sugarUserSettings:')
            .trim();

          __fs.unlinkSync(`${__tmpDir()}/sugar.build.scss.config.json`);
          __fs.unlinkSync(`${__tmpDir()}/sugar.build.scss.config.scss`);
        }
      }

      if (settings.watch) {
        trigger(
          'log',
          `<green>Start watching your files at "<yellow>${inputPath.replace(
            __appPath.path,
            '<rootDir>'
          )}</yellow>"...</green>`
        );
      }

      let filesToCompile = [];
      let compiledFiles = {};

      const watcher = __chokidar.watch(inputPath, {
        persistent: true
      });
      watcher.on('add', renderScss);
      watcher.on('change', renderScss);
      watcher.on('unlink', renderScss);
      watcher.on('all', (s) => {
        const files = watcher.getWatched();
        Object.keys(files).forEach((path) => {
          const filesStack = files[path];
          filesStack.forEach((filename) => {
            if (filesToCompile.indexOf(`${path}/${filename}`) === -1) {
              filesToCompile.push(`${path}/${filename}`);
            }
          });
        });
      });
      watcher.on('ready', () => {
        if (!settings.watch) {
          watcher.close();
        }
      });

      async function renderScss(path) {
        const smallPath = path.replace(
          __packageRoot(process.cwd()),
          '<appRoot>'
        );

        trigger(
          'log',
          `<underline><magenta>Starting build process:</magenta></underline>\n`
        );

        trigger(
          'log',
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

        // trigger(
        //   'log',
        //   `Bundling the files together before actually compiling them...`
        // );

        const bundler = new __Bundler(undefined, inputPath);
        let bundledScssString = await (await bundler.bundle(path))
          .bundledContent;

        let importAndSetupSugar = '';
        if (settings.include.sugar) {
          // trigger(
          //   'log',
          //   `Importing <green>Sugar</green> in the file <yellow>${smallPath}</yellow>...`
          // );

          importAndSetupSugar = `
          @use '@coffeekraken/sugar/index' as Sugar;
          @include Sugar.setup($sugarUserSettings);
        `;
          if (__isInPackage('@coffeekraken/sugar')) {
            // trigger(
            //   'log',
            //   `Updating the @use <green>Sugar</green> path because we are in the <yellow>@coffeekraken/sugar</yellow> package...`
            // );

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

        // trigger(
        //   'log',
        //   `Start compiling the file <yellow>${smallPath}</yellow>...`
        // );

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
              filesToCompile = [];
              reject(err);
              return;
            }

            // trigger(
            //   'log',
            //   `Compilation of the file <yellow>${smallPath}</yellow> finished with <green>success</green>...`
            // );

            const fileObj = {};

            trigger(
              'log',
              `Writing the file <yellow>${smallPath}</yellow> to <green>${smallWritingPath}</green>...`
            );
            await __writeFile(writingPath, result.css.toString());
            fileObj.css = writingPath;

            if (result.map) {
              trigger(
                'log',
                `Writing the sourcemap of the file <yellow>${smallPath}</yellow> to <green>${smallWritingPath.replace(
                  '.css',
                  '.css.map'
                )}</green>...`
              );
              await __writeFile(writingMapPath, result.map.toString());
              fileObj.map = writingMapPath;
            }

            if (settings.prod) {
              //   console.log(
              //     __parseHtml(
              //       `Start building the production version that will be saved to: <yellow>${outputPath
              //         .replace(__appPath.path, '<rootDir>')
              //         .replace('.css', '.prod.css')}</yellow>`
              //     )
              //   );

              const css = await __fs.readFile(writingPath);

              trigger(
                'log',
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
                'log',
                `Writing the minified/optimized file to <green>${smallWritingPath.replace(
                  '.css',
                  '.prod.css'
                )}</green>...`
              );
              await __fs.writeFile(
                writingPath.replace('.css', '.prod.css'),
                postCssResult.css
              );
              fileObj.prodCss = writingPath.replace('.css', '.prod.css');

              if (postCssResult.map) {
                trigger(
                  'log',
                  `Writing the sourcemap of the production file to <yellow>${smallWritingPath.replace(
                    '.css',
                    '.prod.css'
                  )}</yellow> to <green>${smallWritingPath.replace(
                    '.css',
                    '.prod.css.map'
                  )}</green>...`
                );
                await __fs.writeFile(
                  writingPath.replace('.css', '.prod.css.map'),
                  result.map
                );
                fileObj.prodMap = writingPath.replace('.css', '.prod.css.map');
              }
            }

            // remove the file from the files to compile
            filesToCompile = filesToCompile.filter((p) => {
              return p !== path;
            });

            // add the file to the "compiledFiles" stack
            compiledFiles[path] = fileObj;

            trigger(
              'log',
              `Compilation of the file <yellow>${smallPath}</yellow> finished <green>successfully</green>!`
            );

            // trigger a "compiled" stack action
            trigger('compiled', fileObj);

            if (!filesToCompile.length) {
              trigger('then', compiledFiles);
              compiledFiles = {};
            }
          }
        );
      }
    },
    {
      stacks: 'compiled,log'
    }
  ).start();
};
