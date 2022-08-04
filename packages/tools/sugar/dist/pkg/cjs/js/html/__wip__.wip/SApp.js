"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const base64_1 = __importDefault(require("../../shared/crypt/base64"));
const base64_2 = __importDefault(require("../../shared/is/base64"));
const get_1 = __importDefault(require("../../shared/object/get"));
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SApp {
    /**
     * @constructor
     * @param                {Object}                [settings={}]         The application settings
     * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
     *
     * @setting            {String}                  [name='SApp']         The application name that you want. This will gives you access to your app instance through window.{settings.name}
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    config(path = null) {
        let config = window['_' + this.__settings.name + 'Data'].config || {};
        if ((0, base64_2.default)(config) && !__decryptedConfig) {
            __decryptedConfig = base64_1.default.decrypt(config);
        }
        return (0, get_1.default)(__decryptedConfig, path);
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    meta(path = null) {
        let meta = window['_' + this.__settings.name + 'Data'].meta || {};
        if ((0, base64_2.default)(meta) && !__decryptedMeta) {
            __decryptedMeta = base64_1.default.decrypt(meta);
        }
        return (0, get_1.default)(__decryptedMeta, path);
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
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    log(message, type = 'info', transports = null) {
        return new Promise((resolve, reject) => {
            const _this = this;
            // __ensureExist('window.Squid._log');
            Promise.all([
                Promise.resolve().then(() => __importStar(require(
                /* webpackChunkName: "log" */ /* webpackMode: "lazy" */ '../log/log'))),
                Promise.resolve().then(() => __importStar(require(
                /* webpackChunkName: "isTransportRegistered" */ /* webpackMode: "lazy" */ '../log/isTransportRegistered'))),
                Promise.resolve().then(() => __importStar(require(
                /* webpackChunkName: "getRegisteredTransports" */ /* webpackMode: "lazy" */ '../log/getRegisteredTransports'))),
                Promise.resolve().then(() => __importStar(require(
                /* webpackChunkName: "registerTransport" */ /* webpackMode: "lazy" */ '../log/registerTransport'))),
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
                    if (this.__log.sugarTransports
                        .keys()
                        .indexOf(`./${t}.js`) !== -1) {
                        transportsImportPromises.push(this.__log
                            .sugarTransports(`./${t}.js`)
                            .then((m) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsdUVBQWlEO0FBQ2pELG9FQUFnRDtBQUNoRCxrRUFBNEM7QUFFNUMsSUFBSSxpQkFBaUIsRUFBRSxlQUFlLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBcUIsSUFBSTtJQW9DckI7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBNUN6Qjs7OztXQUlHO1FBQ0gsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVoQjs7OztXQUlHO1FBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaOzs7O1dBSUc7UUFDSCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQ7Ozs7V0FJRztRQUNILFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWjs7OztXQUlHO1FBQ0gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQVlQLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsVUFBVSxtQkFDWCxJQUFJLEVBQUUsTUFBTSxJQUNULFFBQVEsQ0FDZCxDQUFDO1FBRUYsNkNBQTZDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUk7UUFDZCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEUsSUFBSSxJQUFBLGdCQUFVLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQyxpQkFBaUIsR0FBRyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxN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