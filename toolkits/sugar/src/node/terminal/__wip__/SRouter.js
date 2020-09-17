const __fs = require('fs');
const __parse = require('../url/parse');
const __isClass = require('../is/class');

/**
 * @name                                SRouter
 * @namespace           sugar.node.terminal
 * @type                                Class
 *
 * Provide a simple router class to switch between pages in the terminal
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SRouter {
  /**
   * @name                            _routes
   * @type                            Object
   * @private
   *
   * Store the routes available in this router instance
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _routes = {};

  /**
   * @name                            _settings
   * @type                            Object
   * @private
   *
   * Store the settings available in this router instance
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                          constructor
   * @type                          Function
   *
   * Construct the router class with settings described bellow
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(routes, settings = {}) {
    // save the routes
    this._routes = routes;

    // save the settings
    this._settings = settings;

    // if we have a default page, we go to it
    if (this._settings.default.page) {
      this.goto(this._settings.default.page);
    }
  }

  /**
   * @name                          setOutput
   * @type                          Function
   *
   * Set where you want to output the router results.
   * Can be something like a "blessed" box object, or simple the console.log function by default.
   *
   * @param           {Mixed}                     output                    The output where you want to print the router results
   *
   * @example         js
   * myRouter.setOutput(console.log);
   * const myBox = blessed.box({});
   * myRouter.setOutput(myBox);
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setOutput(output) {
    this._settings.output = output;
  }

  /**
   * @name                          goto
   * @type                          Function
   *
   * Allows you to cvhange the displayed page by specify the route name wanted or by specify
   * a url with some params in it that will be analyzed by the router instance
   *
   * @param           {String}             path             The path where you want to go. Can be a simple route name or a full url with params
   *
   * @example         js
   * myRouter.goto('list');
   * myRouter.goto('something/cool/01');
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async goto(path) {
    let viewContent, viewData, route, parsedUrl;

    // check what is the path and if a route exist with the passed value name
    if (!path.includes('/') && this._routes[path]) {
      // we have a route passed
      route = this._routes[path];
    } else {
      // it seems that it is a url passed. We have to check them one after the other...
      for (let i = 0; i < Object.keys(this._routes).length; i++) {
        const routeObj = this._routes[Object.keys(this._routes)[i]];
        const _parsedUrl = __parse(path, {
          schema: routeObj.url
        });
        if (_parsedUrl.match) {
          route = routeObj;
          parsedUrl = _parsedUrl;
          break;
        }
      }
    }

    // if we don't have any route that match the request,
    // simply redirect the user to the 404 layout
    if (!route && this._routes['404']) {
      return this.goto('404');
    }

    // check if we have a data adapter specified
    viewData =
      parsedUrl && parsedUrl.params
        ? parsedUrl.params
        : route.defaultParams || {};
    if (route.dataAdapter) {
      viewData = await require(route.dataAdapter)(viewData);
    }
    // generate the new view using the specified layout
    // and passing the viewData to it
    const layout = require(route.layout);
    if (__isClass(layout)) {
      viewContent = new layout(viewData);
    } else {
      viewContent = await layout(viewData);
    }

    // check if we have an output specified in the settings
    if (this._settings.output) {
      if (this._settings.output.append && this._settings.output.screen) {
        this._settings.output.append(viewContent);
        this._settings.output.screen.render();
      }
    }
  }
};
