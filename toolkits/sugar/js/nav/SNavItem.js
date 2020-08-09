"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SNav = _interopRequireDefault(require("./SNav"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SNavItem
 * @namespace           js.nav
 * @type              Class
 *
 * This class represent a navigation item with some properties like the actions, the id, the text, etc...
 *
 * @param       {String}                id                  A uniqid for this nav item
 * @param       {String}                text                The text of the item
 * @param       {String}                action              THe action to do on click. Can be a one of these options:
 * - A standard link like "http://..."
 * - A mailto link like "mailto:olivier.bossel@gmail.com"
 * - A scroll link like "scroll:#something"
 * - Others options coming...
 * @param       {Object}                [settings={}]       A settings object to configure your nav tree
 *
 * @example         js
 * import SNavItem from '@coffeekraken/sugar/js/nav/SNavItem';
 * import SNavItem from '@coffeekraken/sugar/js/SNavItem';
 * const myNav = new SNav([
 *    new SNavItem('myCoolItem', 'Something cool', '#anchorLink')
 * ]);
 *
 * @since         2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SNavItem = /*#__PURE__*/function () {
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
   * Store the id of the nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _text
   * @type          String
   * @private
   *
   * Store the text of the nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _action
   * @type          String
   * @private
   *
   * Store the action of the nav item
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _sNav
   * @type          SNav
   * @private
   *
   * Store the SNav instance in which has been added this nav item
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
  function SNavItem(id, text, action, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SNavItem);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_id", null);

    _defineProperty(this, "_text", {});

    _defineProperty(this, "_action", {});

    _defineProperty(this, "_sNav", null);

    this._settings = (0, _deepMerge.default)({
      markdown: {
        ordered: false
      },
      html: {
        li: {
          class: 's-nav__item'
        },
        a: {
          class: 's-nav__item-link'
        }
      }
    }, settings);
    this._id = id;
    this._text = text;
    this._action = action;
  }
  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the navigation item id
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SNavItem, [{
    key: "toMarkdown",

    /**
     * @name          toMarkdown
     * @type          Function
     *
     * This method transform the navigation item to a markdown string
     *
     * @param         {Object}        [settings=settings.markdown]        An object of settings to use for the conversion. Here's are the available settings:
     * - ordered (false) {Boolean}: Specify if you want an ordered list
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function toMarkdown(settings) {
      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(this._settings.markdown, settings);

      if (settings.ordered && this.index === -1) {
        throw new Error("You want an ordered SNavItem markdown list but this SNavItem \"".concat(this.id, "\" does not belong to any SNav instance..."));
      }

      var bullet = settings.ordered ? this.index : '-';
      var text = '';

      if (this.action) {
        text = "[".concat(this.action, "](").concat(this.text || '...', ")");
      } else {
        text = this.text || '...';
      }

      return "".concat(bullet, " ").concat(text);
    }
    /**
     * @name          toHtml
     * @type          Function
     *
     * This method transform the navigation item to an HTML string
     *
     * @param         {Object}        [settings=settings.html]        An object of settings to use for the conversion. Here's are the available settings:
     * - ordered (false) {Boolean}: Specify if you want an ordered list
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toHtml",
    value: function toHtml(settings) {
      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(this._settings.html, settings);

      if (settings.ordered && this.index === -1) {
        throw new Error("You want an ordered SNavItem HTML list but this SNavItem \"".concat(this.id, "\" does not belong to any SNav instance..."));
      }

      var text = '';

      if (this.action) {
        text = "<li id=\"".concat(this.id, "\" class=\"").concat(settings.li.class, "\"><a href=\"").concat(this.action, "\" class=\"").concat(settings.a.class, "\" target=\"").concat(this.target || '__self', "\">").concat(this.text || '...', "</a></li>");
      } else {
        text = "<li id=\"".concat(this.id, "\" class=\"").concat(settings.li.class, "\">").concat(this.text || '...', "</li>");
      }

      return "".concat(text);
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
    /**
     * @name          index
     * @type          String
     * @get
     *
     * Access the navigation item index in the navigation.
     * Return -1 if not in a navigation
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "index",
    get: function get() {
      if (!this._sNav) return -1;
      return this._sNav.getItemIndex(this);
    }
    /**
     * @name          text
     * @type          String
     * @get
     *
     * Access the navigation item text
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "text",
    get: function get() {
      return this._text;
    }
    /**
     * @name          action
     * @type          String
     * @get
     *
     * Access the navigation item action
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "action",
    get: function get() {
      return this._action;
    }
    /**
     * @name          target
     * @type          String
     * @get
     *
     * Access the navigation item target
     *
     * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "target",
    get: function get() {
      return this._settings.target;
    }
  }]);

  return SNavItem;
}();

exports.default = SNavItem;
module.exports = exports.default;