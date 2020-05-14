const __blessed = require('blessed');
const __SComponent = require('./SComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __countLine = require('../string/countLine');
const __hotkey = require('../keyboard/hotkey');
const __color = require('../color/color');
const __SPromise = require('../promise/SPromise');
const __SInput = require('./SInput');
const __multiple = require('../class/multipleExtends');

/**
 * @name                  SSummaryList
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class gives you the ability to display an editable list of informations.
 * This is very useful to display for example a summary of a command to launch, or whatever...
 *
 * @param         {Array}           items                 An array of items object constitued of these properties:
 * - id (null) {String}: The item id
 * - text (null) {String}: The item text to display before the value
 * - default (null) {String}: The item default value
 * @param        {Object}         [settings = {}]         A settings object to configure your this. Here's the available settings:
 *
 * @example       js
 * const SSummaryList = require('@coffeekraken/sugar/node/blessed/SSummaryList');
 * const list = new SSummaryList({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSummaryList extends __multiple(
  __SComponent,
  __blessed.list
) {
  /**
   * @name                  _editingItemIdx
   * @type                  Number
   * @private
   *
   * Store the editing list item index
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _editingItemIdx = null;

  /**
   * @name                  _selectedItemIdx
   * @type                  Number
   * @private
   *
   * Store the selected item index
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _selectedItemIdx = null;

  /**
   * @name                  _isEditing
   * @type                  Boolean
   * @default               false
   * @private
   *
   * Store if the list is in editing mode or not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isEditing = false;

  /**
   * @name                _list
   * @type                blessed.List
   * @default             null
   * @private
   *
   * Store the blessed list component
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _list = null;

  /**
   * @name                  _items
   * @type                  Array
   *
   * Store the items list
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _items = [];

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(items, settings = {}) {
    super(
      __deepMerge(
        {
          keys: false,
          mouse: false,
          interactive: true,
          style: {
            bg: __color('terminal.black').toString(),
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
        settings
      )
    );
    // save the items
    this._items = items;

    // init settings items
    this._items.forEach((item) => {
      if (item.value === undefined && item.default) {
        item.value = item.default;
      }
    });

    this._editingItemIdx = null;

    this.on('attach', () => {
      this._rebuildList();
    });

    this.promise = new __SPromise((resolve, reject, trigger, cancel) => {});

    // this.on('select', (list) => {
    //   this._terminate();
    //   this.promise.resolve(settings.items[this.selected]);
    // });
    // this.on('cancel', (item) => {
    //   this._terminate();
    //   this.promise.cancel();
    // });

    // init hotkeys
    this._initHotkeys();

    this.select(this._items.length);
    this._selectedItemIdx = this._items.length;
  }

  /**
   * @name            _initHotkeys
   * @type            Function
   * @private
   *
   * This method init the hotkeys
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initHotkeys() {
    this._escapeHotkey = __hotkey('escape').on('press', (key) => {
      if (this._isEditing) {
        this._isEditing = false;
      } else {
        this._terminate();
        this.promise.cancel();
      }
    });
    this._downHotkey = __hotkey('down').on('press', (key) => {
      if (this._isEditing) return;
      this.down(1);
      this._selectedItemIdx = this.selected;
      this._rebuildList();
    });
    this._upHotkey = __hotkey('up').on('press', (key) => {
      if (this._isEditing) return;
      this.up(1);
      this._selectedItemIdx = this.selected;
      this._rebuildList();
    });
    this._enterHotkey = __hotkey('enter').on('press', (key) => {
      if (!this._isEditing) {
        if (this.selected === this._items.length) {
          this._terminate();
          this.promise.resolve(this._items);
          return;
        }

        this._isEditing = true;
        this._editingItemIdx = this.selected;
        this._editInput = new __SInput({
          placeholder: this._items[this.selected].default,
          top: this.selected,
          left: this.getLongestListItemName().length + 4
        });
        this.style.selected = {
          bg: 'black',
          fg: 'white'
        };
        this._editInput.promise
          .on('resolve', (value) => {
            this._items[this.selected].value = value;
          })
          .on('cancel', () => {})
          .on('cancel,finally', () => {
            setTimeout(() => {
              this._isEditing = false;
              this._editingItemIdx = null;
              this.remove(this._editInput);
              this.style.selected = {
                bg: this._settings.style.selected.bg,
                fg: this._settings.style.selected.fg
              };
              this._rebuildList();
            });
          });
        this._rebuildList();
        this.append(this._editInput);
      }
    });
  }

  /**
   * @name            getLongestListItemName
   * @type            Function
   *
   * This method return the longest list item name
   *
   * @return      {String}          The longest list item name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getLongestListItemName() {
    let longestItemText = '';
    this._items.forEach((item) => {
      if (longestItemText.length < item.text.length)
        longestItemText = item.text;
    });
    return longestItemText;
  }

  /**
   * @name            _terminate
   * @type            Function
   * @private
   *
   * This method simply "kill" the component
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _terminate() {
    if (this._editInput) this.remove(this._editInput);
    this._escapeHotkey.cancel();
    this._downHotkey.cancel();
    this._upHotkey.cancel();
    this._enterHotkey.cancel();
    this.update();
  }

  /**
   * @name            _buildBlessedListItemsArray
   * @type            Function
   * @private
   *
   * This method build the blessed list items array to pass to the blessed list component
   *
   * @return      {Array}               The blessed list ready array
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _buildBlessedListItemsArray() {
    const longestItemText = this.getLongestListItemName();
    let listItems = this._items.map((item, i) => {
      let value = this._items[i].value ? this._items[i].value : item.default;
      if (this._editingItemIdx === i) value = '';

      return __parseHtml(
        (i === this._selectedItemIdx ? ' ' : '') +
          item.text +
          ' '.repeat(longestItemText.length - item.text.length) +
          ' '.repeat(i === this._selectedItemIdx ? 4 : 5) +
          '<yellow>' +
          value +
          '</yellow>'
      );
    });
    listItems.push(
      (this._selectedItemIdx === this._items.length ? ' ' : '') +
        __parseHtml(`<bold>Validate!</bold>`) +
        (this._selectedItemIdx === this._items.length ? ' ' : '')
    );
    return listItems;
  }

  /**
   * @name              _rebuildList
   * @type              Function
   * @private
   *
   * This method simply rebuild the blessed list
   *
   *
   */
  _rebuildList() {
    let listItems = this._buildBlessedListItemsArray();
    this.clearItems();
    this.setItems(listItems);
    this.select(this._selectedItemIdx);
    this.items[this._items.length].top += 1;

    this.style.bg = __color('terminal.black').toString();

    this.items.forEach((item) => {
      item.style.bg = __color('terminal.black').toString();
    });

    const selectedItem = this.items[this._selectedItemIdx];
    if (!this._isEditing) {
      selectedItem.style.bg = __color('terminal.cyan').toString();
    }

    selectedItem.position.width =
      __countLine(this._buildBlessedListItemsArray()[this._selectedItemIdx]) +
      (this._selectedItemIdx === this._items.length ? 2 : 1);

    this.update();
  }

  update() {
    this.position.height = this._items.length + 2;
    super.update();
  }
};
