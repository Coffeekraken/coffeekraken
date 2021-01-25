// @ts-nocheck

import __SBlessedStdioComponent, {
  ISBlessedStdioComponent
} from '../SBlessedStdioComponent';
import __blessed from 'blessed';
import __deepMerge from '../../../object/deepMerge';
import __parseHtml from '../../../console/parseHtml';
import __replaceTokens from '../../../string/replaceTokens';

import { ILog } from '../../../log/log';
import {
  ISBlessedStdioComponentSettings,
  ISBlessedStdioComponentCtor
} from '../SBlessedStdioComponent';

/**
 * @name                SHeadingBlessedStdioComponent
 * @namespace           sugar.node.blessed.stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Beta
 *
 * This represent the "heading" blessed Stdio component
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISHeadingBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SHeadingBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SHeadingBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SHeadingBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISHeadingBlessedStdioComponentSettings
  extends ISBlessedStdioComponentSettings {}

export interface ISHeadingBlessedStdioComponentCtor
  extends ISBlessedStdioComponentCtor {}

export interface ISHeadingBlessedStdioComponent
  extends ISBlessedStdioComponent {}

class SHeadingBlessedStdioComponent
  extends __SBlessedStdioComponent
  implements ISHeadingBlessedStdioComponent {
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
    settings: ISHeadingBlessedStdioComponentSettings = {}
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
    const padLeft = this.parent.padding.left || this.parent.parent.padding.left;
    const padRight =
      this.parent.padding.right || this.parent.parent.padding.right;

    const contentArray = [
      `<[color]>${'-'.repeat(
        this.parent.width - Math.round((padLeft + padRight) / 2)
      )}</[color]>`,
      this.logObj.value,
      `<[color]>${'-'.repeat(
        this.parent.width - Math.round((padLeft + padRight) / 2)
      )}</[color]>`
    ];
    this.setContent(
      __parseHtml(__replaceTokens(contentArray.join('\n'), this.logObj))
    );
    super.update();
  }
}
const cls: ISHeadingBlessedStdioComponentCtor = SHeadingBlessedStdioComponent;
export default SHeadingBlessedStdioComponent;
