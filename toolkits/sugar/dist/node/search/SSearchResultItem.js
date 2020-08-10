"use strict";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const __deepMerge = require('../object/deepMerge');

const __isPath = require('../is/path');

const __fs = require('fs');

const __SDocblock = require('../docblock/SDocblock');

const __path = require('path');

const __packageRoot = require('../path/packageRoot');

const __stripTags = require('../html/striptags');

const __getFilename = require('../fs/filename');

const __namespace = require('../package/namespace');
/**
 * @name              SSearchResultItem
 * @namespace           node.search
 * @type              Class
 *
 * This class represent a search result with all his fields, etc...
 *
 * @param      {String}       source      The source to generate the docMap item. Can be a simple string or a file path
 * @param      {Object}       [settings={}]     A settings object with these properties availble:
 *
 * @example       js
 * const SSearchResultItem = require('@coffeekraken/sugar/node/doc/SSearchResultItem');
 * const myDocMapItem = new SSearchResultItem('something/cool.js');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function () {
  /**
   * @name        _settings
   * @type        Object
   * @private
   *
   * Store the settings of the instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _title
   * @type        String
   * @private
   *
   * Store the search result title
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _description
   * @type        String
   * @private
   *
   * Store the search result description
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _action
   * @type        String
   * @private
   *
   * Store the search result action object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SSearchResultItem(title, description, action, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SSearchResultItem);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_title", null);

    _defineProperty(this, "_description", null);

    _defineProperty(this, "_action", null);

    // save settings
    this._settings = __deepMerge({}, settings);
    this._title = title;
    this._description = description;
    this._action = action;
  }
  /**
   * @name        title
   * @type        String
   * @get
   *
   * Access the title property
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SSearchResultItem, [{
    key: "toJson",

    /**
     * @name            toJson
     * @type            Function
     *
     * This method return a JSON version of the docMap item
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function toJson() {
      return {
        title: this.title,
        description: this.description,
        action: this.action.toJson()
      };
    }
  }, {
    key: "title",
    get: function () {
      return this._title;
    }
    /**
     * @name        description
     * @type        String
     * @get
     *
     * Access the description property
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "description",
    get: function () {
      return this._description;
    }
    /**
     * @name        action
     * @type        String
     * @get
     *
     * Access the action property
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "action",
    get: function () {
      return this._action;
    }
  }]);

  return SSearchResultItem;
}(), _temp);