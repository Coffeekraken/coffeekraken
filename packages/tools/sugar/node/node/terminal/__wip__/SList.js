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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXJtaW5hbC9fX3dpcF9fL1NMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUV2RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN2RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNuRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sWUFBWTtJQVlqQyxZQUFZLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQVhoQyxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLHFCQUFnQixHQUFHO1lBQ2pCLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7U0FDUCxDQUFDO1FBQ0YsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUMxQjtZQUNFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsSUFBSSxV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