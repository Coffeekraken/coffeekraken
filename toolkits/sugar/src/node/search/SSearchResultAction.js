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
 * @name              SSearchResultAction
 * @namespace           node.search
 * @type              Class
 *
 * This class represent a search result with all his fields, etc...
 *
 * @param      {String}       source      The source to generate the docMap item. Can be a simple string or a file path
 * @param      {Object}       [settings={}]     A settings object with these properties availble:
 *
 * @example       js
 * const SSearchResultAction = require('@coffeekraken/sugar/node/doc/SSearchResultAction');
 * const myDocMapItem = new SSearchResultAction('something/cool.js');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSearchResultAction {
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
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(type, settings = {}) {
    // save settings
    this._settings = __deepMerge({}, settings);
    // save the type
    this._type = type;
  }

  /**
   * @name        type
   * @type        String
   * @get
   *
   * Access the type property
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get type() {
    return this._type;
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
      type: this._type
    };
  }
};
