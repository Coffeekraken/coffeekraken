const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');
const __defaultConfig = require('../../../coffeebuilder.config');

const __coffeeBuilderPrivateApi = require('./CoffeeBuilderPrivateApi');

/**
 * @name                            api
 * @namespace                       terminal.coffeebuilder.node
 * @type                            Class
 * 
 * Expose some methods to interact with the coffeebuilder instance, settings, etc...
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderApi {

  /**
   * @name            _injectScriptFilePath
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type            String
   * @private
   * 
   * Store the file path where the injected script will be injected
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _injectScriptFilePath = `${__tmpDir()}/coffeeBuilderInjectScript.js`;

  /**
   * @name            constructor
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type            Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

  }

  /**
   * @name                    run
   * @namespace               terminal.coffeebuilder.node.CoffeeBuilder
   * @type                    Function
   *
   * Run the build process and return a Promise that will be resolved once the build is completed
   *
   * @param           {Array|String}               [packagesNames=null]            The package name or packages names to build
   * @param           {Array}               [compile=null]                 An array of file types to compile. If not set, will take this parameter from the config
   * @return          {Promise}                       A promise that will be resolved once the build is completed
   *
   * @example           js
   * import coffeebuilder from '@coffeekraken/coffeebuilder';
   * const coffeebuilder = new coffeebuilder();
   * coffeebuilder.run().then((result) => {
   *    // do something once the build is finished
   * })
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(packagesNames = null, compile = null) {
    return new Promise((resolve, reject) => {

      if (packagesNames === null) {
        packagesNames = [this.getCurrentPackageName()];
      } else if (typeof packagesNames === 'string') {
        packagesNames = [packagesNames];
      }

      // save the resources types to run
      if (compile) this._runCompile = compile;
      else this._runCompile = CoffeeBuilder.api.config.compile;

      // reset the build stats
      CoffeeBuilder.stats.reset();

      // run the plugins at "before" moment
      CoffeeBuilder._api._runPlugins('before');

      // clear the injected scripts
      CoffeeBuilder.api.clearInjectedScripts();

      // save the startTimestamp
      CoffeeBuilder.stats.setValue('build.startTimestamp', Date.now());

      // run webpack
      (async () => {

        // change the location to "build"
        CoffeeBuilder.ui.changeLocation('build');

        // execute all the wanted packages
        for (let i = 0; i < packagesNames.length; i++) {

          // update the stats currentPackage value
          CoffeeBuilder.api.setCurrentPackageByName(packagesNames[i]);

          // run the current package
          await CoffeeBuilder.webpack.run(packagesNames[i], compile);

        }

        // save the endTimestamp
        CoffeeBuilder.stats.setValue('build.endTimestamp', Date.now());

        // change the location to "stats"
        CoffeeBuilder.ui.changeLocation('stats');

        // run the plugins at the "after" moment
        CoffeeBuilder._api._runPlugins('after');

        resolve();
      })();
    });
  }

  /**
   * @name                                setCurrentPackageByName
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                                Function
   * 
   * Set the current package by it's name
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setCurrentPackageByName(name) {
    CoffeeBuilder._api.setCurrentPackageByName(name);
  }

  /**
   * @name                        getCurrentPackageName
   * @namespace                   terminal.coffeebuilder.node.classes.coffeeBuilderApi
   * @type                        Function
   * 
   * Get the current package name
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getCurrentPackageName() {
    return CoffeeBuilder._api.getCurrentPackageName();
  }

  /**
   * @name                addWebpackEntry
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Add a webpack entry to process
   * 
   * @param             {String}             sourcePath               The source path of the entry to add
   * @param             {String}             outputPath               The output path of the entry to add
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  addWebpackEntry(sourcePath, outputPath) {
    this.config.vendors.webpack.entry[outputPath] = sourcePath;
  }

  /**
   * @name                              getPackages
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                              Function
   * 
   * Get the packages list in object format. The format of the object is this one:
   * {
   *    "packageName": "package/path",
   *    // etc...
   * }
   * 
   * @return                  {Object}                          The packages list object
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getPackages() {
    return this.baseConfig.packages;
  }

  /**
 * @name                                config
 * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
 * @type                                Object
 * 
 * Access the config object. This object is the result of the default coffeebuilder config mixed with the "base" config specified in the "coffeebuilder.config.js" file
 * at the "process.cwd()" folder path and mixed with the current package config specified in the "coffeebuilder.config.js" file at the package root path...
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
  get config() {
    return CoffeeBuilder._api.config;
  }

  /**
   * @name                                baseConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Object
   * 
   * Access the baseConfig object. This object is the result of the default coffeebuilder config mixed with the "base" baseConfig specified in the "coffeebuilder.baseConfig.js" file
   * at the "process.cwd()" folder path.
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get baseConfig() {
    return CoffeeBuilder._api.baseConfig;
  }

  /**
   * @name                                defaultConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Object
   * 
   * Access the defaultConfig object. This object is the one specified in the CoffeeBuilder package.
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get defaultConfig() {
    return CoffeeBuilder._api.defaultConfig;
  }

  /**
   * @name                injectedScriptsFilePath
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Get the injected scripts file path
   * 
   * @return        {String}            
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get injectedScriptsFilePath() {
    return this._injectScriptFilePath;
  }

  /**
   * @name                injectScript
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Inject some javascript that will be processed the same as the normal resources.
   * !!! You must inject some scripts BEFORE the compilation, so for example in a plugin "before" function...
   * 
   * @param             {String}                  script                The script to inject
   * @param             {String}                  [filepath=null]       The path of the file in which you want to inject the script. If not set, will be injected in the first js entry
   * 
   * @example           js
   * coffeeBuilderApi.injectScript('alert("hello world")');
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  injectScript(script, filepath = 'default') {

    let tmpFilepath = `${__tmpDir()}/coffeeBuilderInjectScript.${filepath.replace('/', '-')}.js`;

    let finalScript = '';
    if (__fs.existsSync(tmpFilepath)) {
      finalScript = __fs.readFileSync(tmpFilepath).toString('utf8');
    }
    finalScript += script;

    // write the file
    __writeFileSync(tmpFilepath, finalScript);
  }

  /**
   * @name                getInjectedScripts
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Get back the injected script object formated like so:
   * {
   *    "filepath": "...script"
   * }
   * 
   * @param           {String}            [filepath='default']        Get the script to inject in the provided filepath
   * @return          {Object}                                        The script to inject
   * 
   * @example           js
   * coffeeBuilderApi.getInjectedScripts();
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getInjectedScripts(filepath = 'default') {
    let tmpFilepath = `${__tmpDir()}/coffeeBuilderInjectScript.${filepath.replace('/', '-')}.js`;
    if (!__fs.existsSync(tmpFilepath)) return '';
    return __fs.readFileSync(tmpFilepath).toString('utf8');
  }

  /**
   * @name                getInjectedScripts
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Get back the injected script object formated like so:
   * {
   *    "filepath": "...script"
   * }
   * 
   * @param           {String}            [filepath='default']        Get the script to inject in the provided filepath
   * @return          {Object}                                        The script to inject
   * 
   * @example           js
   * coffeeBuilderApi.getInjectedScripts();
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getInjectedScriptsFilepathes() {
    return __glob.sync(`${__tmpDir()}/coffeeBuilderInjectScript.*.js`);
  }

  /**
   * @name                clearInjectedScripts
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   *  Clear the previous injected scripts to start with a fresh canvas
   * 
   * @param             {String}                  script                The script to inject
   * 
   * @example           js
   * coffeeBuilderApi.clearInjectedScripts();
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  clearInjectedScripts() {
    const filesPathes = __glob.sync(__tmpDir() + '/coffeeBuilderInjectScript.*.js');
    filesPathes.forEach(path => {
      __fs.unlinkSync(path);
    });
  }

}

module.exports = CoffeeBuilderApi;