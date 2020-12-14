// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __blessed from 'blessed';
import __color from '../../color/color';
import __SBlessedComponent from '../SBlessedComponent';
import __summaryListPopup from '../list/summaryListPopup';
import __ora from 'ora';
import __countLine from '../../string/countLine';
import __parseHtml from '../../terminal/parseHtml';
import __isOdd from '../../is/odd';
import __SPromise from '../../promise/SPromise';
import __SCommand from '../../terminal/SCommand';
import __transitionObjectProperties from '../../transition/objectProperties';
import __SBlessedPopup from '../../blessed/popup/SBlessedPopup';
import __hotkey from '../../keyboard/hotkey';
import __SInputPopup from '../popup/SInputPopup';
import __activeSpace from '../../core/activeSpace';
import __SWindowBox from '../box/SWindowBox';
import __convert from '../../time/convert';
import __SOutput from '../SOutput';
import __SAppCommandInterface from '../interface/SAppCommandInterface';
import __getExtendsStack from '../../class/getExtendsStack';

/**
 * @name                  SCommandPanel
 * @namespace           sugar.node.blessed
 * @type                  Class
 * @wip
 *
 * This class is a simple SPanel extended one that accesp an SCommandPanel instance
 * to log the data's from and display an simple UI depending on the SCommandPanel configured keys
 *
 * @param         {SCommandPanel}            process           The SCommandPanel instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SCommandPanel
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SCommandPanel from '@coffeekraken/sugar/node/terminal/SCommandPanel';
 * const myPanel = new SCommandPanel(myProcess, {
 *    screen: true
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SCommandPanel extends __SBlessedComponent {
  /**
   * @name          _commands
   * @type          Array|String
   * @private
   *
   * Store the passed "commands" parameter that can be either an Array of SCli instances.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _commands = null;

  /**
   * @name          $list
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the commands list will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $list = null;

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
   * @name          _displayedCommands
   * @type          String
   * @private
   *
   * Store the current displayed commands
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _displayedCommands = [];

  /**
   * @name          _updateListInterval
   * @type          String
   * @private
   *
   * Store the update list interval
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateListInterval = null;

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
    const _settings = __deepMerge(
      {
        framerate: 10,
        blessed: {}
      },
      settings
    );
    // extends SPanel
    super(_settings);

    if (Array.isArray(commands)) {
      this._commands = commands;
    } else {
      throw new Error(
        `It seems that the passed "commands" argument of the SCommandPanel class is not an Array of SCommand instances...`
      );
    }

    // this._summaryFakeCommand = {
    //   id: 'summary',
    //   settings: {},
    //   key: '§'
    // };
    // this._summaryFakeCommand.on = () => this._summaryFakeCommand;
    // this._commands.unshift(this._summaryFakeCommand);

    // set the first active space to the first command key
    __activeSpace.set(`SCommandPanel.${this._commands[0].key}`);

    // pipe all commands "events" to the _sPromise internal promise
    this._sPromise = new __SPromise();
    this._commands.forEach(async (commandObj, i) => {
      // instanciate the command instance
      const commandClass = await import(commandObj.path);
      commandObj.instance = new commandClass(commandObj.settings);
    });

    this.promise = new __SPromise();

    // generate the UI
    this._generateUI();

    // init command boxes
    this._initCommandBoxes();

    // add the first commands in the display list
    this._displayedCommands.push(this._commands[0]);

    // select first list item
    this._selectListItem(0);

    // update the list
    setTimeout(() => {
      this._updateList();
    });

    // run the command that have the "run" property to true
    this._commands.forEach((commandObj) => {
      if (commandObj.run) {
        commandObj.instance.run();
      }
    });
  }

  /**
   * @name          _logSummary
   * @type          Function
   *
   * This method simply log the importants activities in the summary box
   *
   * @param       {Object}        event         The event that happens
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // _logSummary(event) {
  //   let log = '';
  //   switch (event.process.state) {
  //     case 'running':
  //       log = `- <primary>${event.name}</primary> has been <cyan>started</cyan>`;
  //       break;
  //     case 'error':
  //       log = `<red><iCross/></red> <primary>${event.name}</primary> is in <red>error</red>`;
  //       break;
  //     case 'success':
  //       log = `<green><iCheck/></green> <primary>${
  //         event.name
  //       }</primary> has been finished <green>successfully</green> in <cyan>${__convert(
  //         event.process.duration,
  //         's'
  //       )}s</cyan>`;
  //       break;
  //     case 'killed':
  //       log = `<red><iCross/></red> <primary>${event.name}</primary> has been <red>killed</red>`;
  //       break;
  //   }
  //   if (event.name !== this._logPreviousCommand && this._logPreviousCommand)
  //     this._summaryFakeCommand.lastProcessObj.stdout.push(' ');
  //   this._summaryFakeCommand.lastProcessObj.stdout.push(__parseHtml(log));
  //   this.update();
  //   this._logPreviousCommand = event.name;
  // }

  /**
   * @name          _selectListItem
   * @type          Function
   * @private
   *
   * Call this function to select a list item
   *
   * @param       {Number}      idx       The item idx to select
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _selectListItem(idx) {
    if (!this._multiSelect) this._displayedCommands = [];

    // remove all the panels
    this.$log.children.forEach((child) => {
      child.detach();
    });

    this.$list.items.forEach((item, j) => {
      if (idx === j) {
        item.selected = true;
        item.active = true;
        const itemIdx = this._displayedCommands.indexOf(item.commandObj);
        if (itemIdx != -1) {
          this._displayedCommands.splice(itemIdx, 1);
        } else {
          this._displayedCommands.push(item.commandObj);
        }
        __activeSpace.set(`SCommandPanel.${item.commandObj.key}`);
      } else if (!this._multiSelect) {
        const displayCommandIdx = this._displayedCommands.indexOf(
          item.commandObj
        );
        if (displayCommandIdx !== -1) {
          this._displayedCommands.splice(displayCommandIdx, 1);
        }
        delete item.active;
        delete item.selected;
      }
    });

    this._commands.forEach((commandObj) => {
      if (this._displayedCommands.indexOf(commandObj) === -1) {
      } else {
        this.$log.append(commandObj.$box);
      }
    });

    // this._updateList();
    this.update();
  }

  /**
   * @name          _initCommandBoxes
   * @type          Function
   * @private
   *
   * This method create all the command boxes with the log (SOutput) instance, etc, and
   * save then into the ```_boxesObjectsMap``` map
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initCommandBoxes() {
    this._commands.forEach((commandObj, i) => {
      const boxObj = {};

      if (commandObj.key) {
        __hotkey(`${commandObj.key}`).on('press', () => {
          if (
            __activeSpace.get() === `SCommandPanel.${commandObj.key}` &&
            commandObj.instance &&
            commandObj.instance.on
          ) {
            if (
              commandObj.instance.state == 'running' &&
              !commandObj.concurrent
            ) {
              commandObj.instance.kill();
            } else if (
              commandObj.instance.state != 'running' &&
              commandObj.instance.run
            ) {
              commandObj.instance.run();
            }
          } else {
            __activeSpace.set(`SCommandPanel.${commandObj.key}`);
            this._selectListItem(i);
          }
        });
      }
      // commandObj._settings.onKeyPress = (instance) => {
      //   if (__activeSpace.is(`SCommandPanel.${commandObj.key}`)) return true;
      //   return false;
      // };
      commandObj.$box = __blessed.box({
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
      commandObj.$log = new __SOutput(commandObj.instance, {
        width: '100%-4',
        height: 0,
        top: 0,
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      });
      commandObj.$actions = __blessed.box({
        top: 0,
        right: 0,
        width: 'shrink',
        height: 1,
        style: {}
      });
      commandObj.$header = __blessed.box({
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

      commandObj.opened = null;
      let doubleClick = false;

      commandObj.$header.on('click', (mouse) => {
        if (doubleClick === false) {
          doubleClick = true;
          setTimeout(() => {
            doubleClick = false;
          }, 500);
          return;
        }

        if (commandObj.opened === null) {
          commandObj.opened = true;
          this._openCommandBox(commandObj);
        } else {
          commandObj.opened = !commandObj.opened;
          if (commandObj.opened) {
            this._openCommandBox(commandObj);
          } else {
            this._closePanelBox(commandObj);
          }
        }
        this.update();
      });

      commandObj.spinner = {
        ora: __ora({
          text: __parseHtml(commandObj.title || commandObj.name),
          color: 'black'
        })
      };

      commandObj.$box.append(commandObj.$header);
      // commandObj.$box.append(commandObj.$actions);
      commandObj.$box.append(commandObj.$log);
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
    const medias = {
      0: 20,
      180: 15
    };
    const itemsArray = [];
    this._commands.forEach((commandObj) => {
      commandObj._spinner = {
        ora: __ora({
          text: __parseHtml(commandObj.name),
          color: 'black'
        })
      };

      const name = commandObj.name;

      itemsArray.push(name);
    });

    let media;
    Object.keys(medias).forEach((width) => {
      if (this.screen.width >= parseInt(width)) {
        media = medias[width];
      }
    });

    this.$list = __blessed.list({
      width: `${media}%-1`,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      mouse: true,
      keys: true,
      tags: true,
      scrollable: true,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      style: {
        selected: {},
        item: {},
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      items: itemsArray,
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });
    this.$list.on('keypress', (e, key) => {
      handleListActiveAndSelectedProperty(key.name);
    });
    this.$list.on('select', (e, i) => {
      this._selectListItem(i);
    });
    this._commands.forEach((commandObj, i) => {
      const item = this.$list.getItem(i);
      item.commandObj = commandObj;
    });

    // this.$list.items[0].active = true;
    // this.$list.items[0].selected = true;

    let pressTimeout, pressInitialiser;
    const pressed = () => {
      this._multiSelect = true;
      setTimeout(() => {
        this._multiSelect = false;
      });
    };
    __hotkey('tab').on('press', () => {
      if (!pressTimeout) {
        pressInitialiser = 'tab';
        pressTimeout = setTimeout(() => {
          pressTimeout = null;
          pressInitialiser = null;
        }, 300);
      } else if (pressInitialiser !== 'tab') {
        pressed();
      }
    });
    __hotkey('return').on('press', () => {
      if (!pressTimeout) {
        pressInitialiser = 'return';
        pressTimeout = setTimeout(() => {
          pressTimeout = null;
          pressInitialiser = null;
        }, 300);
      } else if (pressInitialiser !== 'return') {
        pressed();
      }
    });

    this.$log = __blessed.box({
      width: `${100 - media}%`,
      top: 0,
      left: `${media}%+1`,
      right: 0,
      bottom: 0,
      style: {
        fg: 'white',
        bg: 'cyan'
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

    const handleListActiveAndSelectedProperty = (direction) => {
      let activeItemIdx = null;
      this.$list.items.forEach((item, i) => {
        if (activeItemIdx !== null) return;
        if (item.active) activeItemIdx = i;
      });
      if (direction === 'up') {
        if (activeItemIdx >= 1) {
          delete this.$list.items[activeItemIdx].active;
          this.$list.items[activeItemIdx - 1].active = true;
        }
      } else if (direction === 'down') {
        if (activeItemIdx < this.$list.items.length - 1) {
          delete this.$list.items[activeItemIdx].active;
          this.$list.items[activeItemIdx + 1].active = true;
        }
      }
      // this._updateList();
    };

    this.screen.on('keypress', (e, key) => {
      if (this.$list.focused) return;

      if (key.name === 'up') {
        this.$list.up();
      } else if (key.name === 'down') {
        this.$list.down();
      }
      this.$list.focus();
      handleListActiveAndSelectedProperty(key.name);
    });

    this.append(this.$list);
    this.append(this.$log);

    this.$list.focus();
  }

  _updateList() {
    // console.log('DU', Date.now());
    this._commands.forEach((commandObj, i) => {
      const item = this.$list.getItem(i);

      if (!item.$key) {
        item.$key = __blessed.box({
          width: 3,
          height: 1,
          top: 0,
          left: '100%',
          right: 0,
          bottom: 0,
          style: {
            fg: 'white'
          },
          mouse: false,
          keys: false,
          scrollable: false,
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        });
        item.append(item.$key);
      }

      if (!item.$state) {
        item.$state = __blessed.box({
          width: 3,
          height: 1,
          top: 0,
          left: '100%-3',
          right: 0,
          bottom: 0,
          style: {
            fg: 'white'
          },
          mouse: false,
          keys: false,
          scrollable: false,
          padding: {
            top: 0,
            left: 1,
            right: 0,
            bottom: 0
          }
        });
        item.append(item.$state);
      }

      item.padding = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      };
      item.top = i * 2;

      const key = `${commandObj.key}`;
      item.$key.setContent(key);

      let name = commandObj.name;
      if (
        commandObj.instance.state === 'running' ||
        commandObj.instance.state === 'watching'
      ) {
        commandObj._spinner.ora.text = '';
        commandObj._spinner.ora.color = 'yellow';
        name = `${commandObj.name}`;
        if (commandObj.instance.state === 'running')
          commandObj._spinner.ora.color = 'cyan';
        if (commandObj.instance.state === 'error')
          commandObj._spinner.ora.color = 'red';
        // if (commandObj.state === 'success')
        //   commandObj._spinner.ora.color = 'green';
        // }
        item.$state.setContent(commandObj._spinner.ora.frame());
      } else if (commandObj.instance.state === 'error') {
        name = `${commandObj.name}`;
        item.$state.setContent('×');
        item.$state.style.fg = __color('terminal.red').toString();
        // item.$state.style.bg = __color('terminal.red').toString();
      } else if (commandObj.instance.state === 'success') {
        name = `${commandObj.name}`;
        item.$state.setContent('✔');
        item.$state.style.fg = __color('terminal.green').toString();
        // item.$state.style.bg = __color('terminal.white').toString();
      } else {
        item.$state.setContent('-');
      }

      if (item.active) {
        name = `> ${name}`;
      }

      let spaces = Math.round(this.$list.width - __countLine(name) - 1);
      if (spaces < 0) spaces = 0;
      name = name + ' '.repeat(spaces);

      if (item.active || item.selected) {
        item.style.fg = __color('terminal.primary').toString();
      } else {
        item.style.fg = __color('terminal.white').toString();
      }

      if (commandObj.instance.state === 'running') {
        item.style.fg = __color('terminal.cyan').toString();
      } else if (item.active || item.selected) {
        item.style.fg = __color('terminal.primary').toString();
      } else if (commandObj.instance.state === 'watching') {
        item.style.fg = __color('terminal.white').toString();
      } else if (commandObj.instance.state === 'error') {
        item.style.fg = __color('terminal.red').toString();
      } else if (commandObj.instance.state === 'success') {
        item.style.fg = __color('terminal.green').toString();
      }

      this.$list.setItem(i, __parseHtml(name));
    });
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
    this._displayedCommands.forEach((commandObj) => {
      let boxTitle = '';
      if (commandObj.id) {
        boxTitle += `<bgBlack><white> ${commandObj.id} </white></bgBlack> `;
      }

      boxTitle += `<bold>${commandObj.title || commandObj.name}</bold>`;
      if (commandObj.instance && commandObj.instance.duration) {
        boxTitle += ` <italic>${commandObj.instance.duration / 1000}s</italic>`;
      }

      if (
        commandObj.instance &&
        (commandObj.instance.state === 'error' ||
          commandObj.instance.state === 'killed')
      ) {
        commandObj.$box.style.bg = __color('terminal.red').toString();
        clearInterval(commandObj.spinner.interval);
        commandObj.$header.setContent(
          __parseHtml(`<iCross/>  ${boxTitle} (${commandObj.instance.state})`)
        );
        commandObj.$box.screen.render();
      } else if (commandObj.instance.state === 'watching') {
        commandObj.$box.style.bg = __color('terminal.yellow').toString();
        clearInterval(commandObj.spinner.interval);
        commandObj.spinner.interval = setInterval(() => {
          commandObj.spinner.ora.text = __parseHtml(`${boxTitle} (watching)`);
          commandObj.$header.setContent(commandObj.spinner.ora.frame());
        }, 50);
      } else if (
        commandObj.instance &&
        commandObj.instance.state === 'success'
      ) {
        commandObj.$box.style.bg = __color('terminal.green').toString();
        clearInterval(commandObj.spinner.interval);
        commandObj.$header.setContent(__parseHtml(`<iCheck/>  ${boxTitle}`));
        commandObj.$box.screen.render();
      } else if (
        commandObj.instance &&
        commandObj.instance.state === 'running'
      ) {
        commandObj.$box.style.bg = __color('terminal.cyan').toString();
        clearInterval(commandObj.spinner.interval);
        commandObj.spinner.interval = setInterval(() => {
          commandObj.spinner.ora.text = __parseHtml(`${boxTitle}`);
          commandObj.$header.setContent(commandObj.spinner.ora.frame());
        }, 50);
      } else {
        commandObj.$box.style.bg = 'white';
        commandObj.$header.setContent(
          __parseHtml(`<iStart/>  ${boxTitle} (idle)`)
        );
        commandObj.$box.screen.render();
      }

      commandObj.$header.style.bg = commandObj.$box.style.bg;
      commandObj.$header.style.fg = commandObj.$box.style.fg;

      commandObj.$log.top = 2;
      commandObj.$log.left = 0;
      commandObj.$log.width = '100%-4';
      commandObj.$log.height = '100%-4';
    });
  }

  /**
   * @name              _openCommandBox
   * @type              Function
   * @private
   *
   * This method simply open the passed panel box by animating the transition state
   *
   * @param       {SCommand}        commandObj       The command instance for which you want to open the box
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _openCommandBox(commandObj) {
    if (commandObj._closeTransition) {
      commandObj._closeTransition.cancel();
      delete commandObj._closeTransition;
    }
    if (commandObj._openTransition) return;
    commandObj.$box.setFront();
    commandObj._closedBoxStateObj = {
      width: commandObj.$box.width,
      height: commandObj.$box.height,
      top: commandObj.$box.top,
      left: commandObj.$box.left,
      right: commandObj.$box.right,
      bottom: commandObj.$box.bottom
    };
    commandObj._openTransition = __transitionObjectProperties(
      commandObj._closedBoxStateObj,
      {
        width: commandObj.$box.parent.width,
        height: commandObj.$box.parent.height,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }
    )
      .on('step', (stepObj) => {
        Object.assign(commandObj.$box, stepObj);
        commandObj.$box.screen.render();
      })
      .on('resolve', () => {
        delete commandObj._openTransition;
      });
  }

  /**
   * @name              _closePanelBox
   * @type              Function
   * @private
   *
   * This method simply open the passed panel box by animating the transition state
   *
   * @param       {SCommand}        commandObj       The panel that store the box to animate
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _closePanelBox(commandObj) {
    if (commandObj._openTransition) {
      commandObj._openTransition.cancel();
      delete commandObj._openTransition;
    }
    if (commandObj._closeTransition) return;
    commandObj._closeTransition = __transitionObjectProperties(
      {
        width: commandObj.$box.width,
        height: commandObj.$box.height,
        top: commandObj.$box.top,
        left: commandObj.$box.left,
        right: commandObj.$box.right,
        bottom: commandObj.$box.bottom
      },
      commandObj._closedBoxStateObj,
      {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }
    )
      .on('step', (stepObj) => {
        Object.assign(commandObj.$box, stepObj);
        commandObj.$box.screen.render();
      })
      .on('resolve', () => {
        delete commandObj._closeTransition;
        delete commandObj._closedBoxStateObj;
      });
  }

  /**
   * @name              _updateCommandBoxesContent
   * @type              Function
   * @private
   *
   * This method take all the current commandObj available and set the layout correctly depending
   * on how many they are, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updateCommandBoxesContent() {
    this._displayedCommands.forEach((commandObj, i) => {
      if (
        commandObj.stateMessageLogged &&
        commandObj.stateMessageLogged === commandObj.instance.state
      )
        return;
      commandObj.stateMessageLogged = commandObj.instance.state;

      if (commandObj.instance.state === 'idle') {
        commandObj.$log.log({
          temp: true,
          clear: true,
          value: `Press <yellow>${commandObj.key}</yellow> to launch the process...`
        });
      } else if (commandObj.instance.state === 'killed') {
        commandObj.$log.log({
          temp: true,
          clear: true,
          value: `The process has been <red>killed</red>...`
        });
      } else if (commandObj.instance && commandObj.instance.state === 'error') {
        // commandObj.$log.log({
        //   temp: true,
        //   clear: true,
        //   value: `The process has been <red>killed</red>...`
        // });
        // commandObj.$log.pushLine(__parseHtml(`<red>Something went wrong...</red>`));
      } else if (commandObj.instance.obj === 'success') {
        commandObj.$log.log({
          temp: true,
          value: `The process has been terminated <green>successfully</green>!`
        });
      }

      // scroll logBox
      // commandObj.$log.setScrollPerc(100);
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
    const currentTop = 0;

    // this._commands.forEach((commandObj) => {
    //   let boxObj = this._boxesObjectsMap.get(commandObj);
    //   if (this._displayedCommands.indexOf(commandObj) === -1) {
    //     if (!boxObj.$box) return;
    //     boxObj.$box.detach();
    //   } else {
    //     this.$log.append(boxObj.$box);
    //   }
    // });

    this._displayedCommands.forEach((commandObj, i) => {
      const lastProcessObj = commandObj.instance.lastProcessObj;
      let layout = 'default';
      if (this._displayedCommands.length === 2) layout = 'two';
      if (this._displayedCommands.length === 3) layout = 'three';
      if (this._displayedCommands.length === 4) layout = 'four';
      if (this._displayedCommands.length === 5) layout = 'five';
      if (this._displayedCommands.length === 6) layout = 'six';
      if (this._displayedCommands.length === 7) layout = 'seven';

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

      commandObj.$box.width = width;
      commandObj.$box.height = height;
      commandObj.$box.top = top;
      commandObj.$box.left = left;
      commandObj.$box.right = right;
      commandObj.$box.bottom = bottom;
      // deletecommandObj.$box.width;
      // deletecommandObj.$box.height;

      if (commandObj.opened && !commandObj._openTransition) {
        commandObj.$box.setFront();
        commandObj.$box.width = '100%';
        commandObj.$box.height = '100%';
        commandObj.$box.left = 0;
        commandObj.$box.top = 0;
        commandObj.$box.right = 0;
        commandObj.$box.bottom = 0;
      }
    });

    this.$log.setScrollPerc(100);
  }

  update() {
    if (this.isDestroyed()) return;

    setTimeout(() => {
      // init and update command boxes
      this._updateCommandBoxesStyle();

      // update the layout
      this._updateCommandBoxesLayout();

      // update the content
      this._updateCommandBoxesContent();

      // update list
      this._updateList();

      super.update();
    });
  }
};
