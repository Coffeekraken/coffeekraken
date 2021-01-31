// @ts-nocheck

import __md5 from '../../crypt/md5';
import __packageRoot from '../../path/packageRoot';
import __deepMerge from '../../object/deepMerge';
import __blessed from 'blessed';
import __color from '../../color/color';
import __parseMarkdown from '../../terminal/parseMarkdown';
import __isChildProcess from '../../is/childProcess';
import __parse from '../../string/parse';
import __toString from '../../string/toString';
import __stripAnsi from 'strip-ansi';
import __trimLines from '../../string/trimLines';
import __extractValues from '../../object/extractValues';
import __wait from '../../time/wait';
import __parseArgs from '../../cli/parseArgs';
import __parseAndFormatLog from '../../log/parseAndFormatLog';
import __parseHtml from '../../console/parseHtml';
import __countLine from '../../string/countLine';
import __chalk from 'chalk';
import __minimatch from 'minimatch';
import __SStdio from '../SStdio';

import { ILog } from '../../../log/log';
import { ISStdio } from '../SStdio';
import __SBlessedComponent, {
  ISBlessedComponent
} from '../../blessed/SBlessedComponent';
import {
  ISBlessedStdioComponentCtor,
  ISBlessedStdioComponentSettings
} from './SBlessedStdioComponent';

/**
 * @name                  SBlessedStdio
 * @namespace           sugar.node.blessed.Stdio
 * @type                  Class
 * @extends             SStdio
 * @wip
 *
 * This class is a simple SPanel extended one that accesp an SStdio instance
 * to log the data's from and display an simple UI depending on the SStdio configured keys
 *
 * @param         {SPromise[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 * - filter (null) {Function}: Specify a function that will filter the logs to display. This function will receive two parameters. The data object to log and the metas object of the SPromise instance. If you return true, the log will pass the filter. If you return false, the log will not being displayed. And if you return an updated data object, the log will be the one you returned...
 * - maxItemsByGroup (1) {Number}: Specify the number of logs to display by group
 * - clearOnStart (true) {Boolean}: Specify if you want your Stdio to be cleared when received any events matching this pattern: "*.start"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo        Support the "maxItems" setting
 * @todo        Listen for errors and display them correctly
 * @todo      Listen for resizing and replace components correctly
 *
 * @example         js
 * import SStdio from '@coffeekraken/sugar/node/terminal/SStdio';
 * const myPanel = new SStdio(myProcess, {
 *    screen: true
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISBlessedStdioSettings {
  events?: string[];
  mapTypesToEvents?: any;
}

export interface ISBlessedStdioMetas {
  width: number;
  spaceRight: number;
  time?: boolean;
  content?: string;
}
export interface ISBlessedStdioCtor {
  new (sources: any[], handlerInstance: any, settings?: ISBlessedStdioSettings);
  registeredComponents: Object;
  registerComponent(
    component: ISBlessedStdioComponentCtor,
    settings?: ISBlessedStdioComponentSettings,
    as?: string
  ): void;
}

export interface ISBlessedStdio extends ISBlessedComponent, ISStdio {}

class SBlessedStdio extends __SStdio implements ISBlessedStdio {
  /**
   * @name        $container
   * @type        SBlessedComponent
   *
   * Store the main blessed container for this blessed stdio instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  public $container: __SBlessedComponent;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(sources, settings = {}) {
    // extends SPanel
    super(
      sources,
      __deepMerge(
        {
          blessedStdio: {
            screen: true,
            attach: true,
            actionPrefix: true,
            blessed: {
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
              mouse: true,
              keys: true,
              scrollable: true,
              alwaysScroll: true,
              scrollbar: {
                ch: ' ',
                inverse: true
              },
              style: {
                scrollbar: {
                  bg: 'yellow'
                }
              }
            }
          }
        },
        settings
      )
    );

    this.$container = new __SBlessedComponent({
      screen: this._settings.blessedStdio.screen,
      attach: this._settings.blessedStdio.attach,
      blessed: {
        // width: '100%',
        // height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: {
          top: 1,
          left: 2,
          bottom: 1,
          right: 2
        },
        style: {
          bg: 'cyan'
        },
        ...(this._settings.blessedStdio.blessed || {})
      }
    });

    this.$container.on('show', () => {
      this.display();
    });
    this.$container.on('attach', () => {
      this.display();
    });
    this.$container.on('hide', () => {
      this.hide();
    });
    this.$container.on('detach', () => {
      this.hide();
    });

    // // listen for resizing
    // this.on('resize', () => {
    //   clearTimeout(this._resizeTimeout);
    //   this._resizeTimeout = setTimeout(() => {
    //     // this._applyTops();
    //   }, 1000);
    // });

    // this._logsBuffer = [];
    // this.on('attach', () => {
    //   this._logBuffer();
    // });

    this._logsEncryptedStack = [];
  }

  /**
   *
   * @name          clear
   * @type          Function
   *
   * This method simply clear the Stdio
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  clear() {
    // this._isClearing = true;
    // // remove all items from the display list
    // this.children.forEach(($component) => {
    //   $component.detach();
    // });
    // // reset the stack
    // this.setContent('');
    // this.stack = [];
    // this._isClearing = false;
  }

  stack: any[] = [];

  /**
   * @name          log
   * @type          Function
   *
   * This method simply log the passed arguments
   *
   * @param       {Mixed}         ...args         The arguments you want to log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _log(logObj: ILog, component) {
    // @ts-ignore
    let $lastComponent;
    // clear
    if (logObj.clear === true) {
    } else {
      $lastComponent = this.stack.length ? this.stack.pop() : undefined;
    }

    const type = logObj.type || 'default';
    const $component = component.render(logObj, this._settings);
    this.stack.push($component);
    if ($lastComponent) {
      $component.top = $lastComponent.top + $lastComponent.realHeight;
    }
    this.$container.append($component);
    // $component.height = $component.realHeight;

    // scroll to bottom
    clearTimeout(this._updateTimeout);
    this._updateTimeout = setTimeout(() => {
      try {
        this.$container.setScrollPerc(100);
      } catch (e) {}
      // update display
      this.$container.update();
    }, 200);
  }

  /**
   * @name          isDisplayed
   * @type          Function
   * @return        Boolean
   *
   * true if is displayed, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isDisplayed() {
    return this.$container && this.$container.parent !== null;
  }

  /**
   * @name            update
   * @type            Function
   *
   * This method take the content of the this._content property and display it correctly on the screen
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (__isChildProcess()) return;
    if (!this.isDisplayed()) return;
    super.update();
  }
}

// register default components
import __defaultBlessedStdioComponent from './components/defaultBlessedStdioComponent';
import __errorBlessedStdioComponent from './components/errorBlessedStdioComponent';
import __fileBlessedStdioComponent from './components/fileBlessedStdioComponent';
import __headingBlessedStdioComponent from './components/headingBlessedStdioComponent';
import __separatorBlessedStdioComponent from './components/separatorBlessedStdioComponent';
import __warningBlessedStdioComponent from './components/warningBlessedStdioComponent';

SBlessedStdio.registerComponent(__defaultBlessedStdioComponent);
SBlessedStdio.registerComponent(__errorBlessedStdioComponent);
SBlessedStdio.registerComponent(__fileBlessedStdioComponent);
SBlessedStdio.registerComponent(__headingBlessedStdioComponent);
SBlessedStdio.registerComponent(__separatorBlessedStdioComponent);
SBlessedStdio.registerComponent(__warningBlessedStdioComponent);

const cls: ISBlessedStdioCtor = SBlessedStdio;

export default SBlessedStdio;
