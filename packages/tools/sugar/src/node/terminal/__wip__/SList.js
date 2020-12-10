"use strict";
// @ts-nocheck
const __terminalKit = require('terminal-kit').terminal;
const __cursorPos = require('./cursorPos');
const __SInputContainer = require('./SInputContainer');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');
/**
 * @name                            list
 * @namespace           sugar.node.terminal
 * @type                            Function
 *
 * Allows you to create some lists either selectable or not
 *
 * @param             {Array}               items           An array of items in string format or in object format with properties "text" and "value"
 * @param             {Object}              [settings={}]     On object of settings to configure the list like color, etc...
 *
 * @example           js
 * const STerminalList = require('@coffeekraken/node/terminal/STerminalList');
 * const myList = new STerminalList(['Hello','World'], {
 *   item: text => `<white>${text}</white>`,
 *   selected: text => `<bgYellow><black> ${text} </black></bgYellow>`
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class TerminalList {
    constructor(items, settings = {}) {
        this._settings = {};
        this._items = [];
        this._selectedItemObj = {
            row: 0,
            col: 0
        };
        this._lines = [];
        this._columns = [];
        this._searchInput = null;
        this._cursorPos = null;
        this._settings = __deepMerge({
            item: (text, i) => `<white>${text}</white>`,
            selected: (text, i) => `<bgYellow><black> ${text} </black></bgYellow>`,
            width: '100%',
            columns: 3,
            drawOutput: console.log,
            search: true
        }, settings);
        this._items = items;
        this._columnsCount = this._settings.columns;
        this._maxWidth =
            Math.round(process.env.STDOUT_WIDTH || process.stdout.columns) -
                (process.env.STDOUT_PADDING ? process.env.STDOUT_PADDING * 2 : 0);
        // this._events = new __events.EventEmitter();
        this._searchInput = new __SInputContainer({
            message: '<cyan>Search</cyan>'
        });
        this._searchInput.events.on('value', (value) => {
            this.draw();
        });
        // listen for keys
        this._listenKeyPress();
        // listen end of process
        process.on('SIGTERM', () => {
            this.destroy();
        });
    }
    /**
     * @name                        events
     * @type                        EventEmitter
     *
     * Get the event emitter instance on which will be emitted the list events
     *
     * @return            {EventEmitter}                    The event emitter instance
     *
     * @example           js
     * myList.events.on('select', selectedObj => {
     *      // do something...
     * });
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get events() {
        return this._events;
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
                case 'CTRL_C':
                    this.destroy();
                    break;
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
                    if (this._columnsCount <= 1)
                        return;
                    if (!this._columns[this._selectedItemObj.col + 1])
                        return;
                    if (this._selectedItemObj.row >=
                        this._columns[this._selectedItemObj.col + 1].length)
                        return;
                    if (this._selectedItemObj.col < this._columnsCount - 1)
                        this._selectedItemObj.col += 1;
                    break;
                case 'LEFT':
                    if (this._columnsCount <= 1)
                        return;
                    if (this._selectedItemObj.col <= 0)
                        return;
                    if (this._selectedItemObj.col > 0)
                        this._selectedItemObj.col -= 1;
                    break;
                case 'ENTER':
                    // console.log(this._selectedItemObj.col + 1, this._selectedItemObj.row + 1);
                    let selectedItemIdx = this._selectedItemObj.col * this._lines.length +
                        this._selectedItemObj.row;
                    const selectedObj = {
                        id: selectedItemIdx,
                        column: this._selectedItemObj.col,
                        row: this._selectedItemObj.row,
                        raw: this._items[selectedItemIdx],
                        formatted: this._settings.selected(this._items[selectedItemIdx], selectedItemIdx)
                    };
                    if (this._settings._onSelect)
                        this._settings._onSelect(selectedObj);
                    // this._events.emit('select', selectedObj);
                    break;
            }
            if (eventName === 'UP' ||
                eventName === 'DOWN' ||
                eventName === 'LEFT' ||
                eventName === 'RIGHT') {
                this.draw();
            }
        });
    }
    /**
     * @name                              destroy
     * @type                              Function
     *
     * Destroy the list component gracefully
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    destroy() {
        __terminalKit.grabInput(false);
    }
    /**
     * @name                          get
     * @type                          Function
     *
     * Get the list back in String or Array format depending on the passed settings
     *
     * @param         {Object}            [settings={}]             An object of settings. See bellow...
     * - width (100%) {Number|String}: The maximum width that will take the list
     * - columns (1) {Number}: On how many columns will be displayed the list
     * - format (string|array) {String}: Can be 'string' or 'array' depending on the format you want back
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(settings = {}) {
        settings = __deepMerge({
            format: 'array',
            width: this._settings.width,
            columns: this._settings.columns
        }, this._settings, settings);
        if (settings.columns)
            this._columnsCount = settings.columns;
        let lines = [];
        if (settings.search) {
            lines = lines.concat(this._searchInput.get());
        }
        let maxWidth = this._settings.width;
        if (typeof maxWidth === 'string' && maxWidth.slice(-1) === '%') {
            maxWidth = Math.round((this._maxWidth / 100) * parseInt(this._settings.width));
        }
        else if (typeof maxWidth === 'number') {
            maxWidth = Math.round(maxWidth);
        }
        let items = this._items;
        if (this._searchInput.value)
            items = items.filter((item) => item.includes(this._searchInput.value));
        if (!items.length)
            return settings.format === 'string' ? '' : [];
        let columns = [];
        let splitEvery = Math.round(items.length / settings.columns);
        if (settings.columns > 1 && splitEvery > 0) {
            columns = __splitEvery(items, Math.round(items.length / settings.columns));
        }
        else {
            columns.push(items);
        }
        this._columns = columns;
        if (!columns[0]) {
            return settings.format === 'string' ? '' : [];
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
                let itemString = '';
                if (columnItems[currentLineIdx]) {
                    if (rowIdx === this._selectedItemObj.row &&
                        columnIdx === this._selectedItemObj.col) {
                        itemString = this._settings.selected(columnItems[currentLineIdx], (columnIdx + 1) * (rowIdx + 1));
                    }
                    else {
                        itemString = this._settings.item(columnItems[currentLineIdx], (columnIdx + 1) * (rowIdx + 1));
                    }
                }
                let columnWidth = maxItemsWidth;
                columnWidth = Math.round(maxWidth / settings.columns);
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
        // save the lines in class instance
        this._lines = lines;
        if (settings.format && settings.format.toLowerCase() === 'array') {
            return lines;
        }
        return lines.join('\n');
    }
};
//# sourceMappingURL=module.js.map