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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmlsdHJhYmxlTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXJDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNuRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxjQUFlLFNBQVEsU0FBUyxDQUFDLEdBQUc7SUFVekQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixRQUFRLEdBQUcsV0FBVyxDQUNwQjtZQUNFLEtBQUssRUFBRSxNQUFNO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsSUFBSSxxQkFBcUI7Z0JBQ3JFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxHQUFHO2FBQy9CO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULE9BQU8sRUFBRSxJQUFJO2dCQUNiLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixtQkFBbUI7Z0JBQ25CLFlBQVksRUFBRSxJQUFJO2dCQUNsQixPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7YUFDRjtZQUNELEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsVUFBVTthQUNwQjtZQUNELElBQUksRUFBRSxFQUFFO1NBQ1QsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQW5EbEIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRXhCLHFCQUFnQixHQUFHO1lBQ2pCLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7U0FDUCxDQUFDO1FBRUYsaUNBQTRCLEdBQUcsRUFBRSxDQUFDO1FBOENoQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzdCLFdBQVcsQ0FDVDtZQUNFLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQzFCLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsS0FBSyxFQUFFLENBQUM7U0FDVCxFQUNELFFBQVEsQ0FBQyxLQUFLLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUMxQixXQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUUsQ0FBQztTQUNSLEVBQ0QsUUFBUSxDQUFDLEtBQUssQ0FDZixDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQ3hCLFdBQVcsQ0FDVDtZQUNFLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7U0FDUixFQUNELFFBQVEsQ0FBQyxJQUFJLENBQ2QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRTVDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO29CQUNwQixJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUc7d0JBQ2YsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRzs0QkFDbkIsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQ0FDbEIsQ0FBQyxDQUFDLENBQUM7Z0NBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNUO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTdDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLE1BQU07Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLENBQUMsS0FBSztRQUNoQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxlQUFlO1FBQ2IsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLGFBQWEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsUUFBUSxTQUFTLEVBQUU7Z0JBQ2pCLEtBQUssSUFBSTtvQkFDUCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFBRSxPQUFPO29CQUMzQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsTUFBTTtnQkFDUixLQUFLLE1BQU07b0JBQ1QsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDO3dCQUM1RCxPQUFPO29CQUNULElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDM0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1IsS0FBSyxPQUFPO29CQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQzt3QkFBRSxPQUFPO29CQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFBRSxPQUFPO29CQUMxRCxJQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO3dCQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTt3QkFFbkQsT0FBTztvQkFDVCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1IsS0FBSyxNQUFNO29CQUNULElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQzt3QkFBRSxPQUFPO29CQUN4QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFBRSxPQUFPO29CQUMzQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFFM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDM0M7eUJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTt3QkFDbkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7NEJBQ3BCLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNwQzt3QkFDRCxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzFDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQy9ELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsRUFBRTs0QkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUUxQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtnQ0FDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO3lCQUN0Qzs2QkFBTTs0QkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3lCQUNqRDtxQkFDRjtvQkFFRCxNQUFNO2FBQ1Q7WUFFRCxJQUNFLFNBQVMsS0FBSyxJQUFJO2dCQUNsQixTQUFTLEtBQUssTUFBTTtnQkFDcEIsU0FBUyxJQUFJLE9BQU87Z0JBQ3BCLFNBQVMsS0FBSyxNQUFNLEVBQ3BCO2dCQUNBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUMvQjtZQUVELElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDNUQ7cUJBQU0sSUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTTtvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDNUI7b0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFFNUMsSUFBSSxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoQjtZQUNELElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxhQUFhO1FBQ2YsSUFBSSxlQUFlLEdBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxlQUFlLElBQUksQ0FBQyxDQUFDO1FBQ2pELE1BQU0sZUFBZSxHQUFHO1lBQ3RCLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRztZQUNqQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7WUFDOUIsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbEM7U0FDRjthQUFNLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDbkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLENBQUM7YUFDWjtpQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7WUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZELFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pDLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDMUM7U0FDRjtRQUVELGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ2hFLFFBQVEsRUFDUixlQUFlLENBQ2hCLENBQUM7UUFDRixJQUFJLFdBQVc7WUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7UUFFekQsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEdBQUcsQ0FBQyxNQUFNLEdBQUcsT0FBTztRQUNsQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFZixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU3RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDM0U7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ25ELElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO2dCQUM1QixLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNDO2lCQUFNLElBQUksZ0JBQWdCLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUNwQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQzNCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDbkIsTUFBTSwyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLGNBQWMsR0FBRyxLQUFLLENBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUNwQiwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ3RDLENBQUM7b0JBQ0YsSUFBSSxjQUFjLEVBQUU7d0JBQ2xCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjtxQkFBTTtvQkFDTCxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDckM7YUFDRjtTQUNGO1FBRUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFeEQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDaEQsT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN0QztRQUVELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDO1lBQzVCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUVyQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDM0IsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQyxJQUFJLEtBQUssR0FBRyxhQUFhO3dCQUFFLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQztnQkFDaEMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUN4RCxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO29CQUNuQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDM0QsV0FBVzs0QkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7cUJBQzNEO2lCQUNGO2dCQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUU7b0JBQy9CLElBQ0UsTUFBTSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO3dCQUNwQyxTQUFTLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFDdkM7d0JBQ0EsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDNUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUMzQixDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDL0IsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUN4QyxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQzNCLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUMvQixDQUFDO3FCQUNIO2lCQUNGO2dCQUNELFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRTtvQkFDM0MsVUFBVSxFQUFFLElBQUk7aUJBQ2pCLENBQUMsQ0FBQztnQkFFSCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7b0JBQ2pCLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLElBQUksYUFBYSxFQUFFO3dCQUNqQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQzNELFdBQVcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztxQkFDbEQ7eUJBQU07d0JBQ0wsV0FBVyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQztxQkFDakU7aUJBQ0Y7cUJBQU07b0JBQ0wsV0FBVyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO1lBQzlDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUMifQ==