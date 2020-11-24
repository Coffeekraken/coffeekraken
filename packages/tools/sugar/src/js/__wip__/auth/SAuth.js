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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __machineIdSync = require('node-machine-id').machineIdSync;
var __deepMerge = require('../object/deepMerge');
var __fs = require('fs');
var __SAuthTerminalAdapter = require('./adapters/SAuthTerminalAdapter');
var __SCache = require('../cache/SCache');
var __cryptObject = require('../crypt/object');
/**
 * @name                            SAuth
 * @namespace           node.auth
 * @type                            Class
 *
 * Base class that gives you the ability to set/ask for some authentification informations like auth token, username-password, etc...
 *
 * @example           js
 * const apiAuth = new SAuth('bitbucket');
 * const token = await apiAuth.ask('token');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = /** @class */ (function () {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the SAuth instance
     *
     * @param           {String}                name                  The name of this SAuth instance
     * @param           {Object}                [settings={}]
     * An object of settings to configure this SAuth instance. Here's the list of available settings:
     * - type (basic) {String}: Specify the auth type wanted. Can be 'basic', 'bearer', 'oauth2', etc...
     * - title (null) {String}: Specify the title to display on top of the form
     * - info (null) {String}: Specify some info to display on top of the form
     * - adapter (SAuthTerminalAdapter) {SAuthAdapter}: The adapter instance you want to use to get the auth informations
     * - cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
     * - validator (null) {Function}: An async function that take as parameters the auth type like "basic" and the auth object to check if the authentification is correct. Has to return a promise that need to be resolved with true if all is ok, and false if not. Can be also an error message to display to the user
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function SAuth(name, settings) {
        if (settings === void 0) { settings = {}; }
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
         * @name                          _adapter
         * @type                          SAuthAdapter
         * @private
         *
         * Store the instance adapter
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._adapter = null;
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
        // store the name
        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            throw new Error("The name of an SAuth instance can contain only letters like [a-zA-Z0-9_-]...");
        }
        this._name = name;
        // handle settings
        this._settings = __deepMerge({
            type: 'basic',
            title: null,
            info: null,
            adapter: new __SAuthTerminalAdapter(),
            cache: new __SCache("SAuth-" + name, {}),
            validator: null
        }, settings);
        // save the adapter
        this._adapter = this._settings.adapter;
        // process validator
        if (this._settings.validator &&
            typeof this._settings.validator === 'string') {
            if (__fs.existsSync(__dirname + "/validators/" + this._settings.validator + "Validator.js")) {
                this._settings.validator = require(__dirname + "/validators/" + this._settings.validator + "Validator.js");
            }
        }
    }
    Object.defineProperty(SAuth.prototype, "type", {
        /**
         * @name                          type
         * @type                          String
         *
         * Access the auth type like "basic", "bearer", "oauth2", etc...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get: function () {
            return this._settings.type;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @name                          authInfo
     * @type                          Object
     *
     * Get the authInfo object if already saved in memory or ask the user for this
     *
     * @param           {Object}            [settings={}]       An object of settings. Here's the options available:
     * - title (null) {String}: The title to display on top of the form
     * - type (settings.type) {String}: Specify the auth type that you want to ask to the user
     * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
     * - info (null) {String}: An info message to display to the user
     * @return          {Promise}                               A promise resolved with the authInfo object
     *
     * @example         js
     * const authInfo = await myAuth.authInfo();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    SAuth.prototype.authInfo = function (settings) {
        if (settings === void 0) { settings = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var cachedInfos, decryptedValue, authInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        settings = __deepMerge({
                            type: this.type,
                            title: this._settings.title,
                            info: this._settings.info,
                            error: null
                        }, settings);
                        // return the cached info in memory
                        if (this._authInfo)
                            return [2 /*return*/, this._authInfo];
                        return [4 /*yield*/, this._settings.cache.get(settings.type)];
                    case 1:
                        cachedInfos = _a.sent();
                        if (cachedInfos) {
                            decryptedValue = __cryptObject.decrypt(cachedInfos, __machineIdSync());
                            return [2 /*return*/, decryptedValue];
                        }
                        return [4 /*yield*/, this.ask(settings)];
                    case 2:
                        authInfo = _a.sent();
                        // return the getted infos
                        return [2 /*return*/, authInfo];
                }
            });
        });
    };
    /**
     * @name                          inject
     * @type                          Function
     *
     * This method take the passed requestConfig object and inject the auth parameters depending on the "injector" wanted that can be one of the described bellow
     *
     * @param           {String|Function}            injector              The injector wanted that can be one of these:
     * - axios: Inject the auth infos into an axio request config object
     * - Function: A function that take as parameters the requestConfig object and the authInfo object and has to return the updated requestConfig
     * @param           {Object}            requestConfig         The request config object into which inject the auth info
     * @param           {Object}            [authInfo=this.authInfo]      The authInfo object to use
     * @return          {Object}                                  The hooked requestConfig
     *
     * @example         js
     * myAuth.inject('axios', requestConfig);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    SAuth.prototype.inject = function (injector, requestConfig, authInfo) {
        if (authInfo === void 0) { authInfo = this._authInfo; }
        // if we don't have any auth info, return the request object untouched
        if (!authInfo)
            return requestConfig;
        // init the final request config variable that will be hooked
        var finalRequestConfig = {};
        // check if the injector is a string
        if (typeof injector === 'string') {
            if (!__fs.existsSync(__dirname + "/injectors/" + injector + "Injector.js")) {
                throw new Error("You try to inject the auth info using the injector \"" + injector + "\" but it does not exists...");
            }
            finalRequestConfig = require(__dirname + "/injectors/" + injector + "Injector.js")(Object.assign(requestConfig), authInfo);
        }
        else if (typeof injector === 'function') {
            finalRequestConfig = injector(Object.assign(requestConfig), authInfo);
        }
        // process a little bit the final request config object
        delete finalRequestConfig.name;
        delete finalRequestConfig.token;
        delete finalRequestConfig.type;
        // return the requestConfig untouched as fallback
        return finalRequestConfig;
    };
    /**
     * @name                          ask
     * @type                          Function
     * @async
     *
     * Allows you to request for some auth informations to the user.
     *
     * @param           {Object}            [settings={}]       An object of settings. Here's the options available:
     * - title (null) {String}: The title to display on top of the form
     * - type (settings.type) {String}: Specify the auth type that you want to ask to the user
     * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
     * - info (null) {String}: An info message to display to the user
     * @return          {Promise}                         A promise that will be resolved once the user (or the api) has answer with the correct infos
     *
     * @example           js
     * const authInfos = await myAuthInstance.ask();
     * // {
     * //   type: 'basic',
     * //   name: 'maAuth.basic',
     * //   token: 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
     * //   headers: {
     * //     Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
     * //   }
     * // }
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    SAuth.prototype.ask = function (settings) {
        if (settings === void 0) { settings = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var rawInfos, formatedInfos, validationResult, askSettings, cryptedInfos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        settings = __deepMerge({
                            type: this.type,
                            title: this._settings.title,
                            info: this._settings.info,
                            error: null
                        }, settings);
                        // check that the requested auth type is handled by the adapter
                        if (this._adapter.supportedAuthTypes.indexOf(settings.type) === -1) {
                            throw new Error("You try to ask the auth informations of type \"" + settings.type + "\" through the \"" + this._name + "\" SAuth instance but the setted adapter does not handle this auth type...");
                        }
                        return [4 /*yield*/, this._adapter.ask(settings)];
                    case 1:
                        rawInfos = _a.sent();
                        formatedInfos = rawInfos;
                        if (__fs.existsSync(__dirname + "/formaters/" + settings.type + "Formater.js")) {
                            formatedInfos = require(__dirname + "/formaters/" + settings.type + "Formater.js")(rawInfos);
                        }
                        // add the common formated auth object info
                        formatedInfos = __deepMerge({
                            type: settings.type,
                            name: this._name + "." + settings.type
                        }, formatedInfos);
                        if (!this._settings.validator) return [3 /*break*/, 3];
                        // display validation message
                        if (this._adapter._validation) {
                            this._adapter._validation();
                        }
                        return [4 /*yield*/, this._settings.validator(formatedInfos)];
                    case 2:
                        validationResult = _a.sent();
                        if (validationResult !== true) {
                            askSettings = Object.assign(settings);
                            askSettings.error =
                                typeof validationResult === 'string'
                                    ? validationResult
                                    : 'Your credentials have been declined. Please try again...';
                            return [2 /*return*/, this.ask(askSettings)];
                        }
                        _a.label = 3;
                    case 3:
                        if (!this._adapter._success) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._adapter._success()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        cryptedInfos = __cryptObject.encrypt(formatedInfos, __machineIdSync());
                        // the infos are ok so we save them in cache
                        return [4 /*yield*/, this._settings.cache.set(settings.type, cryptedInfos, {})];
                    case 6:
                        // the infos are ok so we save them in cache
                        _a.sent();
                        // save the auth info into memory
                        this._authInfo = formatedInfos;
                        // return the getted infos
                        return [2 /*return*/, formatedInfos];
                }
            });
        });
    };
    return SAuth;
}());
