"use strict";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../../object/deepMerge');

var __blessed = require('blessed');

var __color = require('../../color/color');

var __SComponent = require('../SComponent');

var __summaryListPopup = require('../list/summaryListPopup');

var __ora = require('ora');

var __countLine = require('../../string/countLine');

var __parseHtml = require('../../terminal/parseHtml');

var __isOdd = require('../../is/odd');

var __SPromise = require('../../promise/SPromise');

var __SCommand = require('../../terminal/SCommand');

var __transitionObjectProperties = require('../../transition/objectProperties');

var __SPopup = require('../../blessed/popup/SPopup');

var __hotkey = require('../../keyboard/hotkey');

var __SInputPopup = require('../popup/SInputPopup');

var __activeSpace = require('../../core/activeSpace');

var __SWindowBox = require('../box/SWindowBox');

var __convert = require('../../time/convert');

var __SOutput = require('../SOutput');
/**
 * @name                  SCommandPanel
 * @namespace           node.blessed
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


module.exports = (_temp = /*#__PURE__*/function (_SComponent) {
  _inherits(SCommandPanel, _SComponent);

  var _super = _createSuper(SCommandPanel);

  /**
   * @name          _commands
   * @type          Array|String
   * @private
   *
   * Store the passed "commands" parameter that can be either an Array of SCli instances.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          $list
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the commands list will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          $log
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the logs will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _displayedCommands
   * @type          String
   * @private
   *
   * Store the current displayed commands
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _updateListInterval
   * @type          String
   * @private
   *
   * Store the update list interval
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SCommandPanel(commands, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCommandPanel);

    var _settings = __deepMerge({}, settings); // extends SPanel


    _this = _super.call(this, _settings);

    _defineProperty(_assertThisInitialized(_this), "_commands", null);

    _defineProperty(_assertThisInitialized(_this), "$list", null);

    _defineProperty(_assertThisInitialized(_this), "$log", null);

    _defineProperty(_assertThisInitialized(_this), "_displayedCommands", []);

    _defineProperty(_assertThisInitialized(_this), "_updateListInterval", null);

    _this._boxesObjectsMap = new Map();

    if (Array.isArray(commands)) {
      _this._commands = commands;
    } else {
      throw new Error("It seems that the passed \"commands\" argument of the SCommandPanel class is not an Array of SCommand instances...");
    } // this._summaryFakeCommand = {
    //   id: 'summary',
    //   settings: {},
    //   key: '§'
    // };
    // this._summaryFakeCommand.on = () => this._summaryFakeCommand;
    // this._commands.unshift(this._summaryFakeCommand);
    // set the first active space to the first command key


    __activeSpace.set("SCommandPanel.".concat(_this._commands[0].key)); // pipe all commands "events" to the _sPromise internal promise


    _this._sPromise = new __SPromise(() => {}).start();

    _this._commands.forEach((commandObj, i) => {
      // instanciate the command instance
      var commandClass = require(commandObj.path);

      commandObj.instance = new commandClass(commandObj.settings); // commandObj.instance.on('beforeStart', () => {
      //   // const boxObj = this._boxesObjectsMap.get(commandObj);
      //   // boxObj.$log.clear();
      //   // boxObj.$log.update();
      // });
      // __SPromise.pipe(commandObj, this._sPromise);
    });

    _this.promise = new __SPromise(() => {}); // subscribe to the commands instances
    // this._subscribeToCommandsEvents();
    // generate the UI

    _this._generateUI(); // init command boxes


    _this._initCommandBoxes(); // add the first commands in the display list


    _this._displayedCommands.push(_this._commands[0]); // update the list continusly
    // this._updateListInterval = setInterval(this._updateList.bind(this), 100);
    // this.screen.on('destroy', () => {
    //   clearInterval(this._updateListInterval);
    // });
    //
    // select first list item


    _this._selectListItem(0); // update the list


    setTimeout(() => {
      _this._updateList();
    });
    return _this;
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


  _createClass(SCommandPanel, [{
    key: "_subscribeToCommandsEvents",
    value: function _subscribeToCommandsEvents() {
      // subscribe to data
      this._sPromise.on('start,success,error', data => {
        this._logSummary(data);

        this.update();
      }).on('close', data => {
        // this._logSummary(data);
        this.update();
      }).on('log', data => {
        this.update();
      }).on('error', data => {
        this.update();
      }).on('kill', data => {}) // subscribe to errors
      .on('error', data => {}); // subscribe to ask
      // .on('ask', async (question) => {
      //   if (question.type === 'summary') {
      //     const summary = this.summary(
      //       question.commandObj,
      //       question.items
      //     );
      //     summary.on('cancel', () => {
      //       question.reject && question.reject();
      //     });
      //     summary.on('resolve', (answer) => {
      //       question.resolve && question.resolve(answer);
      //     });
      //   }
      // });

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

  }, {
    key: "_logSummary",
    value: function _logSummary(event) {
      var log = '';

      switch (event.process.state) {
        case 'running':
          log = "- <primary>".concat(event.name, "</primary> has been <cyan>started</cyan>");
          break;

        case 'error':
          log = "<red><iCross/></red> <primary>".concat(event.name, "</primary> is in <red>error</red>");
          break;

        case 'success':
          log = "<green><iCheck/></green> <primary>".concat(event.name, "</primary> has been finished <green>successfully</green> in <cyan>").concat(__convert(event.process.duration, 's'), "s</cyan>");
          break;

        case 'killed':
          log = "<red><iCross/></red> <primary>".concat(event.name, "</primary> has been <red>killed</red>");
          break;
      }

      if (event.name !== this._logPreviousCommand && this._logPreviousCommand) this._summaryFakeCommand.lastProcessObj.stdout.push(' ');

      this._summaryFakeCommand.lastProcessObj.stdout.push(__parseHtml(log));

      this.update();
      this._logPreviousCommand = event.name;
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

  }, {
    key: "summary",
    value: function summary(commandObj, items) {
      var summaryListPopup = __summaryListPopup({
        title: "Run command <bgBlack><bold><primary> ".concat(commandObj.name, " </primary></bold></bgBlack> | Are these properties ok?"),
        description: "<bold><cyan>".concat(commandObj.command, "</cyan></bold>"),
        items
      });

      summaryListPopup.attach(this);
      return summaryListPopup;
    } // /**
    //  * @name          _clearCommands
    //  * @type          Function
    //  * @private
    //  *
    //  * This method remove all the command boxes from the content panel as
    //  * well as in the "_commands" property as well as in the "_boxesObjectsMap"
    //  *
    //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // _clearCommands() {
    //   this._commands.forEach((commandObj) => {
    //     let boxObj = this._boxesObjectsMap.get(commandObj);
    //     if (!boxObj.$header) return;
    //     boxObj.$header.destroy();
    //     boxObj.$actions.destroy();
    //     boxObj.$log.destroy();
    //     clearInterval(boxObj.spinner.interval);
    //     boxObj.$box.destroy();
    //   });
    //   // remove all commands in the map
    //   this._boxesObjectsMap.clear();
    //   // reset the _commands array
    //   this._commands = null;
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

  }, {
    key: "_selectListItem",
    value: function _selectListItem(idx) {
      if (!this._multiSelect) this._displayedCommands = []; // remove all the panels

      this.$log.children.forEach(child => {
        child.detach();
      });
      this.$list.items.forEach((item, j) => {
        if (idx === j) {
          item.selected = true;
          item.active = true;

          var itemIdx = this._displayedCommands.indexOf(item.commandObj);

          if (itemIdx != -1) {
            this._displayedCommands.splice(itemIdx, 1);
          } else {
            this._displayedCommands.push(item.commandObj);
          }

          __activeSpace.set("SCommandPanel.".concat(item.commandObj.key));
        } else if (!this._multiSelect) {
          var displayCommandIdx = this._displayedCommands.indexOf(item.commandObj);

          if (displayCommandIdx !== -1) {
            this._displayedCommands.splice(displayCommandIdx, 1);
          }

          delete item.active;
          delete item.selected;
        }
      });

      this._commands.forEach(commandObj => {
        var boxObj = this._boxesObjectsMap.get(commandObj);

        if (this._displayedCommands.indexOf(commandObj) === -1) {} else {
          this.$log.append(boxObj.$box);
        }
      }); // this._updateList();


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

  }, {
    key: "_initCommandBoxes",
    value: function _initCommandBoxes() {
      this._commands.forEach((commandObj, i) => {
        var boxObj = {};

        if (commandObj.key) {
          __hotkey("".concat(commandObj.key)).on('press', () => {
            if (__activeSpace.get() === "SCommandPanel.".concat(commandObj.key) && commandObj.instance && commandObj.instance.on) {
              if (commandObj.instance.isRunning() && !commandObj.concurrent) {
                commandObj.instance.kill();
              } else if (!commandObj.instance.isRunning() && commandObj.instance.run) {
                commandObj.instance.run();
              }
            } else {
              __activeSpace.set("SCommandPanel.".concat(commandObj.key));

              this._selectListItem(i);
            }
          });
        } // commandObj._settings.onKeyPress = (instance) => {
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
            left: 2,
            right: 2,
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
        var doubleClick = false;
        commandObj.$header.on('click', mouse => {
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
        commandObj.$box.append(commandObj.$header); // commandObj.$box.append(commandObj.$actions);

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

  }, {
    key: "_generateUI",
    value: function _generateUI() {
      var medias = {
        0: 20,
        180: 15
      };
      var itemsArray = [];

      this._commands.forEach(commandObj => {
        commandObj._spinner = {
          ora: __ora({
            text: __parseHtml(commandObj.name),
            color: 'black'
          })
        };
        var name = commandObj.name;
        itemsArray.push(name);
      });

      var media;
      Object.keys(medias).forEach(width => {
        if (this.screen.width >= parseInt(width)) {
          media = medias[width];
        }
      });
      this.$list = __blessed.list({
        width: "".concat(media, "%-1"),
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
        var item = this.$list.getItem(i);
        item.commandObj = commandObj;
      }); // this.$list.items[0].active = true;
      // this.$list.items[0].selected = true;


      var pressTimeout, pressInitialiser;

      var pressed = () => {
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
        width: "".concat(100 - media, "%"),
        top: 0,
        left: "".concat(media, "%+1"),
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

      var handleListActiveAndSelectedProperty = direction => {
        var activeItemIdx = null;
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

        this._updateList();
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
  }, {
    key: "_updateList",
    value: function _updateList() {
      // console.log('DU', Date.now());
      this._commands.forEach((commandObj, i) => {
        var item = this.$list.getItem(i);

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
        var key = "".concat(commandObj.key);
        item.$key.setContent(key);
        var name = commandObj.name;

        if (commandObj.instance.state === 'running' || commandObj.instance.isWatching()) {
          commandObj._spinner.ora.text = '';
          commandObj._spinner.ora.color = 'yellow';
          name = "".concat(commandObj.name);
          if (commandObj.instance.state === 'running') commandObj._spinner.ora.color = 'cyan';
          if (commandObj.instance.state === 'error') commandObj._spinner.ora.color = 'red'; // if (commandObj.state === 'success')
          //   commandObj._spinner.ora.color = 'green';
          // }

          item.$state.setContent(commandObj._spinner.ora.frame());
        } else if (commandObj.instance.state === 'error') {
          name = "".concat(commandObj.name);
          item.$state.setContent('×');
          item.$state.style.fg = __color('terminal.red').toString(); // item.$state.style.bg = __color('terminal.red').toString();
        } else if (commandObj.instance.state === 'success') {
          name = "".concat(commandObj.name);
          item.$state.setContent('✔');
          item.$state.style.fg = __color('terminal.green').toString(); // item.$state.style.bg = __color('terminal.white').toString();
        } else {
          item.$state.setContent('-');
        }

        if (item.active) {
          name = "> ".concat(name);
        }

        var spaces = Math.round(this.$list.width - __countLine(name) - 1);
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
        } else if (commandObj.instance.isWatching()) {
          item.style.fg = __color('terminal.white').toString();
        } else if (commandObj.instance.state === 'error') {
          item.style.fg = __color('terminal.red').toString();
        } else if (commandObj.instance.state === 'success') {
          item.style.fg = __color('terminal.green').toString();
        }

        this.$list.setItem(i, __parseHtml(name));
      }); // console.log('END', Date.now());

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

  }, {
    key: "_updateCommandBoxesStyle",
    value: function _updateCommandBoxesStyle() {
      this._displayedCommands.forEach(commandObj => {
        var boxTitle = '';

        if (commandObj.id) {
          boxTitle += "<bgBlack><white> ".concat(commandObj.id, " </white></bgBlack> ");
        }

        boxTitle += "<bold>".concat(commandObj.title || commandObj.name, "</bold>");

        if (commandObj.instance.lastProcessObj && commandObj.instance.lastProcessObj.duration) {
          boxTitle += " <italic>".concat(commandObj.instance.lastProcessObj.duration / 1000, "s</italic>");
        }

        if (commandObj.instance.lastProcessObj && (commandObj.instance.lastProcessObj.state === 'error' || commandObj.instance.lastProcessObj.state === 'killed')) {
          commandObj.$box.style.bg = __color('terminal.red').toString();
          clearInterval(commandObj.spinner.interval);
          commandObj.$header.setContent(__parseHtml("<iCross/>  ".concat(boxTitle, " (").concat(commandObj.instance.lastProcessObj.state, ")")));
          commandObj.$box.screen.render();
        } else if (commandObj.instance.isWatching()) {
          commandObj.$box.style.bg = __color('terminal.yellow').toString();
          clearInterval(commandObj.spinner.interval);
          commandObj.spinner.interval = setInterval(() => {
            commandObj.spinner.ora.text = __parseHtml("".concat(boxTitle, " (watching)"));
            commandObj.$header.setContent(commandObj.spinner.ora.frame());
          }, 50);
        } else if (commandObj.instance.lastProcessObj && commandObj.instance.lastProcessObj.state === 'success') {
          commandObj.$box.style.bg = __color('terminal.green').toString();
          clearInterval(commandObj.spinner.interval);
          commandObj.$header.setContent(__parseHtml("<iCheck/>  ".concat(boxTitle)));
          commandObj.$box.screen.render();
        } else if (commandObj.instance.lastProcessObj && commandObj.instance.lastProcessObj.state === 'running') {
          commandObj.$box.style.bg = __color('terminal.cyan').toString();
          clearInterval(commandObj.spinner.interval);
          commandObj.spinner.interval = setInterval(() => {
            commandObj.spinner.ora.text = __parseHtml("".concat(boxTitle));
            commandObj.$header.setContent(commandObj.spinner.ora.frame());
          }, 50);
        } else {
          commandObj.$box.style.bg = 'white';
          commandObj.$header.setContent(__parseHtml("<iStart/>  ".concat(boxTitle, " (idle)")));
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

  }, {
    key: "_openCommandBox",
    value: function _openCommandBox(commandObj) {
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
      commandObj._openTransition = __transitionObjectProperties(commandObj._closedBoxStateObj, {
        width: commandObj.$box.parent.width,
        height: commandObj.$box.parent.height,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }, {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }).on('step', stepObj => {
        Object.assign(commandObj.$box, stepObj);
        commandObj.$box.screen.render();
      }).on('resolve', () => {
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

  }, {
    key: "_closePanelBox",
    value: function _closePanelBox(commandObj) {
      if (commandObj._openTransition) {
        commandObj._openTransition.cancel();

        delete commandObj._openTransition;
      }

      if (commandObj._closeTransition) return;
      commandObj._closeTransition = __transitionObjectProperties({
        width: commandObj.$box.width,
        height: commandObj.$box.height,
        top: commandObj.$box.top,
        left: commandObj.$box.left,
        right: commandObj.$box.right,
        bottom: commandObj.$box.bottom
      }, commandObj._closedBoxStateObj, {
        duration: '0.3s',
        easing: 'easeInOutQuint'
      }).on('step', stepObj => {
        Object.assign(commandObj.$box, stepObj);
        commandObj.$box.screen.render();
      }).on('resolve', () => {
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

  }, {
    key: "_updateCommandBoxesContent",
    value: function _updateCommandBoxesContent() {
      this._displayedCommands.forEach((commandObj, i) => {
        var lastProcessObj = commandObj.instance.lastProcessObj;

        if (lastProcessObj && lastProcessObj.state === 'killed') {
          commandObj.$log.clear();
          commandObj.$log.log("<red>The process has been killed...</red>");
        } else if (lastProcessObj && lastProcessObj.state === 'error') {// commandObj.$log.pushLine(__parseHtml(`<red>Something went wrong...</red>`));
        } else {
          if (lastProcessObj && lastProcessObj.stdout && !lastProcessObj.stdout.length) {
            commandObj.$log.clear();
          } // take care of the content of the processBox
          // commandObj.$log.setContent('');
          // if (
          //   lastProcessObj &&
          //   lastProcessObj.stderr &&
          //   lastProcessObj.stderr.length
          // ) {
          //   lastProcessObj.stderr.forEach((logItem) => {
          //     commandObj.$log.pushLine(__parseHtml(logItem.value || logItem));
          //   });
          // } else if (
          //   lastProcessObj &&
          //   lastProcessObj.stdout &&
          //   lastProcessObj.stdout.length
          // ) {
          //   lastProcessObj.stdout.forEach((logItem) => {
          //     commandObj.$log.pushLine(__parseHtml(logItem.value || logItem));
          //   });
          // }

        } // scroll logBox
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

  }, {
    key: "_updateCommandBoxesLayout",
    value: function _updateCommandBoxesLayout() {
      var currentTop = 0; // this._commands.forEach((commandObj) => {
      //   let boxObj = this._boxesObjectsMap.get(commandObj);
      //   if (this._displayedCommands.indexOf(commandObj) === -1) {
      //     if (!boxObj.$box) return;
      //     boxObj.$box.detach();
      //   } else {
      //     this.$log.append(boxObj.$box);
      //   }
      // });

      this._displayedCommands.forEach((commandObj, i) => {
        var lastProcessObj = commandObj.instance.lastProcessObj;
        var layout = 'default';
        if (this._displayedCommands.length === 2) layout = 'two';
        if (this._displayedCommands.length === 3) layout = 'three';
        if (this._displayedCommands.length === 4) layout = 'four';
        if (this._displayedCommands.length === 5) layout = 'five';
        if (this._displayedCommands.length === 6) layout = 'six';
        if (this._displayedCommands.length === 7) layout = 'seven';
        var width, height, top, left, right, bottom;

        switch (layout) {
          case 'two':
            width = i === 1 && __isOdd(process.stdout.columns) ? '50%-2' : '50%-1';
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
              top = '50%+1'; // height = '50%';

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
              top = '50%+1'; // height = '50%';

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
              left = i * 33 + "%".concat(i === 1 ? '+2' : i === 2 ? '+3' : ''); // right = i === 0 ? '50%+1' : 0;
            } else {
              width = '50%-1'; // height = '50%';

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
              left = i * 33 + "%".concat(i === 1 ? '+2' : i === 2 ? '+3' : ''); // right = i === 0 ? '50%+1' : 0;
            } else {
              width = i === 4 ? '33%-1' : '33%'; // height = '50%';

              top = '50%+1';
              left = (i - 3) * 33 + "%".concat(i === 4 ? '+2' : i === 5 ? '+3' : ''); // left = i === 3 ? 0 : '50%+1';
              // right = i === 3 ? '50%+1' : 0;
            }

            break;

          case 'seven':
            if (i === 0 || i === 1 || i === 2 || i === 3) {
              width = '25%';
              height = '50%';
              top = 0;
              left = i * 25 + "%".concat(i === 1 ? '+2' : i === 2 ? '+3' : i === 3 ? '+5' : ''); // right = i === 0 ? '50%+1' : 0;
            } else {
              width = i === 5 ? '33%-1' : '33%'; // height = '50%';

              top = '50%+1';
              left = (i - 4) * 33 + "%".concat(i === 5 ? '+2' : i === 6 ? '+3' : ''); // left = i === 3 ? 0 : '50%+1';
              // right = i === 3 ? '50%+1' : 0;
            }

            break;
        }

        commandObj.$box.width = width;
        commandObj.$box.height = height;
        commandObj.$box.top = top;
        commandObj.$box.left = left;
        commandObj.$box.right = right;
        commandObj.$box.bottom = bottom; // deletecommandObj.$box.width;
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
  }, {
    key: "update",
    value: function update() {
      if (this.isDestroyed()) return;
      setTimeout(() => {
        // init and update command boxes
        this._updateCommandBoxesStyle(); // update the layout


        this._updateCommandBoxesLayout(); // update the content


        this._updateCommandBoxesContent();

        _get(_getPrototypeOf(SCommandPanel.prototype), "update", this).call(this);
      });
    }
  }]);

  return SCommandPanel;
}(__SComponent), _temp);