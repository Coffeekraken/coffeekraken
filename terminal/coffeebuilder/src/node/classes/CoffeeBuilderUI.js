const __terminalKit = require('terminal-kit').terminal;
const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml');
const __countLine = require('@coffeekraken/sugar/node/terminal/countLine');
const __columns = require('@coffeekraken/sugar/node/terminal/columns');
const __readline = require('readline');
const __blessed = require('blessed');
const __asyncForEach = require('@coffeekraken/sugar/js/array/asyncForEach');
const __ora = require('ora');
const __folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
const __formatFileSize = require('@coffeekraken/sugar/node/fs/formatFileSize');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __breakLineDependingOnSidesPadding = require('@coffeekraken/sugar/node/terminal/breakLineDependingOnSidesPadding');
const __splitEvery = require('@coffeekraken/sugar/node/string/splitEvery');
const __arraySplitEvery = require('@coffeekraken/sugar/node/array/splitEvery');
const __captureConsole = require('capture-console');

const __packageJson = require('../../../package.json');

/**
 * @name                        CoffeeBuilderUI
 * @namespace                   terminal.coffeebuilder.node.classes
 * @type                        Class
 * 
 * Class that handle the coffeebuilder interface drawing, user inputs, etc...
 * 
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderUI {

  /**
   * @name                              _location
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                              Array
   * 
   * Store the package selector ui columns items
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _packageSelectorColumns = [];

  /**
   * @name                              _packageSelectorSelectedItem
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUi
   * @type                              Object
   * 
   * Store the default change location settings by locations
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _changeLocationDefaultSettings = {
    'stats': {
      loadDependencies: this._loadStatsDependencies,
      message: 'Loading stats please wait...'
    },
    'loading': {
      redraw: true,
      redrawInterval: 20
    },
    'build': {
      redraw: true,
      redrawInterval: 100
    }
  };

  /**
   * @name                              constructor
   * @namespace                         terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                              Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

    // function terminate() {
    //   __terminalKit.grabInput(false);
    //   setTimeout(function () { process.exit() }, 100);
    // }

    // __terminalKit.bold.cyan('Type anything on the keyboard...\n');
    // __terminalKit.green('Hit CTRL-C to quit.\n\n');

    // __terminalKit.grabInput({ mouse: 'button' });

    // __terminalKit.on('key', function (name, matches, data) {
    //   // console.log("'key' event:", name);
    //   if (name === 'CTRL_C') { terminate(); }
    // });

    // __terminalKit.on('terminal', function (name, data) {
    //   // console.log("'terminal' event:", name, data);
    // });

    // __terminalKit.on('mouse', function (name, data) {
    //   // console.log("'mouse' event:", name, data);
    // });

    // this._interface = __readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });

    function terminate() {
      __terminalKit.grabInput(false);
      setTimeout(function () { process.exit() }, 100);
    }

    __terminalKit.grabInput({ mouse: 'button' });

    __terminalKit.on('key', function (name, matches, data) {
      CoffeeBuilder.events.emit('key', {
        name
      });
      if (name === 'CTRL_C') { terminate(); }
    });

    // __terminalKit.on('terminal', function (name, data) {
    //   console.log("'terminal' event:", name, data);
    // });

    const _this = this;

    __terminalKit.on('mouse', function (name, data) {
      if (!name.includes('_RELEASED')) return;
      Object.keys(_this._uiItems).forEach(item => {
        const itemObj = _this._uiItems[item];

        const isInX = data.x >= itemObj.x && data.x <= itemObj.x + itemObj.width;
        const isInY = data.y >= itemObj.y && data.y <= itemObj.y + itemObj.height;

        if (isInX && isInY) {
          CoffeeBuilder.events.emit('click', {
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

    CoffeeBuilder.events.on('click', (data) => {
      switch (data.item) {
        case 'packageSelector':
          this.changeLocation('packageSelector');
          break;
      }
    });

    CoffeeBuilder.events.on('key', (data) => {

      // general key bindings
      switch (data.name.toUpperCase()) {
        case 'H':
          CoffeeBuilder.ui.changeLocation('home');
          break;
        case 'B':
          CoffeeBuilder.ui.changeLocation('build');
          break;
        case 'S':
          CoffeeBuilder.ui.changeLocation('stats');
          break;
        case 'E':
          CoffeeBuilder.ui.changeLocation('error');
          break;
        case 'P':
          CoffeeBuilder.ui.changeLocation('packageSelector');
          break;
        case 'R':
          CoffeeBuilder.api.run();
          break;
      }

      // key bindings by location
      switch (this._location) {
        case 'packageSelector':
          switch (data.name) {
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
              CoffeeBuilder.api.setCurrentPackageByName(this._packageSelectorColumns[this._packageSelectorSelectedItem.column - 1][this._packageSelectorSelectedItem.row - 1]);
              break;
          }
          this.draw();
          break;
      }
    });

    // listen for build events
    // this._listenBuildEvents();
  }

  /**
  * @name                        _listenBuildEvents
  * @namespace                   terminal.coffeebuilder.node.classes.CoffeeBuilderUI
  * @type                        Function
  *
  * Listen and handle build events emitted from the loader and the plugin
  *
  * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
  _listenBuildEvents() {
    let postBuildTimeout, buildTimeout;
    CoffeeBuilder.events.on('build', (data) => {
      clearTimeout(buildTimeout);
      buildTimeout = setTimeout(() => {
        this.draw();
      });
    });
    CoffeeBuilder.events.on('postBuild', (data) => {
      clearTimeout(postBuildTimeout);
      postBuildTimeout = setTimeout(() => {
        this.draw();
      }, 10);
    });
  }

  /**
   * @name                  changeLocation
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
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

    if (this._locationSettings.loadDependencies) {
      this._location = 'loading';
      this.draw();
      await this._locationSettings.loadDependencies();
    }

    // set the new location
    this._location = location;

    // draw the new UI
    this.draw();
  }

  /**
   * @name                  draw
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   * 
   * Draw the interface
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  draw() {

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
    if (!this._blessedContent) {
      this._blessedContent = __blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        scrollable: true
      });
      this._blessedScreen.append(this._blessedContent);
    }

    let lines = [];

    // draw the header
    lines = lines.concat(this.drawHeader(this._locationSettings));

    switch (this._location) {
      case 'home':
        lines = lines.concat(this.drawHome(this._locationSettings));
        break;
      case 'build':
        lines = lines.concat(this.drawBuild(this._locationSettings));
        break;
      case 'stats':
        lines = lines.concat(this.drawStats(this._locationSettings));
        break;
      case 'loading':
        lines = lines.concat(this.drawLoading(this._locationSettings));
        break;
      case 'error':
        lines = lines.concat(this.drawError(this._locationSettings));
        break;
      case 'packageSelector':
        lines = lines.concat(this.drawPackageSelector(this._locationSettings));
        break;
    }

    lines = lines.map((l) => {
      if (!l.slice) return l;
      if (l.slice(0, this._padding) === ' '.repeat(this._padding)) return l;
      return ' '.repeat(this._padding) + l;
    });

    this._blessedContent.setContent(lines.join(''));
    this._blessedScreen.render();

    clearTimeout(this._drawTimeout);
    if (this._locationSettings && this._locationSettings.redraw) {
      this._drawTimeout = setTimeout(() => {
        this.draw();
      }, this._locationSettings.redrawInterval || 100);
    }

  }

  /**
   * @name                  drawHeader
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   *
   * Draw the header of the UI
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawHeader(locationSettings = {}) {
    let titleLine = __parseHtml(`<yellow><bold>CoffeeBuilder</bold></yellow> v${__packageJson.version}`);
    let titleLineCount = __countLine(titleLine);

    const author = __packageJson.author;
    const authorLength = author.length;

    titleLine += ' '.repeat(this._maxWidth - titleLineCount - authorLength) + __parseHtml(`<white>${author}</white>`);

    const lines = [];
    lines.push('\n');
    lines.push(titleLine);
    lines.push('\n');
    lines.push('\n');

    // let packagesLine = ``;

    // Object.keys(CoffeeBuilder.api.baseConfig.packages).forEach(pkgName => {
    //   if (CoffeeBuilder.api.getCurrentPackage() === pkgName) {
    //     packagesLine += `<bgYellow><black><bold> ${pkgName} </bold></black></bgYellow>`;
    //   } else {
    //     packagesLine += `<bgWhite><black> ${pkgName} </black></bgWhite>`;
    //   }
    // });

    // console.log(packagesLine);
    // console.log(Math.round(this._maxWidth - __countLine(packagesLine)));

    // packagesLine += `<bgWhite>${' '.repeat(Math.round(this._maxWidth - __countLine(packagesLine)))}</bgWhite>`;

    // lines.push(__parseHtml(packagesLine));
    // lines.push('\n');

    this._uiItems.menu = {
      x: 0,
      y: lines.length,
      width: this._maxWidth,
      height: 1
    };

    let menuLine = ``;

    if (this._location === 'home') {
      menuLine += `<bgYellow><black><bold> Home(h) </bold></black></bgYellow>`;
    } else {
      menuLine += `<bgWhite><black> Home(h) </black></bgWhite>`;
    }
    if (this._location === 'build') {
      menuLine += `<bgYellow><black><bold> Build(b) </bold></black></bgYellow>`;
    } else {
      menuLine += `<bgWhite><black> Build(b) </black></bgWhite>`;
    }
    if (this._location === 'stats') {
      menuLine += `<bgYellow><black><bold> Stats(s) </bold></black></bgYellow>`;
    } else {
      menuLine += `<bgWhite><black> Stats(s) </black></bgWhite>`;
    }
    if (this._location === 'error') {
      menuLine += `<bgYellow><black><bold> Error(e) </bold></black></bgYellow>`;
    } else {
      menuLine += `<bgWhite><black> Error(e) </black></bgWhite>`;
    }
    if (this._location === 'packageSelector') {
      menuLine += `<bgYellow><black><bold> Package Selector(p) </bold></black></bgYellow>`;
    } else {
      menuLine += `<bgWhite><black> Package Selector(p) </black></bgWhite>`;
    }

    let packageSelector = '';
    packageSelector += `<bgCyan><black><bold> ${CoffeeBuilder.api.getCurrentPackageName()}(p) </bold></black></bgCyan>`;

    menuLine += `<bgWhite>${' '.repeat(this._maxWidth - __countLine(menuLine) - __countLine(packageSelector))}</bgWhite>`;

    this._uiItems.packageSelector = {
      x: __countLine(menuLine),
      y: this._uiItems.menu.y,
      width: __countLine(packageSelector),
      height: 1
    };

    menuLine += packageSelector;

    lines.push(__parseHtml(menuLine));
    lines.push('\n');
    lines.push('\n');

    return lines;

  }

  /**
   * @name                  drawPackageSelector
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   * 
   * Draw the package selector list
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawPackageSelector(settings = {}) {
    const lines = [];

    const columnsCount = this._maxWidth > 150 ? 3 : this._maxWidth > 100 ? 2 : 1;
    const columnsItems = [];

    let selectedItem = this._packageSelectorSelectedItem || {
      column: 1,
      row: 1
    };

    Object.keys(CoffeeBuilder.api.getPackages()).forEach(p => {

      columnsItems.push(`${p}`);

    });

    let columns = __arraySplitEvery(columnsItems, Math.round(columnsItems.length / columnsCount));
    this._packageSelectorColumns = columns;
    const finalColumns = [];

    columns.forEach((c, i) => {

      const columnsItems = c;
      let columnContent = '';

      columnsItems.forEach((item, j) => {

        if (selectedItem.column === i + 1 && selectedItem.row === j + 1) {
          const lineWidth = Math.round(this._maxWidth / columnsCount) - (item.length + 6);
          let lineContent = `<bold><bgYellow><black> ${item} </black></bgYellow></bold>\n`;
          columnContent += lineContent;
        } else {
          columnContent += ` ${item} \n`;
        }

      });

      finalColumns.push(__parseHtml(columnContent));

    });

    lines.push(__columns(finalColumns, this._padding));


    // var items = [
    //   'a. Go south',
    //   'b. Go west',
    //   'c. Go back to the street'
    // ];

    // const out = __captureConsole.interceptStdio(() => {

    //   __terminalKit.singleColumnMenu(items, function (error, response) {
    //     console.log('selected item', response);
    //     // term( '\n' ).eraseLineAfter.green(
    //     //   "#%s selected: %s (%s,%s)\n" ,
    //     //   response.selectedIndex ,
    //     //   response.selectedText ,
    //     //   response.x ,
    //     //   response.y
    //     // ) ;
    //     // process.exit() ;
    //   });

    // });

    // console.log(JSON.stringify(out.stdout));




    // CoffeeBuilder.api.


    return lines;
  }

  /**
   * @name                  drawHome
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   *
   * Draw the "welcome" interface
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawHome(settings = {}) {
    const lines = [];
    return lines;
  }

  /**
   * @name                  drawBuild
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   *
   * Draw the interface depending on the data object passed
   *
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawBuild(settings = {}) {

    if (!CoffeeBuilder.stats.getValue('build.percentage')) CoffeeBuilder.stats.setValue('build.percentage', 0);

    let { percentage, currentResourcePath, currentProcessor, processedResources, processors } = CoffeeBuilder.stats.getValue('build');
    const postBuildProcessors = CoffeeBuilder.stats.getValue('postBuild.processors');
    processors = __deepMerge(processors, postBuildProcessors);

    const postPercentage = CoffeeBuilder.stats.getValue('postBuild.percentage');

    const watchCompile = this._watchCompile;

    let lines = ['\n'];

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
    CoffeeBuilder.api.config.compile.forEach((compile, i) => {
      if (watchCompile[0] === compile || watchCompile.length === 0) {
        compileLine += `<green>✔ <bold><bgBlack>${compile}</bgBlack></bold></green>  `;
      } else {
        compileLine += `<white>✘ <bold><bgBlack>${compile}</bgBlack></bold></white>  `;
      }
    });

    if (CoffeeBuilder.api.config.watch) {
      if (!this._watchSpinner) this._watchSpinner = __ora('Watching');
      const watchSpinner = this._watchSpinner.frame();
      compileLine += ' '.repeat(this._maxWidth - __countLine(compileLine) - __countLine(watchSpinner)) + watchSpinner;
    }

    compileLine = __parseHtml(compileLine);

    lines.push('-'.repeat(this._maxWidth));
    lines.push('\n');
    lines.push(compileLine);
    lines.push('\n');
    lines.push('-'.repeat(this._maxWidth));
    lines.push('\n');
    lines.push('\n');
    lines.push(__parseHtml(`Build processors progress`));
    lines.push('\n');
    lines.push('\n');
    lines.push(__parseHtml(bar));
    lines.push('\n');
    lines.push('\n');

    lines.push(__parseHtml(`Post build processors progress`));
    lines.push('\n');
    lines.push('\n');
    lines.push(__parseHtml(postBar));
    lines.push('\n');
    lines.push('\n');


    // resource
    if (percentage < 100) {
      let resourceLine = __breakLineDependingOnSidesPadding(__parseHtml(`Processing resource "<yellow>${currentResourcePath.replace(process.cwd(), '')}</yellow>" using "<cyan>${currentProcessor}</cyan>" processor...`), this._padding);
      lines.push(resourceLine);

    }

    lines.push('\n');
    lines.push('\n');
    lines.push('\n');

    return lines;

  }

  /**
   * @name                            drawLoading
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                            Function
   * 
   * Display a loading message to the user
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawLoading(settings = {}) {

    const message = this._locationSettings.message || 'Please wait...';

    if (!this._loadingSpinner) this._loadingSpinner = __ora(message);
    const loadingSpinner = this._loadingSpinner.frame();
    const loadingSpinnerCount = __countLine(loadingSpinner);
    let loadingLine = '';
    loadingLine += ' '.repeat(this._maxWidth / 2 - loadingSpinnerCount / 2);
    loadingLine += loadingSpinner;

    const lines = [];
    lines.push('\n'.repeat(process.stdout.rows / 2 - 5));
    lines.push(loadingLine);
    lines.push('\n');
    lines.push('\n');

    return lines;

  }

  _loadStatsDependencies() {
    return new Promise(async (resolve, reject) => {

      // const watchCompile = this._watchCompile;
      const compileTypes = CoffeeBuilder.api.config.compile;

      await __asyncForEach(compileTypes, async (compile) => {
        return new Promise(async (r) => {

          const compileTypeObj = CoffeeBuilder.api.config.resources[compile];

          await __asyncForEach(compileTypeObj.sourcesFolders, (sourcesFolder) => {
            return new Promise(async (resolve, reject) => {

              const folderSize = await __folderSize(sourcesFolder, true);
              CoffeeBuilder.stats.setValue(`folders.sources.${sourcesFolder}`, folderSize);
              resolve(folderSize);

            });
          });

          await __asyncForEach(compileTypeObj.outputFolders, (outputFolder) => {
            return new Promise(async (resolve, reject) => {

              const folderSize = await __folderSize(outputFolder, true);
              CoffeeBuilder.stats.setValue(`folders.outputs.${outputFolder}`, folderSize);
              resolve(folderSize);

            });
          });

          r();

        });
      });

      resolve();

    });
  }

  /**
   * @name                            drawError
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                            Function
   * 
   * Draw the error message
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawError(settings = {}) {

    let lines = [];

    const lineWidth = Math.round(process.stdout.columns / 2);
    // console.log(lineWidth);
    // const reg = new RegExp(`.{1,${lineWidth}}`, 'g');
    // // console.log(settings.message.match(reg));
    // console.log([...settings.message.matchAll(reg)].map(o => o[0]));

    const parts = __splitEvery(settings.message, lineWidth).map(l => __parseHtml(l)).map((l) => {
      return ' '.repeat(Math.round((this._maxWidth - l.length) / 2) + 12) + l + '\n';
    });

    for (let i = 0; i < process.stdout.rows / 2 - 5; i++) {
      lines.push('\n');
    }

    // const image = await __terminalImage.file(__dirname + '/../../images/error-icon.png');
    // const imgLines = image.split('\n');
    // lines = lines.concat(imgLines);

    lines = lines.concat(parts);

    return lines;

  }

  /**
   * @name                            drawStats
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                            Function
   * 
   * Draw the "after build" stats
   * 
   * @param           {Object}              [settings={}]               The location settings
   * @return          {Array}                                           An array of lines to draw
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawStats(settings = {}) {
    let lines = [];

    let { processedResources, processors } = CoffeeBuilder.stats.getValue('build');

    const watchCompile = this._watchCompile;
    const compileType = watchCompile.length ? watchCompile : CoffeeBuilder.api.config.compile;

    let resourcesLine = __parseHtml(`<bold><yellow>Processed resource(s)</yellow></bold>`);
    lines.push('\n');
    lines.push(resourcesLine);
    lines.push('\n');
    lines.push('-'.repeat(this._maxWidth));
    lines.push('\n');
    lines.push('\n');

    // processed resources
    let processedResourcesLine = `<cyan><bold>${Object.keys(processedResources).length}</bold></cyan> (${compileType.join(',')}) file${Object.keys(processedResources).length > 1 ? 's' : ''} processed`;
    if (CoffeeBuilder.stats.getValue('build.startTimestamp') && CoffeeBuilder.stats.getValue('build.endTimestamp')) {
      processedResourcesLine += ` in <yellow>${new Date(CoffeeBuilder.stats.getValue('build.endTimestamp') - CoffeeBuilder.stats.getValue('build.startTimestamp')).getSeconds()}s</yellow>`;
      if (Object.keys(CoffeeBuilder.stats.getValue('cache.resources')).length > 0) {
        processedResourcesLine += ` / <magenta><bold>${Object.keys(CoffeeBuilder.stats.getValue('cache.resources')).length}</bold></magenta> taken from cache...`;
      }
    }
    lines.push(__parseHtml('<green>✔</green>  ' + processedResourcesLine));
    lines.push('\n');
    lines.push('\n');
    lines.push('\n');

    let processorsLine = __parseHtml(`<bold><yellow>Processor(s) used</yellow></bold>`);
    lines.push(processorsLine);
    lines.push('\n');
    lines.push('-'.repeat(this._maxWidth));
    lines.push('\n');
    lines.push('\n');

    const usedProcessorsColumns = [];
    const usedProcessorsKeys = Object.keys(processors);
    const usedProcessorsColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const usedProcessorsItemsCountByColumn = Math.round(usedProcessorsKeys.length / usedProcessorsColumnsCount)

    for (let i = 0; i < usedProcessorsColumnsCount; i++) {
      let currentColumn = [];
      usedProcessorsKeys.slice(i * usedProcessorsItemsCountByColumn, i * usedProcessorsItemsCountByColumn + usedProcessorsItemsCountByColumn).forEach((k) => {
        currentColumn.push(__parseHtml(`<yellow>░</yellow> ${k}: <cyan><bold>${Object.keys(processors[k].processedResources).length}</bold></cyan>`));
      });
      usedProcessorsColumns.push(currentColumn.join('\n'));
    }

    lines.push(__columns(usedProcessorsColumns, this._padding));

    lines.push('\n');
    lines.push('\n');

    const sourcesFolderColumns = [];
    const sourcesFolderKeys = Object.keys(CoffeeBuilder.stats.getValue('folders.sources'));
    const sourcesFolderColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const sourcesFolderItemsCountByColumn = Math.round(sourcesFolderKeys.length / sourcesFolderColumnsCount)

    let sourcesFolderLine = __parseHtml(`<bold><yellow>Sources folder(s)</yellow></bold>`);
    lines.push(sourcesFolderLine);

    lines.push('\n');
    lines.push('-'.repeat(this._maxWidth));
    lines.push('\n');
    lines.push('\n');

    for (let i = 0; i < sourcesFolderColumnsCount; i++) {
      let currentColumn = [];
      sourcesFolderKeys.slice(i * sourcesFolderItemsCountByColumn, i * sourcesFolderItemsCountByColumn + sourcesFolderItemsCountByColumn).forEach((k) => {
        currentColumn.push(__parseHtml(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(CoffeeBuilder.stats.getValue('folders.sources')[k])}</bold></cyan>`));
      });
      sourcesFolderColumns.push(currentColumn.join('\n'));
    }
    lines.push(__columns(sourcesFolderColumns, this._padding));

    lines.push('\n');
    lines.push('\n');

    let outputFolderLine = __parseHtml(`<bold><yellow>Output folder(s)</yellow></bold>`);
    lines.push(outputFolderLine);

    lines.push('\n');
    lines.push('-'.repeat(this._maxWidth));
    lines.push('\n');
    lines.push('\n');

    const outputFolderColumns = [];
    const outputFolderKeys = Object.keys(CoffeeBuilder.stats.getValue('folders.outputs'));
    const outputFolderColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
    const outputFolderItemsCountByColumn = Math.round(outputFolderKeys.length / outputFolderColumnsCount)

    for (let i = 0; i < outputFolderColumnsCount; i++) {
      let currentColumn = [];
      outputFolderKeys.slice(i * outputFolderItemsCountByColumn, i * outputFolderItemsCountByColumn + outputFolderItemsCountByColumn).forEach((k) => {
        currentColumn.push(__parseHtml(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(CoffeeBuilder.stats.getValue('folders.outputs')[k])}</bold></cyan>`));
      });
      outputFolderColumns.push(currentColumn.join('\n'));
    }
    lines.push(__columns(outputFolderColumns, this._padding));

    return lines;

  }

}

module.exports = CoffeeBuilderUI;