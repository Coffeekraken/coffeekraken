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

const __escapeStack = require('../../terminal/escapeStack');
/**
 * @name                  SSummaryList
 * @namespace           node.blessed.list
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
 * const SSummaryList = require('@coffeekraken/sugar/node/blessed/list/SSummaryList');
 * const list = new SSummaryList({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function (_SComponent) {
  _inherits(SSummaryList, _SComponent);

  var _super = _createSuper(SSummaryList);

  /**
   * @name                  _editingItemIdx
   * @type                  Number
   * @private
   *
   * Store the editing list item index
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _selectedItemIdx
   * @type                  Number
   * @private
   *
   * Store the selected item index
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

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

  /**
   * @name                  _items
   * @type                  Array
   *
   * Store the items list
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SSummaryList(items, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SSummaryList);

    _this = _super.call(this, __deepMerge({
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
    }, settings)); // init the actual list component

    _defineProperty(_assertThisInitialized(_this), "_editingItemIdx", null);

    _defineProperty(_assertThisInitialized(_this), "_selectedItemIdx", null);

    _defineProperty(_assertThisInitialized(_this), "_isEditing", false);

    _defineProperty(_assertThisInitialized(_this), "$list", null);

    _defineProperty(_assertThisInitialized(_this), "_items", []);

    _this.$list = __blessed.list({
      keys: false,
      mouse: false,
      interactive: true,
      ..._this._settings
    });

    _this.append(_this.$list); // save the items


    _this._items = items; // init settings items

    _this._items.forEach(item => {
      if (item.value === undefined && item.default) {
        item.value = item.default;
      }
    });

    _this._editingItemIdx = null;

    _this.on('attach', () => {
      __activeSpace.append('summaryList');

      _this._rebuildList();
    });

    _this.on('detach', () => {
      __activeSpace.remove('.summaryList');
    });

    _this.promise = new __SPromise((resolve, reject, trigger, cancel) => {});
    _this.on = _this.promise.on.bind(_this.promise);
    _this.then = _this.promise.then.bind(_this.promise);
    _this.catch = _this.promise.catch.bind(_this.promise); // this.on('select', (list) => {
    //   this._terminate();
    //   this.promise.resolve(settings.items[this.selected]);
    // });
    // this.on('cancel', (item) => {
    //   this._terminate();
    //   this.promise.cancel();
    // });
    // init hotkeys

    _this._initHotkeys();

    _this.$list.select(_this._items.length);

    _this._selectedItemIdx = _this._items.length;
    return _this;
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


  _createClass(SSummaryList, [{
    key: "_initHotkeys",
    value: function _initHotkeys() {
      let escapeStackPromise;
      this._escapeHotkey = __hotkey('escape', {
        activeSpace: '**.summaryList'
      }).on('press', key => {
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
      }).on('press', key => {
        if (this._isEditing) return;
        this.$list.down(1);
        this._selectedItemIdx = this.$list.selected;

        this._rebuildList();
      });
      this._upHotkey = __hotkey('up', {
        activeSpace: '**.summaryList'
      }).on('press', key => {
        if (this._isEditing) return;
        this.$list.up(1);
        this._selectedItemIdx = this.$list.selected;

        this._rebuildList();
      });
      this._enterHotkey = __hotkey('enter', {
        activeSpace: '**.summaryList'
      }).on('press', key => {
        if (!this._isEditing) {
          if (this.$list.selected === this._items.length) {
            this._terminate();

            this.promise.resolve(this._items);
            return;
          } // check if the value is a boolean


          if (typeof this._items[this.$list.selected].default === 'boolean') {
            this._items[this.$list.selected].value = !this._items[this.$list.selected].value;

            this._rebuildList();

            return;
          } // init an new empty escape stack


          escapeStackPromise = __escapeStack(() => {});
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
          this.$editInput.promise.on('resolve', value => {
            this._items[this.$list.selected].value = value;
          }).on('cancel', () => {}).on('cancel,finally', () => {
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

  }, {
    key: "getLongestListItemName",
    value: function getLongestListItemName() {
      let longestItemText = '';

      this._items.forEach(item => {
        if (longestItemText.length < item.text.length) longestItemText = item.text;
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

  }, {
    key: "_terminate",
    value: function _terminate() {
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

  }, {
    key: "_buildBlessedListItemsArray",
    value: function _buildBlessedListItemsArray() {
      const longestItemText = this.getLongestListItemName();

      let listItems = this._items.map((item, i) => {
        let value = this._items[i].value !== undefined ? this._items[i].value : item.default;
        if (this._editingItemIdx === i) value = '';
        return __parseHtml((i === this._selectedItemIdx ? ' ' : '') + item.text + ' '.repeat(longestItemText.length - item.text.length) + ' '.repeat(i === this._selectedItemIdx ? 4 : 5) + '<yellow>' + value + '</yellow>');
      });

      listItems.push((this._selectedItemIdx === this._items.length ? ' ' : '') + __parseHtml(`<bold>Validate!</bold>`) + (this._selectedItemIdx === this._items.length ? ' ' : ''));
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

  }, {
    key: "_rebuildList",
    value: function _rebuildList() {
      let listItems = this._buildBlessedListItemsArray();

      this.$list.clearItems();
      this.$list.setItems(listItems);
      this.$list.select(this._selectedItemIdx);
      this.$list.items[this._items.length].top += 1;
      this.style.bg = __color('terminal.black').toString();
      this.$list.items.forEach(item => {
        item.style.bg = __color('terminal.black').toString();
      });
      const selectedItem = this.$list.items[this._selectedItemIdx];

      if (!this._isEditing) {
        selectedItem.style.bg = __color('terminal.cyan').toString();
      }

      selectedItem.position.width = __countLine(this._buildBlessedListItemsArray()[this._selectedItemIdx]) + (this._selectedItemIdx === this._items.length ? 2 : 1);
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      this.$list.height = this._items.length + 2;
      this.height = this._items.length + 2;
      setTimeout(() => {
        _get(_getPrototypeOf(SSummaryList.prototype), "update", this).call(this);
      });
    }
  }]);

  return SSummaryList;
}(__SComponent), _temp);