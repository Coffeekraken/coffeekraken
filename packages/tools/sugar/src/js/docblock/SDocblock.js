import __SError from '../error/SError';
import __deepMerge from '../object/deepMerge';
import __SDocblockBlock from './SDocblockBlock';
import __handlebars from 'handlebars';
// import __markdown from './markdown/index';
import __isNode from '../is/node';
import __isPath from '../is/path';

/**
 * @name                  Dockblock
 * @namespace           sugar.js.docblock
 * @type                  Class
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @param       {String|Object}     source        The docblock source. Can be either a string to parse or a filepath
 * @param       {Object}      [settings={}]       An object of settings to configure the SDocblock instance:
 * - tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```
 *
 * @todo        tests
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SSDocblock';
 * new SDocblock(source, {
 *    // override some settings here...
 * });
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default class SDocblock {
  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store this instance settings
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _settings = {};

  /**
   * @name            _source
   * @type            String|Array<Object>
   * @private
   *
   * Store the passed source
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _source = null;

  /**
   * @name            _blocks
   * @type            Array<Object>
   * @private
   *
   * Store the parsed array of docblock objects
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _blocks = null;

  /**
   * @name          _to
   * @type          String
   * @private
   *
   * Store the format in which the docblocks have to be converted
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _to = null;

  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  constructor(source, settings = {}) {
    this._settings = __deepMerge(
      {
        sortFunction: (a, b) => {
          let res = 0;

          if (!b || !a) return res;

          const aObj = a.toObject(),
            bObj = b.toObject();

          // if (.object.namespace && !aObj.namespace) res -= 1;
          if (bObj.namespace) res += 1;
          if (bObj.type && bObj.type.toLowerCase() === 'class') res += 1;
          if (bObj.constructor) res += 1;
          if (bObj.private) res += 1;
          if (bObj.type && bObj.type.toLowerCase() === 'function') res += 1;
          if (aObj.name && bObj.name && bObj.name.length > aObj.name.length)
            res += 1;
          return res;
        },
        filepath: null,
        to: {
          // markdown: __markdown
        }
      },
      settings
    );

    // check if the source is path
    if (__isPath(source)) {
      if (!__isNode())
        throw new __SError(
          `Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`
        );
      const __fs = require('fs');
      if (!__fs.existsSync(source))
        throw new __SError(
          `Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`
        );
      this._source = __fs.readFileSync(source, 'utf8');
    } else {
      this._source = source;
    }

    // parsing the source
    this.parse();
  }

  /**
   * @name        sort
   * @type        Function
   *
   * This method allows you to set the order in which you want to get the
   * blocks back when using the methods like get blocks, etc...
   *
   * @param       {Function}      [sortFunction=null]       Specify a custom sort function you want to use. If not set, use the ```sortFunction``` setting.
   * @return      {SDocblock}                                   The class instance itself to maintain chainability
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  sort(sortFunction = null) {
    if (!sortFunction) sortFunction = this._settings.sortFunction;
    this._blocks = this._blocks.sort(sortFunction);
    return this;
  }

  /**
   * @name        blocks
   * @type        Array
   *
   * Access the parsed blocks array
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  get blocks() {
    if (!this._blocks) this.parse();
    return this._blocks;
  }

  /**
   * @name          parse
   * @type          Function
   *
   * This method is the principal one. Use it to parse a string
   * and get back the object version of it
   *
   * @param       {String}        [string=this._source]        The string to parse
   * @return      {SDocblock}                     The class instance itself to maintain chainability
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  parse(string = this._source) {
    // extract each docblocks
    const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
    // extracting blocks
    let blocksArray = string.match(reg);

    if (!Array.isArray(blocksArray)) {
      blocksArray = [];
    } else if (Array.isArray(blocksArray) && blocksArray.length) {
      blocksArray = blocksArray.map((t) => t.trim());
      if (!blocksArray || !blocksArray.length) return [];
      blocksArray = blocksArray.map((block) => {
        return new __SDocblockBlock(block || ' ', {
          filepath: this._settings.filepath || ''
        });
      });
    }
    // save the blocks
    this._blocks = blocksArray;

    // sort the blocks
    this.sort();

    // return the class instance itself
    return this;
  }

  /**
   * @name          toObject
   * @type          Function
   *
   * This method convert the parsed docblocks to a simple object
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject() {
    return this.blocks.map((block) => {
      return block.toObject();
    });
  }
}
