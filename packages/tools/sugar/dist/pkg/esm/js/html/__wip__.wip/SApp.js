// @ts-nocheck
import __base64 from '../../shared/crypt/base64';
import __isBase64 from '../../shared/is/base64';
import __get from '../../shared/object/get';
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
                /* webpackChunkName: "registerTransport" */ /* webpackMode: "lazy" */ '../log/registerTransport'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEtBQUssTUFBTSx5QkFBeUIsQ0FBQztBQUU1QyxJQUFJLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLElBQUk7SUFvQ3JCOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQTVDekI7Ozs7V0FJRztRQUNILGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEI7Ozs7V0FJRztRQUNILFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWjs7OztXQUlHO1FBQ0gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVkOzs7O1dBSUc7UUFDSCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVo7Ozs7V0FJRztRQUNILFVBQUssR0FBRyxFQUFFLENBQUM7UUFZUCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsbUJBQ1gsSUFBSSxFQUFFLE1BQU0sSUFDVCxRQUFRLENBQ2QsQ0FBQztRQUVGLDZDQUE2QztRQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJO1FBQ2QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ3RFLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7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