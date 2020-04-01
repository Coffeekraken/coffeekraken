const __deepMerge = require('../object/deepMerge');
const __SCache = require('../cache/SCache');
const __SAuth = require('../auth/SAuth');
const __path = require('path');
const __axios = require('axios');

const __isPlainObject = require('../is/plainObject');

/**
 * @name                            SApi
 * @namespace                       sugar.node.api
 * @type                            Class
 * 
 * Base class that extends all the S...Api classes. This class gives some features like:
 * - Caching requests
 * - Auth support through the SAuth class
 * - Promise based methods like "get", "post", etc...
 * - And more...
 * 
 * @example           js
 * const SApi = require('@coffeekraken/sugar/node/api/SApi');
 * class MyCoolApi extends SApi {
 *    constructor(name, settings = {}) {
 *      super(name, settings);
 *    }
 * }
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SApi {

  /**
   * @name                          _name
   * @type                          String
   * @private
   * 
   * Store the instance name
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name                          _settings
   * @type                          Object
   * @private
   * 
   * Store the instance settings
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = null;

  /**
   * @name                          constructor
   * @type                          Function
   * 
   * Construct the SApi instance
   * 
   * @param           {String}                name                  The name of this SApi instance
   * @param           {Object}                [settings={}]
   * An object of settings to configure this SApi instance. Here's the list of available settings:
   * - baseUrl (null) {String}: The base API url to call
   * - cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
   * - auth (null) {SAuth}: An SAuth instance to use to get the auth infos back. If null, a default SAuth instance with a terminal adapter will be created
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {

    // store the name
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(`The name of an SApi instance can contain only letters like [a-zA-Z0-9_-]...`);
    }
    this._name = name;

    // handle settings
    let sCacheSettings = {};
    if (__isPlainObject(settings.cache)) {
      sCacheSettings = Object.assign(settings.cache);
      delete settings.cache;
    }
    let sAuthSettings = {};
    if (__isPlainObject(settings.auth)) {
      sAuthSettings = Object.assign(settings.auth);
      delete settings.auth;
    }
    this._settings = __deepMerge({
      baseUrl: null,
      cache: new __SCache(`SApi-${name}`, sCacheSettings),
      auth: new __SAuth(`SApi-${name}`, sAuthSettings)
    }, settings);

  }

  /**
   * @name                                get
   * @type                                Function
   * @async
   * 
   * Process to a GET request on the api wanted
   * 
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass:
   * - headers (null) {Object}: An object of headers to send with the request. Auth related headers are automatically added
   * - timeout (0) {Number|String}: Specify the number of milliseconds before the request is aborted. Can be a string like '10s', '20m', '1h', etc...
   * - Axios config object (null) {Object}: All the axios config parameters are available. @see https://github.com/axios/axios
   * 
   * @example             js
   * const response = await myApi.get('repositories', {
   *    timeout: '5s'
   * });
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(path, settings = {}) {

    // authenticate
    const authInfo = await this.auth();

    // proceed to the request
    const response = await __axios.get(path, __deepMerge({
      headers: {
        ...authInfo.headers || {}
      }
    }, settings));

    // return the response
    return response;

  }

  /**
   * @name                                auth
   * @type                                Function
   * @async
   * 
   * Get back the auth informations that will be used by this instance
   * 
   * @return          {Promise}                     A promise that will be resolved with the getted auth informations
   * 
   * @example         js
   * const auth = await myApi.auth();
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async auth() {
    // request the auth informations using the SAuth instance
    return await this._settings.auth.ask();
  }

}