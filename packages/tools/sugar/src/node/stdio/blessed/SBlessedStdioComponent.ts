// @ts-nocheck

import { ILog } from '../../log/log';
import __deepMerge from '../../object/deepMerge';

import __SBlessedComponent, {
  ISBlessedComponent,
  ISBlessedComponentSettings,
  ISBlessedComponentCtor
} from '../../blessed/SBlessedComponent';

/**
 * @name            SBlessedStdioComponent
 * @namespace       sugar.node.stdio.blessed
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

export interface ISBlessedStdioComponentSettings
  extends ISBlessedComponentSettings {}

export interface ISBlessedStdioComponentCtor {
  new (logObj: ILog, settings?: ISBlessedStdioComponentSettings);
  id?: string;
}

export interface ISBlessedStdioComponent extends ISBlessedComponent {
  logObj?: ILog;
}

class SBlessedStdioComponent
  extends __SBlessedComponent
  implements ISBlessedStdioComponent {
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
    if (!this.isDisplayed()) return;
    this.height = 0;
    this.screen.render();
    this.height = this.realHeight;
    super.update();
  }
}

const cls: ISBlessedStdioComponentCtor = SBlessedStdioComponent;

export default SBlessedStdioComponent;
