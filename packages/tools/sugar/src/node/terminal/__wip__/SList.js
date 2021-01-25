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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFFdkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLFlBQVk7SUFZakMsWUFBWSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFYaEMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixxQkFBZ0IsR0FBRztZQUNqQixHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxDQUFDO1NBQ1AsQ0FBQztRQUNGLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUdoQixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FDMUI7WUFDRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLElBQUksVUFBVTtZQUMzQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FB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