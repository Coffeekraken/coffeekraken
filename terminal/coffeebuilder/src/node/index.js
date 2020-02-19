const __webpack = require('webpack');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml');
const __countLine = require('@coffeekraken/sugar/node/terminal/countLine');
const __columns = require('@coffeekraken/sugar/node/terminal/columns');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __asyncForEach = require('@coffeekraken/sugar/js/array/asyncForEach');
const __folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
const __formatFileSize = require('@coffeekraken/sugar/node/fs/formatFileSize');
const __breakLineDependingOnSidesPadding = require('@coffeekraken/sugar/node/terminal/breakLineDependingOnSidesPadding');
const __readline = require('readline');
const __cfonts = require('cfonts');
const __chokidar = require('chokidar');

const __config = require('./config');
const __coffeeEvents = require('./events');
const __setup = require('./settings').setup;

const __path = require('path');
const __fs = require('fs');

const __packageJson = require('@coffeekraken/coffeebuilder/package.json');

const __CoffeeBuilderPlugin = require('./webpack/CoffeeBuilderPlugin');

class CoffeePack {

  /**
   * @name                        _processors
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Object
   *
   * Store all the registered processors
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processors = {};

  _data = {};

  _watchCompile = [];

  constructor(config = {}) {

    this._config = __setup(config);

    // init the CoffeeBuilderWebpack instance
    this.webpack = new CoffeeBuilderWebpack(this);

    // init watch
    if (this._config.watch) this._initWatch();

    this._interface = __readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    __coffeeEvents.on('data', (data) => {
      data.watchCompile = this._watchCompile;
      this._data = data;
      this.drawInterface(data);
    });

    // register default plugins
    // this.webpack.registerPlugin('@coffeekraken/webpack-concat-dependencies-vendors-plugin', {});
    // this.webpack.registerPlugin('@coffeekraken/webpack-lazy-dom-load-plugin', {});

    this.webpack.registerPlugin('CoffeeBuilderPlugin', {}, __CoffeeBuilderPlugin);

    // this.registerProcessor('jpg', ['jpg', 'jpeg'], (filePath, source) => {
    //   return new Promise((resolve, reject) => {
    //     // console.log('process', filePath);
    //     resolve(source);
    //   });
    // });
    //
    // this.registerProcessor('js', ['js'], (filePath, source, settings) => {
    //   return new Promise((resolve, reject) => {
    //     // console.log('SE', settings);
    //     // console.log('process JS', filePath);
    //     resolve(source);
    //   });
    // }, {
    //   plop: 'hello'
    // }, 100);

    // this.registerProcessor(['png'], (filePath, source, callback) => {
    //   return new Promise((resolve, reject) => {
    //     console.log('process', filePath);
    //     resolve(source);
    //   });
    // }, 2);
    //
    // this.registerProcessor(['gif'], (filePath, source, callback) => {
    //   return new Promise((resolve, reject) => {
    //     console.log('process', filePath);
    //     resolve(source);
    //   });
    // }, 20);

    // register default loaders
    // this.webpack.registerLoader('@coffeekraken/webpack-coffee-loader', /\.*$/, {});
    this.webpack.registerLoader(__dirname + '/../../../../webpack/coffee-loader/src/index', /\.*$/, {
      files: __filterObj(this.config(), (item) => {
        return item.extensions !== undefined && item.outputFolder !== undefined && item.sourcesFolder !== undefined && item.sources !== undefined;
      }),
      processors: this._processors
    });
    // this.webpack.registerLoader(__dirname + '/webpack/coffeepackLoader', /\.*$/, {
    //   types: __filterObj(this.config(), (item) => {
    //     return item.extensions !== undefined && item.outputFolder !== undefined && item.sourcesFolder !== undefined && item.sources !== undefined;
    //   }),
    //   processors: this._processors
    // });
    this.webpack.registerLoader('webpack-import-glob-loader', /\.js$/, {});

  }

  /**
   * @name                        _initWatch
   * @namespace                   coffeebuilder.CoffeeBuilder
   * @type                        Function
   * @private
   *
   * Initialize the watch process on files
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initWatch() {

    // loop on each asked compile files
    this._config.compile.forEach((compile) => {

      const fileObj = this._config[compile];
      if ( ! fileObj || ! fileObj.sourcesFolder) return;

      fileObj.sourcesFolder.forEach((folder) => {

        __chokidar.watch(`${folder}/${fileObj.sources}`).on('change', (event, path) => {
          this._watchCompile = [compile];
          this.run([compile]);
        });


      });

    });

  }

  /**
   * @name                        config
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Function
   *
   * Return the coffeepack configuration object
   *
   * @return        {Object}                The coffeepack configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const config = this._config;

    // return the webpack configuration object
    return config;

  }

  /**
   * @name                    registerProcessor
   * @namespace               webpack.coffeepack.CoffeePack
   * @type                    Function
   *
   * Register a processor function that will take as parameters the file extensions that
   * it will handle, the function itself that will process the files and optionaly a "weight"
   * that specify if this processor function has to be called preferably first, middle or last...
   * See the weight of internal processors if you need to register yours in the middle...
   *
   * A processor function is a simple function that will take as arguments the file source path, the file
   * source code and that return a simple Primise. You can make absolutely whatever you want to the source code but you have to resolve the Promise
   * and passing it the processed source code in order that it can be processed by the others registered processors...
   *
   * @param             {String}              name                      The name of the processor. It has to be a single word as it will be used as an object property name...
   * @param             {Array}               extensions                The file extensions that need to be processed by this function
   * @param             {Function}            processor                 The actual processor function that will take as arguments the source path and the source code of the file.
   * @param             {Object}              [settings={}]             The settings that will be passed to the processor function
   * @param             {Number}              [weight=null]             The weight of the processor. This define the order of processors oxecutions
   *
   * @example           js
   * coffeepack.registerProcessor('jpg', ['jpg','jpeg'], (filePath, source, settings) => {
   *    return new Promise((resolve, reject) => {
   *      // do something with the source code...
   *      resolve(source);
   *    });
   * }, {}, 10);
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerProcessor(name, extensions, processor, settings = {}, weight = 10) {

    // const args = __checkArgs(this.registerProcessor, arguments, {
    //   extensions: 'Array --of ["String"]',
    //   processor: 'Function',
    //   weight: `Number --greater -1 -d "${weight}"`
    // });

    if (this._processors[name] !== undefined) {
      throw new Error(`You try to register a processor named "${name}" but a processor with this name already exist...`);
    }

    // register the processor
    this._processors[name] = {
      name,
      extensions,
      processor,
      settings,
      weight
    };
  }

  /**
   * @name                    run
   * @namespace               webpack.coffeepack.CoffeePack
   * @type                    Function
   *
   * Run the build process and return a Promise that will be resolved once the build is completed
   *
   * @param           {Array}                         An array of file types to compile. If not set, will take this parameter from the config
   * @return          {Promise}                       A promise that will be resolved once the build is completed
   *
   * @example           js
   * import CoffeePack from '@coffeekraken/coffeepack';
   * const coffeepack = new CoffeePack();
   * coffeepack.run().then((result) => {
   *    // do something once the build is finished
   * })
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(compile = null) {
    return new Promise((resolve, reject) => {

      // reset the datas
      __coffeeEvents.emit('reset');

      // run webpack
      Promise.all([
        this.webpack.run(compile)
      ]).then(() => {
        resolve();
      });
    });
  }

  /**
   * @name                  drawInterface
   * @namespace             coffeebuilder.CoffeeBuilder
   * @type                  Function
   *
   * Draw the interface depending on the data object passed
   *
   * @param             {Object}            data              The data object to use for drawing the interface
   * @return            {Promise}                             A promise resolved when the intereface has been drawed
   *
   */
  drawInterface(data = {}){
    return null;

     return new Promise(async (resolve, reject) => {
       // bar grows dynamically by current progrss - no whitespaces are added
       // const bar = options.barCompleteString.substr(0, Math.round(params.progress*options.barsize));

       // const bar = options.barCompleteString;

       if ( ! data.percentage) data.percentage = 0;
       if ( ! data.padding) data.padding = process.env.STDOUT_PADDING || 3;

       let lines = ['\n'];

       // const padding = __getDevEnv('stdout.padding') || 3;
       const maxWidth = (process.env.STDOUT_COLUMNS || process.stdout.columns) - data.padding * 2;
       const progress = Math.round(maxWidth / 100 * data.percentage || 0);

       // if ( ! _interface) {
       //   // for (let i=0; i<5; i++) {
       //   //   __readline.clearLine(process.stdout, 0);
       //   //   __readline.moveCursor(process.stdout, 0, -1);
       //   // }
       //
       //   _interface = __readline.createInterface({
       //     input: process.stdin,
       //     output: process.stdout
       //   });
       //
       //   // _interface.on('line', (input) => {
       //   //   console.log(`Received: ${input}`);
       //   //   // linesCount++;
       //   // });
       //
       // } else {
       //
       //   for (let i=0; i<_linesCount; i++) {
       //     __readline.clearLine(process.stdout, 0);
       //     __readline.moveCursor(process.stdout, 0, -1);
       //     // __readline.clearLine(process.stdout, 0);
       //   }
       //
       //   _linesCount = 6;
       //
       // }

       // clear the terminal
       __readline.clearLine(process.stdout, 0);
       for (let i = 0; i < process.stdout.rows; i++) {
         __readline.clearLine(process.stdout, 0);
         __readline.moveCursor(process.stdout, 0, -1);
       }

       let barColorTag = 'red';
       if (data.percentage > 33) barColorTag = 'yellow';
       if (data.percentage > 66) barColorTag = 'green';

       let bar = `<${barColorTag}>` + '█'.repeat(progress) + `</${barColorTag}>`;
       bar += '░'.repeat(maxWidth - progress);

       if (data.percentage >= 100) {
         bar = '<green>' + '✔ '.repeat(Math.round(maxWidth / 2)) + '</green>';
       }

       let titleLine = __parseHtml(`<yellow><bold>CoffeeBuilder</bold></yellow> v${__packageJson.version}`);
       let titleLineCount = __countLine(titleLine);

       const author = __packageJson.author;
       const authorLength = author.length;

       titleLine += ' '.repeat(maxWidth - titleLineCount - authorLength) + __parseHtml(`<white>${author}</white>`);

       lines.push(titleLine);
       lines.push('\n');
       lines.push('\n');
       // lines.push('\n');
       // lines.push('-'.repeat(maxWidth));
       // lines.push('\n');
       // lines.push('~'.repeat(maxWidth));

       let compileLine = `<black>░░</black>`;
       compileLine = '';
       this._config.compile.forEach((compile, i) => {
         if (data.watchCompile[0] === compile || data.watchCompile.length === 0) {
           compileLine += `<green>✔ <bold><bgBlack>${compile}</bgBlack></bold></green>  `;
         } else {
           compileLine += `<white>✘ <bold><bgBlack>${compile}</bgBlack></bold></white>  `;
         }


       });
       compileLine = __parseHtml(compileLine);

       // lines.push(__parseHtml('<black>' + '░'.repeat(maxWidth) + '</black>'));
       // lines.push('\n');
       lines.push('-'.repeat(maxWidth));
       // lines.push('\n');
       // lines.push('-'.repeat(maxWidth));
       lines.push('\n');
       lines.push(compileLine);
       lines.push('\n');
       // lines.push('-'.repeat(maxWidth));
       // lines.push('\n');
       lines.push('-'.repeat(maxWidth));
       // lines.push(__parseHtml('<black>' + '░'.repeat(maxWidth) + '</black>'));

       lines.push('\n');
       lines.push('\n');

       lines.push(__parseHtml(bar));

       lines.push('\n');
       lines.push('\n');

       // resource
       if (data.percentage < 100) {
         let resourceLine = __breakLineDependingOnSidesPadding(__parseHtml(`Processing resource "<yellow>${data.resource.replace(process.cwd(), '')}</yellow>" using "<cyan>${data.processor}</cyan>" processor...`), data.padding);
         lines.push(resourceLine);

       } else {

         // processed resources
         let processedResourcesLine = __parseHtml(`<cyan><bold>${data.processedResources.length}</bold></cyan> file${data.processedResources.length > 1 ? 's' : ''} processed <green>successfuly</green>!`);
         lines.push('- ' + processedResourcesLine);

       }

       // lines.push('\n');
       // lines.push('\n');
       //
       // lines.push('~'.repeat(maxWidth));

       // lines.push('\n');
       // lines.push('\n');


       lines.push('\n');
       lines.push('\n');
       lines.push('\n');

       let fileProcessedLine = __parseHtml(`<bold><yellow>Files processed</yellow></bold>`);
       lines.push(fileProcessedLine);
       lines.push('\n');
       lines.push('-'.repeat(maxWidth));
       lines.push('\n');
       lines.push('\n');

       const usedProcessorsColumns = [];
       const usedProcessorsKeys = Object.keys(data.usedProcessors);
       const usedProcessorsColumnsCount = maxWidth > 100 ? 3 : 2;
       const usedProcessorsItemsCountByColumn = Math.round(usedProcessorsKeys.length / usedProcessorsColumnsCount)

       for (let i=0; i<usedProcessorsColumnsCount; i++) {

         let currentColumn = [];

         usedProcessorsKeys.slice(i*usedProcessorsItemsCountByColumn, i*usedProcessorsItemsCountByColumn + usedProcessorsItemsCountByColumn).forEach((k) => {

           currentColumn.push(__parseHtml(`- ${k}: <cyan><bold>${data.usedProcessors[k].files}</bold></cyan>`));


         });

         usedProcessorsColumns.push(currentColumn.join('\n'));
       }

       lines.push(__columns(usedProcessorsColumns, data.padding));


       if (data.percentage >= 100) {

         lines.push('\n');
         lines.push('\n');

         let sourcesFolderLine = __parseHtml(`<bold><yellow>Sources folder(s)</yellow></bold>`);
         lines.push(sourcesFolderLine);

         lines.push('\n');
         lines.push('-'.repeat(maxWidth));
         lines.push('\n');
         lines.push('\n');

         const compileTypes = this._watchCompile.length > 0 ? this._watchCompile : this._config.compile;
         const sourcesFolderObj = {};
         const outputFolderObj = {};

         await __asyncForEach(compileTypes, async (compile) => {
           return new Promise(async (r) => {

             const compileTypeObj = this._config[compile];

             await __asyncForEach(compileTypeObj.sourcesFolder, (sourcesFolder) => {
               return new Promise(async (resolve, reject) => {

                 const folderSize = await __folderSize(sourcesFolder, true);
                 sourcesFolderObj[sourcesFolder] = folderSize;
                 // console.log('SRC', sourcesFolder, folderSize);
                 resolve(folderSize);

               });
             });

             await __asyncForEach(compileTypeObj.outputFolder, (outputFolder) => {
               return new Promise(async (resolve, reject) => {

                 const folderSize = await __folderSize(outputFolder, true);
                 outputFolderObj[outputFolder] = folderSize;
                 // console.log('OUT', outputFolder, folderSize);
                 resolve(folderSize);

               });
             });

             r();

           });
         });

         const sourcesFolderColumns = [];
         const sourcesFolderKeys = Object.keys(sourcesFolderObj);
         const sourcesFolderColumnsCount = maxWidth > 100 ? 3 : 2;
         const sourcesFolderItemsCountByColumn = Math.round(sourcesFolderKeys.length / sourcesFolderColumnsCount)

         for (let i=0; i<sourcesFolderColumnsCount; i++) {
           let currentColumn = [];
           sourcesFolderKeys.slice(i*sourcesFolderItemsCountByColumn, i*sourcesFolderItemsCountByColumn + sourcesFolderItemsCountByColumn).forEach((k) => {
             currentColumn.push(__parseHtml(`- ${k}: <cyan><bold>${__formatFileSize(sourcesFolderObj[k])}</bold></cyan>`));
           });
           sourcesFolderColumns.push(currentColumn.join('\n'));
         }
         lines.push(__columns(sourcesFolderColumns, data.padding));

         lines.push('\n');
         lines.push('\n');
         lines.push('\n');

         let outputFolderLine = __parseHtml(`<bold><yellow>Output folder(s)</yellow></bold>`);
         lines.push(outputFolderLine);

         lines.push('\n');
         lines.push('-'.repeat(maxWidth));
         lines.push('\n');
         lines.push('\n');

         const outputFolderColumns = [];
         const outputFolderKeys = Object.keys(outputFolderObj);
         const outputFolderColumnsCount = maxWidth > 100 ? 3 : 2;
         const outputFolderItemsCountByColumn = Math.round(outputFolderKeys.length / outputFolderColumnsCount)

         for (let i=0; i<outputFolderColumnsCount; i++) {
           let currentColumn = [];
           outputFolderKeys.slice(i*outputFolderItemsCountByColumn, i*outputFolderItemsCountByColumn + outputFolderItemsCountByColumn).forEach((k) => {
             currentColumn.push(__parseHtml(`- ${k}: <cyan><bold>${__formatFileSize(outputFolderObj[k])}</bold></cyan>`));
           });
           outputFolderColumns.push(currentColumn.join('\n'));
         }
         lines.push(__columns(outputFolderColumns, data.padding));

       }


       // console.log(usedProcessorsColumns);

       // const columnsLines = __columns([
       //
       // ]);
       // lines.push(columnsLines);

       lines.push('\n');
       lines.push('\n');


       // resolve(lines.join('\n'));

       // let progressingResource = __breakLineDependingOnSidesPadding(`Processing "${__colors.yellow(resource.replace(process.cwd(), ''))}"...\n`, padding);
       // if (data.percentage >= 100) {
       //   progressingResource = __breakLineDependingOnSidesPadding(`Congratulation! ${__colors.cyan(_processedResources.length.toString())} files have been builded with success!`, padding);
       // }
       // _linesCount += progressingResource.split('\n').length;
       //
       // let title = `CoffeeBuilder in ${__colors.yellow('progress')}...\n`;
       // if (data.percentage >= 100 ) {
       //   title = `CoffeeBuilder completed ${__colors.green('successfuly')}!\n`;
       // }
       //
       // _interface.write(' '.repeat(10) + '\n');
       // _interface.write(' '.repeat(padding) + title);
       // _interface.write(' '.repeat(10) + '\n');
       // _interface.write(' '.repeat(padding) + bar + '\n');
       // _interface.write(' '.repeat(10) + '\n');
       // console.log(progressingResource);
       // _interface.write(' '.repeat(10) + '\n');

       // console.log(linesCount);

       // if (data.percentage >= 100) {
       //
       //   (async function() {
       //     if (_options.sourcesFolder && _options.distFolder) {
       //       const srcSize = await __folderSize(_options.sourcesFolder);
       //       const distSize = await __folderSize(_options.distFolder);
       //       const rawSrcSize = await __folderSize(_options.sourcesFolder, true);
       //       const rawDistSize = await __folderSize(_options.distFolder, true);
       //       _interface.write(__breakLineDependingOnSidesPadding(`Sources folder size: ${__colors.red(srcSize)} / Dist folder size: ${__colors.yellow(distSize)}\n`, padding));
       //       _interface.write(' '.repeat(10) + '\n');
       //       _interface.write(__breakLineDependingOnSidesPadding(`The build has ${__colors.green(100 - Math.round(100 / rawSrcSize * rawDistSize))}%...\n`, padding));
       //     }
       //     _interface.write(' '.repeat(10) + '\n');
       //     _interface.write(' '.repeat(10) + '\n');
       //     _interface.write(' '.repeat(10) + '\n');
       //     _interface.close();
       //     resolve();
       //   })();
       // } else {
       //   resolve();
       // }

       // const text = `   Build Progress\n${barColorFn(bar)} | {percentage}%   `;



       // end value reached ?
       // change color to green when finished
       // if (params.value >= params.total){
       //     return '# ' + _colors.grey(payload.task) + '   ' + _colors.green(params.value + '/' + params.total) + ' --[' + bar + ']-- ';
       // }else{
       //     return '# ' + payload.task + '   ' + _colors.yellow(params.value + '/' + params.total) + ' --[' + bar + ']-- ';
       // }
       // return text;

       lines = lines.map((l) => {
         if (l.slice(0,data.padding) === ' '.repeat(data.padding)) return l;
         return ' '.repeat(data.padding) + l;
       });

       // __readline.cursorTo(process.stdout, 0, 0)
       // __readline.clearScreenDown(process.stdout);
       this._interface.write(lines.join(''));

     });
   }

}

class CoffeeBuilderWebpack {

  /**
   * @name                    _loaders
   * @namespace               webpack.coffeepack.CoffeePack
   * @type                    Object
   *
   * Store all the loaders available through coffeepack
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loaders = {};

  /**
   * @name                    _plugins
   * @namespace               webpack.coffeepack.CoffeePack
   * @type                    Object
   *
   * Store all the plugins available through coffeepack
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _plugins = {};

  /**
   * @name                    _coffeepack
   * @namespace               webpack.coffeepack.CoffeeBuilderWebpack
   * @type                    CoffeePack
   *
   * Store the CoffeePack instance
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _coffeepack = null;

  /**
   * @name                     constructor
   * @namespace                webpack.coffeepack.CoffeeBuilderWebpack
   * @type                      Function
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(coffeepack) {
    this._coffeepack = coffeepack;

    // handle the "webpack.config.js" file at the project root
    if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
      this._coffeepack._config.vendors.webpack = __deepMerge(this._coffeepack._config.vendors.webpack, require(process.cwd() + '/webpack.config.js'));
    }
  }

  /**
   * @name                        run
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Function
   *
   * Run the webpack build process
   *
   * @param           {Array}             [compile=null]            An array of which file types you want to compile
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(compile = null) {
    return new Promise((resolve, reject) => {

      this._compile = compile;

      __webpack(this.config(), (err, stats) => {
        if (err || stats.hasErrors()) {
          // console.log(stats);
          // throw new Error(err);
          // reject(err);
          console.log(stats);
        }

        // process finished
        resolve(stats);
      });
    });
  }

  /**
   * @name                        registerLoader
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Function
   *
   * Register a new loader by passing his name, file test and options
   *
   * @param               {String}              name                 The loader name. This has to be the require path to the loader...
   * @param               {RegExp}              [test=/\.*$/]        The regex test that will determine if a file has to passe through the loader or not
   * @param               {Object}              [options={}]         The loader options
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerLoader(name, test = /\.*$/, options = {}) {
    // register a new loader to use
    this._loaders[name] = {
      test: test,
      use: [{
        loader: name,
        options: __deepMerge(__config.default.loaders.coffeeLoader, options)
      }]
    };
  }

  /**
   * @name                                loaders
   * @namespace                           webpack.coffeepack.CoffeePack
   * @type                                Function
   *
   * Return the "module" webpack object with all the registered loaders
   *
   * @return              {Object}                    The "module" webpack object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  loaders() {

    const moduleObj = {
      rules: []
    };

    Object.keys(this._loaders).forEach((loader) => {
      // if (this._config.loaders.indexOf(loader) !== -1) {
        moduleObj.rules.push(this._loaders[loader]);
      // }
    });

    // return the module object with all the loaders configurated
    return moduleObj;

  }

  /**
   * @name                                loaders
   * @namespace                           webpack.coffeepack.CoffeePack
   * @type                                Function
   *
   * Return the "module" webpack object with all the registered loaders
   *
   * @return              {Object}                    The "module" webpack object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  plugins() {

    const pluginsArray = [];

    Object.keys(this._plugins).forEach((plugin) => {
      // if (this._config.plugins.indexOf(plugin) !== -1) {
        const pluginObj = this._plugins[plugin];
        pluginsArray.push(new pluginObj.class());
      // }
    });

    return pluginsArray;

  }

  /**
   * @name                        registerPlugin
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Function
   *
   * Register a new plugin by passing his name, class and options
   *
   * @param               {String}              name                 The plugin name. This has to be the require path to the loader...
   * @param               {Object}              [options={}]         The plugin options
   * @param               {RegExp}              [cls=null]           The plugin class if the "require(name)" has not returned the class
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerPlugin(name, options = {}, cls = null) {

    let _class = cls;
    try {
      _class = require(name);
    } catch(e) {
      _class = cls;
    }

    // register a new plugin to use
    this._plugins[name] = {
      class: _class,
      options
    };
  }

  /**
   * @name                        webpackConfig
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Function
   *
   * Return the webpack configuration object builded by coffeepack
   *
   * @return        {Object}                The webpack configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const webpackConfig = Object.assign({}, this._coffeepack._config.vendors.webpack);

    // entry
    webpackConfig.entry = this.entry();

    // plugins
    webpackConfig.plugins = this.plugins();

    // loaders
    webpackConfig.module = this.loaders();

    // return the webpack configuration object
    return webpackConfig;

  }

  /**
   * @name                        entry
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Function
   *
   * Return the "entry" webpack configuration object builded by coffeepack
   *
   * @return                {Object}                The "entry" webpack object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  entry() {

    // the entry webpack object
    let entryObj = {};

    // loop on the "compile" option to know which file types we have to handle
    const fileTypesToCompile = this._compile || this._coffeepack._config.compile;
    fileTypesToCompile.forEach((fileType) => {

      // get the file type options object
      const optionsObj = this._coffeepack._config.files[fileType] || {};

      // check the configuration object
      if ( ! optionsObj.sourcesFolder) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.sourcesFolder"</red> config...`);
      }
      if ( ! optionsObj.outputFolder) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.outputFolder"</red> config...`);
      }
      if ( ! optionsObj.sources) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.sources"</red> config...`);
      }

      const sourcesFolder = Array.isArray(optionsObj.sourcesFolder) ? optionsObj.sourcesFolder : [optionsObj.sourcesFolder];
      const outputFolder = Array.isArray(optionsObj.outputFolder ) ? optionsObj.outputFolder   : [optionsObj.outputFolder];

      // search for the files
      let files = [];
      sourcesFolder.forEach((folder) => {
        files = files.concat(__glob.sync(folder + '/' + optionsObj.sources));
      });

      // process the founded files
      files.forEach((file) => {

        let entryKey = file;
        const ext = __getExtension(entryKey);
        entryKey = entryKey.replace(ext, optionsObj.saveExtension || ext);

        sourcesFolder.forEach((source) => {
          entryKey = entryKey.replace(source, '');
          if (entryKey.slice(0,1) === '/') entryKey = entryKey.slice(1);
        });

        outputFolder.forEach((folder) => {
          entryKey = `${folder}/${entryKey}`;
          entryKey = entryKey.replace('//','/');
          // if ( ! entryKey.match(/\.js$/g)) return;
          entryObj[entryKey] = process.cwd() + '/' + file;
        });

      });

    });

    // return the entry object
    return entryObj;

  }

}

module.exports = CoffeePack;
