const __blessed = require('blessed');
const __deepMerge = require('../../object/deepMerge');
const __color = require('../../color/color');
const __SComponent = require('../SComponent');
const __SHeader = require('../SHeader');
const __SFooter = require('../SFooter');
const __activeSpace = require('../../core/activeSpace');
const __SUrl = require('../../url/SUrl');
const __sugarConfig = require('../../config/sugar');
const __get = require('../../object/get');
const __fs = require('fs');
const __filter = require('../../object/filter');

/**
 * @name                  SApp
 * @namespace           node.blessed.app
 * @type                  Class
 *
 * This class is the main one when you want to create a Sugar terminal based application.
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SApp = require('@coffeekraken/sugar/node/blessed/app/SApp');
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
   * @name                  _historyArray
   * @type                  Array
   * @private
   *
   * Store the urls object history
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _historyArray = [];

  /**
   * @name                  _pagesStack
   * @type                  Object
   * @private
   *
   * Store the pages instances to reuse them instead of recreate them every
   * page change...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _pagesStack = {};

  /**
   * @name          _commandsStack
   * @type          Object
   * @private
   *
   * Store the instanciated commands specified in the config
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _commandsStack = {};

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
        id: 'sugarapp',
        name: 'Sugar',
        appendToScreen: true,
        header: {
          title: 'Coffeekraken Sugar based application'
        },
        footer: {}
      },
      __sugarConfig(settings.id || 'sugarapp'),
      settings
    );

    // extends parent
    super(settings);

    // save the application instance globally
    if (global.SAppInstance)
      throw new Error(
        `Only 1 instance of the SApp class can be instanciated at the same time...`
      );
    global.SAppInstance = this;

    // check if their some "commands" specified in the config
    if (
      this.config('commands') &&
      Object.keys(this.config('commands')).length
    ) {
      this._initCommands();
    }

    if (this._settings.header) {
      this._headerBox = new __SHeader({
        style: {
          bg: __color('terminal.primary').toString(),
          fg: __color('terminal.black').toString()
        },
        ...this._settings.header
      });
      this.append(this._headerBox, true);
    }

    if (this._settings.footer) {
      this._footerBox = new __SFooter({
        style: {
          bg: __color('terminal.primary').toString(),
          fg: __color('terminal.black').toString()
        },
        commands: __filter(this._commandsStack, (commandInstance) => {
          return commandInstance._settings.statusBar === true;
        }),
        ...this._settings.footer
      });
      this.append(this._footerBox, true);
    }

    this._contentBox = __blessed.box({
      padding: {
        top: 1,
        left: 2,
        right: 2,
        bottom: 1
      }
    });
    this.append(this._contentBox, true);

    // go to default page
    if (this.config('pages.default')) {
      this.goTo(this.config('pages.default'));
    }
  }

  /**
   * @name            currentUrlObj
   * @type            Object
   * @get
   *
   * Access the current url object.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get currentUrlObj() {
    if (!this._historyArray.length) return null;
    return this._historyArray[this._historyArray.length - 1];
  }

  /**
   * @name            previousUrlObj
   * @type            Object
   * @get
   *
   * Access the previous url object.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get previousUrlObj() {
    if (this._historyArray.length < 2) return null;
    return this._historyArray[this._historyArray.length - 2];
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
  goTo(url, history = true) {
    // loop on the pages urls available in the config
    const urlsKeys = Object.keys(this.config('pages.urls'));
    for (let i = 0; i < urlsKeys.length; i++) {
      const sUrl = new __SUrl(url, {
        schema: urlsKeys[i]
      });
      if (sUrl.schema.match) {
        this._goTo(sUrl, history);
        break;
      }
    }
  }

  /**
   * @name          back
   * @type          Function
   *
   * This method simply go back 1 url in the history
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  back() {
    if (this._historyArray.length <= 1) return;
    this._historyArray.splice(-1, 1);
    this._goTo(this._historyArray[this._historyArray.length - 1], false);
  }

  /**
   * @name          _goTo
   * @type          Function
   * @private
   *
   * This is the internal version of the goTo method. It will take care of actualy change the page etc...
   *
   * @param       {SUrl}        sUrl        An SUrl instance to work with
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _goTo(sUrl, history = true) {
    const pageObj = this.config(`pages.urls.${sUrl.schema.schema}`);
    if (!__fs.existsSync(pageObj.page.path.replace('.js', '') + '.js'))
      throw new Error(
        `SApp: You try to load a page class using the path "${pageObj.page.path}" but no file exists at this location...`
      );
    const pageClass = require(pageObj.page.path);

    // check if the pageObj exist
    if (!pageObj && this.config('pages.url.404')) {
      // go to 404 page
      this.goTo('/404');
      return;
    } else if (!pageObj) {
      throw new Error(
        `The requested page "${url}" does not exists and you don't have any 404 page defined in your @config.pages configuration...`
      );
    }

    // append the new url to the history
    if (history) this._historyArray.push(sUrl);

    // generate active space string depending on the url.
    const activeSpaceString = sUrl.href
      .split('/')
      .filter((i) => i !== '')
      .join('.');

    // set the activeSpace
    __activeSpace.set(activeSpaceString);

    // check if we have already the page instance
    let currentPageInstance = this._pagesStack[sUrl.schema.schema];
    if (!currentPageInstance) {
      currentPageInstance = new pageClass(pageObj.page.id, pageObj.page.title);
      this._pagesStack[sUrl.schema.schema] = currentPageInstance;
    }

    // set args on the page
    const argsObj = {};
    if (sUrl.schema.params) {
      Object.keys(sUrl.schema.params).forEach((paramName) => {
        let argValue = sUrl.schema.params[paramName].value;
        if (argValue === null) argValue = pageObj.defaultArgs[paramName];
        argsObj[paramName] = argValue;
      });
    }
    currentPageInstance.setArgs(argsObj);

    // get the previous page and check if we need to destroy it
    if (this.previousUrlObj) {
      const previousPageInstance = this._pagesStack[
        this.previousUrlObj.schema.schema
      ];
      if (previousPageInstance !== currentPageInstance) {
        if (previousPageInstance) previousPageInstance.detach();
        if (!previousPageInstance.persistent) {
          previousPageInstance.destroy();
          delete this._pagesStack[this.previousUrlObj.schema.schema];
        }
      }
    }

    // append the page
    if (!currentPageInstance.parent) this.append(currentPageInstance);
  }

  /**
   * @name          _initCommands
   * @type          Function
   * @private
   *
   * This methods takes the commands classes specified in the configuration
   * and instanciate them to be available through the app
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initCommands() {
    const commandsObj = this.config('commands');
    Object.keys(commandsObj).forEach((commandName) => {
      // filter commands using the features.commands config
      if (this.config('features.commands').indexOf(commandName) === -1) return;

      const commandObj = commandsObj[commandName];
      if (!__fs.existsSync(commandObj.path.replace('.js', '') + '.js'))
        throw new Error(
          `SApp: You try to load a command class using the path "${commandObj.path}" but no file exists at this location...`
        );
      const commandClass = require(commandObj.path);
      this._commandsStack[commandName] = new commandClass(
        commandObj.argsObj,
        commandObj.settings
      );
    });
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
   * @name              exec
   * @type              Function
   *
   * This method takes one or more SCommand instances and execute them.
   * You can also pass as parameter a simple text command like "ls -la" or whatever
   *
   * @param         {String|SCommand|Array}         command         The command(s) to execute
   * @return        {SPromise}                                      An SPromise instance that will be resolved once all the commands are finished
   *
   * @example       js
   * myCoolApp.exec('ls -la');
   *
   * @TODO      Better example
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  exec(command) {
    // if (!Array.isArray(command)) command = [command];
    // const process = new __SProcess(command, {});
    // const processPanel = new __SProcessPanel(process, {});
    // this.append(processPanel);
  }

  /**
   * @name              process
   * @type              Function
   *
   * This method take as parameter an SProcess instance and display it properly
   *
   * @param         {SProcess}         process            The SProcess to display
   *
   * @example       js
   * myCoolApp.process(myCoolProcess);
   *
   * @TODO      Better example
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(process) {
    // const processPanel = new __SProcessPanel(process, {});
    // this.append(processPanel);
  }

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
        this._contentBox.position.top = this._headerBox.height;
      }
    }
    if (this._footerBox) {
      this._footerBox.position.bottom = 0;
      this._footerBox.position.left = 0;

      if (this._contentBox) {
        this._contentBox.position.bottom = this._footerBox.height;
      }
    }

    super.update();
  }
};
