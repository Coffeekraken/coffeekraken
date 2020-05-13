const __blessed = require('blessed');
const __SComponent = require('./SComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __countLine = require('../string/countLine');
const __hotkey = require('../keyboard/hotkey');

/**
 * @name                  SSummaryList
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class gives you the ability to display an editable list of informations.
 * This is very useful to display for example a summary of a command to launch, or whatever...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your this._list. Here's the available settings:
 *
 * @example       js
 * const SSummaryList = require('@coffeekraken/sugar/node/blessed/SSummaryList');
 * const list = new SSummaryList({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSummaryList extends __SComponent {
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
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          items: [],
          list: {
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
          }
        },
        settings
      )
    );

    // init settings items
    this._settings.items.forEach((item) => {
      if (item.value === undefined && item.default) {
        item.value = item.default;
      }
    });

    this._editingItemIdx = null;
    this._list = __blessed.list({
      ...this._settings.list,
      items: this._buildBlessedListItemsArray()
    });

    this._list.promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {}
    );

    // this._list.on('select', (list) => {
    //   this._terminate();
    //   this._list.promise.resolve(settings.items[this._list.selected]);
    // });
    // this._list.on('cancel', (item) => {
    //   this._terminate();
    //   this._list.promise.cancel();
    // });

    // init hotkeys
    this._initHotkeys();

    this._settings.overlayBox.append(this._list);

    this._list.select(this._settings.items.length);

    // let _titleBox = null;
    // if (this._settings.title) {
    //   _titleBox = __blessed.box({
    //     height: 2,
    //     content: __parseHtml(this._settings.title)
    //   });
    // }
    // let _descriptionBox = null;
    // if (this._settings.description) {
    //   _descriptionBox = __blessed.box({
    //     top: _titlebox ? _titleBox.height : 0,
    //     height: 2,
    //     content: this._settings.description
    //   });
    // }

    // if (_titleBox) this._settings.overlayBox.append(_titleBox);
    // if (_descriptionBox) this._settings.overlayBox.append(_descriptionBox);

    // this.append(this._settings.overlayBox);

    // this._list.width = `80%`;
    this._list.height = this._settings.items.length + 1;
    this._list.top = 0;
    this._list.left = 0;

    // const overlayBoxHeight =
    //   this._list.height +
    //   1 +
    //   this._settings.overlayBox.padding.top +
    //   this._settings.overlayBox.padding.bottom +
    //   2;
    // this._settings.overlayBox.top = `50%-${Math.round(
    //   overlayBoxHeight / 2 + 4
    // )}`;
    // this._settings.overlayBox.left = `10%`;
    // this._settings.overlayBox.width = '80%';
    // this._settings.overlayBox.height = overlayBoxHeight;

    this._rebuildList();
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
        this._list.promise.cancel();
      }
    });
    this._downHotkey = __hotkey('down').on('press', (key) => {
      if (this._isEditing) return;
      this._list.down(1);
      this._selectedItemIdx = this._list.selected;
      this._rebuildList();
    });
    this._upHotkey = __hotkey('up').on('press', (key) => {
      if (this._isEditing) return;
      this._list.up(1);
      this._selectedItemIdx = this._list.selected;
      this._rebuildList();
    });
    this._enterHotkey = __hotkey('enter').on('press', (key) => {
      if (!this._isEditing) {
        if (this._list.selected === settings.items.length) {
          this._terminate();
          this._list.promise.resolve(settings.items);
          return;
        }

        this._isEditing = true;
        this._editingItemIdx = this._list.selected;
        this._editInput = this._input({
          placeholder: settings.items[this._list.selected].default,
          top: settings.top + this._list.selected,
          left: settings.left + this.getLongestListItemName().length + 4
        });
        this._list.style.selected = {
          bg: 'black',
          fg: 'white'
        };
        this._editInput.promise
          .on('resolve', (value) => {
            this._isEditing = false;
            this._editingItemIdx = null;
            settings.items[this._list.selected].value = value;
            this._rebuildList();
          })
          .on('cancel', () => {
            this._isEditing = false;
            this._editingItemIdx = null;
          })
          .on('cancel,finally', () => {
            this._settings.logBox.remove(this._editInput);
            this._list.style.selected = {
              bg: this._settings.summary.style.selected.bg,
              fg: this._settings.summary.style.selected.fg
            };
          });
        this._rebuildList();
        this._settings.logBox.append(this._editInput);
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
    this._settings.items.forEach((item) => {
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
    this._settings.overlayBox.remove(this._list);
    if (this._editInput) this._settings.logBox.remove(this._editInput);
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
    let listItems = this._settings.items.map((item, i) => {
      let value = this._settings.items[i].value
        ? this._settings.items[i].value
        : item.default;
      if (this.this._editingItemIdx === i) value = '';

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
      (selected === this._settings.items.length ? ' ' : '') +
        __parseHtml(`<bold>Validate!</bold>`) +
        (selected === this._settings.items.length ? ' ' : '')
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
    this._list.items[this._list.items.length - 1].top += 1;

    const selectedItem = this._list.items[this._selectedItemIdx];
    selectedItem.width =
      __countLine(this._buildBlessedListItemsArray()[this._selectedItemIdx]) +
      (this._selectedItemIdx === this._settings.items.length ? 2 : 1);

    this.update();
  }
};
