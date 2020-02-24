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
const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __breakLineDependingOnSidesPadding = require('@coffeekraken/sugar/node/terminal/breakLineDependingOnSidesPadding');
const __readline = require('readline');
const __cfonts = require('cfonts');
const __chokidar = require('chokidar');
const __restoreCursor = require('restore-cursor');
const __ora = require('ora');

const __coffeeEvents = require('./events');
const __setup = require('./settings').setup;
const __stats = require('./stats');

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

  /**
   * @name                        _postProcessors
   * @namespace                   webpack.coffeepack.CoffeePack
   * @type                        Object
   *
   * Store all the registered processors
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _postProcessors = {};

  _watchCompile = [];
  _drawInterfaceTimeout = null;

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

    process.stdout.on('resize', () => {
      this.drawInterface();
      if (__stats.build.endTimestamp) {
        this.drawAfterBuildStats();
      }
    });

    // restore the hided cursor on process exit
    __restoreCursor();

    // listen for build events
    this._listenBuildEvents();

    // register default plugins
    // this.webpack.registerPlugin('@coffeekraken/webpack-concat-dependencies-vendors-plugin', {});
    // this.webpack.registerPlugin('@coffeekraken/webpack-lazy-dom-load-plugin', {});

    this.webpack.registerPlugin('CoffeeBuilderPlugin', {
      postProcessors: this.postProcessors.bind(this),
    }, __CoffeeBuilderPlugin);

    // register default loaders
    this.webpack.registerLoader(__dirname + '/webpack/CoffeeBuilderLoader', /\.*$/, {});
    this.webpack.registerLoader('webpack-import-glob-loader', /\.js$/, {});

  }

  /**
   * @name                        _listenBuildEvents
   * @namespace                   coffeebuilder.node.CoffeeBuilder
   * @type                        Function
   *
   * Listen and handle build events emitted from the loader and the plugin
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _listenBuildEvents() {
    __coffeeEvents.on('build', (data) => {
      this.drawInterface();
    });

    __coffeeEvents.on('postBuild', (data) => {
      this.drawInterface();
    });
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

      const fileObj = this._config.files[compile];
      if ( ! fileObj || ! fileObj.sourcesFolder) return;

      fileObj.sourcesFolder.forEach((folder) => {

        __chokidar.watch(`${folder}/${fileObj.sources}`).on('change', (event, path) => {
          this.resetBuildStats();
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
   * source code and that return a simple Promise. You can make absolutely whatever you want to the source code but you have to resolve the Promise
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
   * @name                    processors
   * @namespace               coffeebuilder.node.CoffeeBuilder
   * @type                    Function
   *
   * Get the registered processors object back
   *
   * @return          {Object}                  The registered processors
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  processors() {
    return this._processors;
  }

  /**
   * @name                    registerPostProcessor
   * @namespace               webpack.coffeepack.CoffeePack
   * @type                    Function
   *
   * Register a post processor function that will take as parameters the file extensions that
   * it will handle, the function itself that will process the files and optionaly a "weight"
   * that specify if this processor function has to be called preferably first, middle or last...
   * See the weight of internal postProcessors if you need to register yours in the middle...
   *
   * The difference with the processors is that postProcessors are runed AFTER the actual build process is done.
   *
   * A postProcessor function is a simple function that will take as arguments the file source path, the file
   * source code and that return a simple Promise. You can make absolutely whatever you want to the source code but you have to resolve the Promise
   * and passing it the processed source code in order that it can be processed by the others registered postProcessors...
   *
   * @param             {String}              name                      The name of the postProcessor. It has to be a single word as it will be used as an object property name...
   * @param             {Array}               extensions                The file extensions that need to be processed by this function
   * @param             {Function}            processor                 The actual postProcessor function that will take as arguments the source path and the source code of the file.
   * @param             {Object}              [settings={}]             The settings that will be passed to the postProcessor function
   * @param             {Number}              [weight=null]             The weight of the postProcessor. This define the order of processors oxecutions
   *
   * @example           js
   * coffeepack.registerPostProcessor('jpg', ['jpg','jpeg'], (filePath, source, settings) => {
   *    return new Promise((resolve, reject) => {
   *      // do something with the source code...
   *      resolve(source);
   *    });
   * }, {}, 10);
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerPostProcessor(name, extensions, processor, settings = {}, weight = 10) {


    if (this._postProcessors[name] !== undefined) {
      throw new Error(`You try to register a processor named "${name}" but a processor with this name already exist...`);
    }

    // register the processor
    this._postProcessors[name] = {
      name,
      extensions,
      processor,
      settings,
      weight
    };
  }

  /**
   * @name                    postProcessors
   * @namespace               coffeebuilder.node.CoffeeBuilder
   * @type                    Function
   *
   * Get the registered postProcessors object back
   *
   * @return          {Object}                  The registered postProcessors
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  postProcessors() {
    return this._postProcessors;
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
      // __coffeeEvents.emit('reset');

      // save the startTimestamp
      __stats.build.startTimestamp = Date.now();

      // run webpack
      Promise.all([
        this.webpack.run(compile)
      ]).then(() => {

        // save the endTimestamp
        __stats.build.endTimestamp = Date.now();

        // redraw the interface one last time
        this.drawInterface();
        this.drawAfterBuildStats();

        resolve();
      });
    });
  }

  /**
   * @name                  resetBuildStats
   * @namespace             coffeebuilder.node.CoffeeBuilder
   * @type                  Function
   *
   * Reset the build stats
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  resetBuildStats() {
    __stats.cache.files = [];
    __stats.build = {
      startTimestamp: null,
      endTimestamp: null,
      files: [],
      processedFiles: [],
      currentFilePath: '',
      currentProcessor: '',
      percentage: 0,
      processors: {

      }
    };
  }

  /**
   * @name                  drawInterface
   * @namespace             coffeebuilder.CoffeeBuilder
   * @type                  Function
   *
   * Draw the interface depending on the data object passed
   *
   * @return            {Promise}                             A promise resolved when the intereface has been drawed
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawInterface(){

    // if ( ! this._drawInterfaceInterval) {
    //   this._drawInterfaceInterval = setInterval(() => {
    //     this.drawInterface();
    //   }, 300);
    // }

   return new Promise(async (resolve, reject) => {

     if ( ! __stats.build.percentage) __stats.build.percentage = 0;

     const { percentage, currentFilePath, currentProcessor, processedFiles, processors } = __stats.build;

     const postPercentage = __stats.postBuild.percentage;

     const watchCompile = this._watchCompile;
     const compileType = watchCompile.length ? watchCompile : this._config.compile;

     let lines = ['\n'];

     // const padding = __getDevEnv('stdout.padding') || 3;
     const padding = process.env.STDOUT_PADDING || 3;
     const maxWidth = (process.env.STDOUT_COLUMNS || process.stdout.columns) - padding * 2;
     const progress = Math.round(maxWidth / 100 * percentage || 0);
     const postProgress = Math.round(maxWidth / 100 * postPercentage || 0);

     // clear the terminal
     // __readline.clearLine(process.stdout, 0);
     // for (let i = 0; i < process.stdout.rows; i++) {
     //   __readline.clearLine(process.stdout, 0);
     //   __readline.moveCursor(process.stdout, 0, -1);
     // }

     let barColorTag = 'red';
     if (percentage > 33) barColorTag = 'yellow';
     if (percentage > 66) barColorTag = 'green';

     let bar = `<${barColorTag}>` + '█'.repeat(progress) + `</${barColorTag}>`;
     bar += '░'.repeat(maxWidth - progress);

     if (percentage >= 100) {
       bar = '<green>' + '✔ '.repeat(Math.round(maxWidth / 2)) + '</green>';
     }

     let postBarColorTag = 'red';
     if (postPercentage > 33) postBarColorTag = 'yellow';
     if (postPercentage > 66) postBarColorTag = 'green';

     let postBar = `<${postBarColorTag}>` + '█'.repeat(postProgress) + `</${postBarColorTag}>`;
     postBar += '░'.repeat(maxWidth - postProgress);

     if (postPercentage >= 100) {
       postBar = '<green>' + '✔ '.repeat(Math.round(maxWidth / 2)) + '</green>';
     }

     let titleLine = __parseHtml(`<yellow><bold>CoffeeBuilder</bold></yellow> v${__packageJson.version}`);
     let titleLineCount = __countLine(titleLine);

     const author = __packageJson.author;
     const authorLength = author.length;

     titleLine += ' '.repeat(maxWidth - titleLineCount - authorLength) + __parseHtml(`<white>${author}</white>`);

     lines.push('\n');
     lines.push(titleLine);
     lines.push('\n');
     lines.push('\n');

     let compileLine = `<black>░░</black>`;
     compileLine = '';
     this._config.compile.forEach((compile, i) => {
       if (watchCompile[0] === compile || watchCompile.length === 0) {
         compileLine += `<green>✔ <bold><bgBlack>${compile}</bgBlack></bold></green>  `;
       } else {
         compileLine += `<white>✘ <bold><bgBlack>${compile}</bgBlack></bold></white>  `;
       }
     });

     if (this._config.watch) {
       if ( ! this._watchSpinner) this._watchSpinner = __ora('Watching');
       const watchSpinner = this._watchSpinner.frame();
       compileLine += ' '.repeat(maxWidth - __countLine(compileLine) - __countLine(watchSpinner)) + watchSpinner;
     }

     compileLine = __parseHtml(compileLine);

     lines.push('-'.repeat(maxWidth));
     lines.push('\n');
     lines.push(compileLine);
     lines.push('\n');
     lines.push('-'.repeat(maxWidth));
     lines.push('\n');
     lines.push('\n');
     lines.push(__parseHtml(`Build processors progress`));
     lines.push('\n');
     lines.push('\n');
     lines.push(__parseHtml(bar));
     lines.push('\n');
     lines.push('\n');

     lines.push(__parseHtml(`Post build processors progress`));
     lines.push('\n');
     lines.push('\n');
     lines.push(__parseHtml(postBar));
     lines.push('\n');
     lines.push('\n');


     // resource
     if (percentage < 100) {
       let resourceLine = __breakLineDependingOnSidesPadding(__parseHtml(`Processing resource "<yellow>${currentFilePath.replace(process.cwd(), '')}</yellow>" using "<cyan>${currentProcessor}</cyan>" processor...`), padding);
       lines.push(resourceLine);

     } else {

       // processed resources
       let processedResourcesLine = `<cyan><bold>${processedFiles.length}</bold></cyan> (${compileType.join(',')}) file${processedFiles.length > 1 ? 's' : ''} processed`;
       if (__stats.build.startTimestamp && __stats.build.endTimestamp) {
         processedResourcesLine += ` in <yellow>${new Date(__stats.build.endTimestamp - __stats.build.startTimestamp).getSeconds()}s</yellow>`;
         if (__stats.cache.files.length > 0) {
           processedResourcesLine += ` / ${__stats.cache.files.length} taken from cache...`;
         }
       }
       lines.push(__parseHtml('<green>✔</green>  ' + processedResourcesLine));

     }

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
     const usedProcessorsKeys = Object.keys(processors);
     const usedProcessorsColumnsCount = maxWidth > 150 ? 4 : maxWidth > 100 ? 3 : 2;
     const usedProcessorsItemsCountByColumn = Math.round(usedProcessorsKeys.length / usedProcessorsColumnsCount)

     for (let i=0; i<usedProcessorsColumnsCount; i++) {
       let currentColumn = [];
       usedProcessorsKeys.slice(i*usedProcessorsItemsCountByColumn, i*usedProcessorsItemsCountByColumn + usedProcessorsItemsCountByColumn).forEach((k) => {
         currentColumn.push(__parseHtml(`<yellow>░</yellow> ${k}: <cyan><bold>${processors[k].processedFiles.length}</bold></cyan>`));
       });
       usedProcessorsColumns.push(currentColumn.join('\n'));
     }

     lines.push(__columns(usedProcessorsColumns, padding));

     lines.push('\n');
     lines.push('\n');

     lines = lines.map((l) => {
       if (l.slice(0,padding) === ' '.repeat(padding)) return l;
       return ' '.repeat(padding) + l;
     });

     this._lines = lines;

     this._interface.write(lines.join('') + '\u001B[?25l');

   });
 }

 drawAfterBuildStats() {
   return new Promise(async (resolve, reject) => {

     const watchCompile = this._watchCompile;
     const compileTypes = this._config.compile;
     const sourcesFolderObj = {};
     const outputFolderObj = {};

     const padding = process.env.STDOUT_PADDING || 3;
     const maxWidth = (process.env.STDOUT_COLUMNS || process.stdout.columns) - padding * 2;

     let lines = [];

     await __asyncForEach(compileTypes, async (compile) => {
       return new Promise(async (r) => {

         const compileTypeObj = this._config.files[compile];

         await __asyncForEach(compileTypeObj.sourcesFolder, (sourcesFolder) => {
           return new Promise(async (resolve, reject) => {

             const folderSize = await __folderSize(sourcesFolder, true);
             sourcesFolderObj[sourcesFolder] = folderSize;
             resolve(folderSize);

           });
         });

         await __asyncForEach(compileTypeObj.outputFolder, (outputFolder) => {
           return new Promise(async (resolve, reject) => {

             const folderSize = await __folderSize(outputFolder, true);
             outputFolderObj[outputFolder] = folderSize;
             resolve(folderSize);

           });
         });

         r();

       });
     });

     const sourcesFolderColumns = [];
     const sourcesFolderKeys = Object.keys(sourcesFolderObj);
     const sourcesFolderColumnsCount = maxWidth > 150 ? 4 : maxWidth > 100 ? 3 : 2;
     const sourcesFolderItemsCountByColumn = Math.round(sourcesFolderKeys.length / sourcesFolderColumnsCount)

     let sourcesFolderLine = __parseHtml(`<bold><yellow>Sources folder(s)</yellow></bold>`);
     lines.push(sourcesFolderLine);

     lines.push('\n');
     lines.push('-'.repeat(maxWidth));
     lines.push('\n');
     lines.push('\n');

     for (let i=0; i<sourcesFolderColumnsCount; i++) {
       let currentColumn = [];
       sourcesFolderKeys.slice(i*sourcesFolderItemsCountByColumn, i*sourcesFolderItemsCountByColumn + sourcesFolderItemsCountByColumn).forEach((k) => {
         currentColumn.push(__parseHtml(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(sourcesFolderObj[k])}</bold></cyan>`));
       });
       sourcesFolderColumns.push(currentColumn.join('\n'));
     }
     lines.push(__columns(sourcesFolderColumns, padding));

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
     const outputFolderColumnsCount = maxWidth > 150 ? 4 : maxWidth > 100 ? 3 : 2;
     const outputFolderItemsCountByColumn = Math.round(outputFolderKeys.length / outputFolderColumnsCount)

     for (let i=0; i<outputFolderColumnsCount; i++) {
       let currentColumn = [];
       outputFolderKeys.slice(i*outputFolderItemsCountByColumn, i*outputFolderItemsCountByColumn + outputFolderItemsCountByColumn).forEach((k) => {
         currentColumn.push(__parseHtml(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(outputFolderObj[k])}</bold></cyan>`));
       });
       outputFolderColumns.push(currentColumn.join('\n'));
     }
     lines.push(__columns(outputFolderColumns, padding));

     lines = lines.map((l) => {
       if (l.slice(0,padding) === ' '.repeat(padding)) return l;
       return ' '.repeat(padding) + l;
     });

     this._interface.write(lines.join('') + '\u001B[?25l');

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
        options: options
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
        pluginsArray.push(new pluginObj.class(pluginObj.settings));
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
   * @param               {Object}              [settings={}]         The plugin settings
   * @param               {RegExp}              [cls=null]           The plugin class if the "require(name)" has not returned the class
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerPlugin(name, settings = {}, cls = null) {

    let _class = cls;
    try {
      _class = require(name);
    } catch(e) {
      _class = cls;
    }

    // register a new plugin to use
    this._plugins[name] = {
      class: _class,
      settings
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
    let entryString = '';

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
      files.forEach((file, i) => {

        let entryKey = file;
        const ext = __getExtension(entryKey);
        entryKey = entryKey.replace(ext, optionsObj.saveExtension || ext);

        sourcesFolder.forEach((source) => {
          entryKey = entryKey.replace(source, '');
          if (entryKey.slice(0,1) === '/') entryKey = entryKey.slice(1);
        });

        if (__getExtension(entryKey) === 'js') {
          outputFolder.forEach((folder) => {
            let key = `${folder}/${entryKey}`;
            key = key.replace('//','/');
            // if ( ! entryKey.match(/\.js$/g)) return;
            entryObj[key] = process.cwd() + '/' + file;
          });
        } else {

          const filename = file.split('/').slice(-1)[0];
          entryKey = entryKey.replace('//','/');
          entryString += `import * as coffeebuilderImport${__uniqid()} from '${process.cwd() + '/' + file}';\n`;

        }

      });

    });

    if (entryString !== '') {

      const tmpDir = __tmpDir();
      __fs.writeFileSync(tmpDir + '/coffeebuilderImports.js', entryString);

      const relativePathToTmpDir =__path.relative(process.cwd(), tmpDir);
      entryObj[relativePathToTmpDir + '/coffeebuilderImportsBuilded.js'] = tmpDir + '/coffeebuilderImports.js';

    }

    // return the entry object
    return entryObj;

  }

}

module.exports = CoffeePack;
