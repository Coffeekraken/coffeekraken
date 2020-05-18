const __blessed = require('blessed');
const __deepMerge = require('../object/deepMerge');
const __color = require('../color/color');
const __SComponent = require('./SComponent');
const __SHeader = require('./SHeader');
const __SFooter = require('./SFooter');
const __get = require('../object/get');
const __parseSchema = require('../url/parseSchema');
const __SProcess = require('../terminal/SProcess');

/**
 * @name                  SApp
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class is the main one when you want to create a Sugar terminal based application.
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SApp = require('@coffeekraken/sugar/node/blessed/SApp');
 * class MyApp extends SApp {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SApp extends __SComponent {
  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // store the settings
    settings = __deepMerge(
      {
        appendToScreen: true,
        header: {
          title: 'Coffeekraken Sugar based application'
        },
        footer: {}
      },
      settings
    );

    // check if we have a config object to different config files
    if (settings.sConfigInstance) {
      settings = __deepMerge(settings.sConfigInstance.get(''), settings);
    }

    // extends parent
    super(settings);

    if (this._settings.header) {
      this._headerBox = new __SHeader({
        style: {
          bg: __color('terminal.yellow').toString(),
          fg: __color('terminal.black').toString()
        },
        ...this._settings.header
      });
      this.append(this._headerBox, true);
    }

    if (this._settings.footer) {
      this._footerBox = new __SFooter({
        style: {
          bg: __color('terminal.yellow').toString(),
          fg: __color('terminal.black').toString()
        },
        ...this._settings.footer
      });
      this.append(this._footerBox, true);
    }

    this._contentBox = __blessed.box({});
    this.append(this._contentBox, true);

    // go to default page
    if (this.config('pages.default')) {
      this.goTo(this.config('pages.default'));
    }
  }

  /**
   * @name            config
   * @type            Function
   *
   * This methods allows you to get some configuration through the setted SConfig instance
   *
   * @param         {String}          dotedPath         The doted path to the config you want to get
   * @return        {Mixed}                             The config getted
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config(dotedPath) {
    return __get(this._settings, dotedPath);
  }

  /**
   * @name            goTo
   * @type            Function
   *
   * This methods allows you to specify the "url" you want to go to
   *
   * @param         {String}            url               The url you want to go to
   *
   * @example       js
   * myCoolApp.goTo('/something/cool');
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  goTo(url) {
    // loop on the pages urls available in the config
    const urlsKeys = Object.keys(this.config('pages.urls'));
    for (let i = 0; i < urlsKeys.length; i++) {
      const parsedSchema = __parseSchema(url, urlsKeys[i]);
      if (parsedSchema.match) {
        this._goTo(url, urlsKeys[i], parsedSchema);
        break;
      }
    }
  }

  /**
   * @name          _goTo
   * @type          Function
   * @private
   *
   * This is the internal version of the goTo method. It will take care of actualy change the page etc...
   *
   * @param         {String}          url             The url where the user want to go
   * @param         {String}          rawUrl          The raw url used in the config. This is the url that may content some params like "{what}", etc...
   * @param         {Object}          parsedSchema    The parsed url schema
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _goTo(url, rawUrl, parsedSchema) {
    const pageObj = this.config(`pages.urls.${rawUrl}`);

    // switch on the page type
    switch (pageObj.type) {
      case 'process':
        let process;
        // try to get the actual SProcess instance linked to the page
        if (pageObj.process instanceof __SProcess) {
          process = pageObj.process;
        } else if (typeof pageObj.process === 'function') {
          process = pageObj.process(url, rawUrl, parsedSchema);
        } else {
          process = this._getProcessInstance(url, rawUrl, parsedSchema);
        }
        break;
    }
  }

  /**
   * @name          _getProcessInstance
   * @type          Function
   * @private
   *
   * This method take care of retreiving the SProcess instance linked to a certain page/url.
   *
   * @param         {String}          url             The url where the user want to go
   * @param         {String}          rawUrl          The raw url used in the config. This is the url that may content some params like "{what}", etc...
   * @param         {Object}          parsedSchema    The parsed url schema
   * @return        {SProcess}                        The SProcess instance for the passed page/url
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getProcessInstance(url, rawUrl, parsedSchema) {}

  /**
   * @name          append
   * @type          Function
   * @override
   *
   * This method simply append some content inside the contentBox
   *
   * @param       {SComponent}        component       The component to add
   * @param       {Boolean}           [ui=false]      Specify if you want to append this component to the ui or in the content box
   * @return      {SApp}                              The SApp instance to maintain chainability
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  append(component, ui = false) {
    if (ui) {
      super.append(component);
    } else {
      this._contentBox.append(component);
    }
    this.update();
    return this;
  }

  /**
   * @name          update
   * @type          Function
   * @override
   *
   * This method simply draw the UI on the screen
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (this._headerBox) {
      this._headerBox.position.top = 0;
      this._headerBox.position.left = 0;
      if (this._contentBox) {
        this._contentBox.position.top = this._headerBox.position.height;
      }
    }
    if (this._footerBox) {
      this._footerBox.position.bottom = 0;
      this._footerBox.position.left = 0;

      if (this._contentBox) {
        this._contentBox.position.bottom = this._footerBox.position.height;
      }
    }

    super.update();
  }
};
