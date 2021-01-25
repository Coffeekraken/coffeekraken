import __SBlessedStdioComponent from '../SBlessedStdioComponent';
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
 * @name                SFileBlessedStdioComponent
 * @namespace           sugar.node.blessed.stdio.components
 * @type                Class
 * @extends             SBlessedStdioComponent
 * @state               Wip
 *
 * This represent the "file" blessed Stdio component that support some "actions" like:
 * - save
 * - delete
 * - update
 * - more to come...
 *
 * @param           {ILog}      logObj          The log object to use
 * @param           {ISFileBlessedStdioComponentSettings}         [settings={}]       Some settings to configure your display
 *
 * @todo            Implement file actions correctly
 *
 * @example         js
 * // register the component in the SBlessedStdio class
 * import SBlessedStdio from '@coffeekraken/sugar/node/blessed/stdio/SBlessedStdio';
 * import SFileBlessedStdioComponent from '@coffeekraken/sugar/node/blessed/stdio/components/SFileBlessedStdioComponent';
 * SBlessedStdio.registerComponent(SFileBlessedStdioComponent);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISFileBlessedStdioComponentSettings
  extends ISBlessedStdioComponentSettings {}

export interface ISFileBlessedStdioComponentCtor
  extends ISBlessedStdioComponentCtor {}

export interface ISFileBlessedStdioComponent {}

class SFileBlessedStdioComponent
  extends __SBlessedStdioComponent
  implements ISFileBlessedStdioComponent {
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
  static id = 'file';

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
    settings: ISFileBlessedStdioComponentSettings = {}
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
            content: ''
          }
        },
        settings
      )
    );
  }

  update() {
    // this.setContent(
    //   __parseHtml(__replaceTokens(contentArray.join('\n'), this.logObj))
    // );
    super.update();
  }
}

const cls: ISFileBlessedStdioComponentCtor = SFileBlessedStdioComponent;
export default SFileBlessedStdioComponent;
