const __deepMerge = require('../object/deepMerge');
const __SCache = require('../cache/SCache');
const __SAuth = require('../auth/SAuth');
const __path = require('path');
const __axios = require('axios');
const __objectUid = require('../object/uid');
const __convert = require('../time/convert');
const __machineId = require('node-machine-id').machineIdSync;

const __isPlainObject = require('../is/plainObject');

/**
 * @name                            SApi
 * @namespace           node.api
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
   * - name (SApi) {String}: Specify a name used for cache, auth, etc... This name has to stay simple and contain only these characters [a-zA-Z0-9_-+]
   * - baseUrl (null) {String}: The base API url to call
   * - cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
   * - auth (null) {SAuth}: An SAuth instance to use to get the auth infos back. If null, a default SAuth instance with a terminal adapter will be created
   * - defaultRequestSettings {Object}: Specify the default requests settings like cache, auth, etc...
   *    - cache (true) {Boolean}: Specify if you want to use cache system for this request
   *    - auth (true) {Boolean}: Specify if you want to use auth system for this request
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    settings = __deepMerge(
      {
        name: `SApi-${__machineId()}`
      },
      settings
    );

    // store the name
    if (!/^[a-zA-Z0-9_\-\+]+$/.test(settings.name)) {
      throw new Error(
        `The name of an SApi instance can contain only letters like [a-zA-Z0-9_-+]...`
      );
    }

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
    this._settings = __deepMerge(
      {
        baseUrl: null,
        cache: new __SCache(`SApi-${settings.name}`, sCacheSettings),
        auth: new __SAuth(`SApi-${settings.name}`, sAuthSettings),
        defaultRequestSettings: {
          cache: true,
          auth: true
        }
      },
      settings
    );

    this._axios = __axios.create({
      baseURL: this._settings.baseUrl,
      headers: { 'Request-Provider': '@coffeekraken/sugar/node/api/SApi' }
    });
  }

  /**
   * @name                                get
   * @type                                Function
   * @async
   *
   * Process to a GET request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.get('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'get'
        },
        settings
      )
    );
  }

  /**
   * @name                                post
   * @type                                Function
   * @async
   *
   * Process to a POST request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.post('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async post(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'post'
        },
        settings
      )
    );
  }

  /**
   * @name                                delete
   * @type                                Function
   * @async
   *
   * Process to a DELETE request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.delete('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async delete(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'delete'
        },
        settings
      )
    );
  }

  /**
   * @name                                head
   * @type                                Function
   * @async
   *
   * Process to a HEAD request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.head('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async head(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'head'
        },
        settings
      )
    );
  }

  /**
   * @name                                options
   * @type                                Function
   * @async
   *
   * Process to a OPTIONS request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.options('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async options(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'options'
        },
        settings
      )
    );
  }

  /**
   * @name                                put
   * @type                                Function
   * @async
   *
   * Process to a PUT request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.put('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async put(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'put'
        },
        settings
      )
    );
  }

  /**
   * @name                                patch
   * @type                                Function
   * @async
   *
   * Process to a PATCH request on the api wanted
   *
   * @param           {String}            path            The path to make the request on
   * @param           {Object}            [settings={}]   An object of settings that you can pass. Check the "request" method documentation for available settings
   *
   * @example             js
   * const response = await myApi.patch('repositories', {
   *    timeout: '5s'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async patch(path, settings = {}) {
    return await this.request(
      path,
      __deepMerge(
        {
          method: 'patch'
        },
        settings
      )
    );
  }

  /**
   * @name                                request
   * @type                                Function
   * @async
   *
   * This method allows you to make a request to the configured API.
   * This try to get the response from the cache before sending the actual request to the API.
   * If needed, this method will ask the user for his auth informations depending on how you have
   * configured the settings.auth {SAuth} class.
   *
   * @param               {String}            path            The path on which to make the request
   * @param               {Object}            [settings={}]   An object of settings that you can pass:
   * - cache (settings.defaultRequestSettings.cache) {Boolean}: Specify if you want to use the cache for this request or not.
   * - auth (settings.defaultRequestSettings.auth) {Boolean}: Specify if you want to use the auth system for this request if configured
   * - url (path) {String}: Specify the path on which you want to make the request
   * - method (get) {String}: Specify the method you want to use. Can be "get", "post", "put", "patch", "delete", "head" or "options"
   * - headers (null) {Object}: An object of headers to send with the request. Auth related headers are automatically added
   * - timeout (0) {Number|String}: Specify the number of milliseconds before the request is aborted. Can be a string like '10s', '20m', '1h', etc...
   * - Axios config object (null) {Object}: All the axios config parameters are available. @see https://github.com/axios/axios
   */
  async request(path, settings = {}) {
    // init requestConfig object
    let requestConfig = {};

    // check auth if used for this request
    if (this._settings.defaultRequestSettings.auth && settings.auth !== false) {
      // authenticate
      const authInfo = await this.auth();

      // inject the auth info
      requestConfig = this._settings.auth.inject('axios', {}, authInfo);
    }

    // generate the final request config
    const finalRequestConfig = __deepMerge(
      requestConfig,
      {
        url: path,
        method: 'get',
        ...this._settings.defaultRequestSettings
      },
      settings
    );

    // calculate the timeout
    finalRequestConfig.timeout = __convert(
      finalRequestConfig.timeout || 0,
      'ms'
    );

    // generate a uid for this request
    let uid = __objectUid(finalRequestConfig);

    // try to get the response back from cache
    if (finalRequestConfig.cache && this._settings.cache) {
      const cachedResponse = await this._getFromCache(uid);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // proceed to the request
    let rawResponse = null;
    let response = {};
    try {
      // make the request
      if (typeof finalRequestConfig.auth !== 'object')
        delete finalRequestConfig.auth;
      rawResponse = await this._axios.request(finalRequestConfig);
      // build the response
      response = {
        status: rawResponse.status,
        statusText: rawResponse.statusText,
        headers: rawResponse.headers,
        method: rawResponse.request.method,
        baseUrl: rawResponse.config.baseURL,
        path: rawResponse.request.path,
        aborted: rawResponse.request.aborted,
        timeout: rawResponse.config.timeout,
        data: rawResponse.data
      };
    } catch (e) {
      console.log(e);
      process.exit();
    }

    // save the request response into cache
    if (finalRequestConfig.cache && this._settings.cache) {
      this._setIntoCache(uid, response);
    }

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
    return await this._settings.auth.authInfo();
  }

  /**
   * @name                                      _getFromCache
   * @type                                      Function
   * @async
   *
   * This method check into the cache if the request uid exists
   *
   * @param           {String}              requestUid              The request uid to get from cache
   * @return          {Promise}                                     A promise that will be resolved with the request response or false if not exists
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _getFromCache(requestUid) {
    // check from the cache if we can get the request response from
    const cachedResponse = await this._settings.cache.get(requestUid);

    // return the response
    return cachedResponse || false;
  }

  /**
   * @name                                      _setIntoCache
   * @type                                      Function
   * @async
   *
   * This method save into the cache if the request response usinf the request uid as identifier
   *
   * @param           {String}              requestUid              The request uid to save the response under
   * @param           {Object}              response                The response to save into cache
   * @return          {Promise}                                     A promise that will be resolved once the response has been saved
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _setIntoCache(requestUid, response) {
    // check from the cache if we can get the request response from
    await this._settings.cache.set(requestUid, response);

    // return the response
    return true;
  }
};
