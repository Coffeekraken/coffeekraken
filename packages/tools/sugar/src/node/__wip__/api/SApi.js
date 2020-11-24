"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SCache_1 = __importDefault(require("../cache/SCache"));
const SAuth_1 = __importDefault(require("../auth/SAuth"));
const axios_1 = __importDefault(require("axios"));
const uid_1 = __importDefault(require("../object/uid"));
const convert_1 = __importDefault(require("../time/convert"));
const node_machine_id_1 = require("node-machine-id");
const plainObject_1 = __importDefault(require("../is/plainObject"));
/**
 * @name                            SApi
 * @namespace           sugar.node.api
 * @type                            Class
 * @wip
 *
 * Base class that extends all the S...Api classes. This class gives some features like:
 * - Caching requests
 * - Auth support through the SAuth class
 * - Promise based methods like "get", "post", etc...
 * - And more...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import SApi from '@coffeekraken/sugar/node/api/SApi';
 * class MyCoolApi extends SApi {
 *    constructor(name, settings = {}) {
 *      super(name, settings);
 *    }
 * }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SApi {
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name                          _name
         * @type                          String
         * @private
         *
         * Store the instance name
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._name = null;
        /**
         * @name                          _settings
         * @type                          Object
         * @private
         *
         * Store the instance settings
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = null;
        settings = deepMerge_1.default({
            name: `SApi-${node_machine_id_1.machineIdSync()}`
        }, settings);
        // store the name
        if (!/^[a-zA-Z0-9_\-\+]+$/.test(settings.name)) {
            throw new Error(`The name of an SApi instance can contain only letters like [a-zA-Z0-9_-+]...`);
        }
        // handle settings
        let sCacheSettings = {};
        if (plainObject_1.default(settings.cache)) {
            sCacheSettings = Object.assign(settings.cache);
            delete settings.cache;
        }
        let sAuthSettings = {};
        if (plainObject_1.default(settings.auth)) {
            sAuthSettings = Object.assign(settings.auth);
            delete settings.auth;
        }
        this._settings = deepMerge_1.default({
            baseUrl: null,
            cache: new SCache_1.default(`SApi-${settings.name}`, sCacheSettings),
            auth: new SAuth_1.default(`SApi-${settings.name}`, sAuthSettings),
            defaultRequestSettings: {
                cache: true,
                auth: true
            }
        }, settings);
        this._axios = axios_1.default.create({
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'get'
            }, settings));
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    post(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'post'
            }, settings));
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    delete(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'delete'
            }, settings));
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    head(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'head'
            }, settings));
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    options(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'options'
            }, settings));
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    put(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'put'
            }, settings));
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    patch(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(path, deepMerge_1.default({
                method: 'patch'
            }, settings));
        });
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
    request(path, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // init requestConfig object
            let requestConfig = {};
            // check auth if used for this request
            if (this._settings.defaultRequestSettings.auth && settings.auth !== false) {
                // authenticate
                const authInfo = yield this.auth();
                // inject the auth info
                requestConfig = this._settings.auth.inject('axios', {}, authInfo);
            }
            // generate the final request config
            const finalRequestConfig = deepMerge_1.default(requestConfig, Object.assign({ url: path, method: 'get' }, this._settings.defaultRequestSettings), settings);
            // calculate the timeout
            finalRequestConfig.timeout = convert_1.default(finalRequestConfig.timeout || 0, 'ms');
            // generate a uid for this request
            let uid = uid_1.default(finalRequestConfig);
            // try to get the response back from cache
            if (finalRequestConfig.cache && this._settings.cache) {
                const cachedResponse = yield this._getFromCache(uid);
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
                rawResponse = yield this._axios.request(finalRequestConfig);
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
            }
            catch (e) {
                console.log(e);
                process.exit();
            }
            // save the request response into cache
            if (finalRequestConfig.cache && this._settings.cache) {
                this._setIntoCache(uid, response);
            }
            // return the response
            return response;
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            // request the auth informations using the SAuth instance
            return yield this._settings.auth.authInfo();
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _getFromCache(requestUid) {
        return __awaiter(this, void 0, void 0, function* () {
            // check from the cache if we can get the request response from
            const cachedResponse = yield this._settings.cache.get(requestUid);
            // return the response
            return cachedResponse || false;
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _setIntoCache(requestUid, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // check from the cache if we can get the request response from
            yield this._settings.cache.set(requestUid, response);
            // return the response
            return true;
        });
    }
}
exports.default = SApi;
