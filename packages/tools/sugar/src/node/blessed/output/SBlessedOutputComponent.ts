import __SBlessedComponent from '../SBlessedComponent';
import ILog from '../../log/interface/ILog';
import __deepMerge from '../../object/deepMerge';

import ISBlessedOutputComponent, {
  ISBlessedOutputComponentCtor,
  ISBlessedOutputComponentSettings
} from './interface/ISBlessedOutputComponent';

/**
 * @name            SBlessedOutputComponent
 * @namespace       sugar.node.blessed.output
 * @type            Class
 * @extends         SBlessedComponent
 * @state           Beta
 *
 * This represent the base class that all the "output components" classes MUST extends
 *
 * @param       {ILog}          logObj          The logObj to handle
 * @param       {ISBlessedOutputComponentSettings}        [settings={}]       Some settings to configure your output type
 *
 * @example         js
 * import SBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/SBlessedOutputComponent';
 * class MyCoolOutputComponent extends SBlessedOutputComponent {
 *      construct(logObj, settings={}) {
 *          super(logObj, settings);
 *      }
 *      render() {
 *          // make your render logic here...
 *      }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISBlessedOutputComponentCtor = class ISBlessedOutputComponent
  extends __SBlessedComponent
  implements ISBlessedOutputComponent {
  /**
   * @name        logObj
   * @type        ILog
   *
   * Store the ILog object passed as parameter int he constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  logObj: ILog;

  /**
   * @name        construct
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(logObj: ILog, settings: ISBlessedOutputComponentSettings = {}) {
    super(
      __deepMerge(
        {
          blessed: {
            scrollable: true
          }
        },
        settings
      )
    );
    // save the logObj
    this.logObj = logObj;
  }
};
export = cls;
