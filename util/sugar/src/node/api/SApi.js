const __deepMerge = require('../object/deepMerge');
const __SCache = require('../cache/SCache');
const __SAuth = require('../auth/SAuth');

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
 *    constructor(settings = {}) {
 *      super(settings);
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
   * - authType (basic) {String}: The authentication method that you want to use. Can be 'basic', 'bearer', 'apikey' or 'oauth2'
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
    this._settings = __deepMerge({
      authType: 'basic',
      cache: new __SCache(`SApi-${name}`, {}),
      auth: new __SAuth(`SApi-${name}`, {})
    }, settings);

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
    return this._settings.auth.ask(this._settings.authType);
  }

}