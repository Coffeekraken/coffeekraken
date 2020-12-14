// @ts-nocheck

import __blessed from 'blessed';
import __SBlessedComponent from '../SBlessedComponent';
import __deepMerge from '../../object/deepMerge';
import __parseHtml from '../../terminal/parseHtml';
import __countLine from '../../string/countLine';
import __hotkey from '../../keyboard/hotkey';
import __color from '../../color/color';
import __SPromise from '../../promise/SPromise';
import __SInput from '../form/SInput';
import __multiple from '../../class/multipleExtends';
import __activeSpace from '../../core/activeSpace';
import __escapeStack from '../../terminal/escapeStack';

/**
 * @name                  SBlessedSummaryList
 * @namespace           sugar.node.blessed.list
 * @type                  Class
 * @wip
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedSummaryList from '@coffeekraken/sugar/node/blessed/list/SBlessedSummaryList';
 * const list = new SBlessedSummaryList({});
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SBlessedSummaryList extends __SBlessedComponent {
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
   * @name                $list
   * @type                blessed.List
   * @default             null
   * @private
   *
   * Store the blessed list component
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $list = null;

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
          blessed: {
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
    this.$list = __blessed.list({
      keys: false,
      mouse: false,
      interactive: true,
      ...this._settings
    });

    this.append(this.$list);

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
      __activeSpace.append('summaryList');
      this._rebuildList();
    });
    this.on('detach', () => {
      __activeSpace.remove('.summaryList');
    });

    this.promise = new __SPromise({
      id: 'SBlessedSummaryList'
    });

    this.on = this.promise.on.bind(this.promise);
    this.then = this.promise.then.bind(this.promise);
    this.catch = this.promise.catch.bind(this.promise);

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

    this.$list.select(this._items.length);
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
    let escapeStackPromise;

    this._escapeHotkey = __hotkey('escape', {
      activeSpace: '**.summaryList'
    }).on('press', (key) => {
      if (escapeStackPromise) escapeStackPromise.cancel();
      if (this._isEditing) {
        this._isEditing = false;
      } else {
        this._terminate();
        this.promise.cancel();
      }
    });
    this._downHotkey = __hotkey('down', {
      activeSpace: '**.summaryList'
    }).on('press', (key) => {
      if (this._isEditing) return;
      this.$list.down(1);
      this._selectedItemIdx = this.$list.selected;
      this._rebuildList();
    });
    this._upHotkey = __hotkey('up', {
      activeSpace: '**.summaryList'
    }).on('press', (key) => {
      if (this._isEditing) return;
      this.$list.up(1);
      this._selectedItemIdx = this.$list.selected;
      this._rebuildList();
    });
    this._enterHotkey = __hotkey('enter', {
      activeSpace: '**.summaryList'
    }).on('press', (key) => {
      if (!this._isEditing) {
        if (this.$list.selected === this._items.length) {
          this._terminate();
          this.promise.resolve(this._items);
          return;
        }

        // check if the value is a boolean
        if (typeof this._items[this.$list.selected].default === 'boolean') {
          this._items[this.$list.selected].value = !this._items[
            this.$list.selected
          ].value;
          this._rebuildList();
          return;
        }

        // init an new empty escape stack
        escapeStackPromise = __escapeStack();

        this._isEditing = true;
        this._editingItemIdx = this.$list.selected;
        this.$editInput = new __SInput({
          width: 'auto',
          placeholder: this._items[this.$list.selected].default,
          top: this.$list.selected,
          left: this.getLongestListItemName().length + 4,
          padding: {
            top: 0,
            bottom: 0
          }
        });
        this.$list.style.selected = {
          bg: 'black',
          fg: 'white'
        };
        this.$editInput.promise
          .on('resolve', (value) => {
            this._items[this.$list.selected].value = value;
          })
          .on('cancel,finally', () => {
            setTimeout(() => {
              this._isEditing = false;
              this._editingItemIdx = null;
              this.$editInput.detach();
              this.$list.style.selected = {
                bg: this._settings.style.selected.bg,
                fg: this._settings.style.selected.fg
              };
              this._rebuildList();
            });
          });
        this._rebuildList();
        this.append(this.$editInput);
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
    if (this.$editInput) this.remove(this.$editInput);
    this.$list.detach();
    this._escapeHotkey.cancel();
    this._downHotkey.cancel();
    this._upHotkey.cancel();
    this._enterHotkey.cancel();
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
    const listItems = this._items.map((item, i) => {
      let value =
        this._items[i].value !== undefined
          ? this._items[i].value
          : item.default;
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
    const listItems = this._buildBlessedListItemsArray();
    this.$list.clearItems();
    this.$list.setItems(listItems);
    this.$list.select(this._selectedItemIdx);
    this.$list.items[this._items.length].top += 1;

    this.style.bg = __color('terminal.black').toString();

    this.$list.items.forEach((item) => {
      item.style.bg = __color('terminal.black').toString();
    });

    const selectedItem = this.$list.items[this._selectedItemIdx];
    if (!this._isEditing) {
      selectedItem.style.bg = __color('terminal.cyan').toString();
    }

    selectedItem.position.width =
      __countLine(this._buildBlessedListItemsArray()[this._selectedItemIdx]) +
      (this._selectedItemIdx === this._items.length ? 2 : 1);

    this.update();
  }

  update() {
    this.$list.height = this._items.length + 2;
    this.height = this._items.length + 2;
    setTimeout(() => {
      super.update();
    });
  }
};
