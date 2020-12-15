import ISDefaultBlessedOutputComponent, {
  ISDefaultBlessedOutputComponentCtor,
  ISDefaultBlessedOutputComponentSettings
} from './interface/ISDefaultBlessedOutputComponent';
import __SBlessedOutputComponent from '../SBlessedOutputComponent';
import ILog from '../../../log/interface/ILog';
import __blessed from 'blessed';
import __deepMerge from '../../../object/deepMerge';
import __parseHtml from '../../../console/parseHtml';

/**
 * @name                SDefaultBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "default" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {IDefaultBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SDefaultBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SDefaultBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SDefaultBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISDefaultBlessedOutputComponentCtor = class SDefaultBlessedOutputComponent
  extends __SBlessedOutputComponent
  implements ISDefaultBlessedOutputComponent {
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
    settings: ISDefaultBlessedOutputComponentSettings = {}
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
