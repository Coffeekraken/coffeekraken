const __SLogPanel = require('./SLogPanel');
const __convert = require('../time/convert');
const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../color/color');
const __SComponent = require('./SComponent');
const __SCenteredPopup = require('./SCenteredPopup');
const __SSummaryList = require('./SSummaryList');
const __summaryListPopup = require('./summaryListPopup');
const __ora = require('ora');
const __parseHtml = require('../terminal/parseHtml');
const __isOdd = require('../is/odd');
const __SPromise = require('../promise/SPromise');
const __SCommand = require('../terminal/SCommand');

/**
 * @name                  SCommandPanel
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class is a simple SPanel extended one that accesp an SCommandPanel instance
 * to log the data's from and display an simple UI depending on the SCommandPanel configured keys
 *
 * @param         {SCommandPanel}            process           The SCommandPanel instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SCommandPanel
 *
 * @example         js
 * const SCommandPanel = require('@coffeekraken/sugar/node/terminal/SCommandPanel');
 * const myPanel = new SCommandPanel(myProcess, {
 *    screen: true
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCommandPanel extends __SComponent {
  /**
   * @name          _commands
   * @type          Array|String
   * @private
   *
   * Store the passed "commands" parameter that can be either an Array of SCommands instances,
   * either a namespace string of commands that you want to display
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _commands = null;

  /**
   * @name          _logBox
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the logs will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _logBox = null;

  /**
   * @name          _keysBox
   * @type          blessed.Box
   * @private
   *
   * Store the box where the keys will be generated
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _keysBox = null;

  /**
   * @name            _processes
   * @type            Object
   * @private
   *
   * Store all the running commands
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processes = {};

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(commands, settings = {}) {
    const _settings = __deepMerge({}, settings);
    // extends SPanel
    super(_settings);
    // // subscribe to the process
    // this._subscribeToProcess();
    // // generate keys UI
    // this._generateUI();

    // check if the commands parameter is a string, meaning that we have to
    // ask the SCommand static "getCommands" method for the corresponding command instances
    if (typeof commands === 'string') {
      this._commands = __SCommand.getCommands(commands);
    } else if (Array.isArray(commands)) {
      this._commands = commands;
    } else {
      throw new Error(
        `It seems that the passed "commands" argument of the SCommandPanel class is not either an Array of SCommand instances, or a namespace string used to get corresponding commands back...`
      );
    }

    // pipe all commands "events" to the _sPromise internal promise
    this._sPromise = new __SPromise(() => {}).start();
    this._commands.forEach((commandInstance) => {
      __SPromise.pipe(commandInstance, this._sPromise);
    });

    // subscribe to the commands instances
    this._subscribeToCommandsEvents();
    // generate the UI
    this._generateUI();
  }

  /**
   * @name          _subscribeToCommandsEvents
   * @type          Function
   * @private
   *
   * This method subscribe to the commands events to make corresponding action like log, etc...
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _subscribeToCommandsEvents() {
    // subscribe to data
    this._sPromise
      .on('start', (data) => {
        this.update();
      })
      .on('close', (data) => {
        this.update();
      })
      .on('stdout.data', (data) => {
        console.log(data);
        this.update();
      })
      .on('stderr.data', (data) => {
        this.update();
      })
      // subscribe to errors
      .on('error', (data) => {
        console.log('error', data);
      })
      // subscribe to ask
      .on('ask', async (question) => {
        // this._logBox.log(' ');
        // this._logBox.log(`<cyan>${question.question}</cyan>`, {
        //   beforeLog: this._getBeforeLog(question.commandInstance)
        // });
        // if (question.type === 'input') {
        //   const input = this.input({
        //     placeholder: question.default
        //   });
        //   input.promise.on('cancel', () => {
        //     question.reject && question.reject();
        //   });
        //   input.promise.on('resolve', (answer) => {
        //     question.resolve && question.resolve(answer);
        //   });
        // } else
        // if (question.type === 'summary') {
        //   const summary = this.summary(question.commandInstance, question.items);
        //   summary.on('cancel', () => {
        //     question.reject && question.reject();
        //   });
        //   summary.on('resolve', (answer) => {
        //     question.resolve && question.resolve(answer);
        //   });
        // }
      })
      // subscribe to answer
      .on('answer', (answer) => {
        // console.log(answer);
        // for (let i = 0; i < currentAskLinesCount; i++) {
        //   this._settings.logBox.deleteBottom();
        // }
      });
  }

  /**
   * @name          _removeProcessBox
   * @type          Function
   * @private
   *
   * This method take care of removing properly the box of the passed process object
   *
   * @param       {Object}      processObj        The process object to remove the box from
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _removeProcessBox(processObj) {
    if (!processObj.error) {
      setTimeout(() => {
        // commandInstance._panel.box.detach();
        clearInterval(processObj.spinner.interval);
        // delete this._processes[processObj.id];
        this.update();
      }, 4000);
    }
  }

  /**
   * @name          summary
   * @type          Function
   *
   * This method display a summary list to the user with the possibility to update
   * each data and validate
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  summary(command, items) {
    const summaryListPopup = __summaryListPopup({
      title: `Run command <bgBlack><bold><primary> ${command.name} </primary></bold></bgBlack> | Are these properties ok?`,
      description: `<bold><cyan>${command.command}</cyan></bold>`,
      items
    });
    summaryListPopup.attachTo(this);
    return summaryListPopup;
  }

  // /**
  //  * @name          _updateKeysBox
  //  * @type          Function
  //  * @private
  //  *
  //  * This method simply generate all the keys buttons and update the keysBox
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // _updateKeysBox() {
  //   setTimeout(() => {
  //     const items = [];
  //     let currentLeft = 0;

  //     // keys
  //     const keys = this._process.keys;

  //     // loop on all the keys
  //     Object.keys(keys).forEach((keyName) => {
  //       const keyObj = keys[keyName];
  //       const settings = {
  //         padding: {
  //           top: 0,
  //           bottom: 0,
  //           left: 1,
  //           right: 1
  //         }
  //       };
  //       switch (keyObj.type) {
  //         case 'toggle':
  //           settings.style = {
  //             bg: keyObj.value
  //               ? __color('terminal.green').toString()
  //               : __color('terminal.red').toString(),
  //             fg: __color('terminal.black').toString()
  //           };
  //           break;
  //         case 'run':
  //           settings.style = {
  //             bg: keyObj._isRunning
  //               ? __color('terminal.green').toString()
  //               : __color('terminal.black').toString(),
  //             fg: keyObj._isRunning
  //               ? __color('terminal.black').toString()
  //               : __color('terminal.white').toString()
  //           };
  //           break;
  //         case 'action':
  //           settings.style = {
  //             bg: __color('terminal.white').toString(),
  //             fg: __color('terminal.black').toString()
  //           };
  //           break;
  //       }
  //       const content = `${keyObj.text || keyObj.menu}(${keyObj.key})`;
  //       const item = __blessed.box({
  //         ...settings,
  //         left: currentLeft,
  //         width:
  //           content.length + settings.padding.left + settings.padding.right,
  //         content
  //       });
  //       currentLeft += item.width;

  //       items.push(item);
  //     });
  //     items.forEach((item) => {
  //       this._keysBox.append(item);
  //     });
  //   });
  // }

  /**
   * @name          _generateUI
   * @type          Function
   * @private
   *
   * This method take the registered keys in the process and generate a nice and clean UI for it
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _generateUI() {
    this._logBox = __blessed.box({
      width: '100%+1',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      style: {
        fg: 'white',
        bg: 'red'
      },
      mouse: true,
      keys: true,
      scrollable: true,
      scrollbar: {
        ch: '#',
        inverse: true
      },
      style: {
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });

    // // init the blessed box that will display the keys
    // this._keysBox = __blessed.box({
    //   right: 0,
    //   height: 0,
    //   bottom: 0,
    //   left: 0,
    //   width: '100%',
    //   height: 1,
    //   style: {
    //     bg: __color('terminal.white').toString(),
    //     fg: __color('terminal.black').toString()
    //   }
    // });

    this.append(this._logBox);
    // this.append(this._keysBox);

    // update the keysBox
    // this._updateKeysBox();
  }

  /**
   * @name            _updateCommandBoxesStyle
   * @type            Function
   * @private
   *
   * This method handle the display of a command box depending on his state, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateCommandBoxesStyle() {
    this._commands.forEach((commandInstance) => {
      // check if we have already a processBox for this process
      if (!commandInstance._panel) {
        commandInstance._panel = {};
        commandInstance._panel.box = __blessed.box({
          height: 3,
          style: {
            bg: __color('terminal.primary').toString(),
            fg: __color('terminal.black').toString()
          },
          padding: {
            top: 1,
            left: 2,
            right: 2,
            bottom: 1
          },
          mouse: true,
          keys: true,
          top: 0,
          left: 0,
          right: 0,
          clickable: true
        });
        commandInstance._panel.logBox = __blessed.box({
          // width: '100%-4',
          height: 0,
          top: 2,
          left: 0,
          right: 0,
          style: {
            fg: 'white'
          },
          // mouse: true,
          // keys: true,
          scrollable: true,
          // scrollbar: {
          //   ch: ' ',
          //   inverse: true
          // },
          style: {
            // scrollbar: {
            //   bg: __color('terminal.primary').toString()
            // }
          },
          padding: {
            top: 1,
            left: 2,
            right: 2,
            bottom: 1
          }
        });

        commandInstance._panel.opened = null;
        commandInstance._panel.box.on('click', () => {
          if (commandInstance._panel.opened === null) {
            commandInstance._panel.opened = true;
          } else {
            commandInstance._panel.opened = !commandInstance._panel.opened;
          }
          this.update();
        });

        commandInstance._panel.spinner = {
          ora: __ora({
            text: __parseHtml(commandInstance.title || commandInstance.name),
            color: 'black'
          })
        };

        commandInstance._panel.box.append(commandInstance._panel.logBox);

        // setTimeout(() => {
        //   commandInstance._panel.logBox.pushLine('Process starting up...');
        // });

        // append it in the logBox
        this._logBox.append(commandInstance._panel.box);
      }

      let boxTitle = `<bold>${
        commandInstance.title || commandInstance.name
      }</bold>`;
      if (commandInstance.lastProcessObj.duration) {
        boxTitle += ` <italic>${
          commandInstance.lastProcessObj.duration / 1000
        }s</italic>`;
      }

      if (commandInstance.lastProcessObj.state === 'error') {
        commandInstance._panel.box.style.bg = __color(
          'terminal.red'
        ).toString();
        clearInterval(commandInstance._panel.spinner.interval);
        commandInstance._panel.box.setContent(
          __parseHtml(`<iCross/>  ${boxTitle} (error)`)
        );
        commandInstance._panel.box.screen.render();
      } else if (commandInstance.lastProcessObj.state === 'success') {
        commandInstance._panel.box.style.bg = __color(
          'terminal.green'
        ).toString();
        clearInterval(commandInstance._panel.spinner.interval);
        commandInstance._panel.box.setContent(
          __parseHtml(`<iCheck/>  ${boxTitle} (success)`)
        );
        commandInstance._panel.box.screen.render();
      } else if (commandInstance.lastProcessObj.state === 'running') {
        clearInterval(commandInstance._panel.spinner.interval);
        commandInstance._panel.spinner.interval = setInterval(() => {
          commandInstance._panel.spinner.ora.text = __parseHtml(
            `${boxTitle} (running)`
          );
          commandInstance._panel.box.setContent(
            commandInstance._panel.spinner.ora.frame()
          );
          commandInstance._panel.box.screen.render();
        }, 50);
      } else if (commandInstance.lastProcessObj.state === 'watching') {
        commandInstance._panel.box.style.bg = __color(
          'terminal.yellow'
        ).toString();
        clearInterval(commandInstance._panel.spinner.interval);
        commandInstance._panel.spinner.interval = setInterval(() => {
          commandInstance._panel.spinner.ora.text = __parseHtml(
            `${boxTitle} (watching)`
          );
          commandInstance._panel.box.setContent(
            commandInstance._panel.spinner.ora.frame()
          );
          commandInstance._panel.box.screen.render();
        }, 50);
      } else {
        commandInstance._panel.box.style.bg = commandInstance.color || 'white';
        commandInstance._panel.box.setContent(
          __parseHtml(`<iStart/>  ${boxTitle} (idle)`)
        );
        commandInstance._panel.box.screen.render();
      }

      commandInstance._panel.logBox.top = 2;
      commandInstance._panel.logBox.left = 0;
      commandInstance._panel.logBox.width = '100%-4';
      commandInstance._panel.logBox.height = '100%-4';
    });
  }

  /**
   * @name              _updateCommandBoxesLayout
   * @type              Function
   * @private
   *
   * This method take all the current commandInstance available and set the layout correctly depending
   * on how many they are, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateCommandBoxesLayout() {
    let currentTop = 0;

    this._commands.forEach((commandInstance, i) => {
      let layout = 'default';
      if (this._commands.length === 2) layout = 'two';
      if (this._commands.length === 3) layout = 'three';
      if (this._commands.length === 4) layout = 'four';
      if (this._commands.length === 5) layout = 'five';
      if (this._commands.length === 6) layout = 'six';
      if (this._commands.length === 7) layout = 'seven';

      let width, height, top, left, right, bottom;

      switch (layout) {
        case 'two':
          width =
            i === 1 && __isOdd(process.stdout.columns) ? '50%-2' : '50%-1';
          height = '100%';
          top = 0;
          left = i === 0 ? 0 : '50%+1';
          right = i === 0 ? '50%+1' : 0;
          bottom = 0;
          this._logBox.scrollable = false;
          break;
      }

      commandInstance._panel.box.width = width;
      commandInstance._panel.box.height = height;
      commandInstance._panel.box.top = top;
      commandInstance._panel.box.left = left;
      commandInstance._panel.box.right = right;
      commandInstance._panel.box.bottom = bottom;
      // delete commandInstance._panel.box.width;
      // delete commandInstance._panel.box.height;

      // commandInstance._panel.box.height =
      //   commandInstance._panel.box.padding.top +
      //   commandInstance._panel.box.padding.bottom +
      //   1 +
      //   commandInstance._panel.logBox.height;

      // take care of the content of the processBox
      commandInstance._panel.logBox.setContent('');
      if (commandInstance.lastProcessObj.stderr.length) {
        commandInstance.lastProcessObj.stderr.forEach((logItem) => {
          commandInstance._panel.logBox.pushLine(logItem.value || logItem);
        });
      } else {
        console.log(commandInstance.lastProcessObj);
        commandInstance.lastProcessObj.stdout.forEach((logItem) => {
          commandInstance._panel.logBox.pushLine(logItem.value || logItem);
        });
      }

      // let logHeight = 3;
      // let processHeight = 3;
      // if (commandInstance._panel.opened === null) {
      //   // log box height
      //   // if (!processObj.stdout.length) logHeight = 0;
      //   if (commandInstance.lastProcessObj.end && !commandInstance.lastProcessObj.error)
      //     logHeight = 0;
      //   // if (processObj.error) logHeight = processObj.stderr.length;
      //   // process box height
      //   if (logHeight === 0) processHeight = 3;
      //   else processHeight = logHeight + 4;

      //   // if (
      //   //   !processObj.stdout.length ||
      //   //   (processObj.end && !processObj.error)
      //   // ) {
      //   //   processHeight = 3;
      //   // } else {
      //   //   processHeight = processObj.logBox.height + 5;
      //   // }
      // } else if (commandInstance._panel.opened) {
      //   logHeight = commandInstance._panel.logBox.getContent().split('\n').length;
      //   processHeight = logHeight + 4;
      // } else if (!commandInstance._panel.opened) {
      //   logHeight = 0;
      //   processHeight = 3;
      // }

      // commandInstance._panel.box.height = processHeight;
      // commandInstance._panel.logBox.height = logHeight;
      // commandInstance._panel.logBox.setScrollPerc(100);

      // commandInstance._panel.box.top = currentTop;

      // currentTop += commandInstance._panel.box.height + 1;
    });

    // this._logBox.setContent('');
    // for (let i = 0; i < currentTop; i++) {
    //   this._logBox.pushLine(' ');
    // }
    this._logBox.setScrollPerc(100);
  }

  update() {
    // init and update command boxes
    this._updateCommandBoxesStyle();

    // update the layout
    this._updateCommandBoxesLayout();

    // this._updateKeysBox();

    super.update();
  }
};
