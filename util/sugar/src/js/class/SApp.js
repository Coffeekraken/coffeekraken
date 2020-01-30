const __log = require('../log/log');
const __deepMerge = require('../object/deepMerge');
const __get = require('../object/get');
const __set = require('../object/set');
const __SAjax = require('./SAjax');
const __isBase64 = require('../is/base64');
const __base64 = require('../crypt/base64');

let __decryptedConfig, __decryptedMeta;

/**
 * @name                                            SApp
 * @namespace                                       sugar.js.class
 * @type                                            Class
 *
 * This class represent an application route class. This mean that you can create an application class that extend this one
 * and your instance will have access to a whole package of data like the application name taken from the package.json file, the version,
 * the description, the author(s), the contributor(s), etc...
 *
 * @example             js
 * import SApp = from ''@coffeekraken/sugar/js/class/SApp';
 * class MyCoolApp extends SApp {
 *    // your app class here...
 * }
 * const myApp = new MyCoolApp();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SApp {

  /**
   * @name                __settings
   * @type                Object
   * @private
   */
  __settings = {};

  /**
   * @name              __meta
   * @type              Object
   * @private
   */
  __meta  = {};

  /**
   * @name              __config
   * @type              Object
   * @private
   */
  __config  = {};

  /**
   * @name                __data
   * @type                Object
   * @private
   */
  __data = {};

  /**
   * @name                __log
   * @type                Object
   * @private
   */
  __log = {};

 /**
  * @constructor
  * @param               {Object}                      data                 The application data that you want to set like version, name, etc...
  * @param                {Object}                    [settings={}]          An object to configure your SApp instance.
  * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
  *
  * @setting              {Array}                 [sources=[process.cwd()]]         Tell the class instance where to search for files like package.json, app.config.js, etc...
  *
  * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
 constructor() {

   // expose this instance in the "window" scope
   window[window._sAppName || 'sApp'] = this;

 }

 /**
  * @name                            config
  * @namespace                       sugar.js.class.SApp
  * @type                            Function
  *
  * Get a configuration value from the backend using an ajax call
  *
  * @param               {String}              [path=null]                           The configuration object dotted path to get like log.frontend.mail.host
  * @return              {Mixed}                                                     The configuration value getted
  *
  * @example           js
  * const host = await myApp.config('log.frontend.mail.host');
  *
  * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
 config(path = null) {
   let config = window['_' + window._sAppName + 'Data' || '_sAppData'].config || {};
   if (__isBase64(config) && ! __decryptedConfig) {
     __decryptedConfig = __base64.decrypt(config);
   }
   return __get(__decryptedConfig, path);
 }

 /**
  * @name                            meta
  * @namespace                       sugar.js.class.SApp
  * @type                            Function
  *
  * Usefull function that give you back an application meta taken depending on your passed dotted object path
  *
  * @param               {String}              [path=null]                           The meta object dotted path to get like "name"
  * @return              {Mixed}                                                     The meta value getted
  *
  * @example           js
  * const name = await myApp.meta('name');
  *
  * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
 meta(path = null) {
   let meta = window['_' + window._sAppName + 'Data' || '_sAppData'].meta || {};
   if (__isBase64(meta) && ! __decryptedMeta) {
     __decryptedMeta = __base64.decrypt(meta);
   }
   return __get(__decryptedMeta, path);
 }

 /**
  * @name                                  log
  * @namespace                             squid.js.log
  * @type                                  Function
  *
  * Log a message using the transports log system.
  *
  * @param           {String}              message                   The message to log
  * @param           {String}              [type="info"]             The type of log. Can be "error", "warn", "info", "http", "verbose", "debug", "silly"
  * @param           {Array}               [transports=null]         The transports that you want to use for this log process. If null, use all the transports configured in the squid config for the type of log passed
  * @return          {Promise}                                       A promise resolved once the log process is finished
  *
  * @example           js
  * Squid.log('Hello world', 'error').then(() => {
  *    // do something if needed...
  * });
  *
  * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
 log(message, type = 'info', transports = null) {
   return new Promise((resolve, reject) => {

     // __ensureExist('window.Squid._log');

     Promise.all([
       import('@coffeekraken/sugar/js/log/log'),
       import('@coffeekraken/sugar/js/log/isTransportRegistered'),
       import('@coffeekraken/sugar/js/log/getRegisteredTransports'),
       import('@coffeekraken/sugar/js/log/registerTransport')
     ]).then(async (modules) => {

       const __log = modules[0],
             __isTransportRegistered = modules[1],
             __getRegisteredTransports = modules[2],
             __registerTransport = modules[3];

       // get the transports needed for this type
       const configTransports = (await this.config('log.frontend.transportsByType'))[type] ? (await this.config('log.frontend.transportsByType'))[type].split(' ') : [];
       let transp = transports ? transports : configTransports;

       if ( ! this.__log.sugarTransports) {
         this.__log.sugarTransports = require.context(`@coffeekraken/sugar/js/log/transports`, true, /\.js$/, 'lazy');
       }

       const transportsImportPromises = [];
       transp.forEach(t => {
         if (this.__log.sugarTransports.keys().indexOf(`./${t}.js`) !== -1) {
           transportsImportPromises.push(this.__log.sugarTransports(`./${t}.js`).then(m => {
             if ( ! __isTransportRegistered.default(t)) __registerTransport.default(t, m.default || m);
           }));
         }
       });

       Promise.all(transportsImportPromises).then(() => {

         __log.default(message, type, transp).then(() => {
           resolve();
         });

       });

     });

   });

 }


};
