const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('./parseHtml');
const __splitEvery = require('../string/splitEvery');
const __countLine = require('../string/countLine');
const __parseSchema = require('../url/parseSchema');
const __sugarConfig = require('../config/sugar');
const __hotkey = require('../keyboard/hotkey');

/**
 * @name                    SApp
 * @namespace               sugar.node.terminal
 * @type                    Class
 *
 * This class define an application in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this application
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @example         js
 * const SApp = require('@coffeekraken/sugar/node/terminal/SApp');
 * const app = new SApp('My Cool Application', {
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SApp extends __blessed.screen {
  /**
   * @name              _name
   * @type              String
   * @private
   *
   * Store the application name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the application settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        blessed: {
          screen: {
            smartCSR: true
          }
        }
      },
      settings
    );
    // extend from blessed.box
    super(_settings.blessed.screen);
    // save settings
    this._settings = _settings;

    // save the name
    this._name = name;

    __hotkey('left').on('key', (e) => {
      this.previousMenu();
    });
    __hotkey('right').on('key', (e) => {
      this.nextMenu();
    });

    // render the layout with the current url passed
    setTimeout(() => {
      this.goTo(this._settings.homeRoute);
    });
  }

  /**
   * @name                      _getRouteObj
   * @type                      Function
   * @private
   *
   * Get the route configuration object depending on the current url
   *
   * @param         {String}            url             The current url
   * @return        {Object}                            The corresponding route object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getRouteObj(url) {
    // loop on each routes
    for (let i = 0; i < Object.keys(this._settings.routes).length; i++) {
      // copmpare the url to the route
      const parsedSchema = __parseSchema(
        url,
        Object.keys(this._settings.routes)[i]
      );
      if (parsedSchema.match) {
        return {
          ...this._settings.routes[Object.keys(this._settings.routes)[i]],
          params: parsedSchema.params
        };
      }
    }
    // by default, return false
    return false;
  }

  /**
   * @name                    nextMenu
   * @type                    Function
   *
   * This method allows you to pass to the next menu item
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  nextMenu() {
    // get the actual menu item index
    const menuUrls = Object.keys(this._settings.menu);
    const currentMenuItemIndex = menuUrls.indexOf(this._currentUrl);
    if (
      currentMenuItemIndex === -1 ||
      currentMenuItemIndex === menuUrls.length - 1
    )
      return;
    const nextMenuItemUrl = menuUrls[currentMenuItemIndex + 1];
    // go to the next menu item
    this.goTo(nextMenuItemUrl);
  }

  /**
   * @name                    previousMenu
   * @type                    Function
   *
   * This method allows you to pass to the next menu item
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  previousMenu() {
    // get the actual menu item index
    const menuUrls = Object.keys(this._settings.menu);
    const currentMenuItemIndex = menuUrls.indexOf(this._currentUrl);
    if (currentMenuItemIndex === -1 || currentMenuItemIndex === 0) return;
    const previousMenuItemUrl = menuUrls[currentMenuItemIndex - 1];
    // go to the next menu item
    this.goTo(previousMenuItemUrl);
  }

  /**
   * @name                    goTo
   * @type                    Function
   *
   * This method allows you to change the "page" by passing a simple url like 'build/scss' depending on the registered routes in your app.
   *
   * @param         {String}          url           The url to go to
   * @return        {Boolean}                       true if ok, false if something goes wrong like the page does not exist, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  goTo(url) {
    // get the current route object
    const routeObj = this._getRouteObj(url);

    // if something goes wrong
    if (!routeObj) return false;

    // save the current url
    this._currentUrl = url;

    // render the layout with the current url passed
    this._renderLayout(routeObj);
  }

  /**
   * @name                    isActive
   * @type                    Function
   *
   * This method allows you to check if the passed url is the active one
   *
   * @param       {String}        url            The url to check
   * @return      {Boolean}                       true if is the active one, false if not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isActive(url) {
    return this._currentUrl === url;
  }

  /**
   * @name                    _renderLayout
   * @type                    Function
   * @private
   *
   * Render the layout with the current content defined by the current route object passed
   *
   * @param           {Object}          routeObj            The current route object to render with the layout
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _renderLayout(routeObj) {
    // getting the actual content
    const content = await routeObj.content(routeObj.params);
    // getting the overall layout
    const layout = await this._settings.layout(content);
    // rendering the layout to the terminal
    this.append(layout);
    // render the screen
    this.render();
  }
};
