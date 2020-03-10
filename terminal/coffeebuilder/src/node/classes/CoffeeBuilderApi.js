const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __fs = require('fs');
const __glob = require('glob');
const __defaultConfig = require('../../../coffeebuilder.config');

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
   * @name                                _runPlugins
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                                Function
   * 
   * Run the registered plugins based on the "moment" ou want like "start", "before", etc...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _runPlugins(when = 'after') {

    for (let i = 0; i < Object.keys(this.config.plugins).length; i++) {
      const pluginObj = this.config.plugins[Object.keys(this.config.plugins)[i]];
      if (pluginObj.plugin[when]) {
        await pluginObj.plugin[when](this.stats, this.config.plugins[Object.keys(this.config.plugins)[i]].settings, this);
      }
    }

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
   * @name                config
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Get the global coffeebuilder config
   * 
   * @return        {Object}            
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get config() {
    return __defaultConfig;
  }

  /**
   * @name                       userConfig
   * @namespace                  terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Object
   * 
   * Store the user config defines at the root of his project in the "coffeebuilder.config.js" file.
   * If the file does not exist, return an empty object
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get userConfig() {
    if (!__fs.existsSync(`${process.cwd()}/coffeebuilder.config.js`)) return {
      plugins: {}
    };
    return require(`${process.cwd()}/coffeebuilder.config.js`);
  }

  /**
   * @name                stats
   * @namespace           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                Function
   * 
   * Get the coffeebuilder execution stats
   * 
   * @return        {Object}            
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get stats() {
    return require('../stats');
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

module.exports = new CoffeeBuilderApi();