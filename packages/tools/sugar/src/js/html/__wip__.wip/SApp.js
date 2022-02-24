// @ts-nocheck
import __get from '../../shared/object/get';
import __isBase64 from '../../shared/is/base64';
import __base64 from '../../shared/crypt/base64';
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
export default class SApp {
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
        if (__isBase64(config) && !__decryptedConfig) {
            __decryptedConfig = __base64.decrypt(config);
        }
        return __get(__decryptedConfig, path);
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
        if (__isBase64(meta) && !__decryptedMeta) {
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
                import(
                /* webpackChunkName: "log" */ /* webpackMode: "lazy" */ '../log/log'),
                import(
                /* webpackChunkName: "isTransportRegistered" */ /* webpackMode: "lazy" */ '../log/isTransportRegistered'),
                import(
                /* webpackChunkName: "getRegisteredTransports" */ /* webpackMode: "lazy" */ '../log/getRegisteredTransports'),
                import(
                /* webpackChunkName: "registerTransport" */ /* webpackMode: "lazy" */ '../log/registerTransport')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxNQUFNLHlCQUF5QixDQUFDO0FBQzVDLE9BQU8sVUFBVSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sUUFBUSxNQUFNLDJCQUEyQixDQUFDO0FBRWpELElBQUksaUJBQWlCLEVBQUUsZUFBZSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSTtJQW9DdkI7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBNUN6Qjs7OztXQUlHO1FBQ0gsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVoQjs7OztXQUlHO1FBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaOzs7O1dBSUc7UUFDSCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQ7Ozs7V0FJRztRQUNILFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWjs7OztXQUlHO1FBQ0gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQVlULHFCQUFxQjtRQUNyQixJQUFJLENBQUMsVUFBVSxtQkFDYixJQUFJLEVBQUUsTUFBTSxJQUNULFFBQVEsQ0FDWixDQUFDO1FBRUYsNkNBQTZDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUk7UUFDaEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ3RFLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFD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