import ISHeadingBlessedOutputComponent, {
  ISHeadingBlessedOutputComponentCtor,
  ISHeadingBlessedOutputComponentSettings
} from './interface/ISHeadingBlessedOutputComponent';
import __SBlessedOutputComponent from '../SBlessedOutputComponent';
import ILog from '../../../log/interface/ILog';
import __blessed from 'blessed';
import __deepMerge from '../../../object/deepMerge';
import __parseHtml from '../../../console/parseHtml';
import __replaceTokens from '../../../string/replaceTokens';

/**
 * @name                SHeadingBlessedOutputComponent
 * @namespace           sugar.node.blessed.output.components
 * @type                Class
 * @extends             SBlessedOutputComponent
 * @state               Beta
 *
 * This represent the "heading" blessed output component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISHeadingBlessedOutputComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedOutput class
 * import SBlessedOutput from '@coffeekraken/sugar/node/blessed/output/SBlessedOutput';
 * import SHeadingBlessedOutputComponent from '@coffeekraken/sugar/node/blessed/output/components/SHeadingBlessedOutputComponent';
 * SBlessedOutput.registerComponent(SHeadingBlessedOutputComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISHeadingBlessedOutputComponentCtor = class SHeadingBlessedOutputComponent
  extends __SBlessedOutputComponent
  implements ISHeadingBlessedOutputComponent {
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
  static id = 'heading';

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
    settings: ISHeadingBlessedOutputComponentSettings = {}
  ) {
    const contentArray = ['-', __parseHtml(logObj.value), '-'];

    super(
      {
        color: 'yellow',
        ...logObj
      },
      __deepMerge(
        {
          blessed: {
            content: contentArray.join('\n')
          }
        },
        settings
      )
    );
  }

  update() {
    const contentArray = [
      `<[color]>${'-'.repeat(this.parent.width)}</[color]>`,
      this.logObj.value,
      `<[color]>${'-'.repeat(this.parent.width)}</[color]>`
    ];
    this.setContent(
      __parseHtml(__replaceTokens(contentArray.join('\n'), this.logObj))
    );
    super.update();
  }
};
export = cls;
