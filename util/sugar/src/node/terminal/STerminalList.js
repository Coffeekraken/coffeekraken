const __terminalKit = require('terminal-kit');
const __blessed = require('blessed');

const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');

/**
 * @name                            list
 * @namespace                       sugar.node.terminal
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

  _settings = {};
  _items = [];
  _selectedItem = null;
  _lines = [];
  _columns = [];

  constructor(items, settings = {}) {
    this._settings = __deepMerge({
      item: (text, i) => `<white>${text}</white>`,
      selected: (text, i) => `<bgYellow><black> ${text} </black></bgYellow>`
    }, settings);

    this._items = items;

    // init selected item
    if (this._selectedItem === null) {
      this._selectedItem = 0;
    }

  }

  // _createLines() {
  //   this._items.forEach((item, i) => {
  //     let formattedItem = this._settings.item(item, i + 1);
  //     if (i === this._selectedItem) {
  //       formattedItem = this._settings.selected(item, i + 1);
  //     }
  //     formattedItem = __parseHtml(formattedItem);
  //     this._lines.push(formattedItem);
  //   });
  // }

  log(where = console, settings = {}) {

    const data = this.get(settings);
    where.log(data);
  }

  get(settings = {}) {
    settings = __deepMerge({
      format: 'string',
      width: '100%',
      columns: 2
    }, settings);

    let lines = [];

    let items = this._items.map((item, i) => {
      if (i === this._selectedItem) {
        return this._settings.selected(item, i);
      }
      return this._settings.item(item, i);
    });

    let columns = [];
    if (settings.columns > 1) {
      columns = __splitEvery(items, Math.round(items.length / settings.columns));
    } else {
      columns.push(items);
    }

    columns[0].forEach((firstColumnItem, j) => {

      let currentLineIdx = j;
      let currentLine = '';

      columns.forEach((columnItems) => {
        let maxItemsWidth = 0;
        columnItems.forEach(item => {
          const width = __countLine(item);
          if (width > maxItemsWidth) maxItemsWidth = width;
        });

        let columnWidth = maxItemsWidth;
        if (typeof settings.width === 'string' && settings.width.slice(-1) === '%') {
          columnWidth = Math.round(process.stdout.columns / 100 * parseInt(settings.width) / settings.columns);
          columnWidth = Math.round(columnWidth);
        }

        const itemWidth = columnItems[currentLineIdx] ? __countLine(columnItems[currentLineIdx]) : 0;
        if (itemWidth > 0) {
          currentLine += columnItems[currentLineIdx] + ' '.repeat(columnWidth - itemWidth);
        } else {
          currentLine += ' '.repeat(columnWidth);
        }

      });

      lines.push(currentLine);

    });

    // parse each lines
    lines = lines.map(l => __parseHtml(l));

    if (settings.format && settings.format.toLowerCase() === 'array') {
      return lines;
    }
    return lines.join('\n');

  }

}