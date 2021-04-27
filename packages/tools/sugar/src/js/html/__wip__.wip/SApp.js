// @ts-nocheck
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
        define(["require", "exports", "../../shared/object/get", "../../shared/is/base64", "../../shared/crypt/base64"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    const get_1 = __importDefault(require("../../shared/object/get"));
    const base64_1 = __importDefault(require("../../shared/is/base64"));
    const base64_2 = __importDefault(require("../../shared/crypt/base64"));
    let __decryptedConfig, __decryptedMeta;
    /**
     * @name                                            SApp
     * @namespace            js.class
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
    class SApp {
        /**
         * @constructor
         * @param                {Object}                [settings={}]         The application settings
         * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
         *
         * @setting            {String}                  [name='SApp']         The application name that you want. This will gives you access to your app instance through window.{settings.name}
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
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
            this.__settings = Object.assign({ name: 'SApp' }, settings);
            // expose this instance in the "window" scope
            window[this.__settings.name] = this;
        }
        /**
         * @name                            config
         * @namespace            js.class.SApp
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
        config(path = null) {
            let config = window['_' + this.__settings.name + 'Data'].config || {};
            if (base64_1.default(config) && !__decryptedConfig) {
                __decryptedConfig = base64_2.default.decrypt(config);
            }
            return get_1.default(__decryptedConfig, path);
        }
        /**
         * @name                            meta
         * @namespace            js.class.SApp
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
        meta(path = null) {
            let meta = window['_' + this.__settings.name + 'Data'].meta || {};
            if (base64_1.default(meta) && !__decryptedMeta) {
                __decryptedMeta = base64_2.default.decrypt(meta);
            }
            return get_1.default(__decryptedMeta, path);
        }
        /**
         * @name                                  log
         * @namespace                             squid.js.log
         * @type                                  Function
         *
         * Log a message using the transports log system.
         *
         * @param           {String}              message                   The message to log
         * @param           {String}              [type="info"]             The type of log. Can be "error", "warn", "info", "http", "verbose", "debug", "silly"
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
        log(message, type = 'info', transports = null) {
            return new Promise((resolve, reject) => {
                const _this = this;
                // __ensureExist('window.Squid._log');
                Promise.all([
                    __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "log" */ /* webpackMode: "lazy" */ '../log/log'))) : new Promise((resolve_1, reject_1) => { require(['../log/log'], resolve_1, reject_1); }).then(__importStar),
                    __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "isTransportRegistered" */ /* webpackMode: "lazy" */ '../log/isTransportRegistered'))) : new Promise((resolve_2, reject_2) => { require(['../log/isTransportRegistered'], resolve_2, reject_2); }).then(__importStar),
                    __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "getRegisteredTransports" */ /* webpackMode: "lazy" */ '../log/getRegisteredTransports'))) : new Promise((resolve_3, reject_3) => { require(['../log/getRegisteredTransports'], resolve_3, reject_3); }).then(__importStar),
                    __syncRequire ? Promise.resolve().then(() => __importStar(require(
                    /* webpackChunkName: "registerTransport" */ /* webpackMode: "lazy" */ '../log/registerTransport'))) : new Promise((resolve_4, reject_4) => { require(['../log/registerTransport'], resolve_4, reject_4); }).then(__importStar)
                ]).then((modules) => {
                    const __log = modules[0], __isTransportRegistered = modules[1], __getRegisteredTransports = modules[2], __registerTransport = modules[3];
                    // get the transports needed for this type
                    const configTransports = this.config('log.frontend.transportsByType')[type]
                        ? this.config('log.frontend.transportsByType')[type].split(' ')
                        : [];
                    let transp = transports ? transports : configTransports;
                    if (!this.__log.sugarTransports) {
                        this.__log.sugarTransports = require.context(`@coffeekraken/sugar/js/log/transports`, true, /\.js$/, 'lazy');
                    }
                    const transportsImportPromises = [];
                    transp.forEach((t) => {
                        if (this.__log.sugarTransports.keys().indexOf(`./${t}.js`) !== -1) {
                            transportsImportPromises.push(this.__log.sugarTransports(`./${t}.js`).then((m) => {
                                if (!__isTransportRegistered.default(t))
                                    __registerTransport.default(t, m.default || m);
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
    }
    exports.default = SApp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBNEM7SUFDNUMsb0VBQWdEO0lBQ2hELHVFQUFpRDtJQUVqRCxJQUFJLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztJQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFxQixJQUFJO1FBb0N2Qjs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUE1Q3pCOzs7O2VBSUc7WUFDSCxlQUFVLEdBQUcsRUFBRSxDQUFDO1lBRWhCOzs7O2VBSUc7WUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1lBRVo7Ozs7ZUFJRztZQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7WUFFZDs7OztlQUlHO1lBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztZQUVaOzs7O2VBSUc7WUFDSCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBWVQscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxVQUFVLG1CQUNiLElBQUksRUFBRSxNQUFNLElBQ1QsUUFBUSxDQUNaLENBQUM7WUFFRiw2Q0FBNkM7WUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSTtZQUNoQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDdEUsSUFBSSxnQkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzVDLGlCQUFpQixHQUFHLGdCQUFRLENBQUMsT0FBTyxDQUFDLE1B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