// @shared

import __SClass from '../class/SClass';
import __SError from '../error/SError';
import __deepMerge from '../object/deepMerge';
import __SDocblockBlock, { ISDocblockBlock } from './SDocblockBlock';
import __handlebars from 'handlebars';
// import __markdown from './markdown/index';
import __isNode from '../is/node';
import __isPath from '../is/path';
import __fs from 'fs';
import SDocblockBlock from './SDocblockBlock';

/**
 * @name                  Dockblock
 * @namespace           sugar.js.docblock
 * @type                  Class
 * @extends             SClass
 * @status              wip
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @param       {String|Object}     source        The docblock source. Can be either a string to parse or a filepath
 * @param       {Object}      [settings={}]       An object of settings to configure the SDocblock instance:
 * - tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```
 *
 * @todo        tests
 * @todo        interface
 * @todo        doc
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

export interface ISDocblockSortFnSetting {
  (a: any, b: any);
}

export interface ISDocblockOptionalSettings {
  filepath?: string;
  sortFunction?: ISDocblockSortFnSetting;
}
export interface ISDocblockSettings {
  filepath?: string;
  sortFunction?: ISDocblockSortFnSetting;
}
export interface ISDocblockCtorSettings {
  docblock?: ISDocblockOptionalSettings;
}

export interface ISDocblock {
  new (source: string, settings?: ISDocblockCtorSettings);
  _source: string;
}

// @ts-ignore
class SDocblock extends __SClass implements ISDocblock {
  /**
   * @name            _source
   * @type            String|Array<Object>
   * @private
   *
   * Store the passed source
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _source: string;

  /**
   * @name            _blocks
   * @type            Array<Object>
   * @private
   *
   * Store the parsed array of docblock objects
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _blocks: any[] = [];

  /**
   * @name          docblockSettings
   * @type          ISDocblockSettings
   * @get
   *
   * Access the docblock settings
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  get docblockSettings(): ISDocblockSettings {
    return (<any>this._settings).docblock;
  }

  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  constructor(source: string, settings?: ISDocblockCtorSettings) {
    super(
      __deepMerge(
        {
          docblock: {
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
          }
        },
        settings || {}
      )
    );

    // check if the source is path
    if (__isPath(source)) {
      if (!__isNode())
        throw new Error(
          `Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`
        );
      if (!__fs.existsSync(source))
        throw new Error(
          `Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`
        );
      this._source = __fs.readFileSync(source, 'utf8');
    } else {
      this._source = source;
    }

    // parsing the source
    this._blocks = this.parse();
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
  sort(sortFunction?: ISDocblockSortFnSetting) {
    if (!sortFunction) sortFunction = this.docblockSettings.sortFunction;
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
   * @return      {Array<SDocblockBlock>}                       An array of SDocblockBlock instances
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  parse(string = this._source): any[] {
    // extract each docblocks
    const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
    // extracting blocks
    // @ts-ignore
    let blocksArrayStr: string[] = string.match(reg);

    let blocks: __SDocblockBlock[] = [];

    if (!Array.isArray(blocksArrayStr)) {
      blocksArrayStr = [];
    } else if (Array.isArray(blocksArrayStr) && blocksArrayStr.length) {
      blocksArrayStr = blocksArrayStr.map((t) => t.trim());
      if (!blocksArrayStr || !blocksArrayStr.length) return [];

      blocks = blocksArrayStr
        .filter((blockStr) => {
          const lines = blockStr.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().slice(0, 2) === '//') return false;
          }
          return true;
        })
        .map((block) => {
          return new __SDocblockBlock(block || ' ', {
            filepath: this.docblockSettings.filepath || ''
          });
        });
    }

    if (blocks && blocks.length) {
      this._blocks = blocks;
    }

    // sort
    this.sort();

    // return the class instance itself
    return this._blocks;
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

export default SDocblock;
