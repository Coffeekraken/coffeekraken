import ISWarningBlessedStdioComponent, {
  ISWarningBlessedStdioComponentCtor,
  ISWarningBlessedStdioComponentSettings
} from './interface/ISWarningBlessedStdioComponent';
import __SBlessedStdioComponent from '../SBlessedStdioComponent';
import { ILog } from '../../../log/log';
import __blessed from 'blessed';
import __parseHtml from '../../../console/parseHtml';
import __deepMerge from '../../../object/deepMerge';

/**
 * @name                SWarningBlessedStdioComponent
 * @namespace           sugar.node.blessed.stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Beta
 *
 * This represent the "warning" blessed Stdio component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISWarningBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SWarningBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SWarningBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SWarningBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISWarningBlessedStdioComponentCtor = class SWarningBlessedStdioComponent
  extends __SBlessedStdioComponent
  implements ISWarningBlessedStdioComponent {
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
    settings: ISWarningBlessedStdioComponentSettings = {}
  ) {
    super(
      logObj,
      __deepMerge({
        blessed: {}
      })
    );

    this._$content = __blessed.box({
      content: __parseHtml(
        ['<yellow><bold>Warning:</bold></yellow>', logObj.value].join('\n')
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
    this._$content.height = this.realHeight;
    this._$line.height = this.realHeight;
    super.update();
  }
};
export = cls;
