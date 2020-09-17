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
 * @namespace           sugar.node.search
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
module.exports = class SSearchResultItem {
  /**
   * @name        _settings
   * @type        Object
   * @private
   *
   * Store the settings of the instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name        _title
   * @type        String
   * @private
   *
   * Store the search result title
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _title = null;

  /**
   * @name        _description
   * @type        String
   * @private
   *
   * Store the search result description
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _description = null;

  /**
   * @name        _action
   * @type        String
   * @private
   *
   * Store the search result action object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _action = null;

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(title, description, action, settings = {}) {
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
  get title() {
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
  get description() {
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
  get action() {
    return this._action;
  }

  /**
   * @name            toJson
   * @type            Function
   *
   * This method return a JSON version of the docMap item
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toJson() {
    return {
      title: this.title,
      description: this.description,
      action: this.action.toJson()
    };
  }
};
