"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SNavItem = _interopRequireDefault(require("./SNavItem"));

var _pretty = _interopRequireDefault(require("pretty"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SNav
 * @namespace         sugar.js.nav
 * @type              Class
 *
 * This class represent a navigation tree that you can manage, add items, and display in multiple formats like html, markdown, and more to come
 *
 * @param       {Array<SNav|SNavItem>}          itemsArray            An array of SNav or SNavItem instance representing a navigation item
 * @param       {Object}                [settings={}]       A settings object to configure your nav tree
 *
 * @example         js
 * import SNav from '@coffeekraken/sugar/js/nav/SNav';
 * import SNavItem from '@coffeekraken/sugar/js/SNavItem';
 * const myNav = new SNav([
 *    new SNavItem('myCoolItem', 'Something cool', '#anchorLink')
 * ]);
 *
 * @since         2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SNav = /*#__PURE__*/function () {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store the settings object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _id
   * @type          String
   * @private
   *
   * Store the uniqid of this navigation
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _text
   * @type          String
   * @private
   *
   * Store the navigation text that can be displayed or not
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _itemsArray
   * @type          Array
   * @private
   *
   * Store the array of SNavItems instances that will compose the navigation
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SNav(id, text, itemsArray, settings = {}) {
    _classCallCheck(this, SNav);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_id", {});

    _defineProperty(this, "_text", {});

    _defineProperty(this, "_itemsArray", []);

    this._settings = (0, _deepMerge.default)({
      markdown: {
        indent: 0
      },
      html: {
        indent: 1,
        ol: {
          class: 's-nav s-nav--ordered'
        },
        ul: {
          class: 's-nav s-nav--unordered'
        },
        child: {
          class: 's-nav__child'
        }
      }
    }, settings);
    this._id = id;
    this._text = text; // setup the promise

    this._promise = new _SPromise.default(() => {}).start(); // add the items

    itemsArray.forEach(item => {
      this.addItem(item);
    });
  }
  /**
   * @name        promise
   * @type        SPromise
   * @get
   *
   * Access the SPromise instance on which you can subscribe for these events:
   * - item.add: Triggered when an item has been added. The item is passed with the event
   * - item.remove: Triggered when an item has been removed. The item is passed with the event
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SNav, [{
    key: "getItemIndex",

    /**
     * @name        getItemIndex
     * @type        Function
     *
     * This method allows you to get the passed item instance index in the navigation
     *
     * @param       {SNavItem}          item          The item instance you want the index for
     * @return      {Number}                          The current index of the item in the navigation
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function getItemIndex(item) {
      const i = this.getItem(item);
      return this._itemsArray.indexOf(i) + 1;
    }
    /**
     * @name        getItem
     * @type        Function
     *
     * This method allows you to get an item using either an index like "0", "1", etc... or a uniqid String
     *
     * @param       {String|Number}           from            The parameter you want to get an index with
     * @return      {SNavItem}                                The found nav item, or false if not found
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "getItem",
    value: function getItem(from) {
      if (from instanceof _SNavItem.default) return from;

      if (typeof from === 'string') {
        const itemArray = this._itemsArray.filter(item => {
          return item.id === from;
        });

        return itemArray[0] || false;
      } else if (typeof from === 'number') {
        return this._itemsArray[from] || false;
      }

      return false;
    }
    /**
     * @name        addItem
     * @type        Function
     *
     * This method is used to add an SNavItem instance to the navigation
     *
     * @param       {SNavItem}        ...items          One or more items to add
     * @return      {SNav}                              The nav instance to maintain chainability
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "addItem",
    value: function addItem(...items) {
      items.forEach(item => {
        item._sNav = this;

        this._promise.trigger('item.add', item);
      });
      this._itemsArray = [...this._itemsArray, ...items];
      return this;
    }
    /**
     * @name        removeItem
     * @type        Function
     *
     * THis method is used to remove an item either by specifying his uniqid, his index in the nav items array or directly the SNavItem instance to remove
     *
     * @param       {String|Number|SNavItem}        ...items          The items identifier to remove. Can be the item uniqid, the index in the nav or the SNavItem instance directly
     * @return      {SNav}                                            The nav instance to maintain chainability
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "removeItem",
    value: function removeItem(...items) {
      items.forEach(item => {
        if (item instanceof _SNavItem.default) {
          const idx = this._itemsArray.indexOf(item);

          if (idx === -1) return;

          this._promise.trigger('item.remove', item);

          item._sNav = null;

          this._itemsArray.splice(idx, 1);
        } else if (typeof item === 'string') {
          const itemArray = this._itemsArray.filter(sNavItem => {
            return sNavItem.id === item;
          });

          if (!itemArray || !itemArray.length) return;

          this._promise.trigger('item.remove', itemArray[0]);

          itemArray[0]._sNav = null;

          this._itemsArray.splice(this._itemsArray.indexOf(itemArray[0]), 1);
        } else if (typeof item === 'number') {
          if (item > this._itemsArray.length - 1) return;

          this._promise.trigger('item.remove', this._itemsArray[item]);

          this._itemsArray[item]._sNav = null;

          this._itemsArray.splice(item, 1);
        }
      });
      return this;
    }
    /**
     * @name          toMarkdown
     * @type          Function
     *
     * This method allows you to get a markdown version of the navigation
     *
     * @param       {Object}        [settings=settings.markdown]        A settings object to configure your markdown conversion:
     * // TODO: list options
     * @return      {String}                            The string version of the navigation
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toMarkdown",
    value: function toMarkdown(settings = {}) {
      settings = (0, _deepMerge.default)(this._settings.markdown, settings);
      const itemsArray = [];

      this._itemsArray.forEach(sNavItem => {
        if (sNavItem instanceof _SNavItem.default) {
          itemsArray.push('\t'.repeat(settings.indent) + sNavItem.toMarkdown(settings));
        } else if (sNavItem instanceof SNav) {
          itemsArray.push(sNavItem.toMarkdown({ ...settings,
            indent: settings.indent + 1
          }));
        }
      });

      return itemsArray.join('\n');
    }
    /**
     * @name          toHtml
     * @type          Function
     *
     * This method allows you to get an HTML version of the navigation
     *
     * @param       {Object}        [settings=settings.html]        A settings object to configure your html conversion:
     * // TODO: list options
     * @return      {String}                            The string version of the navigation
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHtml",
    value: function toHtml(settings = {}) {
      settings = (0, _deepMerge.default)(this._settings.html, settings);
      const itemsArray = [settings.ordered ? `<ol id="${this.id}" class="${settings.ol.class}">` : `<ul id="${this.id}" class="${settings.ul.class}">`];

      this._itemsArray.forEach(sNavItem => {
        if (sNavItem instanceof _SNavItem.default) {
          itemsArray.push('\t'.repeat(settings.indent) + sNavItem.toHtml(settings));
        } else if (sNavItem instanceof SNav) {
          itemsArray.push(`${'\t'.repeat(settings.indent)}<li class="${settings.child.class}">
${sNavItem.toHtml({ ...settings,
            indent: settings.indent + 1
          })}
${'\t'.repeat(settings.indent)}</li>`);
        }
      });

      itemsArray.push(settings.ordered ? `</ol>` : `</ul>`);
      return (0, _pretty.default)(itemsArray.join('\n'));
    }
  }, {
    key: "promise",
    get: function () {
      return this._promise;
    }
    /**
     * @name        id
     * @type        String
     * @get
     *
     * Access the navigation id
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "id",
    get: function () {
      return this._id;
    }
    /**
     * @name        text
     * @type        String
     * @get
     *
     * Access the navigation text
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "text",
    get: function () {
      return this._text;
    }
    /**
     * @name        items
     * @type        Array<SNavItem>
     * @get
     *
     * Access the registered nav items
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "items",
    get: function () {
      return this._itemsArray;
    }
  }]);

  return SNav;
}();

exports.default = SNav;
module.exports = exports.default;