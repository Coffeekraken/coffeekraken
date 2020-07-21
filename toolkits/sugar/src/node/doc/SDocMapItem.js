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
module.exports = class SDocMapItem {
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
   * @name        _source
   * @type        String
   * @private
   *
   * Store the source string on which to work
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _source = null;

  /**
   * @name        _namespace
   * @type        String
   * @private
   *
   * Store the doc namespace
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _namespace = null;

  /**
   * @name        _name
   * @type        String
   * @private
   *
   * Store the doc name
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name        _path
   * @type        String
   * @private
   *
   * Store the doc path if is a file
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _path = null;

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source, settings = {}) {
    // save settings
    this._settings = __deepMerge({}, settings);

    // check if the passed source is a file or not
    if (__isPath(source, true)) {
      let path = __packageRoot();
      if (settings.output && typeof settings.output === 'string')
        path = settings.output.split('/').slice(0, -1).join('/');
      this._path = __path.relative(path, source);
      this._source = __fs.readFileSync(source, 'utf8');
    } else {
      this._source = source;
    }

    // check if we have a docblock that contain a namespace
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
  get name() {
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
  get namespace() {
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
  get path() {
    return this._path;
  }

  /**
   * @name        _buildFromDocblock
   * @type        Function
   * @private
   *
   * This method will parse and extract the docMapItem informations from the docblock
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _buildFromDocblock() {
    const docblock = new __SDocblock(this._source);
    if (!docblock.blocks[0]) return;
    const firstBlock = docblock.blocks[0];

    // extract the infos
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
  toJson() {
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
  _buildFromSimpleSource() {
    // trying to get the namespace and name from comments
    const nameReg = /(<!--|\/\/)\s@name\s+(.+)\s?(-->)?/gm;
    const nameMatches = this._source.match(nameReg);
    if (nameMatches) {
      const name = nameMatches[0]
        .replace('//', '')
        .replace('<!--', '')
        .replace('-->', '')
        .replace('@name', '')
        .trim();
      this._name = name;
    }
    const namespaceReg = /(<!--|\/\/)\s@namespace\s+(.+)\s?(-->)?/gm;
    const namespaceMatches = this._source.match(namespaceReg);
    if (namespaceMatches) {
      const namespace = namespaceMatches[0]
        .replace('//', '')
        .replace('<!--', '')
        .replace('-->', '')
        .replace('@namespace', '')
        .trim();
      this._namespace = __namespace(namespace);
    }

    if (this._name && this._namespace) return;

    // make sure we have a namespace
    if (!this._namespace && this._path) {
      this._namespace = __namespace(this._path);
    }

    // check if its a markdown format
    if (/^#{1,6}\s?.*/gm.exec(this._source)) {
      // extracting the titles
      const titlesMatches = this._source.match(/^#{1,6}\s?.*/gm);
      if (titlesMatches) {
        this._name = __stripTags(titlesMatches[0])
          .replace(/#{1,6}/, '')
          .trim();
      }
    }
  }
};
