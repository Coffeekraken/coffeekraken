const __blessed = require('blessed');
const __SComponent = require('../SComponent');
const __deepMerge = require('../../object/deepMerge');
const __parseHtml = require('../../terminal/parseHtml');
const __countLine = require('../../string/countLine');
const __hotkey = require('../../keyboard/hotkey');
const __color = require('../../color/color');
const __SPromise = require('../../promise/SPromise');
const __SInput = require('../form/SInput');
const __multiple = require('../../class/multipleExtends');
const __activeSpace = require('../../core/activeSpace');

/**
 * @name                  SSearchableList
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class gives you the ability to display a list in which you can make research
 * and select item with the keyboard or the mouse.
 *
 * @param         {Array}           items                 An array of items object constitued of these properties:
 * - id (null) {String}: The item id
 * - value (null) {String}: The item text to display
 * @param        {Object}         [settings = {}]         A settings object to configure your this. Here's the available settings:
 *
 * @example       js
 * const SSearchableList = require('@coffeekraken/sugar/node/blessed/SSearchableList');
 * const list = new SSearchableList([{
 *    id: 'something',
 *    value: 'Hello world'
 * }]);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSearchableList extends __SComponent {
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
   * @default               []
   * @private
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
          list: {
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
          }
        },
        settings
      )
    );

    // init the actual list component
    this._list = __blessed.list({
      keys: false,
      mouse: false,
      interactive: true,
      ...this._settings.list
    });

    this.append(this._list);

    // save the items
    this._items = items;

    this._editingItemIdx = null;

    this.on('attach', () => {
      // __activeSpace.append('search');
      this._rebuildList();
    });

    this.promise = new __SPromise((resolve, reject, trigger, cancel) => {});

    this.on = this.promise.on.bind(this.promise);
    this.then = this.promise.then.bind(this.promise);
    this.catch = this.promise.catch.bind(this.promise);

    // init hotkeys
    this._initHotkeys();

    this._list.select(0);
    this._selectedItemIdx = 0;
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
    this._escapeHotkey = __hotkey('escape', {
      // activeSpace: '**.summaryList'
    }).on('press', (key) => {
      this._terminate();
      this.promise.cancel();
    });
    this._downHotkey = __hotkey('down', {
      // activeSpace: '**.summaryList'
    }).on('press', (key) => {
      this._list.down(1);
      this._selectedItemIdx = this._list.selected;
      this._rebuildList();
    });
    this._upHotkey = __hotkey('up', {
      // activeSpace: '**.summaryList'
    }).on('press', (key) => {
      this._list.up(1);
      this._selectedItemIdx = this._list.selected;
      this._rebuildList();
    });
    this._enterHotkey = __hotkey('enter', {
      // activeSpace: '**.summaryList'
    }).on('press', (key) => {});
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
    let longestItemValue = '';
    this._items.forEach((item) => {
      if (longestItemValue.length < item.value.length)
        longestItemValue = item.value;
    });
    return longestItemValue;
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
    this._list.detach();
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
    this._list.clearItems();
    this._list.setItems(listItems);
    this._list.select(this._selectedItemIdx);

    this.style.bg = __color('terminal.black').toString();

    this._list.items.forEach((item) => {
      item.style.bg = __color('terminal.black').toString();
    });

    const selectedItem = this._list.items[this._selectedItemIdx];
    selectedItem.style.bg = __color('terminal.cyan').toString();

    this.update();
  }

  update() {
    this._list.height = this._items.length + 2;
    this.height = this._items.length + 2;
    setTimeout(() => {
      super.update();
    });
  }
};
