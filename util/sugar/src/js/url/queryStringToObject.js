import ltrim from "../string/ltrim";

/**
 * @name        queryStringToObject
 * @namespace       sugar.js.url
 * @type      Function
 *
 * Transform a query string into his object (key => pairs) representation
 *
 * @param 	{String}  	queryString  	The query string to process
 * @return 	{Object} 					The object representation of the query string
 *
 * @example    js
 * import queryStringToObject from '@coffeekraken/sugar/js/string/queryStringToObject'
 * queryStringToObject('?var1=value1&var2=value2') // { var1: 'value1', var2: 'value2' }
 *
 * @snippet     js
 * Sugar.js.url.queryStringToObject($1)
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see  	http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
 */
export default function queryStringToObject(str) {
  str = ltrim(str, "?");
  str = decodeURIComponent(str);
  var chunks = str.split("&"),
    obj = {};
  chunks = chunks.filter(ch => {
    return ch !== "";
  });
  for (var c = 0; c < chunks.length; c++) {
    var split = chunks[c].split("=", 2);
    obj[split[0]] = split[1];
  }
  return obj;
}

import __deepMerge from '../object/deepMerge';
import __get from '../object/get';
import __set from '../object/set';

import __SConfigAdapter from './adapters/SConfigAdapter';

/**
 * @name                                            SConfig
 * @namespace                                       sugar.js.config
 * @type                                            Class
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are "json" and "js" allowing you to store data inside files on the server drive.
 *
 * @param                 {String}                    name                  The name of the config
 * @param                {Object}                    [settings={}]
 * An object to configure your SConfig instance. See the list above
 * The available settings are:
 * - adapters (['js']) {Array}: An array of adapters names/instances to use for this SConfig instance
 * - defaultAdapter (null) {String}: This specify which adapter you want to use as default one. If not set, take the first adapter in the adapters list
 * - allowSave (true) {Boolean}: Specify if this instance can save the updated configs
 * - allowSet (true) {Boolean}: Specify if you can change the configs during the process or not
 * - allowReset (true) {Boolean}: Specify if you can rest the configs during the process or not
 * - allowNew (false) {Boolean}: Specify you can create new configs with this instance or not
 * - autoLoad (true) {Boolean}: Specify if you want the config to be loaded automatically at instanciation
 * - autoSave (true) {Boolean}: Specify if you want the setting to be saved through the adapters directly on "set" action
 * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
 * @return              {SConfig}                                           An SConfig instance with the once you can access/update the configs
 *
 * 
 * @example             js
 * import SConfig from '@coffeekraken/sugar/js/config/SConfig';
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
export default class SConfig {

  /**
   * @name              _name
   * @type              {String}
   * @private
   * 
   * The name of the config
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name            _adapters
   * @type            {Object}
   * @private
   * 
   * Save the registered adapters instances
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _adapters = {};

  /**
   * @name             _settings
   * @type              {Object}
   * @private
   * 
   * Store the actual settings object
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

/**
 * @constructor
 * @name                  constructor
 * @type                  Function
 *
 * Init the config instance by passing a name and a settings object to configure your instance
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * @name                                load
 * @type                                Function
 * @async
 *
 * Load the config from the default adapter or from the passed adapter
 *
 * @param           {String}            [adapter=this._settings.defaultAdapter]         The adapter to use to load the config
 * @return          {Promise}                                                           A promise that will be resolved with the loaded config
 *
 * @example           js
 * const config = await config.load();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * @name                          save
 * @type                          Function
 * @async
 *
 * Save the config through all the registered adapters or just the one specify in params
 *
 * @param           {String|Array}          [adapters=Object.keys(this._adapters)]        The adapters to save the config through
 * @return          {Promise}                                                              A promise once all the adapters have correctly saved the config
 *
 * @example           js
 * await config.save();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * @name                                get
 * @type                                Function
 *
 * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
 *
 * @param                 {String}                      path                 The dotted object path for the value wanted
 * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
 * @return                {Mixed}                                            The value getted
 *
 * @example               js
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

/**
 * @name                                set
 * @namespace                           sugar.node.config.SConfig
 * @type                                Function
 * @async
 *
 * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
 *
 * @param                 {String}                      path                 The dotted object path for the value wanted
 * @param                 {Mixed}                       value                 The value to set
 * @param                 {String|Array}                      [adapters=Object.keys(this._adapters)]       The adapter you want to use or an array of adapters
 * @return                {Promise}                                           A promise resolved once the setting has been correctly set (and save depending on your instance config)
 *
 * @example               js
 * config.set('log.frontend.mail.host', 'coffeekraken.io');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

