// @ts-nocheck
import __get from '../object/get';
import __isBase64 from '../is/base64';
import __base64 from '../crypt/base64';
let __decryptedConfig, __decryptedMeta;
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
export default class SApp {
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
    config(path = null) {
        let config = window['_' + this.__settings.name + 'Data'].config || {};
        if (__isBase64(config) && !__decryptedConfig) {
            __decryptedConfig = __base64.decrypt(config);
        }
        return __get(__decryptedConfig, path);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUNsQyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFFdkMsSUFBSSxpQkFBaUIsRUFBRSxlQUFlLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFJO0lBb0N2Qjs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUE1Q3pCOzs7O1dBSUc7UUFDSCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCOzs7O1dBSUc7UUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVo7Ozs7V0FJRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZDs7OztXQUlHO1FBQ0gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaOzs7O1dBSUc7UUFDSCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBWVQscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxVQUFVLG1CQUNiLElBQUksRUFBRSxNQUFNLElBQ1QsUUFBUSxDQUNaLENBQUM7UUFFRiw2Q0FBNkM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSTtRQUNoQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEUsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM1Qyxp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