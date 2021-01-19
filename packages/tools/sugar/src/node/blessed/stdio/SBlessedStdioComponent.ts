import __SBlessedComponent from '../SBlessedComponent';
import { ILog } from '../../log/log';
import __deepMerge from '../../object/deepMerge';

import ISBlessedStdioComponent, {
  ISBlessedStdioComponentCtor,
  ISBlessedStdioComponentSettings
} from './interface/ISBlessedStdioComponent';

/**
 * @name            SBlessedStdioComponent
 * @namespace       sugar.node.blessed.Stdio
 * @type            Class
 * @extends         SBlessedComponent
 * @state           Beta
 *
 * This represent the base class that all the "Stdio components" classes MUST extends
 *
 * @param       {ILog}          logObj          The logObj to handle
 * @param       {ISBlessedStdioComponentSettings}        [settings={}]       Some settings to configure your Stdio type
 *
 * @example         js
 * import SBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdioComponent';
 * class MyCoolStdioComponent extends SBlessedStdioComponent {
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
const cls: ISBlessedStdioComponentCtor = class ISBlessedStdioComponent
  extends __SBlessedComponent
  implements ISBlessedStdioComponent {
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
  constructor(logObj: ILog, settings: ISBlessedStdioComponentSettings = {}) {
    super(
      __deepMerge(
        {
          blessed: {
            scrollable: true,
            mouse: false,
            keys: false
          }
        },
        settings
      )
    );
    // save the logObj
    this.logObj = logObj;
  }

  update() {
    this.height = 0;
    this.screen.render();
    this.height = this.realHeight;
    super.update();
  }
};
export = cls;
