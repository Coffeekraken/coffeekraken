"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
const countLine_1 = __importDefault(require("../../string/countLine"));
const hotkey_1 = __importDefault(require("../../keyboard/hotkey"));
const color_1 = __importDefault(require("../../color/color"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const SInput_1 = __importDefault(require("../form/SInput"));
const activeSpace_1 = __importDefault(require("../../core/activeSpace"));
const escapeStack_1 = __importDefault(require("../../terminal/escapeStack"));
module.exports = class SBlessedSummaryList extends SBlessedComponent_1.default {
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
        super(deepMerge_1.default({
            blessed: {
                style: {
                    bg: color_1.default('terminal.black').toString(),
                    item: {
                        bg: color_1.default('terminal.black').toString(),
                        fg: color_1.default('terminal.white').toString()
                    },
                    selected: {
                        bg: color_1.default('terminal.cyan').toString(),
                        fg: color_1.default('terminal.white').toString()
                    }
                }
            }
        }, settings));
        /**
         * @name                  _editingItemIdx
         * @type                  Number
         * @private
         *
         * Store the editing list item index
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._editingItemIdx = null;
        /**
         * @name                  _selectedItemIdx
         * @type                  Number
         * @private
         *
         * Store the selected item index
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._selectedItemIdx = null;
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
        this._isEditing = false;
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
        this.$list = null;
        /**
         * @name                  _items
         * @type                  Array
         *
         * Store the items list
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._items = [];
        // init the actual list component
        this.$list = blessed_1.default.list(Object.assign({ keys: false, mouse: false, interactive: true }, this._settings));
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
            activeSpace_1.default.append('summaryList');
            this._rebuildList();
        });
        this.on('detach', () => {
            activeSpace_1.default.remove('.summaryList');
        });
        this.promise = new SPromise_1.default({
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
        this._escapeHotkey = hotkey_1.default('escape', {
            activeSpace: '**.summaryList'
        }).on('press', (key) => {
            if (escapeStackPromise)
                escapeStackPromise.cancel();
            if (this._isEditing) {
                this._isEditing = false;
            }
            else {
                this._terminate();
                this.promise.cancel();
            }
        });
        this._downHotkey = hotkey_1.default('down', {
            activeSpace: '**.summaryList'
        }).on('press', (key) => {
            if (this._isEditing)
                return;
            this.$list.down(1);
            this._selectedItemIdx = this.$list.selected;
            this._rebuildList();
        });
        this._upHotkey = hotkey_1.default('up', {
            activeSpace: '**.summaryList'
        }).on('press', (key) => {
            if (this._isEditing)
                return;
            this.$list.up(1);
            this._selectedItemIdx = this.$list.selected;
            this._rebuildList();
        });
        this._enterHotkey = hotkey_1.default('enter', {
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
                    this._items[this.$list.selected].value = !this._items[this.$list.selected].value;
                    this._rebuildList();
                    return;
                }
                // init an new empty escape stack
                escapeStackPromise = escapeStack_1.default();
                this._isEditing = true;
                this._editingItemIdx = this.$list.selected;
                this.$editInput = new SInput_1.default({
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
        if (this.$editInput)
            this.remove(this.$editInput);
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
            let value = this._items[i].value !== undefined
                ? this._items[i].value
                : item.default;
            if (this._editingItemIdx === i)
                value = '';
            return parseHtml_1.default((i === this._selectedItemIdx ? ' ' : '') +
                item.text +
                ' '.repeat(longestItemText.length - item.text.length) +
                ' '.repeat(i === this._selectedItemIdx ? 4 : 5) +
                '<yellow>' +
                value +
                '</yellow>');
        });
        listItems.push((this._selectedItemIdx === this._items.length ? ' ' : '') +
            parseHtml_1.default(`<bold>Validate!</bold>`) +
            (this._selectedItemIdx === this._items.length ? ' ' : ''));
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
        this.style.bg = color_1.default('terminal.black').toString();
        this.$list.items.forEach((item) => {
            item.style.bg = color_1.default('terminal.black').toString();
        });
        const selectedItem = this.$list.items[this._selectedItemIdx];
        if (!this._isEditing) {
            selectedItem.style.bg = color_1.default('terminal.cyan').toString();
        }
        selectedItem.position.width =
            countLine_1.default(this._buildBlessedListItemsArray()[this._selectedItemIdx]) +
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
//# sourceMappingURL=module.js.map