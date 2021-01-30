// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __minimatch from 'minimatch';
import __SPromise, { ISPromise } from '../promise/SPromise';
import __SClass, { ISClass } from '../class/SClass';
import __SEventEmitter, { ISEventEmitter } from '../event/SEventEmitter';
import __SBlessedStdio from './blessed/SBlessedStdio';
import __isClass from '../is/class';
import __parseAndFormatLog from '../log/parseAndFormatLog';

import { ILog } from '../log/log';

export interface ISStdioCtorSettings {
  stdio?: ISStdioSettings;
}

export interface ISStdioOptionalSettings {}
export interface ISStdioSettings {}

export interface ISStdioCtor {
  new (sources: ISPromise | ISPromise[], settings: ISStdioSettings): ISStdio;
}

export interface ISStdioLog extends ILog {}

export interface ISStdioRegisteredComponents {
  [key: string]: ISStdioComponent;
}
export interface ISStdioComponent {
  id: string;
  render(logObj: ILog, settings: any);
}

export interface ISStdioLogFn {
  (...logs: ISStdioLog): void;
}

export interface ISStdio extends ISClass {
  sources: ISEventEmitter[];
  log: ISStdioLogFn;
}

/**
 * @name          SStdio
 * @namespace     sugar.node.stdio
 * @type          Class
 * @wip
 *
 * This class represent the base one for all the "Stdio"
 * compatible setting.
 *
 * @param     {ISStdioCtorSettings}     [settings={}]       Some settings to configure your Stdio
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SStdio from '@coffeekraken/sugar/node/stdio/SStdio';
 * class MyCoolStdio extends SStdio {
 *    constructor(sources, settings = {}) {
 *      super(sources, settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SStdio extends __SClass implements ISStdio {
  /**
   * @name      sources
   * @type      Array<SPromise>
   * @private
   *
   * Store sources passed in the contructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sources: ISEventEmitter[];

  /**
   * @name    registeredComponents
   * @type    ISStdioRegisteredComponents
   * @static
   *
   * Store the registered stdio components
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registeredComponents: ISStdioRegisteredComponents = {};

  /**
   * @name      _logsBuffer
   * @type      ILog[]
   * @private
   *
   * Store the logs that does not have been displayed yet
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _logsBuffer: ILog[] = [];

  /**
   * @name          registerComponent
   * @type          Function
   * @static
   *
   * This static method allows you to register a new Stdio component
   * that you will be able to use then through the "type" property of
   * the logObj passed to the STerminalStdio instance.
   *
   * @param     {ISStdioComponentCtor}      component     The component you want to register
   * @param     {string}      [as=null]           Specify the id you want to use for this component. Overrides the static "id" property of the component itself
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerComponent(
    component: ISStdioComponent,
    settings?: any,
    as?: string
  ) {
    // make sure this component has an "id" specified
    if (component.id === undefined && as === null) {
      throw `Sorry but you try to register a component that does not have a built-in static "id" property and you don't have passed the "as" argument to override it...`;
    }

    if (!this.registeredComponents[this.name])
      this.registeredComponents[this.name] = {};

    // save the component inside the stack
    this.registeredComponents[this.name][as || component.id || 'default'] = {
      component,
      settings: settings || {},
      as
    };
  }

  /**
   * @name      stdioSettings
   * @type      ISStdioSettings
   * @get
   *
   * Access the stdio settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get stdioSettings(): ISStdioSettings {
    return (<any>this._settings).stdio;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    sources: ISEventEmitter | ISEventEmitter[],
    settings: ISStdioCtorSettings = {}
  ) {
    super(
      __deepMerge(
        {
          stdio: {
            filter: null,
            maxItems: -1,
            spaceBetween: 0,
            spaceAround: 0,
            events: [
              'log',
              '*.log',
              'warn',
              '*.warn',
              'error',
              '*.error',
              'reject',
              '*.reject',
              'resolve',
              '*.resolve'
            ],
            mapTypesToEvents: {
              heading: [],
              error: [
                'error',
                '*.error',
                'reject',
                '*.reject',
                'cancel',
                '*.cancel'
              ],
              warning: ['warn', '*.warn']
            },
            metas: {
              time: false
            }
          }
        },
        settings
      )
    );
    this.sources = Array.isArray(sources) ? sources : [sources];
    this.sources.forEach((s) => {
      // subscribe to the process
      this.registerSource(s);
    });

    // this.expose(
    //   new __SEventEmitter({
    //     id: this.id
    //   }),
    //   {
    //     as: 'eventEmitter',
    //     props: ['on', 'off', 'emit', 'pipe', 'pipeFrom', 'pipeTo']
    //   }
    // );
  }

  /**
   * @name          _logBuffer
   * @type          Function
   * @private
   *
   * This method simply take the buffered logs and log them in the feed
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _logBuffer() {
    this._logsBuffer = this._logsBuffer.filter((log) => {
      this.log(log);
      return false;
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
   * @param     {ISBlessedStdioSettings}     [settings={}]
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerSource(source, settings: ISStdioOptionalSettings) {
    settings = __deepMerge(
      this._settings.stdio || {},
      settings
    ) as ISStdioSettings;
    // subscribe to data
    source.on((settings.events || []).join(','), (data, metas) => {
      // protection

      if (data === undefined || data === null) return;
      // handle the type depending on the passed stack
      const types = Object.keys(settings.mapTypesToEvents);
      for (let i = 0; i < types.length; i++) {
        const stacks = settings.mapTypesToEvents[types[i]];
        const stacksGlob =
          Array.isArray(stacks) && stacks.length
            ? `*(${stacks.join('|')})`
            : stacks;
        if (stacksGlob.length && __minimatch(metas.event, stacksGlob)) {
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
   * @name      log
   * @type      Function
   *
   * This method is the one called to log something.
   * It will call the ```_log``` method that each implementation of the
   * SStdio class MUST have
   *
   * @param         {ILog[]}        ...logObj      The log object(s) you want to log
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...logObj: ILog[]) {
    logObj.forEach((log: ILog) => {
      log = __parseAndFormatLog(log);

      // clear
      if (log.clear === true) {
        if (typeof this.clear !== 'function')
          throw new Error(
            `You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`
          );
        this.clear();
      }

      // get the correct component to pass to the _log method
      let componentObj = this.constructor.registeredComponents[
        this.constructor.name
      ][log.type || 'default'];
      if (!componentObj)
        throw new Error(
          `Sorry but the requested "<yellow>${
            log.type || 'default'
          }</yellow>" in the "<cyan>${
            this.constructor.name
          }</cyan>" stdio class does not exists...`
        );

      if (typeof componentObj.component.render !== 'function') {
        throw new Error(
          `Your "<yellow>${componentObj.component.id}</yellow>" stdio "<cyan>${this.constructor.name}</cyan>" component does not expose the required function "<magenta>render</magenta>"`
        );
      }

      this._log(log, componentObj.component);
    });
  }
}

export default SStdio;
