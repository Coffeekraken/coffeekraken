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
const __transitionObjectProperties = require('../transition/objectProperties');

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

    this._panelObjects = new Map();

    // check if the commands parameter is a string, meaning that we have to
    // ask the SCommand static "getCommands" method for the corresponding command instances
    if (typeof commands === 'string') {
      this._commands = __SCommand.getCommandsByNamespace(commands);
    } else if (Array.isArray(commands)) {
      this._commands = commands;
    } else {
      throw new Error(
        `It seems that the passed "commands" argument of the SCommandPanel class is not either an Array of SCommand instances, or a namespace string used to get corresponding commands back...`
      );
    }

    // generate the panel object for each commands
    this._commands.forEach((commandInstance) => {
      this._panelObjects.set(commandInstance, {});
    });

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
        this.update();
      })
      .on('stderr.data', (data) => {
        this.update();
      })
      .on('kill', (data) => {})
      // subscribe to errors
      .on('error', (data) => {})
      // subscribe to ask
      .on('ask', async (question) => {
        if (question.type === 'summary') {
          const summary = this.summary(
            question.commandInstance,
            question.items
          );
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
        // panel.box.detach();
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
  summary(commandInstance, items) {
    const summaryListPopup = __summaryListPopup({
      title: `Run command <bgBlack><bold><primary> ${commandInstance.name} </primary></bold></bgBlack> | Are these properties ok?`,
      description: `<bold><cyan>${commandInstance.command}</cyan></bold>`,
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
        ch: ' ',
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
      const lastProcessObj = commandInstance.lastProcessObj;
      let panelObj = this._panelObjects.get(commandInstance);

      // check if we have already a processBox for this process
      if (!Object.keys(panelObj).length) {
        panelObj.box = __blessed.box({
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
          tags: true,
          top: 0,
          left: 0,
          right: 0,
          clickable: true
        });
        panelObj.logBox = __blessed.box({
          // width: '100%-4',
          height: 0,
          top: 2,
          left: 0,
          right: 0,
          style: {
            fg: 'white'
          },
          mouse: true,
          keys: true,
          clickable: false,
          scrollable: true,
          scrollbar: {
            ch: ' ',
            inverse: true
          },
          style: {
            scrollbar: {
              bg: __color('terminal.primary').toString()
            }
          },
          padding: {
            top: 1,
            left: 2,
            right: 2,
            bottom: 1
          }
        });
        panelObj.actionBox = __blessed.box({
          top: 0,
          right: 0,
          width: 'shrink',
          height: 1,
          style: {}
        });
        panelObj.headerBox = __blessed.box({
          top: -1,
          left: 0,
          right: 0,
          height: 3,
          style: {
            bg: -1,
            fg: -1
          },
          padding: {
            top: 1
          }
        });

        panelObj.opened = null;
        let doubleClick = false;

        panelObj.headerBox.on('click', (mouse) => {
          if (doubleClick === false) {
            doubleClick = true;
            setTimeout(() => {
              doubleClick = false;
            }, 500);
            return;
          }

          if (panelObj.opened === null) {
            panelObj.opened = true;
            this._openCommandBox(commandInstance);
          } else {
            panelObj.opened = !panelObj.opened;
            if (panelObj.opened) {
              this._openCommandBox(commandInstance);
            } else {
              this._closePanelBox(commandInstance);
            }
          }
          this.update();
        });

        panelObj.spinner = {
          ora: __ora({
            text: __parseHtml(commandInstance.title || commandInstance.name),
            color: 'black'
          })
        };

        panelObj.box.append(panelObj.headerBox);
        panelObj.box.append(panelObj.actionBox);
        panelObj.box.append(panelObj.logBox);

        // append it in the logBox
        this._logBox.append(panelObj.box);
      }

      let boxTitle = `<bold>${
        commandInstance.title || commandInstance.name
      }</bold>`;
      if (lastProcessObj && lastProcessObj.duration) {
        boxTitle += ` <italic>${lastProcessObj.duration / 1000}s</italic>`;
      }

      if (
        lastProcessObj &&
        (lastProcessObj.state === 'error' || lastProcessObj.state === 'killed')
      ) {
        panelObj.box.style.bg = __color('terminal.red').toString();
        clearInterval(panelObj.spinner.interval);
        panelObj.headerBox.setContent(
          __parseHtml(`<iCross/>  ${boxTitle} (${lastProcessObj.state})`)
        );
        panelObj.box.screen.render();
      } else if (lastProcessObj && lastProcessObj.state === 'success') {
        panelObj.box.style.bg = __color('terminal.green').toString();
        clearInterval(panelObj.spinner.interval);
        panelObj.headerBox.setContent(__parseHtml(`<iCheck/>  ${boxTitle}`));
        panelObj.box.screen.render();
      } else if (lastProcessObj && lastProcessObj.state === 'running') {
        panelObj.box.style.bg = __color('terminal.cyan').toString();
        clearInterval(panelObj.spinner.interval);
        panelObj.spinner.interval = setInterval(() => {
          panelObj.spinner.ora.text = __parseHtml(`${boxTitle}`);
          panelObj.headerBox.setContent(panelObj.spinner.ora.frame());
          panelObj.box.screen.render();
        }, 50);
      } else if (lastProcessObj && lastProcessObj.state === 'watching') {
        panelObj.box.style.bg = __color('terminal.yellow').toString();
        clearInterval(panelObj.spinner.interval);
        panelObj.spinner.interval = setInterval(() => {
          panelObj.spinner.ora.text = __parseHtml(`${boxTitle} (watching)`);
          panelObj.headerBox.setContent(panelObj.spinner.ora.frame());
          panelObj.box.screen.render();
        }, 50);
      } else {
        panelObj.box.style.bg = commandInstance.color || 'white';
        panelObj.headerBox.setContent(
          __parseHtml(`<iStart/>  ${boxTitle} (idle)`)
        );
        panelObj.box.screen.render();
      }

      if (commandInstance.key) {
        panelObj.actionBox.setContent(`(${commandInstance.key})`);
        panelObj.actionBox.style.bg = panelObj.box.style.bg;
        panelObj.actionBox.style.fg = panelObj.box.style.fg;
      }

      panelObj.headerBox.style.bg = panelObj.box.style.bg;
      panelObj.headerBox.style.fg = panelObj.box.style.fg;

      panelObj.logBox.top = 2;
      panelObj.logBox.left = 0;
      panelObj.logBox.width = '100%-4';
      panelObj.logBox.height = '100%-4';
    });
  }

  /**
   * @name              _openCommandBox
   * @type              Function
   * @private
   *
   * This method simply open the passed panel box by animating the transition state
   *
   * @param       {SCommand}        commandInstance       The command instance for which you want to open the box
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _openCommandBox(commandInstance) {
    const panelObj = this._panelObjects.get(commandInstance);
    if (panelObj._closeTransition) {
      panelObj._closeTransition.cancel();
      delete panelObj._closeTransition;
    }
    if (panelObj._openTransition) return;
    panelObj.box.setFront();
    panelObj._closedBoxStateObj = {
      width: panelObj.box.width,
      height: panelObj.box.height,
      top: panelObj.box.top,
      left: panelObj.box.left,
      right: panelObj.box.right,
      bottom: panelObj.box.bottom
    };
    panelObj._openTransition = __transitionObjectProperties(
      panelObj._closedBoxStateObj,
      {
        width: panelObj.box.parent.width,
        height: panelObj.box.parent.height,
        top: panelObj.box.parent.top,
        left: panelObj.box.parent.left,
        right: panelObj.box.parent.right,
        bottom: panelObj.box.parent.bottom
      },
      {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }
    )
      .on('step', (stepObj) => {
        Object.assign(panelObj.box, stepObj);
        panelObj.box.screen.render();
      })
      .on('resolve', () => {
        delete panelObj._openTransition;
      });
  }

  /**
   * @name              _closePanelBox
   * @type              Function
   * @private
   *
   * This method simply open the passed panel box by animating the transition state
   *
   * @param       {SCommand}        commandInstance       The panel that store the box to animate
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _closePanelBox(commandInstance) {
    const panelObj = this._panelObjects.get(commandInstance);
    if (panelObj._openTransition) {
      panelObj._openTransition.cancel();
      delete panelObj._openTransition;
    }
    if (panelObj._closeTransition) return;
    panelObj._closeTransition = __transitionObjectProperties(
      {
        width: panelObj.box.width,
        height: panelObj.box.height,
        top: panelObj.box.top,
        left: panelObj.box.left,
        right: panelObj.box.right,
        bottom: panelObj.box.bottom
      },
      panelObj._closedBoxStateObj,
      {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }
    )
      .on('step', (stepObj) => {
        Object.assign(panelObj.box, stepObj);
        panelObj.box.screen.render();
      })
      .on('resolve', () => {
        delete panelObj._closeTransition;
        delete panelObj._closedBoxStateObj;
      });
  }

  /**
   * @name              _updateCommandBoxesContent
   * @type              Function
   * @private
   *
   * This method take all the current commandInstance available and set the layout correctly depending
   * on how many they are, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateCommandBoxesContent() {
    this._commands.forEach((commandInstance, i) => {
      const panelObj = this._panelObjects.get(commandInstance);
      const lastProcessObj = commandInstance.lastProcessObj;

      if (
        lastProcessObj &&
        (lastProcessObj.state === 'error' || lastProcessObj.state === 'killed')
      ) {
        panelObj.logBox.setContent(
          __parseHtml(`<red>The process has been killed...</red>`)
        );
      } else {
        // take care of the content of the processBox
        panelObj.logBox.setContent('');
        if (lastProcessObj && lastProcessObj.stderr.length) {
          lastProcessObj.stderr.forEach((logItem) => {
            panelObj.logBox.pushLine(logItem.value || logItem);
          });
        } else if (lastProcessObj) {
          lastProcessObj.stdout.forEach((logItem) => {
            panelObj.logBox.pushLine(logItem.value || logItem);
          });
        }
      }

      // scroll logBox
      panelObj.logBox.setScrollPerc(100);
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
      const panelObj = this._panelObjects.get(commandInstance);
      const lastProcessObj = commandInstance.lastProcessObj;
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
          break;
        case 'three':
          if (i === 0 || i === 1) {
            width = '50%-1';
            height = '50%';
            top = 0;
            left = i === 0 ? 0 : '50%+1';
            right = i === 0 ? '50%+1' : 0;
            bottom = 0;
          } else {
            top = '50%+1';
            // height = '50%';
            width = '100%';
            left = 0;
            right = 0;
            bottom = 0;
          }
          break;
        case 'four':
          if (i === 0 || i === 1) {
            width = '50%-1';
            height = '50%';
            top = 0;
            left = i === 0 ? 0 : '50%+1';
            right = i === 0 ? '50%+1' : 0;
          } else {
            top = '50%+1';
            // height = '50%';
            width = '50%-1';
            left = i === 2 ? 0 : '50%+1';
            right = i === 2 ? '50%+1' : 0;
            bottom = 0;
          }
          break;
        case 'five':
          if (i === 0 || i === 1 || i === 2) {
            width = i === 1 ? '33%-1' : '33%';
            height = '50%';
            top = 0;
            left = i * 33 + `%${i === 1 ? '+2' : i === 2 ? '+3' : ''}`;
            // right = i === 0 ? '50%+1' : 0;
          } else {
            width = '50%-1';
            // height = '50%';
            top = '50%+1';
            left = i === 3 ? 0 : '50%+1';
            right = i === 3 ? '50%+1' : 0;
          }
          break;
        case 'six':
          if (i === 0 || i === 1 || i === 2) {
            width = i === 1 ? '33%-1' : '33%';
            height = '50%';
            top = 0;
            left = i * 33 + `%${i === 1 ? '+2' : i === 2 ? '+3' : ''}`;
            // right = i === 0 ? '50%+1' : 0;
          } else {
            width = i === 4 ? '33%-1' : '33%';
            // height = '50%';
            top = '50%+1';
            left = (i - 3) * 33 + `%${i === 4 ? '+2' : i === 5 ? '+3' : ''}`;
            // left = i === 3 ? 0 : '50%+1';
            // right = i === 3 ? '50%+1' : 0;
          }
          break;
        case 'seven':
          if (i === 0 || i === 1 || i === 2 || i === 3) {
            width = '25%';
            height = '50%';
            top = 0;
            left =
              i * 25 +
              `%${i === 1 ? '+2' : i === 2 ? '+3' : i === 3 ? '+5' : ''}`;
            // right = i === 0 ? '50%+1' : 0;
          } else {
            width = i === 5 ? '33%-1' : '33%';
            // height = '50%';
            top = '50%+1';
            left = (i - 4) * 33 + `%${i === 5 ? '+2' : i === 6 ? '+3' : ''}`;
            // left = i === 3 ? 0 : '50%+1';
            // right = i === 3 ? '50%+1' : 0;
          }
          break;
      }

      panelObj.box.width = width;
      panelObj.box.height = height;
      panelObj.box.top = top;
      panelObj.box.left = left;
      panelObj.box.right = right;
      panelObj.box.bottom = bottom;
      // delete panelObj.box.width;
      // delete panelObj.box.height;

      if (panelObj.opened && !panelObj._openTransition) {
        panelObj.box.setFront();
        panelObj.box.width = '100%';
        panelObj.box.height = '100%';
        panelObj.box.left = 0;
        panelObj.box.top = 0;
        panelObj.box.right = 0;
        panelObj.box.bottom = 0;
      }
    });

    this._logBox.setScrollPerc(100);
  }

  update() {
    // init and update command boxes
    this._updateCommandBoxesStyle();

    // update the layout
    this._updateCommandBoxesLayout();

    // update the content
    this._updateCommandBoxesContent();

    // this._updateKeysBox();

    super.update();
  }
};
