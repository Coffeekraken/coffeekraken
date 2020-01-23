const __express = require('express');
const __fs = require('fs');
const __path = require('path');
const __log = require('@coffeekraken/sugar/node/log/log');
const __setupLog = require('@coffeekraken/sugar/node/log/setup');
const __compression = require('compression');
const __SquidViewPreprocessor = require('./SquidViewPreprocessor');

/**
 * @name          SquidApp
 * @namespace     squid.node
 * @type          Class
 *
 * Entry class of a squid application.
 *
 * @param         {Object}          config            The squid app config in object format
 * @return        {Object}                            The squid application instance
 *
 * @example       js
 * const SquidApp = require('@coffeekraken/squid/node/SquidApp');
 * const config = require('squid.config.js');
 * const squidInstance = new SquidApp(config);
 * squidInstance.start();
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SquidApp {

  /**
   * Store the application configuration object
   * @type      Object
   */
  config = {};

  /**
   * Store the express application instance
   * @type      Object
   */
  expressApp = null;

  /**
   * Store the rootPath of the Squid framework
   * @type       String
   */
  rootPath = __path.resolve(__dirname, '../../../');

  /**
   * Constructor
   *
   * @param       {Object}          config          The squid application configuration object
   * @return      {Object}                          The squid application instance
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(config) {

    // save the configuration
    this.config = config;

    // create the express app
    this._createExpressApp();

    // set some app middlewares
    this._setExpressAppMiddlewares();

    // init the log system
    this._initLogSystem();

    // Init the routes of the application founded in the config object
    this._initRoutes();

    // register new template engines
    this._registerExpressTemplateEngines();

    // start the express http server
    this._startExpressServer();

  }

  /**
   * @name            _createExpressApp
   * @namespace       squid.node.SquidApp
   * @type            Function
   * @private
   *
   * Create the express application
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _createExpressApp() {

    // init the express application
    this.expressApp = __express();

  }

  /**
   * @name               _setExpressAppMiddlewares
   * @namespace          squid.node.SquidApp
   * @type              function
   * @private
   *
   * Register some express application middlewares like compression, etc...
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _setExpressAppMiddlewares() {

    // compression middleware
    this.expressApp.use(__compression());

  }

  /**
   * @name              _initRoutes
   * @namespace         squid.node.SquidApp
   * @type              Function
   * @private
   *
   * Init the routes of the application founded in the configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initRoutes() {

    // check that we have some routes to init
    if ( ! this.config.routes || Object.keys(this.config.routes).length <= 0) {
      __log('No routes are configurated for your application...', 'error');
      __log('You can specify your routes either inside the "squid.config.js" file, in the "squid/routes.js" file or in your "package.json" file under the "squid" property...', 'info');
      return;
    }

    this.expressApp.use((req, res, next) => {
      const originalRender = res.render;
      res.render = function(renderPath, viewData, callback) {
        originalRender.call(this, renderPath, viewData, (error, html) => {
          if (error) {
            __log(`An error has occured during the rendering process of the view "${renderPath}"... Please try again later`, 'error');
            return;
          }
          try {
            const viewPreprocessor = new __SquidViewPreprocessor(html);
            const processedHtml = viewPreprocessor.process();
            if (callback) {
              return callback.call(this, error, processedHtml);
            } else {
              res.send(processedHtml);
            }
          } catch(e) {
            __log(`An error has occured during the rendering process of the view "${renderPath}"... Please try again later...`, 'error');
          }
        })
      };
      next();
    });

    // loop on each routes
    Object.keys(this.config.routes).forEach(route => {
      // get the route config
      const routeConfig = this.config.routes[route];
      // init the route in the express app
      this.addRoute(route, routeConfig);
    });

    // add the internal squid routes
    const JsController = require('../express/controllers/JsController');
    this.expressApp.get('/squid/js', JsController.squidIndex);
    this.expressApp.get(`/squid/js/*`, JsController.squidJs);

    // add the "view" internal squid route
    this.expressApp.get('/view/:viewPath/:viewId', require('../express/controllers/ViewController').index);

  }

  /**
   * @name            addRoute
   * @namespace       squid.node.SquidApp
   * @type            Function
   *
   * Add a new route in the express application.
   *
   * @param         {String}          route         Define the route that you want to listen. It must be formated like "METHOD /my/cool/route" where "method" is either "GET", "POST" or "PUT"
   * @param         {Object}          routeConfig   Define the config for the passed route
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
   addRoute(route, routeConfig) {

     // default method and route
     let method = 'GET';
     let path = null;
     const splitedRoute = route.split(' ');
     // parse the route string to get the method and the route passed
     if (splitedRoute.length === 2) {
       method = splitedRoute[0];
       path = splitedRoute[1];
     } else if (splitedRoute.length === 1) {
       path = splitedRoute[0];
     } else {
       // the route is not well formated...
       __log(`Your passed route "${route}" is not well formated. It has to follow this pattern "METHOD /my/cool/path"...`, 'error');
       return;
     }

     // parse and check that the controller passed exist
     let controllerString = null;
     if (typeof routeConfig === 'string') {
       controllerString = routeConfig;
     } else if (typeof routeConfig === 'object' && typeof routeConfig.controller === 'string') {
       controllerString = routeConfig.controller;
     } else {
       __log(`The passed configuration for the route "${route}" has to be either a controller string, or an object with a "controller" property...`, 'error');
       return;
     }

     // check that the controller exist
     const splitedControllerString = controllerString.split('.');
     const potentialControllerFunction = splitedControllerString[splitedControllerString.length-1];
     const potentialControllerString = splitedControllerString.slice(0,-1).join('/');
     let controllerFileString = null;
     let controllerFunctionString = 'index';

     if (__fs.existsSync(`${process.cwd()}/controllers/${splitedControllerString.join('/')}.js`)) {
       controllerFileString = splitedControllerString.join('/');
     } else if (__fs.existsSync(`${process.cwd()}/controllers/${potentialControllerString}.js`)) {
       controllerFileString = potentialControllerString;
       controllerFunctionString = potentialControllerFunction;
     } else {
       __log(`It seems that the specified controller "${controllerString}" for the route "${route}" does not exist...`, 'error');
       return;
     }

     // load the controller and check that the wanted method exist
     const controller = require(`${process.cwd()}/controllers/${controllerFileString}`);
     if ( ! controller[controllerFunctionString]) {
       __log(`The function "${controllerFunctionString}" specified in the controller "${controllerFileString}" for the route "${route}" does not exist...`, 'error');
       return;
     }

     __log(`Registering the route "${route}" with the controller "${controllerString}"...`, 'info');

     // register the new route in the express app
     this.expressApp[method.toLowerCase()](path, controller[controllerFunctionString]);

   }

   /**
    * @name                 _registerExpressTemplateEngines
    * @namespace            squid.node.SquidApp
    * @type                 Function
    *
    * Register some new express template engines
    *
    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
    */
  _registerExpressTemplateEngines() {

    this.expressApp.set('views', process.cwd() + '/' + this.config.views.folder);
    this.expressApp.set('view engine', 'blade.php');

    Object.keys(this.config.views.engines).forEach(extension => {
      this.expressApp.engine(extension, require(this.config.views.engines[extension]));
    });

  }

   /**
    * @name                 _startExpressServer
    * @namespace            squid.node.SquidApp
    * @type                 Function
    * @private
    *
    * Start the express http server
    *
    * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
    */
  _startExpressServer() {
    __log(`Starting the express server on port ${this.config.server.port}...`, 'info');
    this.expressApp.listen(this.config.server.port);
  }

  /**
   * @name                  _initLogSystem
   * @namespace             squid.node.SquidApp
   * @type                  Function
   * @private
   *
   * Init the log system by setting up it using the Squid.config.log settings
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _initLogSystem() {

    // get the log config
    const logConfig = this.config.log;
    if ( ! logConfig) return;

    // setup backend log system
    this.setupLog('backend', logConfig.backend);

  }

  /**
   * @name                  log
   * @namespace             squid.node.SquidApp
   * @type                  Function
   *
   * Log a message using the squid log system. The types can be 'error','warning','info','verbose','debug' or 'silly'
   *
   * @param                 {String}                message                 Your log message
   * @param                 {String}                [type='info']           Your log type
   * @param                 {String}                [transports=null]       The log transports you want to use for this particular log process. If not specified, will take the settings.log.transportsByType option to resolve this
   *
   * @example             js
   * Squid.log('Hello world', 'error');
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  log(message, type = 'info', transports = null) {
    return __log(message, type, transports);
  }

  /**
   * @name                    setupLog
   * @namespace               squid.node.SquidApp
   * @type                    Function
   *
   * Setup the log system or a log transport
   *
   * @param                   {String}                env                     The log environment you want to set. Can be "frontend" or "backend"
   * @param                   {Object}                settings                The settings you want for the log system or for the passed transport
   * @param                   {String}                [transport=null]        The name of the log transport that you want to configure
   * @return                  {Object}                                        The new settings that you have set
   *
   * @example         js
   * Squid.setupLog('backend', {
   *    transportsByType: {
   *      error: 'console mail',
   *      warn: 'console files',
   *      // etc...
   *    }
   * });
   * Squid.setupLog('backend', {
   *    smtpServer: 'mail.infomaniak.com',
   *    // etc...
   * }, 'mail');
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  setupLog(env, settings, transport=null) {
    switch(env) {
      case 'backend':
        return __setupLog(settings, transport);
      break;
    }
  }


}
