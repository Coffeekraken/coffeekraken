const __webpack = require('webpack');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');
const __bindMethods = require('bind-methods');
const __checkArgs = require('@coffeekraken/sugar/js/dev/checkArgs');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');

const __config = require('./config');

const __path = require('path');
const __fs = require('fs');

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


  constructor(config = {}) {

    this._config = __deepMerge({

      compile: ['js','css','images','jpg','svg','gif','png','webp'],


      file: {
        extensions: [],
        outputFolder: ['dist/files'],
        sourcesFolder: ['src/files']
      },
      js: {
        extensions: ['js','coffee','ts'],
        outputFolder: 'dist/js',
        sourcesFolder: ['src/js'],
        sources: '**/*.bundle.{js,coffee,ts}'
      },
      css: {
        extensions: ['css','scss','sass'],
        outputFolder: ['dist/css'],
        sourcesFolder: ['src/css'],
        sources: '**/*.bundle.{css,scss,sass}'
      },
      images: {
        extensions: ['jpg','jpeg','svg','gif','png','webp'],
        outputFolder: ['dist/images'],
        sourcesFolder: ['src/images'],
        sources: '**,*.{jpg,jpeg,svg,gif,png,webp}',
        quality: 70
      },
      jpg: {
        extensions: ['jpg','jpeg'],
        outputFolder: ['dist/images'],
        sourcesFolder: ['src/images'],
        sources: '**/*.{jpg,jpeg}',
        quality: 70
      },
      svg: {
        extensions: ['svg'],
        outputFolder: ['dist/images'],
        sourcesFolder: ['src/images'],
        sources: '**/*.svg'
      },
      gif: {
        extensions: ['gif'],
        outputFolder: ['dist/images'],
        sourcesFolder: ['src/images'],
        sources: '**/*.gif',
        quality: 70
      },
      png: {
        extensions: ['png'],
        outputFolder: ['dist/images'],
        sourcesFolder: ['src/images'],
        sources: '**/*.png',
        quality: 70
      },
      webp: {
        extensions: ['webp'],
        outputFolder: ['dist/images'],
        sourcesFolder: ['src/images'],
        sources: '**/*.webp',
        quality: 70
      },
      vendors: {
        webpack: __config.default.webpack
      }
    }, config);

    // init the CoffeePackWebpack instance
    this.webpack = new CoffeePackWebpack(this);

    // register default plugins
    // this.webpack.registerPlugin('@coffeekraken/webpack-concat-dependencies-vendors-plugin', {});
    // this.webpack.registerPlugin('@coffeekraken/webpack-lazy-dom-load-plugin', {});


    // this.registerProcessor('jpg', ['jpg', 'jpeg'], (filePath, source) => {
    //   return new Promise((resolve, reject) => {
    //     // console.log('process', filePath);
    //     resolve(source);
    //   });
    // });
    //
    this.registerProcessor('js', ['js'], (filePath, source, settings) => {
      return new Promise((resolve, reject) => {
        // console.log('SE', settings);
        // console.log('process JS', filePath);
        resolve(source);
      });
    }, {
      plop: 'hello'
    }, 100);

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
    this.webpack.registerLoader(__dirname + '/../../coffee-loader/src/index', /\.*$/, {
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
  run() {
    return new Promise((resolve, reject) => {
      // run webpack
      Promise.all([
        this.webpack.run()
      ]).then(() => {
        resolve();
      });
    });
  }

}

class CoffeePackWebpack {

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
   * @namespace               webpack.coffeepack.CoffeePackWebpack
   * @type                    CoffeePack
   *
   * Store the CoffeePack instance
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _coffeepack = null;

  /**
   * @name                     constructor
   * @namespace                webpack.coffeepack.CoffeePackWebpack
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
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run() {
    return new Promise((resolve, reject) => {

      __webpack(this.config(), (err, stats) => {
        if (err || stats.hasErrors()) {
          // console.log(stats);
          // throw new Error(err);
          // reject(err);
        }
        // console.log(stats);
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
        pluginsArray.push(new pluginObj.class(pluginObj.options));
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

    // register a new plugin to use
    this._plugins[name] = {
      class: require(name) || cls,
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

    const webpackConfig = this._coffeepack._config.vendors.webpack;

    // entry
    webpackConfig.entry = __deepMerge(webpackConfig.entry, this.entry());

    // plugins
    webpackConfig.plugins = __deepMerge(webpackConfig.plugins, this.plugins());

    // loaders
    webpackConfig.module = __deepMerge(webpackConfig.module, this.loaders());

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
    this._coffeepack._config.compile.forEach((fileType) => {

      // get the file type options object
      const optionsObj = this._coffeepack._config[fileType] || {};

      // check the configuration object
      if ( ! optionsObj.sourcesFolder) {
        __log(`You try to compile the "${fileType}" files but you don't have setted the "config.${fileType}.sourcesFolder" config...`, 'error');
        return;
      }
      if ( ! optionsObj.outputFolder) {
        __log(`You try to compile the "${fileType}" files but you don't have setted the "config.${fileType}.outputFolder" config...`, 'error');
        return;
      }
      if ( ! optionsObj.sources) {
        __log(`You try to compile the "${fileType}" files but you don't have setted the "config.${fileType}.sources" config...`, 'error');
        return;
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

    console.log(entryObj);

    // return the entry object
    return entryObj;

  }

}

module.exports = CoffeePack;
