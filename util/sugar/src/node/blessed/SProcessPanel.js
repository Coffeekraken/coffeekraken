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

/**
 * @name                  SProcessPanel
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class is a simple SPanel extended one that accesp an SProcessPanel instance
 * to log the data's from and display an simple UI depending on the SProcessPanel configured keys
 *
 * @param         {SProcessPanel}            process           The SProcessPanel instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SProcessPanel
 *
 * @example         js
 * const SProcessPanel = require('@coffeekraken/sugar/node/terminal/SProcessPanel');
 * const myPanel = new SProcessPanel(myProcess, {
 *    screen: true
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SProcessPanel extends __SComponent {
  /**
   * @name          _process
   * @type          SProcessPanel
   * @private
   *
   * Store the SProcessPanel instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _process = null;

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
  constructor(process, settings = {}) {
    const _settings = __deepMerge({}, settings);
    // extends SPanel
    super(_settings);
    // save the process
    this._process = process;
    // subscribe to the process
    this._subscribeToProcess();
    // generate keys UI
    this._generateUI();
  }

  /**
   * @name                _getBeforeLog
   * @type                Function
   * @private
   *
   * This method return the beforeLog setting to pass to the log method of the SPanel
   *
   * @param         {SCommand}        commandObj         The SCommand instance
   * @return        {String}                          The beforeLog string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getBeforeLog(commandObj) {
    const biggestCommandName = this._process._biggestCommandName;
    return `<${commandObj.color || 'white'}>${' '.repeat(
      biggestCommandName.length - commandObj.name.length
    )}${commandObj.name}</${commandObj.color || 'white'}>`;
  }

  /**
   * @name          _subscribeToProcess
   * @type          Function
   * @private
   *
   * This method simply listen to the process and log the values getted
   * from it into the panel
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _subscribeToProcess() {
    // subscribe to data
    this._process
      .on('start', (data) => {
        this._processes[data.id] = data;
        this.update();
      })
      .on('close', (data) => {
        this._processes[data.id] = {
          ...this._processes[data.id],
          ...data
        };
        this._removeProcessBox(this._processes[data.id]);
        this.update();
      })
      .on('stdout.data', (data) => {
        this._processes[data.id] = {
          ...this._processes[data.id],
          ...data
        };
        this.update();
      })
      .on('stderr.data', (data) => {
        this._processes[data.id] = {
          ...this._processes[data.id],
          ...data
        };
        this.update();
      })
      // subscribe to errors
      .on('error', (data) => {})
      // subscribe to ask
      .on('ask', async (question) => {
        // this._logBox.log(' ');
        // this._logBox.log(`<cyan>${question.question}</cyan>`, {
        //   beforeLog: this._getBeforeLog(question.commandObj)
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
        if (question.type === 'summary') {
          const summary = this.summary(question.commandObj, question.items);
          summary.on('cancel', () => {
            question.reject && question.reject();
          });
          summary.on('resolve', (answer) => {
            question.resolve && question.resolve(answer);
          });
        }
      })
      // subscribe to answer
      .on('answer', (answer) => {
        // console.log(answer);
        // for (let i = 0; i < currentAskLinesCount; i++) {
        //   this._settings.logBox.deleteBottom();
        // }
      })
      // // subscribe to "kill", meaning that a command has just been killed
      // .on('kill', (data) => {
      //   this._logBox.log(
      //     `<magenta>The command "${data.commandObj.name}" has just been killed</magenta>`,
      //     {
      //       beforeLog: this._getBeforeLog(data.commandObj)
      //     }
      //   );
      //   this._updateKeysBox();
      // })
      // .on('watch.new', (data) => {
      //   this._logBox.log(
      //     `A new file has been detected at <yellow>${data.path}</yellow>`,
      //     {
      //       beforeLog: this._getBeforeLog(data.commandObj)
      //     }
      //   );
      // })
      // .on('watch.update', (data) => {
      //   this._logBox.log(
      //     `A file has been updated at <yellow>${data.path}</yellow>`,
      //     {
      //       beforeLog: this._getBeforeLog(data.commandObj)
      //     }
      //   );
      // })
      // .on('watch.delete', (data) => {
      //   this._logBox.log(
      //     `A file has been deleted at <yellow>${data.path}</yellow>`,
      //     {
      //       beforeLog: this._getBeforeLog(data.commandObj)
      //     }
      //   );
      // })
      // .on('key.toggle', () => {
      //   this._updateKeysBox();
      // })
      // .on('key.action', (keyObj) => {
      //   switch (keyObj.action) {
      //     case 'clear':
      //       this._logBox.setContent('');
      //       this.update();
      //       break;
      //   }
      // })
      // // subscribe to "success", meaning that a command is just finished
      // .on('success', (data) => {
      //   this._logBox.log(
      //     `<green>The "${
      //       data.commandObj.name
      //     }" command has finished successfuly in <yellow>${__convert(
      //       data.duration,
      //       's'
      //     )}s</yellow></green>`,
      //     {
      //       beforeLog: this._getBeforeLog(data.commandObj)
      //     }
      //   );
      //   this._updateKeysBox();
      // })
      .on('close', (data) => {
        this._updateKeysBox();
      })
      .catch((e) => {
        this._logBox.log(' ');
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
        // commandObj._panel.box.detach();
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

  /**
   * @name          _updateKeysBox
   * @type          Function
   * @private
   *
   * This method simply generate all the keys buttons and update the keysBox
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateKeysBox() {
    setTimeout(() => {
      const items = [];
      let currentLeft = 0;

      // keys
      const keys = this._process.keys;

      // loop on all the keys
      Object.keys(keys).forEach((keyName) => {
        const keyObj = keys[keyName];
        const settings = {
          padding: {
            top: 0,
            bottom: 0,
            left: 1,
            right: 1
          }
        };
        switch (keyObj.type) {
          case 'toggle':
            settings.style = {
              bg: keyObj.value
                ? __color('terminal.green').toString()
                : __color('terminal.red').toString(),
              fg: __color('terminal.black').toString()
            };
            break;
          case 'run':
            settings.style = {
              bg: keyObj._isRunning
                ? __color('terminal.green').toString()
                : __color('terminal.black').toString(),
              fg: keyObj._isRunning
                ? __color('terminal.black').toString()
                : __color('terminal.white').toString()
            };
            break;
          case 'action':
            settings.style = {
              bg: __color('terminal.white').toString(),
              fg: __color('terminal.black').toString()
            };
            break;
        }
        const content = `${keyObj.text || keyObj.menu}(${keyObj.key})`;
        const item = __blessed.box({
          ...settings,
          left: currentLeft,
          width:
            content.length + settings.padding.left + settings.padding.right,
          content
        });
        currentLeft += item.width;

        items.push(item);
      });
      items.forEach((item) => {
        this._keysBox.append(item);
      });
    });
  }

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

    // init the blessed box that will display the keys
    this._keysBox = __blessed.box({
      right: 0,
      height: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1,
      style: {
        bg: __color('terminal.white').toString(),
        fg: __color('terminal.black').toString()
      }
    });

    this.append(this._logBox);
    this.append(this._keysBox);

    // update the keysBox
    this._updateKeysBox();
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
    Object.keys(this._process.commands).forEach((commandName) => {
      const commandObj = this._process.commands[commandName];

      // check if we have already a processBox for this process
      if (!commandObj._panel) {
        commandObj._panel = {};
        commandObj._panel.box = __blessed.box({
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
        commandObj._panel.logBox = __blessed.box({
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

        commandObj._panel.opened = null;
        commandObj._panel.box.on('click', () => {
          if (commandObj._panel.opened === null) {
            commandObj._panel.opened = true;
          } else {
            commandObj._panel.opened = !commandObj._panel.opened;
          }
          this.update();
        });

        commandObj._panel.spinner = {
          ora: __ora({
            text: __parseHtml(commandObj.title || commandObj.name),
            color: 'black'
          })
        };

        commandObj._panel.box.append(commandObj._panel.logBox);

        // setTimeout(() => {
        //   commandObj._panel.logBox.pushLine('Process starting up...');
        // });

        // append it in the logBox
        this._logBox.append(commandObj._panel.box);
      }

      let boxTitle = `<bold>${commandObj.title || commandObj.name}</bold>`;
      if (commandObj.lastProcessObj.duration) {
        boxTitle += ` <italic>${
          commandObj.lastProcessObj.duration / 1000
        }s</italic>`;
      }

      if (commandObj.lastProcessObj.state === 'error') {
        commandObj._panel.box.style.bg = __color('terminal.red').toString();
        clearInterval(commandObj._panel.spinner.interval);
        commandObj._panel.box.setContent(
          __parseHtml(`<iCross/>  ${boxTitle} (error)`)
        );
        commandObj._panel.box.screen.render();
      } else if (commandObj.lastProcessObj.state === 'success') {
        commandObj._panel.box.style.bg = __color('terminal.green').toString();
        clearInterval(commandObj._panel.spinner.interval);
        commandObj._panel.box.setContent(
          __parseHtml(`<iCheck/>  ${boxTitle} (success)`)
        );
        commandObj._panel.box.screen.render();
      } else if (commandObj.lastProcessObj.state === 'running') {
        clearInterval(commandObj._panel.spinner.interval);
        commandObj._panel.spinner.interval = setInterval(() => {
          commandObj._panel.spinner.ora.text = __parseHtml(
            `${boxTitle} (running)`
          );
          commandObj._panel.box.setContent(
            commandObj._panel.spinner.ora.frame()
          );
          commandObj._panel.box.screen.render();
        }, 50);
      } else if (commandObj.lastProcessObj.state === 'watching') {
        commandObj._panel.box.style.bg = __color('terminal.yellow').toString();
        clearInterval(commandObj._panel.spinner.interval);
        commandObj._panel.spinner.interval = setInterval(() => {
          commandObj._panel.spinner.ora.text = __parseHtml(
            `${boxTitle} (watching)`
          );
          commandObj._panel.box.setContent(
            commandObj._panel.spinner.ora.frame()
          );
          commandObj._panel.box.screen.render();
        }, 50);
      } else {
        commandObj._panel.box.style.bg = commandObj.color || 'white';
        commandObj._panel.box.setContent(
          __parseHtml(`<iStart/>  ${boxTitle} (idle)`)
        );
        commandObj._panel.box.screen.render();
      }
    });
  }

  /**
   * @name              _updateCommandBoxesLayout
   * @type              Function
   * @private
   *
   * This method take all the current commandObj available and set the layout correctly depending
   * on how many they are, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateCommandBoxesLayout() {
    let currentTop = 0;
    const commandNames = Object.keys(this._process.commands);

    commandNames.forEach((commandName, i) => {
      const commandObj = this._process.commands[commandName];

      let layout = 'default';
      if (commandNames.length === 2) layout = 'two';
      if (commandNames.length === 3) layout = 'three';
      if (commandNames.length === 4) layout = 'four';
      if (commandNames.length === 5) layout = 'five';
      if (commandNames.length === 6) layout = 'six';
      if (commandNames.length === 7) layout = 'seven';

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

      commandObj._panel.box.width = width;
      commandObj._panel.box.height = height;
      commandObj._panel.box.top = top;
      commandObj._panel.box.left = left;
      commandObj._panel.box.right = right;
      commandObj._panel.box.bottom = bottom;
      // delete commandObj._panel.box.width;
      // delete commandObj._panel.box.height;

      // commandObj._panel.box.height =
      //   commandObj._panel.box.padding.top +
      //   commandObj._panel.box.padding.bottom +
      //   1 +
      //   commandObj._panel.logBox.height;

      // // take care of the content of the processBox
      // commandObj._panel.logBox.setContent('');
      // if (commandObj.lastProcessObj.stderr.length) {
      //   commandObj.lastProcessObj.stderr.forEach((logItem) => {
      //     commandObj._panel.logBox.pushLine(logItem.value || logItem);
      //   });
      // } else {
      //   commandObj.lastProcessObj.stdout.forEach((logItem) => {
      //     commandObj._panel.logBox.pushLine(logItem.value || logItem);
      //   });
      // }

      // let logHeight = 3;
      // let processHeight = 3;
      // if (commandObj._panel.opened === null) {
      //   // log box height
      //   // if (!processObj.stdout.length) logHeight = 0;
      //   if (commandObj.lastProcessObj.end && !commandObj.lastProcessObj.error)
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
      // } else if (commandObj._panel.opened) {
      //   logHeight = commandObj._panel.logBox.getContent().split('\n').length;
      //   processHeight = logHeight + 4;
      // } else if (!commandObj._panel.opened) {
      //   logHeight = 0;
      //   processHeight = 3;
      // }

      // commandObj._panel.box.height = processHeight;
      // commandObj._panel.logBox.height = logHeight;
      // commandObj._panel.logBox.setScrollPerc(100);

      // commandObj._panel.box.top = currentTop;

      // currentTop += commandObj._panel.box.height + 1;
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

    this._updateKeysBox();

    super.update();
  }
};
