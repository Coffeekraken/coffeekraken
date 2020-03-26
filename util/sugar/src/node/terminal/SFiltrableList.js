const __terminalKit = require('terminal-kit').terminal;
const __blessed = require('blessed');


const __crop = require('../string/crop');
const __splitEvery = require('../array/splitEvery');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('./parseHtml');
const __countLine = require('./countLine');

/**
 * @name                            SFiltrableList
 * @namespace                       sugar.node.terminal
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

  _selectedItemObj = {
    row: 0, col: 0
  };

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
        input: true,
        keyable: true,
        clickable: true,
        inputOnFocus: true,
        padding: {
          top: 0, bottom: 0,
          left: 1, right: 1
        }
      },
      label: {
        content: 'Search: '
      },
      list: {

      }
    }, settings);
    super(settings);

    this._settings = settings;

    this._input = __blessed.textbox(__deepMerge({
      left: settings.label.content ? __countLine(settings.label.content) : 0,
      right: 0,
    }, settings.input));
    this._label = __blessed.text(__deepMerge({
      left: 0
    }, settings.label));
    this._list = __blessed.box(__deepMerge({
      top: 2,
      left: 0
    }, settings.list));

    setTimeout(() => {

      if (this._settings.columns === null) {
        console.log(this.width);
        this._settings.columns = this.width >= 200 ? 4 : this.width >= 100 ? 3 : this.width >= 50 ? 2 : 1;
      }

      this.append(this._label);
      this.append(this._input);
      this.append(this._list);

      this._list.setContent(this.get().join('\n'));

      if (this._settings.input.focused) {
        this._input.focus();
      }

      this._listenKeyPress();

      // console.log(this.width, this.parent.width, this.screen.width);

      // if (this.parent) {
      //   this._input.width = this.width - __countLine(settings.label.content || '');
      //   
      // }

    });

    // console.log(this._list.width);


    // 

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
          if (this._selectedItemObj.row <= 0) return;
          if (this._selectedItemObj.row > 0) this._selectedItemObj.row -= 1;
          break;
        case 'DOWN':
          const currentColumnItems = this._columns[this._selectedItemObj.col];
          if (this._selectedItemObj.row >= currentColumnItems.length - 1) return;
          if (this._selectedItemObj.row < currentColumnItems.length - 1) this._selectedItemObj.row += 1;
          break;
        case 'RIGHT':
          if (this._settings.columns <= 1) return;
          if (!this._columns[this._selectedItemObj.col + 1]) return;
          if (this._selectedItemObj.row >= this._columns[this._selectedItemObj.col + 1].length) return;
          if (this._selectedItemObj.col < this._settings.columns - 1) this._selectedItemObj.col += 1;
          break;
        case 'LEFT':
          if (this._settings.columns <= 1) return;
          if (this._selectedItemObj.col <= 0) return;
          if (this._selectedItemObj.col > 0) this._selectedItemObj.col -= 1;
          break;
        case 'ENTER':
          let selectedItemIdx = this._selectedItemObj.col * this._lines.length + this._selectedItemObj.row;
          const selectedObj = {
            id: selectedItemIdx,
            column: this._selectedItemObj.col,
            row: this._selectedItemObj.row,
            raw: this._settings.items[selectedItemIdx],
            formatted: this._settings.formaters.selected(this._settings.items[selectedItemIdx], selectedItemIdx),
          };
          if (this._settings.onSelect) this._settings.onSelect(selectedObj);
          // this._events.emit('select', selectedObj);
          break;
      }
      this._list.setContent(this.get().join('\n'));
      this.screen.render();
    });
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

    let items = this._settings.items;
    if (this._input.value) items = items.filter(item => item.includes(this._input.value));

    if (!items.length) return format === 'string' ? '' : [];

    let columns = [];
    let splitEvery = Math.round(items.length / this._settings.columns);
    if (this._settings.columns > 1 && splitEvery > 0) {
      columns = __splitEvery(items, Math.round(items.length / this._settings.columns));
    } else {
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
        columnItems.forEach(item => {
          const width = __countLine(item);
          if (width > maxItemsWidth) maxItemsWidth = width;
        });

        let columnWidth = maxItemsWidth;
        columnWidth = this._list.width / this._settings.columns;
        columnWidth = Math.floor(columnWidth);
        if (columnIdx === 0) {
          if (columnWidth * this._settings.columns < this._list.width) {
            columnWidth += this._list.width - (columnWidth * this._settings.columns);
          }
        }

        let itemString = '';
        if (columnItems[currentLineIdx]) {
          if (rowIdx === this._selectedItemObj.row && columnIdx === this._selectedItemObj.col) {
            itemString = this._settings.formaters.selected(columnItems[currentLineIdx], (columnIdx + 1) * (rowIdx + 1));
          } else {
            itemString = this._settings.formaters.item(columnItems[currentLineIdx], (columnIdx + 1) * (rowIdx + 1));
          }
        }
        itemString = __crop(itemString, columnWidth, {
          splitWords: false
        });
        // console.log('COCO', itemString.length, columnWidth);

        const itemWidth = itemString ? __countLine(itemString) : 0;

        // console.log(columnWidth, itemWidth, itemString);

        if (itemWidth > 0) {
          const hasClosingTag = itemString.match(/<\//);
          if (hasClosingTag) {
            const newItem = ' '.repeat(columnWidth - itemWidth) + '</';
            currentLine += itemString.replace('</', newItem);
          } else {
            currentLine += itemString + ' '.repeat(columnWidth - itemWidth);
          }
        } else {
          currentLine += ' '.repeat(columnWidth);
        }

      });

      lines.push(currentLine);

    });

    // parse each lines
    lines = lines.map(l => __parseHtml(l));

    this._lines = lines;

    if (format && format.toLowerCase() === 'array') {
      return lines;
    }
    return lines.join('\n');

  }

}