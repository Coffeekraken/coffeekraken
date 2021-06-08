import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocblockBlock, { ISDocblockBlock } from './SDocblockBlock';
// import __markdown from './markdown/index';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __isPath from '@coffeekraken/sugar/shared/is/path';

/**
 * @name                  Dockblock
 * @namespace           shared
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
export interface ISDocblockSettings {
  filepath?: string;
  filterByTag: Record<string, any>;
  sortFunction?: ISDocblockSortFnSetting;
}
export interface ISDocblockCtorSettings {
  docblock?: Partial<ISDocblockSettings>;
}

export interface ISDocblock {
  // new (source: string, settings?: ISDocblockCtorSettings);
  _source: string;
  blocks: ISDocblockBlock[];
  toObject(): any;
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
            filterByTag: undefined,
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
      const __fs = require('fs');
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
   * @return      {SDocblock}                                   The class instance itself to maintain chainability
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

  // /**
  //  * @name        getBlockByName
  //  * @type        Function
  //  *
  //  * Get a block by it's name
  //  *
  //  * @param       {String}        name      The name you want to get block for
  //  * @return      SDocblockBlock            The getted block
  //  *
  //  * @since     2.0.0
  //  * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // getBlockByName(name: string): __SDocblockBlock {
  //   // for (let i = 0; this._blocks.length; i++) {
  //   //   const block = this._blocks[i];
  //   //   console.log(block);
  //   // }
  // }

  /**
   * @name          parse
   * @type          Function
   *
   * This method is the principal one. Use it to parse a string
   * and get back the object version of it
   *
   * @param       {String}        [string=this._source]        The string to parse
   * @return      {Array<SDocblockBlock>}                       An array of SDocblockBlock instances
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

          if (this.docblockSettings.filterByTag) {
            let isBlockMatchFilter = true;
            for (
              let i = 0;
              i < Object.keys(this.docblockSettings.filterByTag).length;
              i++
            ) {
              const tagName = Object.keys(this.docblockSettings.filterByTag)[i];
              const tagFilter = this.docblockSettings.filterByTag[tagName];
              const tagValueReg = new RegExp(`@${tagName}([^\n]+)`);
              const tagValue = blockStr.match(tagValueReg);
              const tagFilterArray = Array.isArray(tagFilter)
                ? tagFilter
                : [tagFilter];
              let isMatchOrCondition = false;
              if (tagValue && tagValue[1]) {
                const tagValueValue = tagValue[1].trim();
                for (let j = 0; j < tagFilterArray.length; j++) {
                  const tagFilterFilter = tagFilterArray[j];
                  if (typeof tagFilterFilter === 'string') {
                    if (tagValueValue === tagFilterFilter) {
                      isMatchOrCondition = true;
                      break;
                    }
                  } else if (tagFilterFilter instanceof RegExp) {
                    if (tagValueValue.trim().match(tagFilterFilter)) {
                      isMatchOrCondition = true;
                      break;
                    }
                  } else if (typeof tagFilterFilter === 'function') {
                    if (tagFilterFilter(tagValueValue.trim())) {
                      isMatchOrCondition = true;
                      break;
                    }
                  } else {
                    throw new Error(
                      `<red>[${this.constructor.name}]</red> Sorry but the passed "<yellow>${tagName}</yellow>" filterByTag filter can be only a RegExp or a function`
                    );
                  }
                }
              }
              if (!isMatchOrCondition) isBlockMatchFilter = false;
            }
            if (isBlockMatchFilter) return true;
            return false;
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

  /**
   * @name        toString
   * @type        Function
   *
   * This method allows you to get the string version of the docblock(s)
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString() {
    return this.blocks
      .map((block) => {
        return block.toString();
      })
      .join('\n');
  }
}

export default SDocblock;
