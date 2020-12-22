import __packageRoot from '../../path/packageRoot';
import __deepMerge from '../../object/deepMerge';
import __blessed from 'blessed';
import __color from '../../color/color';
import __SBlessedComponent from '../SBlessedComponent';
import __parseMarkdown from '../../terminal/parseMarkdown';
import __isChildProcess from '../../is/childProcess';
import __parse from '../../string/parse';
import __toString from '../../string/toString';
import __stripAnsi from 'strip-ansi';
import __trimLines from '../../string/trimLines';
import __extractValues from '../../object/extractValues';
import __SOutputLogInterface from '../interface/SOutputLogInterface';
import __SOutputSourceInterface from '../interface/SOutputSourceInterface';
import __wait from '../../time/wait';
import __parseArgs from '../../cli/parseArgs';
import __parseAndFormatLog from '../../log/parseAndFormatLog';
import __parseHtml from '../../console/parseHtml';
import __countLine from '../../string/countLine';
import __chalk from 'chalk';
import __minimatch from 'minimatch';

import ISBlessedOutput, {
  ISBlessedOutputCtor,
  ISBlessedOutputMetas,
  ISBlessedOutputSettings
} from './interface/ISBlessedOutput';
import ISBlessedOutputComponent, {
  ISBlessedOutputComponentCtor,
  ISBlessedOutputComponentSettings
} from './interface/ISBlessedOutputComponent';
import __SDefaultBlessedOutputComponent from './components/SDefaultBlessedOutputComponent';
import __SErrorBlessedOutputComponent from './components/SErrorBlessedOutputComponent';
import __SWarningBlessedOutputComponent from './components/SWarningBlessedOutputComponent';
import __SHeadingBlessedOutputComponent from './components/SHeadingBlessedOutputComponent';

/**
 * @name                  SBlessedOutput
 * @namespace           sugar.node.blessed.output
 * @type                  Class
 * @wip
 *
 * This class is a simple SPanel extended one that accesp an SOutput instance
 * to log the data's from and display an simple UI depending on the SOutput configured keys
 *
 * @param         {SPromise[]}            sources           An array of sources to display with this output instance
 * @param         {Object}              [settings={}]     The settings object to configure your SOutput
 * - filter (null) {Function}: Specify a function that will filter the logs to display. This function will receive two parameters. The data object to log and the metas object of the SPromise instance. If you return true, the log will pass the filter. If you return false, the log will not being displayed. And if you return an updated data object, the log will be the one you returned...
 * - maxItemsByGroup (1) {Number}: Specify the number of logs to display by group
 * - clearOnStart (true) {Boolean}: Specify if you want your output to be cleared when received any events matching this pattern: "*.start"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo        Support the "maxItems" setting
 * @todo        Listen for errors and display them correctly
 * @todo      Listen for resizing and replace components correctly
 *
 * @example         js
 * import SOutput from '@coffeekraken/sugar/node/terminal/SOutput';
 * const myPanel = new SOutput(myProcess, {
 *    screen: true
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISBlessedOutputCtor = class SBlessedOutput
  extends __SBlessedComponent
  implements ISBlessedOutput {
  /**
   * @name          registeredComponents
   * @type          Object<SBlessedOutputComponent>
   * @static
   *
   * Store the registered output components
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registeredComponents = {};

  /**
   * @name          registerComponent
   * @type          Function
   * @static
   *
   * This static method allows you to register a new output component
   * that you will be able to use then through the "type" property of
   * the logObj passed to the SBlessedOutput instance.
   *
   * @param     {ISBlessedOutputComponentCtor}      component     The component you want to register
   * @param     {string}      [as=null]           Specify the id you want to use for this component. Overrides the static "id" property of the component itself
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerComponent(
    component: ISBlessedOutputComponentCtor,
    settings: ISBlessedOutputComponentSettings = {},
    as: string
  ) {
    // make sure this component has an "id" specified
    if (component.id === undefined && as === null) {
      throw `Sorry but you try to register a component that does not have a built-in static "id" property and you don't have passed the "as" argument to override it...`;
    }
    // save the component inside the stack
    SBlessedOutput.registeredComponents[as || component.id || 'default'] = {
      component,
      settings,
      as
    };
  }

  /**
   * @name      _handlerInstance
   * @type      Any
   * @private
   *
   * Store the handler instance passed in the constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _handlerInstance;

  /**
   * @name      stack
   * @type      Object[]
   *
   * Store all the "containers" that handle components etc...
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stack: Object[] = [];

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(sources, handlerInstance, settings = {}) {
    // extends SPanel
    super(
      __deepMerge(
        {
          filter: null,
          maxItems: -1,
          maxItemsByGroup: 1,
          spaceBetween: 1,
          spaceAround: 1,
          stacks: [
            'log',
            '*.log',
            'warn',
            '*.warn',
            'error',
            '*.error',
            'reject',
            '*.reject'
          ],
          mapTypesToStacks: {
            error: ['error', '*.error', 'reject', '*.reject'],
            warning: ['warn', '*.warn']
          },
          metas: {
            spaceRight: 1,
            width: 9,
            time: false
          },
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
        },
        settings
      )
    );

    this._handlerInstance = handlerInstance;
    this._sources = Array.isArray(sources) ? sources : [sources];

    // listen for resizing
    this.on('resize', () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => {
        // this._applyTops();
      }, 1000);
    });

    this._sources.forEach((s) => {
      // subscribe to the process
      this.registerSource(s);
    });

    this._logsBuffer = [];
    this.on('attach', () => {
      this._logsBuffer = this._logsBuffer.filter((log) => {
        this.log(log);
        return false;
      });
    });
  }

  /**
   * @name          registerSource
   * @type          Function
   *
   * This method simply listen to the process and log the values getted
   * from it into the panel
   *
   * @param     {SPromise}      source        The source to register
   * @param     {ISBlessedOutputSettings}     [settings={}]
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerSource(source, settings: ISBlessedOutputSettings = {}) {
    settings = __deepMerge(this._settings, settings) as ISBlessedOutputSettings;
    // subscribe to data
    source.on((settings.stacks || []).join(','), (data, metas) => {
      // protection
      if (data === undefined || data === null) return;
      // handle the type depending on the passed stack
      const types = Object.keys(settings.mapTypesToStacks);
      for (let i = 0; i < types.length; i++) {
        const stacks = settings.mapTypesToStacks[types[i]];
        const stacksGlob = Array.isArray(stacks)
          ? `*(${stacks.join('|')})`
          : stacks;
        if (__minimatch(metas.stack, stacksGlob)) {
          if (typeof data !== 'object') {
            data = {
              type: types[i],
              value: data
            };
          } else if (!data.type) {
            data.type = types[i];
          }
          break;
        }
      }

      this.log(data);
    });
  }

  /**
   *
   * @name          clear
   * @type          Function
   *
   * This method simply clear the output
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async clear() {
    // remove all items from the display list
    this.stack.forEach(($component) => {
      // @ts-ignore
      $component.detach();
    });
    // reset the stack
    this.stack = [];
    return true;
  }

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
  _currentModuleId = null;

  log(...args) {
    if (!this.isDisplayed()) {
      this._logsBuffer = [...this._logsBuffer, ...args];
      return;
    }

    const logs = __parseAndFormatLog(args);

    // @ts-ignore
    logs.forEach(async (logObj) => {
      const $lastContainer = this.stack.length ? this.stack.pop() : undefined;
      // clear
      if (logObj.clear === true) {
        await this.clear();
      }

      // make sure the wanted component declared in "type" is registered
      // otherwise, fallback to "default"
      const type =
        SBlessedOutput.registeredComponents[logObj.type] !== undefined
          ? logObj.type
          : 'default';
      // instanciate a new component
      const $component = new SBlessedOutput.registeredComponents[
        type
      ].component(logObj, SBlessedOutput.registeredComponents[type].settings);

      // container
      const $container = __blessed.box({
        width: `100%-${this._settings.spaceAround * 2}`,
        height: 0,
        top: 0,
        left: this._settings.spaceAround,
        scrollable: true,
        style: {
          // bg: 'cyan'
        }
      });
      let $metas,
        metasHeight = 0;

      // build metas
      const metasObj: ISBlessedOutputMetas = __deepMerge(
        this._settings.metas,
        logObj.metas
      ) as ISBlessedOutputMetas;
      if (metasObj !== undefined) {
        let content = [metasObj.content || ''];
        if (metasObj.time === true) {
          const now = new Date();
          let hours: any = now.getHours(),
            minutes: any = now.getMinutes(),
            seconds: any = now.getSeconds();
          if (hours < 10) hours = `0${hours}`;
          if (minutes < 10) minutes = `0${minutes}`;
          if (seconds < 10) seconds = `0${seconds}`;
          content = [
            `<cyan>${hours + ':' + minutes + ':' + seconds}</cyan>`,
            metasObj.content || ''
          ];
        }
        content = content.map((c) => {
          c = __parseHtml(c);
          c = ' '.repeat(metasObj.width - 1 - __countLine(c.trim())) + c;
          return c;
        });

        content = content.filter((c) => c.trim() !== '');

        metasHeight = content.length;

        if (content.length > 0) {
          $metas = __blessed.box({
            content: content.join('\n'),
            width: metasObj.width,
            height: 'shrink',
            top: 0,
            left: 0,
            style: {
              // bg: 'red'
            }
          });
        }
      }

      if (metasObj !== undefined && $metas !== undefined) {
        $component.left = metasObj.width + metasObj.spaceRight;
      }

      $container.append($component);
      if ($metas !== undefined) {
        $container.append($metas);
        $container.$metas = $metas;
      }
      $container.$component = $component;

      // append the log into the stack
      this.append($container);
      this.stack.push($container);

      // calculate the height to apply
      let contentHeight = 0;
      try {
        contentHeight = $component.getScrollHeight();
      } catch (e) {}
      let containerHeight =
        contentHeight > metasHeight ? contentHeight : metasHeight;

      // append the component to the feed
      if ($lastContainer !== undefined) {
        $container.top =
          // @ts-ignore
          $lastContainer.top +
          // @ts-ignore
          $lastContainer.getScrollHeight() +
          this._settings.spaceBetween;
      }
      $container.height = containerHeight;
    });

    // scroll to bottom
    setTimeout(() => {
      try {
        this.setScrollPerc(100);
      } catch (e) {}
      // update display
      this.update();
    });
  }

  /**
   * @name            _applyTops
   * @type            Function
   * @private
   *
   * This method take all the components in the stack and apply the top to each one
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _applyTops() {
    // let currentTop = 0;
    // // loop on each of the components
    // for (let i = 0; i < this.stack.length; i++) {
    //   const $component = this.stack[i];
    //   $component.top = currentTop;
    //   // $component.height: 0;
    //   // $component.screen.render();
    //   // await __wait(10);
    //   currentTop += $component.realHeight + this._settings.spaceBetween;
    // }
    // await __wait(10);
    // this.screen.render();
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
  }
};

// register default components
cls.registerComponent(__SDefaultBlessedOutputComponent);
cls.registerComponent(__SErrorBlessedOutputComponent);
cls.registerComponent(__SWarningBlessedOutputComponent);
cls.registerComponent(__SHeadingBlessedOutputComponent);

export = cls;
