const __deepMerge = require('../../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../../color/color');
const __SComponent = require('../SComponent');
const __summaryListPopup = require('../list/summaryListPopup');
const __ora = require('ora');
const __parseHtml = require('../../terminal/parseHtml');
const __isOdd = require('../../is/odd');
const __SPromise = require('../../promise/SPromise');
const __SCommand = require('../../terminal/SCommand');
const __transitionObjectProperties = require('../../transition/objectProperties');
const __SPopup = require('../../blessed/popup/SPopup');
const __hotkey = require('../../keyboard/hotkey');
const __SInputPopup = require('../popup/SInputPopup');

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
   * @name          $log
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the logs will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $log = null;

  /**
   * @name          $namespace
   * @type          blessed.box
   * @private
   *
   * Store the "namespace" panel that display which is the current namespace displayed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $namespace = null;

  /**
   * @name          _namespace
   * @type          String
   * @private
   *
   * Store the current displayed namespace
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _namespace = null;

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

    this._boxesObjectsMap = new Map();

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
      this._boxesObjectsMap.set(commandInstance, {});
    });

    // pipe all commands "events" to the _sPromise internal promise
    this._sPromise = new __SPromise(() => {}).start();
    this._commands.forEach((commandInstance) => {
      __SPromise.pipe(commandInstance, this._sPromise);
    });

    this.promise = new __SPromise(() => {});

    // subscribe to the commands instances
    this._subscribeToCommandsEvents();

    // init filter popup
    this._initFilterPopup();

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
   * @name        _initFilterPopup
   * @type        Function
   * @private
   *
   * This method initialize the filter popup
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initFilterPopup() {
    let inputPopup;
    __hotkey('shift+n', {
      active: () => {
        return this.parent !== null;
      }
    }).on('press', () => {
      if (inputPopup && inputPopup.parent) return;
      inputPopup = new __SInputPopup({
        id: 'filterCommandsByNamespace',
        title: 'Filter commands by namespace',
        $input: {
          placeholder: this._namespace
        }
      });
      inputPopup.promise.on('resolve', (value) => {
        // change page
        // emit an event
        this.promise.trigger('namespace', value);
        // this.filterByNamespace(value);
      });
      this.append(inputPopup);
    });
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

  /**
   * @name              filterByNamespace
   * @type              Function
   *
   * This method simply takes a namespae and filter the displayed commands
   *
   * @param     {String}        namespace         The namespace to apply
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  filterByNamespace(namespace) {
    setTimeout(() => {
      // get the commands to display using the passed namespace
      const filteredCommandsInstances = __SCommand.getCommandsByNamespace(
        `+(${namespace}|${namespace}.**)`
      );

      // check if we have some commands to display
      if (!filteredCommandsInstances.length) {
        const $popup = new __SPopup({
          title: 'No commands to display',
          description: `Sorry but the passed namespace "${namespace}" does not return any commands...`,
          style: {
            bg: 'red'
          },
          width: '50%'
        });
        this.append($popup);
        setTimeout(() => {
          $popup.detach();
          $popup.destroy();
        }, 3000);
        return;
      }

      // save the current namespace
      this._namespace = namespace;

      // clear all existing boxes
      this._clearCommands();

      // register new commands
      this._commands = filteredCommandsInstances;

      // generate the panel object for each commands
      this._commands.forEach((commandInstance) => {
        this._boxesObjectsMap.set(commandInstance, {});
      });

      // update
      this.update();
    });
  }

  /**
   * @name          _clearCommands
   * @type          Function
   * @private
   *
   * This method remove all the command boxes from the content panel as
   * well as in the "_commands" property as well as in the "_boxesObjectsMap"
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _clearCommands() {
    this._commands.forEach((commandInstance) => {
      let boxObj = this._boxesObjectsMap.get(commandInstance);
      if (!boxObj.$header) return;
      boxObj.$header.destroy();
      boxObj.$actions.destroy();
      boxObj.$log.destroy();
      clearInterval(boxObj.spinner.interval);
      boxObj.$box.destroy();
    });
    // remove all commands in the map
    this._boxesObjectsMap.clear();
    // reset the _commands array
    this._commands = null;
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
    this.$log = __blessed.box({
      width: '100%+1',
      top: 4,
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

    this.$namespace = __blessed.box({
      width: '100%+1',
      height: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      style: {
        fg: 'black',
        bg: 'cyan'
      },
      padding: {
        top: 0,
        left: 2,
        right: 2,
        bottom: 0
      }
    });

    this.append(this.$namespace);
    this.append(this.$log);
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
      let boxObj = this._boxesObjectsMap.get(commandInstance);

      // check if we have already a processBox for this process
      if (!Object.keys(boxObj).length) {
        boxObj.$box = __blessed.box({
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
        boxObj.$log = __blessed.box({
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
        boxObj.$actions = __blessed.box({
          top: 0,
          right: 0,
          width: 'shrink',
          height: 1,
          style: {}
        });
        boxObj.$header = __blessed.box({
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

        boxObj.opened = null;
        let doubleClick = false;

        boxObj.$header.on('click', (mouse) => {
          if (doubleClick === false) {
            doubleClick = true;
            setTimeout(() => {
              doubleClick = false;
            }, 500);
            return;
          }

          if (boxObj.opened === null) {
            boxObj.opened = true;
            this._openCommandBox(commandInstance);
          } else {
            boxObj.opened = !boxObj.opened;
            if (boxObj.opened) {
              this._openCommandBox(commandInstance);
            } else {
              this._closePanelBox(commandInstance);
            }
          }
          this.update();
        });

        boxObj.spinner = {
          ora: __ora({
            text: __parseHtml(commandInstance.title || commandInstance.name),
            color: 'black'
          })
        };

        boxObj.$box.append(boxObj.$header);
        boxObj.$box.append(boxObj.$actions);
        boxObj.$box.append(boxObj.$log);

        // append it in the logBox
        this.$log.append(boxObj.$box);
      }

      let boxTitle = '';
      if (commandInstance.namespace) {
        boxTitle += `<bgBlack><white> ${commandInstance.namespace} </white></bgBlack> `;
      }

      boxTitle += `<bold>${
        commandInstance.title || commandInstance.name
      }</bold>`;
      if (lastProcessObj && lastProcessObj.duration) {
        boxTitle += ` <italic>${lastProcessObj.duration / 1000}s</italic>`;
      }

      if (
        lastProcessObj &&
        (lastProcessObj.state === 'error' || lastProcessObj.state === 'killed')
      ) {
        boxObj.$box.style.bg = __color('terminal.red').toString();
        clearInterval(boxObj.spinner.interval);
        boxObj.$header.setContent(
          __parseHtml(`<iCross/>  ${boxTitle} (${lastProcessObj.state})`)
        );
        boxObj.$box.screen.render();
      } else if (lastProcessObj && lastProcessObj.state === 'success') {
        boxObj.$box.style.bg = __color('terminal.green').toString();
        clearInterval(boxObj.spinner.interval);
        boxObj.$header.setContent(__parseHtml(`<iCheck/>  ${boxTitle}`));
        boxObj.$box.screen.render();
      } else if (lastProcessObj && lastProcessObj.state === 'running') {
        boxObj.$box.style.bg = __color('terminal.cyan').toString();
        clearInterval(boxObj.spinner.interval);
        boxObj.spinner.interval = setInterval(() => {
          boxObj.spinner.ora.text = __parseHtml(`${boxTitle}`);
          boxObj.$header.setContent(boxObj.spinner.ora.frame());
          boxObj.$box.screen.render();
        }, 50);
      } else if (lastProcessObj && lastProcessObj.state === 'watching') {
        boxObj.$box.style.bg = __color('terminal.yellow').toString();
        clearInterval(boxObj.spinner.interval);
        boxObj.spinner.interval = setInterval(() => {
          boxObj.spinner.ora.text = __parseHtml(`${boxTitle} (watching)`);
          boxObj.$header.setContent(boxObj.spinner.ora.frame());
          boxObj.$box.screen.render();
        }, 50);
      } else {
        boxObj.$box.style.bg = commandInstance.color || 'white';
        boxObj.$header.setContent(__parseHtml(`<iStart/>  ${boxTitle} (idle)`));
        boxObj.$box.screen.render();
      }

      if (commandInstance.key) {
        boxObj.$actions.setContent(`(${commandInstance.key})`);
        boxObj.$actions.style.bg = boxObj.$box.style.bg;
        boxObj.$actions.style.fg = boxObj.$box.style.fg;
      }

      boxObj.$header.style.bg = boxObj.$box.style.bg;
      boxObj.$header.style.fg = boxObj.$box.style.fg;

      boxObj.$log.top = 2;
      boxObj.$log.left = 0;
      boxObj.$log.width = '100%-4';
      boxObj.$log.height = '100%-4';
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
    const boxObj = this._boxesObjectsMap.get(commandInstance);
    if (boxObj._closeTransition) {
      boxObj._closeTransition.cancel();
      delete boxObj._closeTransition;
    }
    if (boxObj._openTransition) return;
    boxObj.$box.setFront();
    boxObj._closedBoxStateObj = {
      width: boxObj.$box.width,
      height: boxObj.$box.height,
      top: boxObj.$box.top,
      left: boxObj.$box.left,
      right: boxObj.$box.right,
      bottom: boxObj.$box.bottom
    };
    boxObj._openTransition = __transitionObjectProperties(
      boxObj._closedBoxStateObj,
      {
        width: boxObj.$box.parent.width,
        height: boxObj.$box.parent.height,
        top: boxObj.$box.parent.top,
        left: boxObj.$box.parent.left,
        right: boxObj.$box.parent.right,
        bottom: boxObj.$box.parent.bottom
      },
      {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }
    )
      .on('step', (stepObj) => {
        Object.assign(boxObj.$box, stepObj);
        boxObj.$box.screen.render();
      })
      .on('resolve', () => {
        delete boxObj._openTransition;
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
    const boxObj = this._boxesObjectsMap.get(commandInstance);
    if (boxObj._openTransition) {
      boxObj._openTransition.cancel();
      delete boxObj._openTransition;
    }
    if (boxObj._closeTransition) return;
    boxObj._closeTransition = __transitionObjectProperties(
      {
        width: boxObj.$box.width,
        height: boxObj.$box.height,
        top: boxObj.$box.top,
        left: boxObj.$box.left,
        right: boxObj.$box.right,
        bottom: boxObj.$box.bottom
      },
      boxObj._closedBoxStateObj,
      {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }
    )
      .on('step', (stepObj) => {
        Object.assign(boxObj.$box, stepObj);
        boxObj.$box.screen.render();
      })
      .on('resolve', () => {
        delete boxObj._closeTransition;
        delete boxObj._closedBoxStateObj;
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
      const boxObj = this._boxesObjectsMap.get(commandInstance);
      const lastProcessObj = commandInstance.lastProcessObj;

      if (lastProcessObj && lastProcessObj.state === 'killed') {
        boxObj.$log.setContent(
          __parseHtml(`<red>The process has been killed...</red>`)
        );
      } else if (lastProcessObj && lastProcessObj.state === 'error') {
        boxObj.$log.pushLine(__parseHtml(`<red>Something went wrong...</red>`));
      } else {
        // take care of the content of the processBox
        boxObj.$log.setContent('');
        if (lastProcessObj && lastProcessObj.stderr.length) {
          lastProcessObj.stderr.forEach((logItem) => {
            boxObj.$log.pushLine(logItem.value || logItem);
          });
        } else if (lastProcessObj) {
          lastProcessObj.stdout.forEach((logItem) => {
            boxObj.$log.pushLine(logItem.value || logItem);
          });
        }
      }

      // scroll logBox
      boxObj.$log.setScrollPerc(100);
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
      const boxObj = this._boxesObjectsMap.get(commandInstance);
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

      boxObj.$box.width = width;
      boxObj.$box.height = height;
      boxObj.$box.top = top;
      boxObj.$box.left = left;
      boxObj.$box.right = right;
      boxObj.$box.bottom = bottom;
      // deleteboxObj.$box.width;
      // deleteboxObj.$box.height;

      if (boxObj.opened && !boxObj._openTransition) {
        boxObj.$box.setFront();
        boxObj.$box.width = '100%';
        boxObj.$box.height = '100%';
        boxObj.$box.left = 0;
        boxObj.$box.top = 0;
        boxObj.$box.right = 0;
        boxObj.$box.bottom = 0;
      }
    });

    this.$log.setScrollPerc(100);
  }

  update() {
    // init and update command boxes
    this._updateCommandBoxesStyle();

    // update the layout
    this._updateCommandBoxesLayout();

    // update the content
    this._updateCommandBoxesContent();

    if (this._namespace) {
      this.$namespace.height = 1;
      this.$log.top = 2;
      this.$namespace.setContent(
        __parseHtml(
          `<white>Currently displayed namespace:</white> <yellow>${this._namespace}</yellow>`
        )
      );
    } else {
      this.$namespace.height = 0;
      this.$log.top = 0;
    }

    super.update();
  }
};
