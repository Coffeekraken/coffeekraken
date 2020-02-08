const __webpack = require('webpack');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');

const __config = require('./config');

const __path = require('path');
const __fs = require('fs');

module.exports = class CoffeePack {

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
        extension: ['jpg','jpeg','svg','gif','png','webp'],
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

      loaders: [
        '@coffeekraken/webpack-coffee-loader',
        'webpack-import-glob-loader'
      ],
      plugins: [
        '@coffeekraken/webpack-concat-dependencies-vendors-plugin',
        '@coffeekraken/webpack-lazy-dom-load-plugin'
      ],
      vendors: {
        webpack: __config.default.webpack
      }
    }, config);

    // handle the "webpack.config.js" file at the project root
    if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
      this._config.vendors.webpack = __deepMerge(this._config.vendors.webpack, require(process.cwd() + '/webpack.config.js'));
    }

    // register default loaders
    this.registerLoader('@coffeekraken/webpack-coffee-loader', /\.*$/, {});
    this.registerLoader('webpack-import-glob-loader', /\.js$/, {});

    // register default plugins
    this.registerPlugin('@coffeekraken/webpack-concat-dependencies-vendors-plugin', {});
    this.registerPlugin('@coffeekraken/webpack-lazy-dom-load-plugin', {});

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
  webpackConfig() {

    const webpackConfig = this._config.vendors.webpack;

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
    this._config.compile.forEach((fileType) => {

      // get the file type options object
      const optionsObj = this._config[fileType] || {};

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
          entryObj[entryKey] = file;
        });

      });

    });

    // return the entry object
    return entryObj;

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
      if (this._config.loaders.indexOf(loader) !== -1) {
        moduleObj.rules.push(this._loaders[loader]);
      }
    });

    // return the module object with all the loaders configurated
    return moduleObj;

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
      if (this._config.plugins.indexOf(plugin) !== -1) {
        const pluginObj = this._plugins[plugin];
        pluginsArray.push(new pluginObj.class(pluginObj.options));
      }
    });

    return pluginsArray;

  }


};
module.exports.plugins = require('./plugins');
