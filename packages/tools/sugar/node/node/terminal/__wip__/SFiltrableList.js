"use strict";
// @ts-nocheck
const __terminalKit = require('terminal-kit').terminal;
const __blessed = require('blessed');
const __get = require('../object/get');
const __crop = require('../string/crop');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');
/**
 * @name                            SFiltrableList
 * @namespace           sugar.node.terminal
 * @type                            Class
 *
 * Allows you to create a nice filtrable (searchable) list input
 *
 * @param             {Object}              [settings={}]     On object of settings to configure the SFiltrableList instance
 *
 * @example           js
 * const SFiltrableList = require('@coffeekraken/node/terminal/SFiltrableList');
 * const myList = new SFiltrableList({
 * });
 * myForm.append(myList);
 *
 * @see       https://github.com/chjj/blessed
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFiltrableList extends __blessed.box {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the STerminalScreen instance which inherit from the blessed.screen stack
     *
     * @param             {Object}                      [settings={}]               An object of blessed screen settings and some others described bellow...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        settings = __deepMerge({
            width: '100%',
            items: [],
            columns: null,
            formaters: {
                selected: (item, i) => `<bgYellow><black> ${item}</black></bgYellow>`,
                item: (item, i) => ` ${item} `
            },
            input: {
                name: 'input',
                height: 1,
                focused: true,
                // input: true,
                //keyable: true,
                // clickable: true,
                inputOnFocus: true,
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 1,
                    right: 1
                }
            },
            label: {
                content: 'Search: '
            },
            list: {}
        }, settings);
        super(settings);
        this._currentInputValue = '';
        this._selectedItemObj = {
            row: 0,
            col: 0
        };
        this._currentSearchNamespaceArray = [];
        this._settings = settings;
        this._input = __blessed.textbox(__deepMerge({
            left: settings.label.content
                ? __countLine(settings.label.content)
                : 0,
            right: 0
        }, settings.input));
        this._label = __blessed.text(__deepMerge({
            left: 0
        }, settings.label));
        this._list = __blessed.box(__deepMerge({
            top: 2,
            left: 0
        }, settings.list));
        this._currentInputValue = this._input.value;
        setTimeout(() => {
            if (this._settings.columns === null) {
                this._settings.columns =
                    this.width >= 200
                        ? 4
                        : this.width >= 100
                            ? 3
                            : this.width >= 50
                                ? 2
                                : 1;
            }
            this.append(this._label);
            this.append(this._input);
            this.append(this._list);
            this._list.setContent(this.get().join('\n'));
            if (this._settings.input.focused) {
                this._input.focus();
            }
            this._listenKeyPress();
            if (this.screen)
                this.screen.render();
        });
    }
    /**
     * @name                        setFormStyle
     * @type                        Function
     *
     * Set the form style. Normaly this is called automatically when you append/prepend your SFiltrableListContainer node to the SForm instance
     *
     * @param               {Object}              style               The style to apply to the form item
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    setFormStyle(style) {
        if (this._input) {
            this._input.style = style;
        }
    }
    /**
     * @name                        _listenKeyPress
     * @type                        Function
     * @private
     *
     * Listen for keys press like UP, DOWN, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _listenKeyPress() {
        __terminalKit.grabInput({ mouse: 'button' });
        __terminalKit.on('key', (name, matches, data) => {
            const eventName = name.toUpperCase();
            switch (eventName) {
                case 'UP':
                    if (this._selectedItemObj.row <= 0)
                        return;
                    if (this._selectedItemObj.row > 0)
                        this._selectedItemObj.row -= 1;
                    break;
                case 'DOWN':
                    const currentColumnItems = this._columns[this._selectedItemObj.col];
                    if (this._selectedItemObj.row >= currentColumnItems.length - 1)
                        return;
                    if (this._selectedItemObj.row < currentColumnItems.length - 1)
                        this._selectedItemObj.row += 1;
                    break;
                case 'RIGHT':
                    if (this._settings.columns <= 1)
                        return;
                    if (!this._columns[this._selectedItemObj.col + 1])
                        return;
                    if (this._selectedItemObj.row >=
                        this._columns[this._selectedItemObj.col + 1].length)
                        return;
                    if (this._selectedItemObj.col < this._settings.columns - 1)
                        this._selectedItemObj.col += 1;
                    break;
                case 'LEFT':
                    if (this._settings.columns <= 1)
                        return;
                    if (this._selectedItemObj.col <= 0)
                        return;
                    if (this._selectedItemObj.col > 0)
                        this._selectedItemObj.col -= 1;
                    break;
                case 'ENTER':
                    const selectedItemObj = this._selectedItem;
                    if (Array.isArray(this._settings.items)) {
                        this._input.setValue(selectedItemObj.raw);
                    }
                    else if (typeof this._settings.items === 'object') {
                        let namespace = this._input.value.split('.');
                        if (namespace.length) {
                            namespace = namespace.slice(0, -1);
                        }
                        namespace = namespace.filter((n) => n !== '');
                        namespace.push(selectedItemObj.value.raw);
                        const value = __get(this._settings.items, namespace.join('.'));
                        if (typeof value !== 'object' || value._sFiltrableListValue) {
                            this._input.setValue(namespace.join('.'));
                            if (this._settings.onSelect)
                                this._settings.onSelect(selectedItemObj);
                            this.emit('select', selectedItemObj);
                        }
                        else {
                            this._input.setValue(namespace.join('.') + '.');
                        }
                    }
                    break;
            }
            if (eventName !== 'UP' &&
                eventName !== 'DOWN' &&
                eventName != 'RIGHT' &&
                eventName !== 'LEFT') {
                this._selectedItemObj.row = 0;
                this._selectedItemObj.col = 0;
            }
            if (eventName !== 'ENTER') {
                if (this._input.value.length <= this._currentInputValue.length - 2) {
                    this._input.setValue(this._currentInputValue.slice(0, -1));
                }
                else if (this._currentInputValue.length <=
                    this._input.value.length - 2) {
                    this._input.setValue(this._input.value.slice(0, -1));
                }
            }
            this._currentInputValue = this._input.value;
            if (eventName === 'CTRL_C' || eventName === 'ESCAPE') {
                process.exit();
            }
            if (eventName !== 'CTRL_C' && eventName !== 'ESCAPE') {
                this._list.setContent(this.get().join('\n'));
                this.screen.render();
                this._input.focus();
            }
        });
    }
    /**
     * @name                          selectedItemObj
     * @type                          Object
     *
     * Access the selected item object
     *
     * @
     */
    get _selectedItem() {
        let selectedItemIdx = this._selectedItemObj.col * this._lines.length +
            this._selectedItemObj.row;
        this._selectedItemObj.idx = selectedItemIdx || 0;
        const selectedItemObj = {
            idx: selectedItemIdx,
            column: this._selectedItemObj.col,
            row: this._selectedItemObj.row,
            value: {}
        };
        let keys = [];
        let rawValue = null;
        let rawSubValue = null;
        if (Array.isArray(this._settings.items)) {
            keys = this._settings.items;
            if (keys[selectedItemIdx]) {
                rawValue = keys[selectedItemIdx];
            }
        }
        else if (typeof this._settings.items === 'object') {
            let namespace = this._input.value.split('.');
            namespace = namespace.filter((n) => n !== '');
            const val = __get(this._settings.items, namespace.join('.'));
            if (Array.isArray(val)) {
                keys = val;
            }
            else if (typeof val === 'object') {
                keys = Object.keys(val);
            }
            if (keys[selectedItemIdx] && val[keys[selectedItemIdx]]) {
                rawValue = keys[selectedItemIdx];
                rawSubValue = val[keys[selectedItemIdx]];
            }
        }
        selectedItemObj.value.raw = rawValue;
        selectedItemObj.value.formated = this._settings.formaters.selected(rawValue, selectedItemIdx);
        if (rawSubValue)
            selectedItemObj.value.sub = rawSubValue;
        return selectedItemObj;
    }
    /**
     * @name                          get
     * @type                          Function
     *
     * Get the SFiltrableList back in String or Array format depending on the passed settings
     *
     * @param         {Object}            [settings={}]             An object of settings. See bellow...
     * - width (100%) {Number|String}: The maximum width that will take the SFiltrableList
     * - columns (1) {Number}: On how many columns will be displayed the SFiltrableList
     * - format (string|array) {String}: Can be 'string' or 'array' depending on the format you want back
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(format = 'array') {
        let lines = [];
        let items = [];
        let searchValue = this._input.value;
        let lastSearchNamespace = this._input.value.split('.').pop();
        if (Array.isArray(this._settings.items)) {
            items = this._settings.items.filter((item) => item.includes(searchValue));
        }
        else if (typeof this._settings.items === 'object') {
            let searchNamespaces = searchValue.split('.');
            searchNamespaces = searchNamespaces.filter((n) => n !== '');
            if (!searchNamespaces.length) {
                items = Object.keys(this._settings.items);
            }
            else if (searchNamespaces.length) {
                let matchingSearch = __get(this._settings.items, searchNamespaces.join('.'));
                if (!matchingSearch) {
                    const searchNamespacesWithoutLast = searchNamespaces.slice(0, -1);
                    matchingSearch = __get(this._settings.items, searchNamespacesWithoutLast.join('.'));
                    if (matchingSearch) {
                        items = Object.keys(matchingSearch);
                    }
                }
                else {
                    items = Object.keys(matchingSearch);
                }
            }
        }
        items = items.filter((i) => i.includes(lastSearchNamespace));
        if (!items.length)
            return format === 'string' ? '' : [];
        let columns = [];
        let splitEvery = Math.ceil(items.length / this._settings.columns);
        if (this._settings.columns > 1 && splitEvery > 0) {
            columns = __splitEvery(items, splitEvery);
        }
        else {
            columns.push(items);
        }
        this._columns = columns;
        if (!columns[0]) {
            return format === 'string' ? '' : [];
        }
        columns[0].forEach((firstColumnItem, rowIdx) => {
            let currentLineIdx = rowIdx;
            let currentLine = '';
            columns.forEach((columnItems, columnIdx) => {
                let maxItemsWidth = 0;
                columnItems.forEach((item) => {
                    const width = __countLine(item);
                    if (width > maxItemsWidth)
                        maxItemsWidth = width;
                });
                let columnWidth = maxItemsWidth;
                columnWidth = this._list.width / this._settings.columns;
                columnWidth = Math.floor(columnWidth);
                if (columnIdx === 0) {
                    if (columnWidth * this._settings.columns < this._list.width) {
                        columnWidth +=
                            this._list.width - columnWidth * this._settings.columns;
                    }
                }
                let itemString = '';
                if (columnItems[currentLineIdx]) {
                    if (rowIdx === this._selectedItemObj.row &&
                        columnIdx === this._selectedItemObj.col) {
                        itemString = this._settings.formaters.selected(columnItems[currentLineIdx], (columnIdx + 1) * (rowIdx + 1));
                    }
                    else {
                        itemString = this._settings.formaters.item(columnItems[currentLineIdx], (columnIdx + 1) * (rowIdx + 1));
                    }
                }
                itemString = __crop(itemString, columnWidth, {
                    splitWords: true
                });
                const itemWidth = itemString ? __countLine(itemString) : 0;
                if (itemWidth > 0) {
                    const hasClosingTag = itemString.match(/<\//);
                    if (hasClosingTag) {
                        const newItem = ' '.repeat(columnWidth - itemWidth) + '</';
                        currentLine += itemString.replace('</', newItem);
                    }
                    else {
                        currentLine += itemString + ' '.repeat(columnWidth - itemWidth);
                    }
                }
                else {
                    currentLine += ' '.repeat(columnWidth);
                }
            });
            lines.push(currentLine);
        });
        // parse each lines
        lines = lines.map((l) => __parseHtml(l));
        this._lines = lines;
        if (format && format.toLowerCase() === 'array') {
            return lines;
        }
        return lines.join('\n');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXJtaW5hbC9fX3dpcF9fL1NGaWx0cmFibGVMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUN2RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFckMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLGNBQWUsU0FBUSxTQUFTLENBQUMsR0FBRztJQVV6RDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLHFCQUFxQixJQUFJLHFCQUFxQjtnQkFDckUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxJ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