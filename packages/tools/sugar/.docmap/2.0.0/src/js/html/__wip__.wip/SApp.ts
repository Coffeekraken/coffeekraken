/**
*
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
/**
*
* @name                __settings
* @type                Object
* @private

*/
/**
*
* @name              __meta
* @type              Object
* @private

*/
/**
*
* @name              __config
* @type              Object
* @private

*/
/**
*
* @name                __data
* @type                Object
* @private

*/
/**
*
* @name                __log
* @type                Object
* @private

*/
/**
*
* @constructor
* @param                {Object}                [settings={}]         The application settings
* @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
*
* @setting            {String}                  [name='SApp']         The application name that you want. This will gives you access to your app instance through window.{settings.name}
*
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/
/**
*
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
/**
*
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
/**
*
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