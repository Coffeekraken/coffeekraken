const __express = require('express');
const __fs = require('fs');
const __log = require('@coffeekraken/sugar/node/log/log');
const __compression = require('compression');

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
  _config = {};

  /**
   * Store the express application instance
   * @type      Object
   */
  _expressApp = null;

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
    this._config = config;

    // create the express app
    this._createExpressApp();

    // set some app middlewares
    this._setExpressAppMiddlewares();

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
    this._expressApp = __express();

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
    this._expressApp.use(__compression());

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
    if ( ! this._config.routes || Object.keys(this._config.routes).length <= 0) {
      __log('No routes are configurated for your application...', 'error');
      __log('You can specify your routes either inside the "squid.config.js" file, in the "squid/routes.js" file or in your "package.json" file under the "squid" property...', 'info');
      return;
    }

    // loop on each routes
    Object.keys(this._config.routes).forEach(route => {
      // get the route config
      const routeConfig = this._config.routes[route];
      // init the route in the express app
      this.addRoute(route, routeConfig);
    });

    // add the internal squid routes
    this._expressApp.get('/squid/js', require('../express/controllers/JsController').index);

    // add the "view" internal squid route
    this._expressApp.get('/view/:viewPath/:viewId', require('../express/controllers/ViewController').index);

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
     this._expressApp[method.toLowerCase()](path, controller[controllerFunctionString]);

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

    this._expressApp.set('views', process.cwd() + '/' + this._config.views.folder);
    this._expressApp.set('view engine', 'blade.php');

    Object.keys(this._config.views.engines).forEach(extension => {
      this._expressApp.engine(extension, this._config.views.engines[extension]);
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
    __log(`Starting the express server on port ${this._config.server.port}...`, 'info');
    this._expressApp.listen(this._config.server.port);
  }


}
