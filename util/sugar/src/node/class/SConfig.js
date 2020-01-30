const __fs = require('fs');
const __log = require('../log/log');

/**
 * @name                                            config
 * @namespace                                       sugar.node.class
 * @type                                            Class
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are "json" and "js" allowing you to store data inside files on the server drive.
 *
 * @example             js
 * const SConfig = require('@coffeekraken/sugar/node/class/SConfig');
 * const config = new SConfig({
 *    json: {
 *      filename: process.cwd() + '/config.json',
 *      encrypt: base64.encrypt,
 *      decrypt: base64.decrypt
 *    }
 * });
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SConfig {

  /**
   * @name            _adapters
   * @type            {Object}
   */
  _adapters = {};

 /**
  * @name             _settings
  * @type              {Object}
  */
 _settings = {};

 /**
  * @constructor
  * @param               {Object}                      adapters              List and configure the data adapters to use for this config instance. See each adapters documentation for the settings...
  * @param                {Object}                    [settings={}]          An object to configure your SConfig instance.
  * @return              {SConfig}                                           An SConfig instance with the once you can access/update the configs
  *
  * @setting              {Boolean}                 [allowSet=true]         Allow this instance to set some config values or not...
  * @setting              {Boolean}                 [allowClear=true]       Allow this instance to clear some config adapters...
  *
  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
 constructor(adapters, settings = {}) {

   // save the settings
   this._settings = {
     allowSet: true,
     allowClear: true,
     ...settings
   };

   // check that each adapters are available
   Object.keys(adapters).forEach(name => {
     const adapter = adapters[name];
     this.registerAdapter(name, adapter);
   });

 }

 /**
  * @name                         registerAdapter
  * @namespace                    sugar.node.class.SConfig
  * @type                         Function
  *
  * Register a new data adapter by specifying a name and the adapter module itself.
  * An adapter is a simple async function that take as arguments the config instance name, the object path to retreive/update and potentially a value to update.
  * It has to return a promise that will be resolved once the data has been retreived or updated...
  *
  * @param               {String}                       name                  The adapter name
  * @param               {Object}                       [settings={}]         The adapter settings. See each adapters separatly for that...
  *
  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
  registerAdapter(name, settings = {}) {
    if (settings.require) {
      settings.module = require(settings.require);
    } else {
      if (__fs.existsSync(__dirname + '/sConfigAdapters/' + name + '.js')) {
        settings.module = require(__dirname + '/sConfigAdapters/' + name + '.js');
      } else if (__fs.existsSync(process.cwd() + '/src/js/sConfigAdapters/' + name + '.js')) {
        settings.module = require(process.cwd() + '/src/js/sConfigAdapters/' + name + '.js');
      }
    }
    if ( ! settings.module) {
      __log(`You try to load the sConfig adapter named "${name}" but it doesn't exist either in Sugar codebase and in the folder "src/js/sConfigAdapters/${name}.js"...`, 'error');
      return false;
    } else {
      this._adapters[name] = settings;
      return true;
    }
  }

  /**
   * @name                                get
   * @namespace                           sugar.node.class.SConfig
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                      path                 The dotted object path for the value wanted
   * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
   * @return                {Promise}                                          A promise that will be resolved once the data has been retreived...
   *
   * @example               js
   * await config.get('log.frontend.mail.host'); // => gmail.google.com
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(path, adapter = null) {
    const adapterModule = adapter ? this._adapters[adapter] : this._adapters[Object.keys(this._adapters)[0]];
    return adapterModule.module(path, null, adapterModule);
  }

  /**
   * @name                                set
   * @namespace                           sugar.node.class.SConfig
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                      path                 The dotted object path for the value wanted
   * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
   * @return                {Promise}                                          A promise that will be resolved once the data has been retreived...
   *
   * @example               js
   * await config.get('log.frontend.mail.host'); // => gmail.google.com
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value, adapters = null) {

    if ( ! this._settings.allowSet) {
      __log(`You try to set the config "${path}" but this SConfig instance does not allow this action...`, 'error');
      return;
    }

    const adaptersList = adapters ? adapters.split(' ') : Object.keys(this._adapters);

    const adaptersPromises = [];
    adaptersList.forEach(name => {
      adaptersPromises.push(this._adapters[name].module(path, value, this._adapters[name]));
    });
    return Promise.all(adaptersPromises);
  }

  /**
   * @name                  clear
   * @namespace             sugar.node.class.SConfig
   * @type                  Function
   *
   * Simply remove all the config values from the adapters. This will not delete the adapters files, db, etc... but just clear it's content...
   *
   * @param             {String}          [adapters=null]     A space separated list of adapters to clear
   * @return            {Promise}                           A promise that will be resolved once the clearing has been made...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  clear(adapters = null) {

    if ( ! this._settings.allowClear) {
      __log(`You try to clear the adapters "${adapters ? adapters : Object.keys(this._adapters).join(' ')}" but this SConfig instance does not allow this action...`, 'error');
      return;
    }

    return this.set('.', {}, adapters);
  }

};
