const __expose = require('threads/worker').expose;
const __terminalKit = require('terminal-kit').terminal;
const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml');
const __countLine = require('@coffeekraken/sugar/node/terminal/countLine');
const __columns = require('@coffeekraken/sugar/node/terminal/columns');
const __blessed = require('blessed');
const __ora = require('ora');
const __set = require('@coffeekraken/sugar/node/object/set');
const __get = require('@coffeekraken/sugar/node/object/get');
const __folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
const __formatFileSize = require('@coffeekraken/sugar/node/fs/formatFileSize');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __breakLine = require('@coffeekraken/sugar/node/terminal/breakLine');
const __splitEvery = require('@coffeekraken/sugar/node/string/splitEvery');
const __arraySplitEvery = require('@coffeekraken/sugar/node/array/splitEvery');
const __path = require('path');
const __fs = require('fs');
const __center = require('@coffeekraken/sugar/node/terminal/center');
const __image = require('@coffeekraken/sugar/node/terminal/image');
const __crop = require('@coffeekraken/sugar/node/string/crop');

const __packageJson = require('../../../package.json');

/**
 * @name                        UI
 * @namespace                   terminal.coffeebuilder.node.workers
 * @type                        Class
 * 
 * Class that handle the coffeebuilder interface drawing, user inputs, etc...
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class UI {

  /**
   * @name                              _data
   * @namespace                         terminal.coffeebuilder.node.workers
   * @type                              Object
   * 
   * Store the passed datas from the main process to be able to draw the ui correctly
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _data = {
    currentPackage: {
      name: null
    },
    packages: {},
    stats: {},
    isRunning: false,
    config: {
      current: {},
      base: {},
      default: {}
    }
  };

  /**
   * @name                              _location
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              String
   * @private
   * 
   * Store the current user location in the "app". This can have one of these options stored:
   * - home: Display the "welcome"
   * - build: Display the build progress
   * - stats: Display the build stats
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _location = 'home';

  /**
   * @name                            _maxWidth
   * @namespace                       terminal.coffeebuilder.node.workers.UI
   * @type                            Number
   * @private
   * 
   * Store the maximum width that the interface can take depending on the setted STDOUT_PADDING env variable
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _maxWidth = (process.env.STDOUT_COLUMNS || process.stdout.columns) - (process.env.STDOUT_PADDING || 3) * 2;

  /**
   * @name                            _padding
   * @namespace                       terminal.coffeebuilder.node.workers.UI
   * @type                            Number
   * @private
   * 
   * Store the padding that the UI have to respect.
   * The value is taken from the env.STDOUT_PADDING or will be set to 3
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _padding = process.env.STDOUT_PADDING || 3;

  /**
   * @name                              _watchCompile
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              Array
   * @private
   * 
   * Store the resources types that have to be compiled after a watch detection
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _watchCompile = [];

  /**
   * @name                              _uiItems
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              Object
   * @private
   * 
   * Store the position of certain UI items to have the possibility to add click detection, etc...
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _uiItems = {};

  /**
   * @name                              _packageSelectorColumns
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              Array
   * 
   * Store the package selector ui columns items
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _packageSelectorColumns = [];

  /**
   * @name                              _packageSelectorSelectedItem
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              Array
   * 
   * Store Selected item in the package selector ui in format:
   * {
   *   column: 1,
   *   row: 1
   * }
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _packageSelectorSelectedItem = {
    column: 1,
    row: 1
  };

  /**
   * @name                              _changeLocationDefaultSettings
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              Object
   * 
   * Store the default change location settings by locations
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _changeLocationDefaultSettings = {
    'stats': {
      drawDependencies: this.drawStatsDependencies,
      loadMessage: 'Loading stats please wait...'
    },
    'loading': {
      redraw: true,
      redrawInterval: 20
    },
    'build': {
      drawDependencies: this.drawBuildDependencies,
      redraw: true,
      redrawInterval: 100
    }
  };

  /**
   * @name                              constructor
   * @namespace                         terminal.coffeebuilder.node.workers.UI
   * @type                              Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

    function terminate() {
      __terminalKit.grabInput(false);
      setTimeout(function () { process.exit() }, 100);
    }

    __terminalKit.grabInput({ mouse: 'button' });

    __terminalKit.on('key', function (name, matches, data) {
      this._onKey({
        name
      });
      if (name === 'CTRL_C') { terminate(); }
    });

    const _this = this;

    __terminalKit.on('mouse', function (name, data) {
      if (!name.includes('_RELEASED')) return;
      Object.keys(_this._uiItems).forEach(item => {
        const itemObj = _this._uiItems[item];

        const isInX = data.x >= itemObj.x && data.x <= itemObj.x + itemObj.width;
        const isInY = data.y >= itemObj.y && data.y <= itemObj.y + itemObj.height;

        if (isInX && isInY) {
          this._onClick({
            item,
            x: data.x,
            y: data.y
          });
        }

      });

    });


    process.stdout.on('resize', () => {
      this._padding = process.env.STDOUT_PADDING || 3;
      this._maxWidth = (process.env.STDOUT_COLUMNS || process.stdout.columns) - this._padding * 2;

      this.draw();
    });

    this.draw();

  }

  /**
   * @name                                set
   * @namespace                           terminal.coffeebuilder.node.workers.UI
   * @type                                Function
   * 
   * Method that is used to set some datas used as data for the UI rendering
   * 
   * @param               {String}              path                The dotted data path to set like config.current.autoSwitch
   * @param               {Mixed}               value               The value to set
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value) {
    __set(this._data, path, value);
    this.draw();
  }

  /**
   * @name                                get
   * @namespace                           terminal.coffeebuilder.node.workers.UI
   * @type                                Function
   * 
   * Method that is used to get some datas used as data for the UI rendering
   * 
   * @param               {String}              path                The dotted data path to set like config.current.autoSwitch
   * @return               {Mixed}                               The value getted
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(path) {
    return __get(this._data, path);
  }

  /**
   * @name                    _onKey
   * @namespace               terminal.coffeebuilder.node.workers.UI
   * @type                    Function
   * @private
   * 
   * Method called when a key is pressed wih an object containing the "name" of the key pressed
   * 
   * @param         {Object}                  key                   An object representing the pressed key with a "name" property
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _onKey(key) {

    // general key bindings
    switch (key.name.toUpperCase()) {
      case 'H':
        this.changeLocation('home');
        break;
      case 'B':
        this.changeLocation('build');
        break;
      case 'S':
        this.changeLocation('stats');
        break;
      case 'E':
        this.changeLocation('error');
        break;
      case 'P':
        this.changeLocation('packageSelector');
        break;
      case 'R':
        // @TODO CoffeeBuilder.api.run();
        // if (CoffeeBuilder.config.get('autoSwitch')) {
        //   setTimeout(() => {
        //     this.changeLocation('build');
        //   });
        // }
        break;
      case 'W':
        this.set('config.current.watch', this.get('config.current.watch') ? false : true);
        this.draw();
        break;
      case 'A':
        this.set('config.current.autoSwitch', this.get('config.current.autoSwitch') ? false : true);
        this.draw();
        break;
    }

    // key bindings by location
    switch (this._location) {
      case 'buildErrors':
        switch (key.name) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            this._selectBuildErrors(parseInt(key.name));
            break;
          case 'UP':
            this._selectBuildErrors('previous');
            break;
          case 'DOWN':
            this._selectBuildErrors('next');
            break;
        }
        break;
      case 'packageSelector':
        switch (key.name) {
          case 'UP':
            if (this._packageSelectorSelectedItem.row > 1) {
              this._packageSelectorSelectedItem.row -= 1;
            }
            break;
          case 'DOWN':
            const columnItems = this._packageSelectorColumns[this._packageSelectorSelectedItem.column - 1];
            if (this._packageSelectorSelectedItem.row < columnItems.length) {
              this._packageSelectorSelectedItem.row += 1;
            }
            break;
          case 'RIGHT':
            if (this._packageSelectorSelectedItem.column < this._packageSelectorColumns.length) {
              this._packageSelectorSelectedItem.column += 1;
            }
            break;
          case 'LEFT':
            if (this._packageSelectorSelectedItem.column > 1) {
              this._packageSelectorSelectedItem.column -= 1;
            }
            break;
          case 'ENTER':
            // @TODO CoffeeBuilder.api.setCurrentPackageByName(this._packageSelectorColumns[this._packageSelectorSelectedItem.column - 1][this._packageSelectorSelectedItem.row - 1]);
            break;
        }
        this.draw();
        break;
    }

  }

  /**
   * @name                  _onClick
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   * 
   * This method is called when a ui element defines in the this._uiItems object has been clicked
   * 
   * @param             {Object}                item                An object representing the ui item clicked
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _onClick(item) {

    switch (item.item) {
      case 'packageSelector':
      case 'menuPackageSelector':
        this.changeLocation('packageSelector');
        break;
      case 'menuHome':
        this.changeLocation('home');
        break;
      case 'menuBuild':
        this.changeLocation('build');
        break;
      case 'menuStats':
        this.changeLocation('stats');
        break;
      case 'menuError':
        this.changeLocation('error');
        break;
      case 'menuAutoSwitch':
        this.set('config.current.autoSwitch', this.get('config.current.autoSwitch') ? false : true);
        this.draw();
        break;
      case 'menuWatch':
        this.set('config.current.watch', this.get('config.current.watch') ? false : true);
        this.draw();
        break;
    }

  }

  /**
   * @name                  changeLocation
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   * 
   * Change the user location in the UI. This method accept 1 argument which is the new location wanted
   * and can be one of these options:
   * - home: Display the "welcome" UI
   * - build: Display the build progress
   * - stats: Display the build stats
   * - error: Display an error message
   *    - settings: { message: 'An error has occured...' }
   * - loading: Display a loading message
   *    - settings: { message: 'Please wait...' }
   * - packageSelector: Display the packages list to select one of them
   * 
   * @param           {String}                location              The new location wanted
   * @param           {Object}                [settings={}]         The new location settings
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async changeLocation(location, settings = {}) {

    // set the new location
    this._locationSettings = __deepMerge(this._changeLocationDefaultSettings[location] || {}, settings);

    if (this._locationSettings.drawDependencies) {
      this._location = 'loading';
      this.draw();
      const newSettings = await this._locationSettings.drawDependencies() || {};
      this._locationSettings = __deepMerge(this._locationSettings, newSettings);
    }

    // set the new location
    this._location = location;

    // draw the new UI
    this.draw();
  }

  /**
   * @name                  draw
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   * 
   * Draw the interface
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async draw() {

    clearTimeout(this._drawTimeout);
    if (this._locationSettings && this._locationSettings.redraw) {
      this._drawTimeout = setTimeout(() => {
        console.log('Timeout', this._locationSettings.redrawInterval);
        this.draw();
      }, this._locationSettings.redrawInterval || 100);
    }

    if (!this._blessedScreen) {
      this._blessedScreen = __blessed.screen({
        smartCSR: true,
        fullUnicode: true,
        forceUnicode: true
      });
      // Quit on Escape, q, or Control-C.
      this._blessedScreen.key(['C-c'], function (ch, key) {
        return process.exit(0);
      });
      this._blessedScreen.title = __packageJson.name;
    }
    if (!this._blessedHeader) {
      this._blessedHeader = __blessed.box({
        top: 0,
        left: 3,
        width: '100%',
        height: 5,
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        scrollable: false
      });
      this._blessedScreen.append(this._blessedHeader);
    }
    if (!this._blessedContent) {
      this._blessedContent = __blessed.box({
        top: 5,
        left: 3,
        width: '100%',
        height: process.stdout.rows - 8,
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        scrollable: true
      });
      this._blessedScreen.append(this._blessedContent);
    }
    if (!this._blessedFooter) {
      this._blessedFooter = __blessed.box({
        bottom: 0,
        left: 3,
        width: '100%',
        height: 3,
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        scrollable: false
      });
      this._blessedScreen.append(this._blessedFooter);
    }

    let lines = [], headerLines = [], footerLines = [];

    // draw the header
    headerLines = headerLines.concat(await this.drawHeader(this._locationSettings));

    // draw the footer
    footerLines = footerLines.concat(await this.drawFooter(this._locationSettings));

    switch (this._location) {
      case 'home':
        lines = lines.concat(await this.drawHome(this._locationSettings));
        break;
      case 'build':
        lines = lines.concat(await this.drawBuild(this._locationSettings));
        break;
      case 'buildErrors':
        lines = lines.concat(await this.drawBuildErrors(this._locationSettings));
        break;
      case 'stats':
        lines = lines.concat(await this.drawStats(this._locationSettings));
        break;
      case 'loading':
        lines = lines.concat(await this.drawLoading(this._locationSettings));
        break;
      case 'error':
        lines = lines.concat(await this.drawError(this._locationSettings));
        break;
      case 'packageSelector':
        lines = lines.concat(await this.drawPackageSelector(this._locationSettings));
        break;
    }

    function mapLines(l) {
      if (!l.slice) return l;
      l = __parseHtml(l);
      return l;
    }
    lines = lines.map(mapLines);
    headerLines = headerLines.map(mapLines);
    footerLines = footerLines.map(mapLines);

    this._blessedHeader.setContent(headerLines.join('\n'));
    this._blessedContent.setContent(lines.join('\n'));
    this._blessedFooter.setContent(footerLines.join('\n'));
    this._blessedScreen.render();

  }

  /**
   * @name                  drawHeader
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   *
   * Draw the header of the UI
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawHeader(settings = {}) {
    let titleLine = `<yellow><bold>CoffeeBuilder</bold></yellow> (version <cyan>${__packageJson.version}</cyan>)`;
    let titleLineCount = __countLine(titleLine);

    const author = __packageJson.author;
    const authorLength = author.length;

    titleLine += ' '.repeat(this._maxWidth - titleLineCount - authorLength) + `${author}`;

    const lines = [];
    lines.push(' ');
    lines.push(titleLine);
    lines.push(' ');

    this._uiItems.menu = {
      x: 0,
      y: lines.length,
      width: this._maxWidth,
      height: 1
    };

    let menuLine = ``;

    let menuHome;
    if (this._location === 'home') {
      menuHome = `<bgYellow><black><bold> Home(h) </bold></black></bgYellow>`;
    } else {
      menuHome = `<bgWhite><black> Home(h) </black></bgWhite>`;
    }
    menuLine += menuHome;
    this._uiItems.menuHome = {
      x: 0,
      y: this._uiItems.menu.y,
      width: __countLine(menuHome),
      height: 1
    };

    let menuBuild;
    if (!this._menuBuildLoader) this._menuBuildLoader = __ora('');
    this._menuBuildLoader.color = 'black';
    let menuBuildLoaderString = this.get('isRunning') ? this._menuBuildLoader.frame() : '';
    if (this._location === 'build') {
      menuBuild = `<bgYellow><black><bold> ${menuBuildLoaderString}Build(b) </bold></black></bgYellow>`;
    } else {
      menuBuild = `<bgWhite><black> Build(b) </black></bgWhite>`;
    }
    this._uiItems.menuBuild = {
      x: __countLine(menuLine),
      y: this._uiItems.menu.y,
      width: __countLine(menuBuild),
      height: 1
    };
    menuLine += menuBuild;

    let menuStats;
    if (this._location === 'stats') {
      menuStats = `<bgYellow><black><bold> Stats(s) </bold></black></bgYellow>`;
    } else {
      menuStats = `<bgWhite><black> Stats(s) </black></bgWhite>`;
    }
    this._uiItems.menuStats = {
      x: __countLine(menuLine),
      y: this._uiItems.menu.y,
      width: __countLine(menuStats),
      height: 1
    };
    menuLine += menuStats;

    let menuPackageSelector;
    if (this._location === 'packageSelector') {
      menuPackageSelector = `<bgYellow><black><bold> Package Selector(p) </bold></black></bgYellow>`;
    } else {
      menuPackageSelector = `<bgWhite><black> Package Selector(p) </black></bgWhite>`;
    }
    this._uiItems.menuPackageSelector = {
      x: __countLine(menuLine),
      y: this._uiItems.menu.y,
      width: __countLine(menuPackageSelector),
      height: 1
    };
    menuLine += menuPackageSelector;

    let packageSelector = '';
    packageSelector += `<bgCyan><black><bold> ${this.get('currentPackage.name')}(p) </bold></black></bgCyan>`;

    let menuRight = '';
    menuRight += packageSelector;

    menuLine += `<bgWhite>${' '.repeat(this._maxWidth - __countLine(menuLine) - __countLine(menuRight))}</bgWhite>`;

    this._uiItems.packageSelector = {
      x: __countLine(menuLine),
      y: this._uiItems.menu.y,
      width: __countLine(packageSelector),
      height: 1
    };

    menuLine += packageSelector;

    lines.push(menuLine);
    lines.push(' ');
    lines.push(' ');

    return lines;

  }

  /**
   * @name                  drawFooter
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   *
   * Draw the footer of the UI
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawFooter(locationSettings = {}) {

    const lines = [];

    let menuLine = ``;

    let menuWatch = '';
    if (this.get('config.current.watch')) {
      menuWatch += `<bgGreen><black><bold> Watch(w) </bold></black></bgGreen>`;
    } else {
      menuWatch += `<bgRed><black><bold> Watch(w) </bold></black></bgRed>`;
    }
    let menuAutoSwitch = '';
    if (this.get('config.current.autoSwitch')) {
      menuAutoSwitch += `<bgGreen><black><bold> Auto Switch(a) </bold></black></bgGreen>`;
    } else {
      menuAutoSwitch += `<bgRed><black><bold> Auto Switch(a) </bold></black></bgRed>`;
    }

    this._uiItems.menuAutoSwitch = {
      x: __countLine(menuLine),
      y: process.stdout.rows - 2,
      width: __countLine(menuAutoSwitch),
      height: 1
    };
    menuLine += menuAutoSwitch;

    this._uiItems.menuWatch = {
      x: __countLine(menuLine),
      y: process.stdout.rows - 2,
      width: __countLine(menuWatch),
      height: 1
    };
    menuLine += menuWatch;

    menuLine += `<bgWhite>${' '.repeat(this._maxWidth - __countLine(menuLine))}</bgWhite>`;

    lines.push(' ');
    lines.push(menuLine);
    lines.push(' ');

    return lines;

  }

  /**
   * @name                  drawPackageSelector
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   * 
   * Draw the package selector list
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawPackageSelector(settings = {}) {
    let lines = [];

    const columnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const columnsItems = [];

    let selectedItem = this._packageSelectorSelectedItem || {
      column: 1,
      row: 1
    };

    Object.keys(this.get('packages')).forEach(p => {
      columnsItems.push(`${p}`);
    });

    let columns = __arraySplitEvery(columnsItems, Math.round(columnsItems.length / columnsCount));
    this._packageSelectorColumns = columns;
    const finalColumns = [];

    columns.forEach((c, i) => {

      const columnsItems = c;
      let columnContent = '';

      columnsItems.forEach((item, j) => {
        const lineWidth = Math.round(this._maxWidth / columnsCount) - (i === 0 || i === columns.length - 1 ? this._padding : this._padding * 2) - 1;
        if (selectedItem.column === i + 1 && selectedItem.row === j + 1) {

          // const itemSplited = __splitEvery(item, lineWidth - 4, true);
          let lineContent = `<bold><bgYellow><black> ${__crop(item, lineWidth - 2, {
            splitWords: true
          })} </black></bgYellow></bold>\n`;
          columnContent += lineContent;
        } else {
          // const itemSplited = __splitEvery(item, lineWidth - 3, true);
          columnContent += `${__crop(item, lineWidth, {
            splitWords: true
          })}\n`;
        }

      });

      finalColumns.push(columnContent);

    });

    lines.push(__columns(finalColumns));

    return lines;
  }

  /**
   * @name                  drawHome
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   *
   * Draw the "welcome" interface
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawHome(settings = {}) {
    let lines = [];

    let message = `~~<yellow>▇▇▇▇</yellow>~~~~<white>▇▇▇▇▇</white>~~~
<yellow>▇▇~~~~▇▇</yellow>~~<white>▇▇~~~▇▇</white>
<yellow>▇▇</yellow>~~~~<white>▇▇▇▇▇▇▇▇▇▇</white>~~
<yellow>▇▇~~~~▇▇</yellow>~~<white>▇▇~~~▇▇</white>
~~<yellow>▇▇▇▇</yellow>~~~~<white>▇▇▇▇▇</white>~~~`;

    message += '\n\n';
    message += `Welcome to Coffeekraken <bold><yellow>CoffeeBuilder</yellow></bold>\nversion <cyan>${__packageJson.version}</cyan>`;
    message += '\n\n\n';
    message += `- Press <cyan><bold>R</bold></cyan> to launch the build`;
    message += '\n\n';
    message += `- Press <cyan><bold>P</bold></cyan> to choose the package to process`;
    message += '\n\n';
    message += `- Press <cyan><bold>A</bold></cyan> to toggle the <magenta>auto switch</magenta> feature`;
    message += '\n\n';
    message += `- Press <cyan><bold>W</bold></cyan> to toggle the <magenta>watch</magenta> feature`;


    lines = lines.concat(await this._drawMessage(message));

    return lines;
  }

  /**
   * @name                  drawBuildDependencies
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   * 
   * Load the build dependencies and check if all is good to render the build process
   * 
   * @return              {Promise}                       A promise that will be resolved once the dependencies are ok
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawBuildDependencies() {

    if (this.get('isRunning')) {
      return {
        message: `To start <magenta>building the package</magenta> "<bold><yellow>${this.get('currentPackage.name')}</yellow></bold>", simply tap the "<cyan><bold>R</bold></cyan>" key...`
      };
    }
    return {};
  }

  /**
   * @name                  drawBuild
   * @namespace             terminal.coffeebuilder.node.workers.UI
   * @type                  Function
   *
   * Draw the interface depending on the data object passed
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawBuild(settings = {}) {

    console.log('BUILKD');

    let lines = [];

    if (settings.message) {
      lines = lines.concat(await this._drawMessage(settings.message, {
        url: __path.resolve(__dirname, '../../images/build-icon.png'),
        width: 10,
        color: '#2AB050'
      }));
      return lines;
    }

    if (!this.get('stats.build.percentage')) this.set('stats.build.percentage', 0);

    let { percentage, currentResourcePath, currentProcessor, processedResources, processors } = this.get('stats.build');
    const postBuildProcessors = this.get('stats.postBuild.processors');
    processors = __deepMerge(processors, postBuildProcessors);

    const postPercentage = this.get('stats.postBuild.percentage');

    const watchCompile = this._watchCompile;

    const progress = Math.round(this._maxWidth / 100 * percentage || 0);
    const postProgress = Math.round(this._maxWidth / 100 * postPercentage || 0);

    let barColorTag = 'red';
    if (percentage > 33) barColorTag = 'yellow';
    if (percentage > 66) barColorTag = 'green';

    let bar = `<${barColorTag}>` + '█'.repeat(progress) + `</${barColorTag}>`;
    bar += '░'.repeat(this._maxWidth - progress);

    if (percentage >= 100) {
      bar = '<green>' + '✔ '.repeat(Math.round(this._maxWidth / 2)) + '</green>';
    }

    let postBarColorTag = 'red';
    if (postPercentage > 33) postBarColorTag = 'yellow';
    if (postPercentage > 66) postBarColorTag = 'green';

    let postBar = `<${postBarColorTag}>` + '█'.repeat(postProgress) + `</${postBarColorTag}>`;
    postBar += '░'.repeat(this._maxWidth - postProgress);

    if (postPercentage >= 100) {
      postBar = '<green>' + '✔ '.repeat(Math.round(this._maxWidth / 2)) + '</green>';
    }

    let compileLine = `<black>░░</black>`;
    compileLine = '';
    // @TODO
    this.get('config.current.compile').forEach((compile, i) => {
      if (watchCompile[0] === compile || watchCompile.length === 0) {
        compileLine += `<green>✔ <bold><bgBlack>${compile}</bgBlack></bold></green>  `;
      } else {
        compileLine += `<white>✘ <bold><bgBlack>${compile}</bgBlack></bold></white>  `;
      }
    });

    if (this.get('config.current.watch')) {
      if (!this._watchSpinner) this._watchSpinner = __ora('Watching');
      const watchSpinner = this._watchSpinner.frame();
      compileLine += ' '.repeat(this._maxWidth - __countLine(compileLine) - __countLine(watchSpinner)) + watchSpinner;
    }

    lines.push('-'.repeat(this._maxWidth));
    lines.push(' ');
    lines.push(compileLine);
    lines.push(' ');
    lines.push('-'.repeat(this._maxWidth));
    lines.push(' ');
    lines.push(`Build processors progress`);
    lines.push(' ');
    lines.push(bar);
    lines.push(' ');

    lines.push(`Post build processors progress`);
    lines.push(' ');
    lines.push(postBar);
    lines.push(' ');


    // resource
    if (percentage < 100) {
      let resourceLine = __breakLine(`Processing resource "<yellow>${currentResourcePath.replace(process.cwd(), '')}</yellow>" using "<cyan>${currentProcessor}</cyan>" processor...`);
      lines.push(resourceLine);

    }

    return lines;

  }

  /**
   * @name                                  _selectBuildErrors
   * @namespace                             terminal.coffeebuilder.node.workers.UI
   * @type                                  Function
   * @private
   * 
   * Select one of the build errors by passing as paramter either 1-9, or 'previous' or 'next'
   * 
   * @param                 {Mixed}           which               Telle which error you want to select
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _selectBuildErrors(which) {
    if (!this._selectBuildErrorsWhich) this._selectBuildErrorsWhich = 1;
    const errors = this.get('stats.errors');
    if (typeof which === 'number') {
      if (which < 1 || which > 9) {
        this._selectBuildErrorsWhich = 1;
      } else if (which > errors.length) {
        this._selectBuildErrorsWhich = errors.length;
      } else {
        this._selectBuildErrorsWhich = which;
      }
    } else if (which === 'previous') {
      if (this._selectBuildErrorsWhich > 1) {
        this._selectBuildErrorsWhich -= 1;
      }
    } else if (which === 'next') {
      if (this._selectBuildErrorsWhich < errors.length) {
        this._selectBuildErrorsWhich += 1;
      }
    }
    this.draw();
  }

  /**
   * @name                                  drawBuildErrors
   * @namespace                             terminal.coffeebuilder.node.workers.UI
   * @type                                  Function
   * 
   * Draw the errors reporting after a compilation
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawBuildErrors(settings = {}) {
    if (!this._selectBuildErrorsWhich) this._selectBuildErrorsWhich = 1;
    let lines = [];

    // loop on errors
    settings.errors.forEach((error, i) => {

      const filepath = error.resource.filepath;
      const repeatLine = Math.round(this._maxWidth - __countLine(filepath) - 1);

      lines.push(`<${this._selectBuildErrorsWhich === i + 1 ? 'bgYellow' : 'bgRed'}><black><bold> ${filepath}${' '.repeat(repeatLine)}</bold></black></${this._selectBuildErrorsWhich === i + 1 ? 'bgYellow' : 'bgRed'}>`);
      if (this._selectBuildErrorsWhich === i + 1) {
        lines.push(' ');
        lines = lines.concat(error.error.message.split('\n'));
        lines.push(' ');
      }

    });

    return lines;
  }

  /**
   * @name                            drawLoading
   * @namespace                       terminal.coffeebuilder.node.workers.UI
   * @type                            Function
   * 
   * Display a loading message to the user
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawLoading(settings = {}) {

    const message = this._locationSettings.loadMessage || 'Please wait...';

    if (!this._loadingSpinner) this._loadingSpinner = __ora(message);
    const loadingSpinner = this._loadingSpinner.frame();
    const loadingSpinnerCount = __countLine(loadingSpinner);
    let loadingLine = '';
    loadingLine += ' '.repeat(this._maxWidth / 2 - loadingSpinnerCount / 2);
    loadingLine += loadingSpinner;

    let lines = [];
    lines = lines.concat(Array(Math.round(process.stdout.rows / 2 - 5)).fill(' '));
    lines.push(loadingLine);
    lines.push(' ');
    lines.push(' ');

    return lines;

  }

  /**
   * @name                                drawStatsDependencies
   * @namespace                           terminal.coffeebuilder.node.workers.UI
   * @type                                Function
   * 
   * Load the stats dependencies
   * 
   * @return              {Promise}                       A promise that will be resolved once the dependencies are loaded
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawStatsDependencies() {
    return new Promise(async (resolve, reject) => {

      // @TODO
      // // check that the current package has stats
      // if (!CoffeeBuilder.stats.getCurrentPackageStats()) {
      //   return resolve({
      //     message: `Their's no stats for the package "<bold><yellow>${CoffeeBuilder.api.getCurrentPackageName()}</yellow></bold>"... To start the <magenta>build process</magenta>, simply type the "<cyan><bold>R</bold></cyan>" key...`
      //   });
      // }

      // const currentPackage = CoffeeBuilder.api.getCurrentPackage();

      // await __asyncForEach(currentPackage.sourcesFoldersPaths, async (p) => {
      //   return new Promise(async (resolve, reject) => {
      //     const folderSize = await __folderSize(p, true);
      //     CoffeeBuilder.stats.set(`folders.sources.${p.replace(currentPackage.path + '/', '')}`, folderSize);
      //     resolve(folderSize);
      //   });
      // });

      // await __asyncForEach(currentPackage.outputsFoldersPaths, async (p) => {
      //   return new Promise(async (resolve, reject) => {
      //     const folderSize = await __folderSize(p, true);
      //     CoffeeBuilder.stats.set(`folders.outputs.${p.replace(currentPackage.path + '/', '')}`, folderSize);
      //     resolve(folderSize);
      //   });
      // });

      resolve();

    });
  }

  /**
   * @name                            drawError
   * @namespace                       terminal.coffeebuilder.node.workers.UI
   * @type                            Function
   * 
   * Draw the error message
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawError(settings = {}) {

    return await this._drawMessage(settings.message, {
      url: __path.resolve(__dirname, '../../images/error-icon.png'),
      width: 12,
      color: '#ff0000'
    });

  }

  /**
   * @name                            drawStats
   * @namespace                       terminal.coffeebuilder.node.workers.UI
   * @type                            Function
   * 
   * Draw the "after build" stats
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async drawStats(settings = {}) {
    let lines = [];

    if (settings.message) {
      lines = lines.concat(await this._drawMessage(settings.message, {
        url: __path.resolve(__dirname, '../../images/stats-icon.png'),
        width: 12,
        color: '#FFB905'
      }));
      return lines;
    }

    let { processedResources, processors } = this.get('stats.build');

    const watchCompile = this._watchCompile;
    const compileType = watchCompile.length ? watchCompile : this.get('config.current.compile');

    let resourcesLine = `<bold><yellow>Processed resource(s)</yellow></bold>`;
    lines.push(resourcesLine);
    lines.push('-'.repeat(this._maxWidth));
    lines.push(' ');

    // processed resources
    let processedResourcesLine = `<cyan><bold>${Object.keys(processedResources).length}</bold></cyan> (${compileType.join(',')}) file${Object.keys(processedResources).length > 1 ? 's' : ''} processed`;
    if (this.get('stats.build.startTimestamp') && this.get('stats.build.endTimestamp')) {
      processedResourcesLine += ` in <yellow>${new Date(this.get('stats.build.endTimestamp') - this.get('stats.build.startTimestamp')).getSeconds()}s</yellow>`;
      if (Object.keys(this.get('stats.cache.resources')).length > 0) {
        processedResourcesLine += ` / <magenta><bold>${Object.keys(this.get('stats.cache.resources')).length}</bold></magenta> taken from cache...`;
      }
    }
    lines.push('<green>✔</green>  ' + processedResourcesLine);
    lines.push(' ');
    lines.push(' ');

    let processorsLine = `<bold><yellow>Processor(s) used</yellow></bold>`;
    lines.push(processorsLine);
    lines.push('-'.repeat(this._maxWidth));
    lines.push(' ');

    const usedProcessorsColumns = [];
    const usedProcessorsKeys = Object.keys(processors);
    const usedProcessorsColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const usedProcessorsItemsCountByColumn = Math.round(usedProcessorsKeys.length / usedProcessorsColumnsCount)

    for (let i = 0; i < usedProcessorsColumnsCount; i++) {
      let currentColumn = [];
      usedProcessorsKeys.slice(i * usedProcessorsItemsCountByColumn, i * usedProcessorsItemsCountByColumn + usedProcessorsItemsCountByColumn).forEach((k) => {
        currentColumn.push(`<yellow>░</yellow> ${k}: <cyan><bold>${Object.keys(processors[k].processedResources).length}</bold></cyan>`);
      });
      usedProcessorsColumns.push(currentColumn.join('\n'));
    }

    lines.push(__columns(usedProcessorsColumns));
    lines.push(' ');

    const sourcesFolderColumns = [];
    const sourcesFolderKeys = Object.keys(this.get('stats.folders.sources'));
    const sourcesFolderColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const sourcesFolderItemsCountByColumn = Math.round(sourcesFolderKeys.length / sourcesFolderColumnsCount)

    let sourcesFolderLine = `<bold><yellow>Sources folder(s)</yellow></bold>`;
    lines.push(sourcesFolderLine);
    lines.push('-'.repeat(this._maxWidth));
    lines.push(' ');

    for (let i = 0; i < sourcesFolderColumnsCount; i++) {
      let currentColumn = [];
      sourcesFolderKeys.slice(i * sourcesFolderItemsCountByColumn, i * sourcesFolderItemsCountByColumn + sourcesFolderItemsCountByColumn).forEach((k) => {
        currentColumn.push(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(this.get('stats.folders.sources')[k])}</bold></cyan>`);
      });
      sourcesFolderColumns.push(currentColumn.join('\n'));
    }

    lines.push(__columns(sourcesFolderColumns));
    lines.push(' ');

    let outputFolderLine = `<bold><yellow>Output folder(s)</yellow></bold>`;
    lines.push(outputFolderLine);
    lines.push('-'.repeat(this._maxWidth));
    lines.push(' ');

    const outputFolderColumns = [];
    const outputFolderKeys = Object.keys(this.get('stats.folders.outputs'));
    const outputFolderColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const outputFolderItemsCountByColumn = Math.round(outputFolderKeys.length / outputFolderColumnsCount)

    for (let i = 0; i < outputFolderColumnsCount; i++) {
      let currentColumn = [];
      outputFolderKeys.slice(i * outputFolderItemsCountByColumn, i * outputFolderItemsCountByColumn + outputFolderItemsCountByColumn).forEach((k) => {
        currentColumn.push(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(this.get('stats.folders.outputs')[k])}</bold></cyan>`);
      });
      outputFolderColumns.push(currentColumn.join('\n'));
    }
    lines.push(__columns(outputFolderColumns));

    return lines;

  }

  async _drawMessage(message, imageObj = {}) {
    let lines = [];

    const lineWidth = Math.round(process.stdout.columns / 2);

    let image, imageLines;
    if (imageObj.url) {
      image = await __image(imageObj.url, __deepMerge({
        width: 15,
        color: '#ff0000'
      }, imageObj));
      imageLines = image.split('\n');
      imageLines.push(' ');
    }

    const messageLines = message.split('\n');

    let parts = [];
    messageLines.forEach(messageLine => {
      parts = parts.concat(__splitEvery(messageLine, lineWidth));
    });

    if (imageLines) {
      lines = lines.concat(imageLines);
    }

    lines = lines.concat(parts);

    let marginTop = process.stdout.rows / 2;
    marginTop -= lines.length;
    for (let i = 0; i < Math.round(marginTop + 4); i++) {
      lines.unshift(' ');
    }

    lines = __center(lines);

    return lines;

  }

}

const ui = new UI();

__expose({
  set: ui.set,
  changeLocation: ui.changeLocation,
  draw: ui.draw
});