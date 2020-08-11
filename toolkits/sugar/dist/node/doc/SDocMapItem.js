"use strict";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../object/deepMerge');

var __isPath = require('../is/path');

var __fs = require('fs');

var __SDocblock = require('../docblock/SDocblock');

var __path = require('path');

var __packageRoot = require('../path/packageRoot');

var __stripTags = require('../html/striptags');

var __getFilename = require('../fs/filename');

var __namespace = require('../package/namespace');
/**
 * @name              SDocMapItem
 * @namespace           node.doc
 * @type              Class
 *
 * This class represent a docMap item object
 *
 * @param      {String}       source      The source to generate the docMap item. Can be a simple string or a file path
 * @param      {Object}       [settings={}]     A settings object with these properties availble:
 *
 * @example       js
 * const SDocMapItem = require('@coffeekraken/sugar/node/doc/SDocMapItem');
 * const myDocMapItem = new SDocMapItem('something/cool.js');
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
   * @name        _source
   * @type        String
   * @private
   *
   * Store the source string on which to work
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _namespace
   * @type        String
   * @private
   *
   * Store the doc namespace
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _name
   * @type        String
   * @private
   *
   * Store the doc name
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _path
   * @type        String
   * @private
   *
   * Store the doc path if is a file
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
  function SDocMapItem(source, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDocMapItem);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_source", null);

    _defineProperty(this, "_namespace", null);

    _defineProperty(this, "_name", null);

    _defineProperty(this, "_path", null);

    // save settings
    this._settings = __deepMerge({}, settings); // check if the passed source is a file or not

    if (__isPath(source, true)) {
      var path = __packageRoot();

      if (settings.output && typeof settings.output === 'string') path = settings.output.split('/').slice(0, -1).join('/');
      this._path = __path.relative(path, source);
      this._source = __fs.readFileSync(source, 'utf8');
    } else {
      this._source = source;
    } // check if we have a docblock that contain a namespace


    if (/\s?\*\s+?@namespace\s+[a-zA-Z0-9_\-.]+/gm.exec(this._source)) {
      this._buildFromDocblock();
    } else {
      // build the DocMapItem from some less specific info
      this._buildFromSimpleSource();
    }
  }
  /**
   * @name        name
   * @type        String
   * @get
   *
   * Access the name property
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SDocMapItem, [{
    key: "_buildFromDocblock",

    /**
     * @name        _buildFromDocblock
     * @type        Function
     * @private
     *
     * This method will parse and extract the docMapItem informations from the docblock
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function _buildFromDocblock() {
      var docblock = new __SDocblock(this._source);
      if (!docblock.blocks[0]) return;
      var firstBlock = docblock.blocks[0]; // extract the infos

      this._namespace = __namespace(firstBlock.object.namespace || '');
      this._name = firstBlock.object.name;
    }
    /**
     * @name            toJson
     * @type            Function
     *
     * This method return a JSON version of the docMap item
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toJson",
    value: function toJson() {
      return {
        name: this.name,
        namespace: this.namespace,
        path: this.path
      };
    }
    /**
     * @name            _buildFromSimpleSource
     * @type            Function
     * @private
     *
     * This method will try to extract the basic informations from a source that contains other things that docblock
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_buildFromSimpleSource",
    value: function _buildFromSimpleSource() {
      // trying to get the namespace and name from comments
      var nameReg = /(<!--|\/\/)\s@name\s+(.+)\s?(-->)?/gm;

      var nameMatches = this._source.match(nameReg);

      if (nameMatches) {
        var name = nameMatches[0].replace('//', '').replace('<!--', '').replace('-->', '').replace('@name', '').trim();
        this._name = name;
      }

      var namespaceReg = /(<!--|\/\/)\s@namespace\s+(.+)\s?(-->)?/gm;

      var namespaceMatches = this._source.match(namespaceReg);

      if (namespaceMatches) {
        var namespace = namespaceMatches[0].replace('//', '').replace('<!--', '').replace('-->', '').replace('@namespace', '').trim();
        this._namespace = __namespace(namespace);
      }

      if (this._name && this._namespace) return; // make sure we have a namespace

      if (!this._namespace && this._path) {
        this._namespace = __namespace(this._path);
      } // check if its a markdown format


      if (/^#{1,6}\s?.*/gm.exec(this._source)) {
        // extracting the titles
        var titlesMatches = this._source.match(/^#{1,6}\s?.*/gm);

        if (titlesMatches) {
          this._name = __stripTags(titlesMatches[0]).replace(/#{1,6}/, '').trim();
        }
      }
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * @name        namespace
     * @type        String
     * @get
     *
     * Access the namespace property
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "namespace",
    get: function get() {
      return this._namespace;
    }
    /**
     * @name        path
     * @type        String
     * @get
     *
     * Access the path property
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "path",
    get: function get() {
      return this._path;
    }
  }]);

  return SDocMapItem;
}(), _temp);