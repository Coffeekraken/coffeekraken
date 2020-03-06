const __terminalKit = require('terminal-kit').terminal;
const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml');
const __countLine = require('@coffeekraken/sugar/node/terminal/countLine');
const __columns = require('@coffeekraken/sugar/node/terminal/columns');
const __readline = require('readline');
const __asyncForEach = require('@coffeekraken/sugar/js/array/asyncForEach');
const __ora = require('ora');
const __folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
const __formatFileSize = require('@coffeekraken/sugar/node/fs/formatFileSize');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __breakLineDependingOnSidesPadding = require('@coffeekraken/sugar/node/terminal/breakLineDependingOnSidesPadding');

const __packageJson = require('@coffeekraken/coffeebuilder/package.json');

const __coffeeEvents = require('../events');
const __coffeeBuilderApi = require('./CoffeeBuilderApi');

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
    // init terminal-kit
    __terminalKit.grabInput({
      mouse: 'motion',
      // focus: true
    });

    __terminalKit.on('mouse', function (name, data) {
      // console.log("'mouse' event:", name, data);
    });
    // __terminalKit.on('focus', function (name, data) {
    //   console.log("'focus' event:", name, data);
    // });

    this._interface = __readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    process.stdout.on('resize', () => {
      this._padding = process.env.STDOUT_PADDING || 3;
      this._maxWidth = (process.env.STDOUT_COLUMNS || process.stdout.columns) - this._padding * 2;

      this.draw();
    });

    // listen for build events
    this._listenBuildEvents();
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
    __coffeeEvents.on('build', (data) => {
      this.draw();
    });
    __coffeeEvents.on('postBuild', (data) => {
      this.draw();
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
   * 
   * @param           {String}                location              The new location wanted
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  changeLocation(location) {
    // set the new location
    this._location = location;
    // draw the new UI
    this.draw();
  }

  /**
   * @name                  _printLines
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   * @private
   * 
   * Print the array of lines passed as parameters
   * 
   * @param           {Array}               lines             The array of lines to print
   * 
   * 
   */
  _printLines(lines) {
    lines = lines.map((l) => {
      if (l.slice(0, this._padding) === ' '.repeat(this._padding)) return l;
      return ' '.repeat(this._padding) + l;
    });

    this._interface.write(lines.join('') + '\u001B[?25l');
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

    // clear the terminal
    __readline.clearLine(process.stdout, 0);
    for (let i = 0; i < process.stdout.rows; i++) {
      __readline.clearLine(process.stdout, 0);
      __readline.moveCursor(process.stdout, 0, -1);
    }

    // draw the header
    this.drawHeader();

    switch (this._location) {
      case 'home':
        this.drawHome();
        break;
      case 'build':
        this.drawBuild();
        break;
      case 'stats':
        this.drawStats()
        break;
    }

  }

  /**
   * @name                  drawHeader
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   *
   * Draw the header of the UI
   *
   * @return            {Promise}                             A promise resolved when the intereface has been drawed
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawHeader() {
    return new Promise(async (resolve, reject) => {

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

      this._printLines(lines);

    });
  }

  /**
   * @name                  drawHome
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   *
   * Draw the "welcome" interface
   *
   * @return            {Promise}                             A promise resolved when the intereface has been drawed
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawHome() {
    return new Promise(async (resolve, reject) => {

    });
  }

  /**
   * @name                  drawBuild
   * @namespace             terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                  Function
   *
   * Draw the interface depending on the data object passed
   *
   * @return            {Promise}                             A promise resolved when the intereface has been drawed
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawBuild() {
    return new Promise(async (resolve, reject) => {

      if (!__coffeeBuilderApi.stats.build.percentage) __coffeeBuilderApi.stats.build.percentage = 0;

      let { percentage, currentResourcePath, currentProcessor, processedResources, processors } = __coffeeBuilderApi.stats.build;
      const postBuildProcessors = __coffeeBuilderApi.stats.postBuild.processors;
      processors = __deepMerge(processors, postBuildProcessors);

      const postPercentage = __coffeeBuilderApi.stats.postBuild.percentage;

      const watchCompile = this._watchCompile;
      const compileType = watchCompile.length ? watchCompile : __coffeeBuilderApi.config.compile;

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
      __coffeeBuilderApi.config.compile.forEach((compile, i) => {
        if (watchCompile[0] === compile || watchCompile.length === 0) {
          compileLine += `<green>✔ <bold><bgBlack>${compile}</bgBlack></bold></green>  `;
        } else {
          compileLine += `<white>✘ <bold><bgBlack>${compile}</bgBlack></bold></white>  `;
        }
      });

      if (__coffeeBuilderApi.config.watch) {
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

      } else {

        // processed resources
        let processedResourcesLine = `<cyan><bold>${Object.keys(processedResources).length}</bold></cyan> (${compileType.join(',')}) file${Object.keys(processedResources).length > 1 ? 's' : ''} processed`;
        if (__coffeeBuilderApi.stats.build.startTimestamp && __coffeeBuilderApi.stats.build.endTimestamp) {
          processedResourcesLine += ` in <yellow>${new Date(__coffeeBuilderApi.stats.build.endTimestamp - __coffeeBuilderApi.stats.build.startTimestamp).getSeconds()}s</yellow>`;
          if (Object.keys(__coffeeBuilderApi.stats.cache.resources).length > 0) {
            processedResourcesLine += ` / <magenta><bold>${Object.keys(__coffeeBuilderApi.stats.cache.resources).length}</bold></magenta> taken from cache...`;
          }
        }
        lines.push(__parseHtml('<green>✔</green>  ' + processedResourcesLine));

      }

      // lines.push('\n');
      //
      // processedResources.forEach((f) => {
      //   lines.push(f);
      //   lines.push('\n');
      // });
      //
      // lines.push('\n');
      // lines.push('\n');
      //
      // __coffeeBuilderApi.stats.cache.files.forEach((f) => {
      //   lines.push(f);
      //   lines.push('\n');
      // });

      lines.push('\n');
      lines.push('\n');
      lines.push('\n');

      let fileProcessedLine = __parseHtml(`<bold><yellow>Files processed</yellow></bold>`);
      lines.push(fileProcessedLine);
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

      this._printLines(lines);

    });
  }

  /**
   * @name                            drawStats
   * @namespace                       terminal.coffeebuilder.node.classes.CoffeeBuilderUI
   * @type                            Function
   * 
   * Draw the "after build" stats
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  drawStats() {
    return new Promise(async (resolve, reject) => {
      const watchCompile = this._watchCompile;
      const compileTypes = __coffeeBuilderApi.config.compile;
      const sourcesFolderObj = {};
      const outputFolderObj = {};

      let lines = [];

      await __asyncForEach(compileTypes, async (compile) => {
        return new Promise(async (r) => {

          const compileTypeObj = __coffeeBuilderApi.config.resources[compile];

          await __asyncForEach(compileTypeObj.sourcesFolders, (sourcesFolder) => {
            return new Promise(async (resolve, reject) => {

              const folderSize = await __folderSize(sourcesFolder, true);
              sourcesFolderObj[sourcesFolder] = folderSize;
              resolve(folderSize);

            });
          });

          await __asyncForEach(compileTypeObj.outputFolders, (outputFolder) => {
            return new Promise(async (resolve, reject) => {

              const folderSize = await __folderSize(outputFolder, true);
              outputFolderObj[outputFolder] = folderSize;
              resolve(folderSize);

            });
          });

          r();

        });
      });

      const sourcesFolderColumns = [];
      const sourcesFolderKeys = Object.keys(sourcesFolderObj);
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
          currentColumn.push(__parseHtml(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(sourcesFolderObj[k])}</bold></cyan>`));
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
      const outputFolderKeys = Object.keys(outputFolderObj);
      const outputFolderColumnsCount = this._maxWidth > 150 ? 4 : this._maxWidth > 100 ? 3 : 2;
      const outputFolderItemsCountByColumn = Math.round(outputFolderKeys.length / outputFolderColumnsCount)

      for (let i = 0; i < outputFolderColumnsCount; i++) {
        let currentColumn = [];
        outputFolderKeys.slice(i * outputFolderItemsCountByColumn, i * outputFolderItemsCountByColumn + outputFolderItemsCountByColumn).forEach((k) => {
          currentColumn.push(__parseHtml(`<green>✔</green> ${k}: <cyan><bold>${__formatFileSize(outputFolderObj[k])}</bold></cyan>`));
        });
        outputFolderColumns.push(currentColumn.join('\n'));
      }
      lines.push(__columns(outputFolderColumns, this._padding));

      this._printLines(lines);

    });

  }

}

module.exports = new CoffeeBuilderUI();