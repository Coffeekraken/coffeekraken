import { ISProcessObject, ISProcessSettings } from './interface/ISProcess';
import ISProcessPipe, {
  ISProcessPipeCtor,
  ISProcessPipeSettings,
  ISProcessPipeObject
} from './interface/ISProcessPipe';

import __isClass from '../is/class';
import __SProcess from './SProcess';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __typeof from '../value/typeof';
import __stdio from './stdio';
import __toString from '../string/toString';
import __parseHtml from '../console/parseHtml';
import __isChildProcess from '../is/childProcess';

/**
 * @name            SProcessPipe
 * @namespace       sugar.node.process
 * @type            Class
 *
 * This class allows you to handle easily some process pipes.
 * A process pipe is simply multiple processes that will execute one after
 * the other by passing the params to one after the other
 * and will be resolved once all the processes have been executed correctly
 *
 * @param         {Array<SProcess>|Array<ISProcessObject>|Array<Function>}           processes           The processes you want to pipe
 * @param         {ISProcessSettings}               [settings={}]               Some settings to configure your process pipe instance
 *
 * @example         js
 * import SProcessPipe from '@coffeekraken/sugar/node/process/SProcessPipe';
 * import SProcess from '@coffeekraken/sugar/node/process/SProcess';
 * class MyProcess extends SProcess {
 *  constructor(settings = {}) {
 *      super(settings);
 *  }
 * }
 * const processPipe = new SProcessPipe([
 *    (params) => {
 *      // update params to pass to the next process
 *      return params;
 *    },
 *    new MyProcess()
 * ]);
 * const res = await processPipe.run({
 *    something: 'coco'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISProcessPipeCtor = class SProcessPipe
  extends __SPromise
  implements ISProcessPipe {
  /**
   * @name            _processes
   * @type            Array<ISProcessPipeObject|ISProcess|Function>
   * @private
   *
   * Store the processes array to execute
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processes;

  stdio;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(processes, settings: ISProcessPipeSettings = {}) {
    super(
      __deepMerge(
        {
          stdio: 'inherit'
        },
        settings
      )
    );
    this._processes = processes;
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Execute the processes pipe
   *
   * @param         {Object}        [params={}]             The initial params object to pass to the first process
   * @param         {Object}        [settings={}]           Some settings to override from the one passed in the constructor
   * @return        {SPromise}                              An SPromise instance through which you can get events piped from processes
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(params = {}, settings: ISProcessPipeSettings = {}) {
    const promise = new __SPromise(
      async (resolve, reject, trigger, cancel, pipe) => {
        // extends settings
        settings = __deepMerge(this._settings, settings);

        if (!Array.isArray(this._processes)) {
          throw `Sorry but you've passed an "<yellow>${__typeof(
            this._processes
          )}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
        }

        // @ts-ignore
        if (!__isChildProcess() && settings.stdio && !this.stdio) {
          this.stdio = __stdio(this, {
            stdio: settings.stdio
          });
        }

        // loop on each processes passed
        for (let i = 0; i < this._processes.length; i++) {
          const pro = this._processes[i];

          let processInstance,
            processParams = {},
            processSettings = settings.processes || {};

          // check the type of the process
          if (__isClass(pro)) {
            processInstance = new pro({
              ...(settings.processes || {}),
              stdio: false
            });
          } else if (typeof pro === 'function') {
            // trigger('log', {
            //   type: 'separator',
            //   separator: '#',
            //   value: 'Processing params'
            // });
            params = pro(params);
            // trigger('log', {
            //   type: 'separator',
            //   value: ''
            // });
          } else if (typeof pro === 'object') {
            processSettings = pro.settings || {};
            processParams = pro.params || {};
            if (!pro.process) {
              trigger('warn', {
                value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`
              });
              continue;
            }
            if (__isClass(pro.process)) {
              processInstance = new pro.process({
                ...processSettings,
                stdio: false
              });
            }
          }

          // execute the process
          if (processInstance) {
            trigger('log', {
              type: 'separator',
              value: processInstance.cleanName
            });
            pipe(processInstance);
            const res = await processInstance.run(params, processSettings);
            trigger('log', {
              type: 'separator',
              value: ''
            });
          }
        }
      }
    );

    this.pipe(promise);

    return promise;
  }
};

export = cls;
