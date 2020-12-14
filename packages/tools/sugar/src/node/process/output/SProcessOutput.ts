// @ts-nocheck

import ISProcessOutput, {
  ISProcessOutputCtor,
  ISProcessOutputSettings
} from './interface/ISProcessOutput';
import ISPromise from '../../promise/interface/ISPromise';
import _deepMerge from '../../object/deepMerge';

/**
 * @name          SProcessOutput
 * @namespace     sugar.node.process
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the process "output"
 * compatible setting.
 *
 * @param     {ISProcessOutputSettings}     [settings={}]       Some settings to configure your output
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SProcessOutput from '@coffeekraken/sugar/node/process/SProcessOutput';
 * class MyCoolProcessOutput extends SProcessOutput {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISProcessOutputCtor = class SProcessOutput
  implements ISProcessOutput {
  /**
   * @name      _settings
   * @type      ISProcessOutputSettings
   * @private
   *
   * Store the process output settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISProcessOutputSettings = {};

  /**
   * @name      _sources
   * @type      Array<SPromise>
   * @private
   *
   * Store sources passed in the contructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _sources: ISPromise[];

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    source: ISPromise | ISPromise[],
    settings: ISProcessOutputSettings = {}
  ) {
    this._sources = Array.isArray(source) ? source : [source];
    this._settings = _deepMerge({}, settings);
  }
};

export = Cls;
