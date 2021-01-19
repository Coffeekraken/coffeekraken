import ISErrorBlessedStdioComponent, {
  ISErrorBlessedStdioComponentCtor,
  ISErrorBlessedStdioComponentSettings
} from './interface/ISErrorBlessedStdioComponent';
import __SBlessedStdioComponent from '../SBlessedStdioComponent';
import { ILog } from '../../../log/log';
import __blessed from 'blessed';
import __parseHtml from '../../../console/parseHtml';
import __deepMerge from '../../../object/deepMerge';

/**
 * @name                SErrorBlessedStdioComponent
 * @namespace           sugar.node.blessed.stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Beta
 *
 * This represent the "error" blessed Stdio component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISErrorBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SErrorBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SErrorBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SErrorBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISErrorBlessedStdioComponentCtor = class SErrorBlessedStdioComponent
  extends __SBlessedStdioComponent
  implements ISErrorBlessedStdioComponent {
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
  static id = 'error';

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
    settings: ISErrorBlessedStdioComponentSettings = {}
  ) {
    super(
      logObj,
      __deepMerge({
        blessed: {}
      })
    );

    this._$content = __blessed.box({
      content: __parseHtml(
        ['<red><bold>Error:</bold></red>', logObj.value].join('\n')
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
        bg: 'red'
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
