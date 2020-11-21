import ISProcessOutput, {
  ISProcessOutputSettings
} from './interface/ISProcessOutput';
import _deepMerge from '../object/deepMerge';

/**
 * @name          SProcessOutput
 * @namespace     sugar.node.process
 * @type          Class
 *
 * This class represent the base one for all the process "output"
 * compatible setting.
 *
 * @param     {ISProcessOutputSettings}     [settings={}]       Some settings to configure your output
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
export default class SProcessOutput implements ISProcessOutput {
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
  _settings: {};

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
  constructor(settings: ISProcessOutputSettings = {}) {
    this._settings = _deepMerge({}, settings);
  }
}
