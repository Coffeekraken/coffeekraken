const __fs = require('fs');
const __deepMerge = require('../../object/deepMerge');
const __get = require('../../object/get');
const __SApp = require('./SApp');

// TODO: Check which app/packages are using this Class

/**
 * @name                                            SExpressApp
 * @namespace           node.class
 * @type                                            Class
 *
 * This class represent an express based application and gives you access to a lot of usefull routes like "/app/config/:path", "/app/meta/:path", etc...
 *
 * @example             js
 * const SExpressApp = require('@coffeekraken/sugar/node/class/SExpressApp');
 * class MyCoolApp extends SExpressApp {
 *    // your app class here...
 * }
 * const myApp = new MyCoolApp();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SExpressApp extends __SApp {
  /**
   * @constructor
   * @param               {Object}                      data                 The application data that you want to set like version, name, etc...
   * @param                {Object}                    [settings={}]          An object to configure your SApp instance.
   * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
   *
   * @setting              {Array}                 [sources=[process.cwd()]]         Tell the class instance where to search for files like package.json, app.config.js, etc...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(data, settings = {}, expressInstance) {
    // init SApp
    super(data, settings);

    // save the express instance
    this._express = expressInstance;

    // register the usefull routes
    this._registerRoutes();

    // start the server
    setTimeout(async () => {
      // start the server
      this._startExpressServer();
    });
  }

  /**
   * @name                       _registerRoutes
   * @namespace           node.class.SExpressApp
   * @type                       Function
   * @private
   *
   * Register some usefull routes like "/app/config/:path", etc...
   *
   */
  _registerRoutes() {
    // add the "config" internal squid route
    // this._express.get('/app/config', this._configController.bind(this));
    // this._express.get('/app/config/*', this._configController.bind(this));
    //
    // // add the "app" internal squid route
    // this._express.get('/app/meta', this._metaController.bind(this));
    // this._express.get('/app/meta/*', this._metaController.bind(this));

    // add the "app" js internal squid route
    this._express.get('/app/js', this._jsController.bind(this));
    this._express.get('/app/js/*', this._jsController.bind(this));

    // add the "app" css internal squid route
    this._express.get('/app/css', this._cssController.bind(this));
    this._express.get('/app/css/*', this._cssController.bind(this));
  }

  /**
   * @name                 _startExpressServer
   * @namespace           node.class.SExpressApp
   * @type                 Function
   * @private
   *
   * Start the express http server
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  async _startExpressServer() {
    this.log(
      `Starting the express server on port ${await this.config(
        'server.port'
      )}...`,
      'info'
    );
    this._express.listen(await this.config('server.port'));
  }

  // /**
  //  * @name                          _configController
  //  * @namespace           node.class.SExpressApp
  //  * @type                          Function
  //  *
  //  * Return the whole configuration object or the specified value requested using the dot formated object key.
  //  *
  //  * @param                     {Object}                      req                     The express "req" object
  //  * @param                     {Object}                      res                     The express "res" object
  //  *
  //  * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
  //  */
  // async _configController(req, res) {
  //
  //   let value;
  //
  //   if (req.params[0]) {
  //     value = await Squid.config(req.params[0]);
  //   } else {
  //     value = await Squid.config();
  //   }
  //
  //   res.send(value);
  //
  // }
  //
  // /**
  //  * @name                          _metaController
  //  * @namespace           node.class.SExpressApp
  //  * @type                          Function
  //  *
  //  * Return the application meta data
  //  *
  //  * @param                     {Object}                      req                     The express "req" object
  //  * @param                     {Object}                      res                     The express "res" object
  //  *
  //  * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
  //  */
  // async _metaController(req, res) {
  //
  //   let value;
  //
  //   if (req.params[0]) {
  //     value = Squid.meta(req.params[0]);
  //   } else {
  //     value = Squid.meta();
  //   }
  //
  //   res.send(value);
  //
  // }

  /**
   * @name                _jsController
   * @namespace           node.class.SExpressApp
   * @type                Function
   *
   * Handle the base javascript route that serve the global and common files
   *
   * @param         {Object}        req           The req express object
   * @param         {Object}        res            The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  async _jsController(req, res) {
    // if we have a path to a js file, check if it exist and serve it
    if (req.params[0]) {
      // check if the file exist
      const squidFilePath = this.rootPath + '/dist/js/' + req.params[0];
      const projectFilePath =
        process.cwd() +
        '/' +
        (await this.config('dist.js.outputFolder')) +
        '/' +
        req.params[0];

      if (__fs.existsSync(squidFilePath)) {
        res.sendFile(squidFilePath);
        return;
      }
      if (__fs.existsSync(projectFilePath)) {
        res.sendFile(projectFilePath);
        return;
      }

      this.log(
        `A client has requested the file "${await this.config(
          'dist.js.outputFolder'
        )}/${
          req.params[0]
        }" but this file does not exist either in Squid framework files, either in the ${
          this.__settings.name
        } project...`,
        'error'
      );
      return res.sendStatus(404);
    }

    // get the js content
    const js = await this._jsContent();

    // send gziped javascript files Content
    res.send(js);
  }

  /**
   * @name                _cssController
   * @namespace           node.class.SExpressApp
   * @type                Function
   *
   * Handle the base stylesheet route that serve the global and common files
   *
   * @param         {Object}        req           The req express object
   * @param         {Object}        res            The res express object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  async _cssController(req, res) {
    // if we have a path to a js file, check if it exist and serve it
    if (req.params[0]) {
      // check if the file exist
      const squidFilePath = this.rootPath + '/dist/css/' + req.params[0];
      const projectFilePath =
        process.cwd() +
        '/' +
        (await this.config('dist.css.outputFolder')) +
        '/' +
        req.params[0];

      if (__fs.existsSync(squidFilePath)) {
        res.sendFile(squidFilePath);
        return;
      }
      if (__fs.existsSync(projectFilePath)) {
        res.sendFile(projectFilePath);
        return;
      }

      this.log(
        `A client has requested the file "${await this.config(
          'dist.css.outputFolder'
        )}/${
          req.params[0]
        }" but this file does not exist either in Squid framework files, either in the ${
          this.__settings.name
        } project...`,
        'error'
      );
      return res.sendStatus(404);
    }

    // get the js content
    const css = await this._cssContent();

    // send gziped javascript files Content
    res.setHeader('content-type', 'text/css');
    res.send(css);
  }
};
