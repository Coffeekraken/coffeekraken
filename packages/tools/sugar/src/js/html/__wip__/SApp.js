// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/get", "../is/base64", "../crypt/base64"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var get_1 = __importDefault(require("../object/get"));
    var base64_1 = __importDefault(require("../is/base64"));
    var base64_2 = __importDefault(require("../crypt/base64"));
    var __decryptedConfig, __decryptedMeta;
    /**
     * @name                                            SApp
     * @namespace           sugar.js.class
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SApp = /** @class */ (function () {
        /**
         * @constructor
         * @param                {Object}                [settings={}]         The application settings
         * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
         *
         * @setting            {String}                  [name='SApp']         The application name that you want. This will gives you access to your app instance through window.{settings.name}
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SApp(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * @name                __settings
             * @type                Object
             * @private
             */
            this.__settings = {};
            /**
             * @name              __meta
             * @type              Object
             * @private
             */
            this.__meta = {};
            /**
             * @name              __config
             * @type              Object
             * @private
             */
            this.__config = {};
            /**
             * @name                __data
             * @type                Object
             * @private
             */
            this.__data = {};
            /**
             * @name                __log
             * @type                Object
             * @private
             */
            this.__log = {};
            // store the settings
            this.__settings = __assign({ name: 'SApp' }, settings);
            // expose this instance in the "window" scope
            window[this.__settings.name] = this;
        }
        /**
         * @name                            config
         * @namespace           sugar.js.class.SApp
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SApp.prototype.config = function (path) {
            if (path === void 0) { path = null; }
            var config = window['_' + this.__settings.name + 'Data'].config || {};
            if (base64_1.default(config) && !__decryptedConfig) {
                __decryptedConfig = base64_2.default.decrypt(config);
            }
            return get_1.default(__decryptedConfig, path);
        };
        /**
         * @name                            meta
         * @namespace           sugar.js.class.SApp
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SApp.prototype.meta = function (path) {
            if (path === void 0) { path = null; }
            var meta = window['_' + this.__settings.name + 'Data'].meta || {};
            if (base64_1.default(meta) && !__decryptedMeta) {
                __decryptedMeta = base64_2.default.decrypt(meta);
            }
            return get_1.default(__decryptedMeta, path);
        };
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
         * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SApp.prototype.log = function (message, type, transports) {
            var _this_1 = this;
            if (type === void 0) { type = 'info'; }
            if (transports === void 0) { transports = null; }
            return new Promise(function (resolve, reject) {
                var _this = _this_1;
                // __ensureExist('window.Squid._log');
                Promise.all([
                    __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                    /* webpackChunkName: "log" */ /* webpackMode: "lazy" */ '../log/log')); }) : new Promise(function (resolve_1, reject_1) { require(['../log/log'], resolve_1, reject_1); }).then(__importStar),
                    __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                    /* webpackChunkName: "isTransportRegistered" */ /* webpackMode: "lazy" */ '../log/isTransportRegistered')); }) : new Promise(function (resolve_2, reject_2) { require(['../log/isTransportRegistered'], resolve_2, reject_2); }).then(__importStar),
                    __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                    /* webpackChunkName: "getRegisteredTransports" */ /* webpackMode: "lazy" */ '../log/getRegisteredTransports')); }) : new Promise(function (resolve_3, reject_3) { require(['../log/getRegisteredTransports'], resolve_3, reject_3); }).then(__importStar),
                    __syncRequire ? Promise.resolve().then(function () { return __importStar(require(
                    /* webpackChunkName: "registerTransport" */ /* webpackMode: "lazy" */ '../log/registerTransport')); }) : new Promise(function (resolve_4, reject_4) { require(['../log/registerTransport'], resolve_4, reject_4); }).then(__importStar)
                ]).then(function (modules) {
                    var __log = modules[0], __isTransportRegistered = modules[1], __getRegisteredTransports = modules[2], __registerTransport = modules[3];
                    // get the transports needed for this type
                    var configTransports = _this_1.config('log.frontend.transportsByType')[type]
                        ? _this_1.config('log.frontend.transportsByType')[type].split(' ')
                        : [];
                    var transp = transports ? transports : configTransports;
                    if (!_this_1.__log.sugarTransports) {
                        _this_1.__log.sugarTransports = require.context("@coffeekraken/sugar/js/log/transports", true, /\.js$/, 'lazy');
                    }
                    var transportsImportPromises = [];
                    transp.forEach(function (t) {
                        if (_this_1.__log.sugarTransports.keys().indexOf("./" + t + ".js") !== -1) {
                            transportsImportPromises.push(_this_1.__log.sugarTransports("./" + t + ".js").then(function (m) {
                                if (!__isTransportRegistered.default(t))
                                    __registerTransport.default(t, m.default || m);
                            }));
                        }
                    });
                    Promise.all(transportsImportPromises).then(function () {
                        __log.default(message, type, transp).then(function () {
                            resolve();
                        });
                    });
                });
            });
        };
        return SApp;
    }());
    exports.default = SApp;
});
//# sourceMappingURL=module.js.map