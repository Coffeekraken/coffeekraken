const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('./parseHtml');
const __splitEvery = require('../string/splitEvery');
const __countLine = require('../string/countLine');
const __uniqid = require('../string/uniqid');
const __sugarConfig = require('../config/sugar');
const { print, stringify } = require('q-i');
const __SPromise = require('../promise/SPromise');
const __color = require('../color/color');
const __hotkey = require('../keyboard/hotkey');
const __clone = require('../object/clone');

/**
 * @name                    SPanel
 * @namespace               sugar.node.terminal
 * @type                    Class
 *
 * This class define a "panel" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this panel. The name has to stick to this characters only ```[a-zA-Z0-9_-]```
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your panel wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your panel in the terminal. If you have your own screen object
 *
 * @example         js
 * const SPanel = require('@coffeekraken/sugar/node/terminal/SPanel');
 * const panel = new SPanel('my-cool-pannel', {
 * });
 * panel.log('Hello world');
 *
 * @see       https://www.npmjs.com/package/q-i
 * @see       https://www.npmjs.com/package/blessed
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPanel extends __blessed.Box {
  /**
   * @name              _name
   * @type              String
   * @private
   *
   * Store the panel name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the panel settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        name: __uniqid(),
        beforeLog: '',
        beforeEachLine: '',
        padBeforeLog: true,
        screen: false,
        logBox: null,
        input: {
          width: 3,
          height: 1,
          placeholder: null,
          bottom: 0,
          left: 0,
          focus: true,
          keys: true,
          mouse: true,
          inputOnFocus: true,
          style: {
            fg: __color('terminal.black').toString(),
            bg: __color('terminal.yellow').toString()
          },
          padding: {
            top: 0,
            left: 1,
            right: 1,
            bottom: 0
          }
        },
        summary: {
          bottom: 0,
          keys: false,
          mouse: false,
          interactive: true,
          style: {
            item: {
              bg: __color('terminal.black').toString(),
              fg: __color('terminal.white').toString()
            },
            selected: {
              bg: __color('terminal.cyan').toString(),
              fg: __color('terminal.white').toString()
            }
          }
        },
        blessed: {
          mouse: true,
          keys: true,
          vi: true,
          scrollable: true,
          alwaysScroll: true,
          scrollbar: {
            ch: ' ',
            inverse: true
          },
          style: {
            scrollbar: {
              bg: __color('terminal.yellow').toString()
            }
          },
          padding: {
            top: 1,
            bottom: 1,
            left: 1,
            right: 1
          }
        }
      },
      settings
    );

    // create the screen if setted in the settings
    let screenInstance;
    if (_settings.screen === true) {
      screenInstance = __blessed.screen({
        smartCSR: true,
        autoPadding: true,
        cursor: {
          artificial: true,
          shape: {
            bg: __color('terminal.yellow').toString(),
            ch: '|'
            // ch: '█'
          },
          blink: true
        }
      });
    } else if (_settings.screen instanceof __blessed.screen) {
      screenInstance = _settings.screen;
    }
    // extend from blessed.box
    super({
      width: '100%',
      height: '100%'
    });

    // save settings
    this._settings = _settings;

    const _logBox = __blessed.box({
      ...this._settings.blessed
    });
    const _overlayBox = __blessed.box({
      ...this._settings.blessed,
      style: {
        bg: 'black'
      },
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: 'yellow'
        }
      },
      padding: {
        top: 1,
        bottom: 1,
        left: 3,
        right: 3
      }
    });

    // manage logBox setting
    if (!this._settings.logBox) this._settings.logBox = _logBox;
    if (!this._settings.overlayBox) this._settings.overlayBox = _overlayBox;

    // append the logBox to the panel
    this.append(_logBox);

    // append this box to the screen
    if (screenInstance) {
      screenInstance.append(this);
      this.screen = screenInstance;
    }

    // save the name
    if (!/^[a-zA-Z0-9\._-\s]+$/.test(this._settings.name)) {
      throw new Error(
        `The name of an SPanel instance can contain only letters like [a-zA-Z0-9_-. ]...`
      );
    }
    this._name = this._settings.name;

    // render the screen
    if (this.screen) {
      this.screen.title = this._name;
      this.screen.render();
    }
  }

  /**
   * @name                  update
   * @type                  Function
   *
   * This method simply update the screen if the panel is a child of one
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (this.screen) this.screen.render();
  }

  /**
   * @name                  _input
   * @type                  Function
   * @private
   *
   * This method return a pre-configured textbox
   *
   * @param       {Object}      [settings={}]       A blessed textbox settings object with some additional settings:
   * - focus (true) {Boolean}: Specify if you want the input to have focus directly
   * - placeholder (null) {String}: Specify a placeholder to set in the input
   * @return      {Textbox}             A blessed textbox
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _input(settings = {}) {
    settings = __deepMerge(
      {
        focus: true,
        placeholder: null
      },
      __clone(this._settings.input, true),
      settings
    );

    const input = __blessed.textbox(settings);
    input.promise = new __SPromise((resolve, reject, trigger, cancel) => {});

    input.on('attach', () => {
      setTimeout(() => {
        if (settings.focus) input.focus();

        let placeholderPressed = false;
        if (settings.placeholder) {
          const placeholder = settings.placeholder.toString();
          input.setValue(placeholder);
          input.width =
            placeholder.length + input.padding.left + input.padding.right;
        }

        let isBackspace = false;
        input.onceKey('backspace', () => {
          isBackspace = true;
        });

        input.on('keypress', (value) => {
          setTimeout(() => {
            if (settings.placeholder && !placeholderPressed) {
              if (!isBackspace) {
                input.setValue(value);
              }
              placeholderPressed = true;
            }
            input.width =
              input.getValue().length +
              input.padding.left +
              input.padding.right +
              2;
            this.update();
          });
        });
        input.on('submit', (value) => {
          input.promise.resolve(value);
          input.style.bg = __color('terminal.green').toString();
          input.width =
            input.getValue().length + input.padding.left + input.padding.right;
          this.update();
        });
        input.on('cancel', () => {
          input.promise.cancel();
          input.style.bg = __color('terminal.red').toString();
          input.width =
            input.getValue().length + input.padding.left + input.padding.right;
          this.update();
        });
        this.update();
      });
    });
    return input;
  }

  /**
   * @name                   input
   * @type                  Function
   *
   * Allow to display an input to ask something to the user
   *
   * @param       {Object}      [settings = {}]       A settings object to configure your input. Here's the available settings:
   * - width (100%) {String|Number}: Specify the width of your input
   * - height (1) {String|Number}: Specify the height of your input
   * - placeholder (null) {String}: Specify a placeholder to display before the user starts to write something
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  input(settings = {}) {
    settings = __deepMerge(
      this._settings.input,
      {
        top: this._settings.logBox.content.split('\n').length,
        left:
          __countLine(__parseHtml(this._settings.beforeLog)) +
          __countLine(__parseHtml(this._settings.beforeEachLine))
      },
      settings
    );

    const input = this._input(settings);

    setTimeout(() => {
      const _beforeLog =
        __parseHtml(this._settings.beforeLog) +
        __parseHtml(this._settings.beforeEachLine);
      const beforeBox = __blessed.box({
        top: this._settings.logBox.content.split('\n').length,
        left: 0,
        width: __countLine(_beforeLog),
        height: 1,
        content: _beforeLog
      });

      this.log(' ');
      this._settings.logBox.append(beforeBox);
      this._settings.logBox.append(input);
    });

    this._settings.logBox.setScrollPerc(100);

    return input;
  }

  /**
   * @name                  summary
   * @type                  Function
   *
   * Allow to display some editable informations in a list format.
   * This is usefull when you want to propose to the user some default informations that he can update if wanted
   * then send back to the command process
   *
   * @param      {Object}             settings = {}               A settings object to configure your summary input
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  summary(settings = {}) {
    // console.log('P', this._settings.logBox.getScrollPerc());

    settings = __deepMerge({}, __clone(this._settings.summary, true), settings);

    // init settings items
    settings.items.forEach((item) => {
      if (item.value === undefined && item.default) {
        item.value = item.default;
      }
    });

    const getLongestListItem = () => {
      let longestItemText = '';
      settings.items.forEach((item) => {
        if (longestItemText.length < item.text.length)
          longestItemText = item.text;
      });
      return longestItemText;
    };

    const buildListItems = (selected) => {
      const longestItemText = getLongestListItem();
      let listItems = settings.items.map((item, i) => {
        let value = settings.items[i].value
          ? settings.items[i].value
          : item.default;
        if (editingItem === i) value = '';

        return __parseHtml(
          (i === selected ? ' ' : '') +
            item.text +
            ' '.repeat(longestItemText.length - item.text.length) +
            ' '.repeat(i === selected ? 4 : 5) +
            '<yellow>' +
            value +
            '</yellow>'
        );
      });
      listItems.push(
        (selected === settings.items.length ? ' ' : '') +
          __parseHtml(`<bold>Validate!</bold>`) +
          (selected === settings.items.length ? ' ' : '')
      );
      return listItems;
    };

    const rebuildList = () => {
      const selected = list.selected;
      let listItems = buildListItems(selected);
      list.clearItems();
      list.setItems(listItems);
      list.select(selected);
      list.items[list.items.length - 1].top += 1;
      setSelectedItemWidth();
    };

    const _beforeLogLine =
      __parseHtml(this._settings.beforeLog) +
      __parseHtml(this._settings.beforeEachLine);
    const _beforeLogLines = [];
    [...Array(settings.items.length + 2)].forEach((i) => {
      _beforeLogLines.push(_beforeLogLine);
    });
    const beforeBox = __blessed.box({
      top: this._settings.logBox.content.split('\n').length,
      left: 0,
      width: __countLine(_beforeLogLine),
      height: _beforeLogLines.length - 1,
      content: _beforeLogLines.join('\n')
    });

    let editInput;
    let isEditing = false;
    let editingItem = null;
    const list = __blessed.list({
      ...settings,
      items: buildListItems(settings.items.length)
    });

    list.promise = new __SPromise((resolve, reject, trigger, cancel) => {});

    // list.on('select', (list) => {
    //   terminate();
    //   list.promise.resolve(settings.items[list.selected]);
    // });
    // list.on('cancel', (item) => {
    //   terminate();
    //   list.promise.cancel();
    // });

    const escape = __hotkey('escape').on('press', (key) => {
      if (isEditing) {
        isEditing = false;
      } else {
        terminate();
        list.promise.cancel();
      }
    });
    const down = __hotkey('down').on('press', (key) => {
      if (isEditing) return;
      list.down(1);
      rebuildList();
      this.update();
    });
    const up = __hotkey('up').on('press', (key) => {
      if (isEditing) return;
      list.up(1);
      rebuildList();
      this.update();
    });
    const enter = __hotkey('enter').on('press', (key) => {
      if (!isEditing) {
        if (list.selected === settings.items.length) {
          terminate();
          list.promise.resolve(settings.items);
          return;
        }

        isEditing = true;
        editingItem = list.selected;
        editInput = this._input({
          placeholder: settings.items[list.selected].default,
          top: settings.top + list.selected,
          left: settings.left + getLongestListItem().length + 4
        });
        list.style.selected = {
          bg: 'black',
          fg: 'white'
        };
        editInput.promise
          .on('resolve', (value) => {
            isEditing = false;
            editingItem = null;
            settings.items[list.selected].value = value;
            rebuildList();
          })
          .on('cancel', () => {
            isEditing = false;
            editingItem = null;
          })
          .on('cancel,finally', () => {
            this._settings.logBox.remove(editInput);
            list.style.selected = {
              bg: this._settings.summary.style.selected.bg,
              fg: this._settings.summary.style.selected.fg
            };
          });
        rebuildList();
        this._settings.logBox.append(editInput);
      }
    });

    const setSelectedItemWidth = () => {
      const selectedItem = list.items[list.selected];
      selectedItem.width =
        __countLine(buildListItems()[list.selected]) +
        (list.selected === settings.items.length ? 2 : 1);
    };

    const terminate = () => {
      this._settings.overlayBox.remove(list);
      if (editInput) this._settings.logBox.remove(editInput);
      this._settings.logBox.deleteBottom();
      escape.cancel();
      down.cancel();
      up.cancel();
      enter.cancel();
      this.update();
    };

    this._settings.overlayBox.append(list);

    list.select(settings.items.length);

    const _titleBox = __blessed.box({
      height: 2,
      content: __parseHtml('<bold><yellow>Something cool!</yellow></bold><br/>')
    });
    const _descriptionBox = __blessed.box({
      top: _titleBox.height,
      height: 2,
      content:
        'wiejf iowjef oewj foiw jq oiweifo wpjepf io jwqeiq pfjwoi ejoiw jef wipjefoi qjwpef jwoije opwej fpioq wjefoi weiofj woq efjiowe jfpiwo jefoi jweiof jwoij fiwjef pwi jpfqwj fijw pifo wpjf wopj f'
    });

    this._settings.overlayBox.append(_titleBox);
    this._settings.overlayBox.append(_descriptionBox);

    this.append(this._settings.overlayBox);

    // list.width = `80%`;
    list.height =
      settings.items.length + 1 + _titleBox.height + _descriptionBox.height;
    list.top = _titleBox.height + _descriptionBox.height;
    list.left = 0;

    const overlayBoxHeight =
      list.height +
      1 +
      this._settings.overlayBox.padding.top +
      this._settings.overlayBox.padding.bottom +
      2;
    this._settings.overlayBox.top = `50%-${Math.round(
      overlayBoxHeight / 2 + 4
    )}`;
    this._settings.overlayBox.left = `10%`;
    this._settings.overlayBox.width = '80%';
    this._settings.overlayBox.height = overlayBoxHeight;

    rebuildList();

    this.update();

    return list;
  }

  /**
   * @name                  log
   * @type                  Function
   *
   * Allow to log some content in the panel
   *
   * @param       {String}        message         The message to log
   * @param       {Object}        [settings={}]   Some settings to override for this particular log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(message, settings = {}) {
    if (!Array.isArray(message)) message = [message];

    const logSettings = __deepMerge(this._settings, settings);

    let lines = [];

    message.forEach((m) => {
      // check message type
      switch (typeof m) {
        case 'object':
          m = stringify(m);
          break;
      }
      if (Array.isArray(m)) m = stringify(m);

      m = __parseHtml(m || '');

      let beforeLog = logSettings.beforeLog;
      if (beforeLog) {
        if (typeof beforeLog === 'function') {
          beforeLog = beforeLog(m);
        }
        if (typeof beforeLog === 'number') {
          beforeLog = ' '.repeat(parseInt(beforeLog));
        }
      } else {
        beforeLog = '';
      }

      let beforeEachLine = logSettings.beforeEachLine;
      if (beforeEachLine) {
        if (typeof beforeEachLine === 'function') {
          beforeEachLine = beforeEachLine(m);
        }
        if (typeof beforeEachLine === 'number') {
          beforeEachLine = ' '.repeat(parseInt(beforeEachLine));
        }
      } else {
        beforeEachLine = '';
      }

      let formatedBeforeEachLine = __parseHtml(beforeEachLine);
      let formatedBeforeLog = __parseHtml(beforeLog);
      let formatedMessage = m;

      // split lines
      formatedMessage = formatedMessage.split('\n');

      formatedMessage.map((line, i) => {
        line = __splitEvery(
          line,
          this.width -
            logSettings.blessed.padding.left -
            logSettings.blessed.padding.right -
            __countLine(formatedBeforeLog) -
            __countLine(formatedBeforeEachLine)
        );
        line = line.map((l, j) => {
          if (i === 0 && j === 0) {
            return formatedBeforeLog + formatedBeforeEachLine + l;
          } else {
            return (
              ' '.repeat(__countLine(formatedBeforeLog)) +
              formatedBeforeEachLine +
              l
            );
          }
        });

        lines = [...lines, ...line];
      });

      // append the content to the panel
      logSettings.logBox.pushLine(lines.join('\n'));
    });

    // logSettings.logBox.setScrollPerc(100);

    this.update();

    // return the lines
    return lines;
  }
};
