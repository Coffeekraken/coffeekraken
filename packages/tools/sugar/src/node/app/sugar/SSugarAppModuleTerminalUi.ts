// @ts-nocheck

import __blessed from 'neo-blessed';
import __SBlessedComponent from '../../blessed/SBlessedComponent';
import __deepMerge from '../../object/deepMerge';
import __SBlessedOutput from '../../blessed/SBlessedOutput';
import __parseHtml from '../../terminal/parseHtml';

/**
 * @name            SSugarAppModuleTerminalUi
 * @namespace       sugar.node.app.sugar
 * @type            Class
 * @extends         SBlessedComponent
 * @wip
 *
 * This class represent the main one to create some UI that fit in the SSugarAppTerminalUi
 * based terminal interface
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your terminal interface
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSugarAppModuleTerminalUi from '@coffeekraken/sugar/node/app/sugar/SSugarAppModuleTerminalUi';
 * class MyUi extends SSugarAppModuleTerminalUi {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 * }
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarAppModuleTerminalUi extends __SBlessedComponent {
  /**
   * @name        constructor
   * @type         Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(sources, settings = {}) {
    super(
      __deepMerge(
        {
          filter: null,
          blessed: {
            width: '100%',
            height: '100%',
            style: {
              bg: 'yellow'
            }
          }
        },
        settings
      )
    );

    // init the log component
    this.$log = new __SBlessedOutput(sources, {
      filter: this._settings.filter,
      width: '100%',
      height: '100%'
    });
    this.append(this.$log);

    // shortcuts
    if (settings.shortcuts) {
      let shortcutsArray = [];
      Object.keys(settings.shortcuts).forEach((shortcut) => {
        const shortcutObj = settings.shortcuts[shortcut];
        shortcutsArray.push(
          ` ${shortcutObj.name} <yellow>${shortcut}</yellow> `
        );
      });
      this.$log.height = '100%-1';
      this.$shortcuts = __blessed.box({
        width: '100%',
        height: 1,
        top: '100%-1',
        style: {
          bg: 'black',
          fg: 'white'
        },
        content: __parseHtml(shortcutsArray.join('|'))
      });
      this.append(this.$shortcuts);
    }
  }

  /**
   * @name          log
   * @type          Function
   *
   * This is an alias of the this.$log.log SBlessedOutput method
   *
   * @since       2.0.0
   * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...args) {
    this.$log.log(...args);
  }
}
