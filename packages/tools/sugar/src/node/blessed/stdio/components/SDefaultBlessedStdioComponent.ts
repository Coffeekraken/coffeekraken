import ISDefaultBlessedStdioComponent, {
  ISDefaultBlessedStdioComponentCtor,
  ISDefaultBlessedStdioComponentSettings
} from './interface/ISDefaultBlessedStdioComponent';
import __SBlessedStdioComponent from '../SBlessedStdioComponent';
import { ILog } from '../../../log/log';
import __blessed from 'blessed';
import __deepMerge from '../../../object/deepMerge';
import __parseHtml from '../../../console/parseHtml';

/**
 * @name                SDefaultBlessedStdioComponent
 * @namespace           sugar.node.blessed.Stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Beta
 *
 * This represent the "default" blessed Stdio component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {IDefaultBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SDefaultBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SDefaultBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SDefaultBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISDefaultBlessedStdioComponentCtor = class SDefaultBlessedStdioComponent
  extends __SBlessedStdioComponent
  implements ISDefaultBlessedStdioComponent {
  /**
   * @name        id
   * @type        String
   * @static
   *
   * Specify the "id" string that will be used in the logObj.type property
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static id = 'default';

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    logObj: ILog,
    settings: ISDefaultBlessedStdioComponentSettings = {}
  ) {
    super(
      logObj,
      __deepMerge(
        {
          blessed: {
            content: __parseHtml(logObj.value)
          }
        },
        settings
      )
    );
  }
};
export = cls;
