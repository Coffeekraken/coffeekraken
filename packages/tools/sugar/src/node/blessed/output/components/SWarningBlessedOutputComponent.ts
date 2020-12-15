import ISWarningBlessedOutputComponent, {
  ISWarningBlessedOutputComponentCtor,
  ISWarningBlessedOutputComponentSettings
} from './interface/ISWarningBlessedOutputComponent';
import __SBlessedOutputComponent from '../SBlessedOutputComponent';
import ILog from '../../../log/interface/ILog';
import __blessed from 'blessed';
import __parseHtml from '../../../console/parseHtml';
import __deepMerge from '../../../object/deepMerge';

/**
 * @name                SWarningBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "warning" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISWarningBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SWarningBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SWarningBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SWarningBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISWarningBlessedOutputComponentCtor = class SWarningBlessedOutputComponent
  extends __SBlessedOutputComponent
  implements ISWarningBlessedOutputComponent {
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
  static id = 'warning';

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
    settings: ISWarningBlessedOutputComponentSettings = {}
  ) {
    super(
      logObj,
      __deepMerge({
        blessed: {}
      })
    );

    this._$content = __blessed.box({
      content: __parseHtml(
        ['<yellow><bold>Warning:</bold></yellow>', '', logObj.value].join('\n')
      ),
      top: 0,
      left: 3,
      height: 'shrink',
      style: {}
    });

    this._$line = __blessed.box({
      top: 0,
      left: 0,
      width: 1,
      height: 'shrink',
      style: {
        bg: 'yellow'
      }
    });

    this.append(this._$content);
    this.append(this._$line);
  }

  update() {
    this._$content.height = this.getScrollHeight();
    this._$line.height = this.getScrollHeight();
    super.update();
  }
};
export = cls;
