import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __convert from '../time/convert';
import __SActionsStreamAction from './SActionsStreamAction';
import __isClass from '../is/class';
import __checkDefinitionObj from '../cli/validateDefinitionObject';
import __isChildProcess from '../is/childProcess';
import __isTestEnv from '../is/testEnv';
import { before } from 'lodash';

/**
 * @name          SActionStream
 * @namespace           js.stream
 * @type          Class
 * @extends       SPromise
 *
 * This class represent the base of a actions stream.
 * An action stream if simply some functions that are called one after the other
 * and that pass to each other some value(s) on which to work.
 * Here's all the "events" that you can subscribe on the SActionStream instance, or on the returned SPromise when calling the "start" method:
 * - start: Triggered when an action starts
 * - {actionName}.start: Triggered when the specified action starts
 * - step: Triggered when an action is just finished
 * - {actionName}.step: Triggered when the specified action is just finished
 * - error: Triggered when something wrong has happened in any action
 * - {actionName}.error: Triggered when something wrong has happened in the specified action
 * - complete: Triggered when the stream has been completed successfully
 * - cancel: Triggered when the stream has been canceled using the "cancel" method of the returned SPromise when calling the "start" method
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SActionStream extends __SPromise {
  /**
   * @name            _actionsObj
   * @type            Object
   * @private
   *
   * Store the actions object
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _actionsObject = {};

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(actions, settings = {}) {
    // init SPromise
    super(
      () => {},
      __deepMerge(
        {
          name: null,
          order: null,
          before: [],
          after: [],
          beforeActions: {},
          afterActions: {},
          actions: {}
        },
        settings
      )
    );
    super.start();

    // check the actions
    Object.keys(actions).forEach((actionName) => {
      const actionInstance = actions[actionName];
      if (
        typeof actionInstance === 'function' ||
        actionInstance === __SActionsStreamAction ||
        actionInstance instanceof __SActionsStreamAction
      ) {
      } else {
        throw new Error(
          `The value passed for the "${actionName}" action has to be either a simple function or an "SActionsStreamAction" instance. You have passed a "${typeof actionInstance}"...`
        );
      }
    });

    // save the actions
    this._actionsObject = actions;
  }

  /**
   * @name          start
   * @type          Function
   * @async
   *
   * This method launch the action stream and return an SPromise instance for this particular stream "process"
   *
   * @param       {Object}          [streamObj={}]           An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...
   * @param       {Object}          [settings={}]           An object of settings to override the instance level one if wanted
   * @return      {SPromise}                                An SPromise instance for this particular stream "process" on which you can subscribe to the same "events" that on the SActionsStrean instance.
   *
   * @example         js
   * const streamPromise = myStream.start();
   * streamPromise.on('step', (streamObj) => {
   *    // do something
   * }).on('resolve', (resultObj) => {
   *    // do something
   * });
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  start(streamObj = {}, settings = {}) {
    settings = __deepMerge(Object.assign({}, this._settings), settings);
    let canceled = false,
      currentActionReturn,
      skipNextActions = false;

    return new __SPromise(async (resolve, reject, trigger, cancel) => {
      if (!Array.isArray(settings.before)) settings.before = [settings.before];
      if (!Array.isArray(settings.after)) settings.after = [settings.after];

      // check if is a "before" setting function
      if (
        settings.before &&
        (Array.isArray(settings.before) ||
          typeof settings.before === 'function')
      ) {
        const beforeArray = [...settings.before];
        for (let key in beforeArray) {
          const fn = beforeArray[key];
          streamObj = await fn(streamObj);
        }
      }

      // starting log
      const startString = `<h1>Starting the stream "<cyan>${
        settings.name || 'unnamed'
      }</cyan>"</h1>`;
      trigger('stdout.data', startString);
      this.trigger('stdout.data', startString);

      // take the actions order array
      const actionsOrderedNames = Array.isArray(settings.order)
        ? settings.order
        : Object.keys(this._actionsObject);
      // check the order
      actionsOrderedNames.forEach((actionName) => {
        if (!this._actionsObject[actionName])
          throw new Error(
            `You have specified the action "${actionName}" in your SActionsStream instance but it is not available. Here's the available actions: ${Object.keys(
              this._actionsObject
            ).join(',')}`
          );
      });

      // callbacks object
      const callbacksObj = {};

      // loop on each actions
      streamObj._isStreamObj = true;
      let currentStreamObjArray = [streamObj];
      let overallActionsStats = {
        start: Date.now(),
        stderr: [],
        stdout: [],
        actions: {}
      };
      for (let i = 0; i < actionsOrderedNames.length; i++) {
        if (canceled) break;

        const actionName = actionsOrderedNames[i];
        let actionInstance;
        let actionSettings = settings.actions
          ? settings.actions[actionName] || {}
          : {};

        if (skipNextActions) {
          const message = `Skipping all the next actions after the "<cyan>${
            actionsOrderedNames[i - 1]
          }</cyan>"...`;
          trigger('stdout.data', message);
          this.trigger('stdout.data', message);
          trigger(`${actionName}.stdout.data`, message);
          this.trigger(`${actionName}.stdout.data`, message);
          break;
        }

        // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class
        let actionFn;
        let actionOnce = false;
        if (
          !__isClass(this._actionsObject[actionName]) &&
          typeof this._actionsObject[actionName] === 'function'
        ) {
          actionFn = this._actionsObject[actionName];
        } else if (
          !__isClass(this._actionsObject[actionName]) &&
          this._actionsObject[actionName] instanceof __SActionsStreamAction
        ) {
          actionInstance = this._actionsObject[actionName];
          actionOnce = actionInstance.constructor.once;
          actionFn = this._actionsObject[actionName].run.bind(
            this._actionsObject[actionName]
          );
        } else if (
          __isClass(this._actionsObject[actionName]) &&
          this._actionsObject[actionName].prototype instanceof
            __SActionsStreamAction
        ) {
          actionInstance = new this._actionsObject[actionName](actionSettings);
          actionOnce = this._actionsObject[actionName].once;
          actionFn = actionInstance.run.bind(actionInstance);
        }

        if (actionInstance) {
          actionInstance.on('stdout.data', (value) => {
            trigger('stdout.data', value);
            this.trigger('stdout.data', value);
            trigger(`${actionName}.stdout.data`, value);
            this.trigger(`${actionName}.stdout.data`, value);
          });
          actionInstance.on('stderr.data', (value) => {
            trigger('stderr.data', value);
            this.trigger('stderr.data', value);
            trigger(`${actionName}.stderr.data`, value);
            this.trigger(`${actionName}.stderr.data`, value);
          });
          actionInstance.on('reject', (value) => {
            trigger('reject', value);
            this.trigger('reject', value);
            trigger(`${actionName}.reject`, value);
            this.trigger(`${actionName}.reject`, value);
            cancel(value);
          });
        }

        let actionObj = {
          action: actionName,
          start: Date.now(),
          stderr: [],
          stdout: [],
          streamObjArray: currentStreamObjArray
        };
        let errorObj = null;

        let streamSourcesCount = 0;
        function countSources(source) {
          if (Array.isArray(source)) {
            source.forEach((s) => {
              countSources(s);
            });
            return;
          }
          if (typeof source === 'object' && source._isStreamObj)
            streamSourcesCount++;
        }
        countSources(currentStreamObjArray);

        // trigger some "start" events
        trigger(`start`, Object.assign({}, actionObj));
        this.trigger(`start`, Object.assign({}, actionObj));
        trigger(`${actionName}.start`, Object.assign({}, actionObj));
        this.trigger(`${actionName}.start`, Object.assign({}, actionObj));
        const startString = `Starting the action "<yellow>${actionName}</yellow>" on <magenta>${streamSourcesCount}</magenta> sources`;
        trigger('stdout.data', startString);
        this.trigger('stdout.data', startString);
        trigger(`${actionName}.stdout.data`, startString);
        this.trigger(`${actionName}.stdout.data`, startString);

        const _this = this;
        async function handleStreamObjArray(streamObjArray, actionObj) {
          if (actionOnce) {
            streamObjArray = [streamObjArray[0]];
          }

          for (let j = 0; j < streamObjArray.length; j++) {
            let currentStreamObj = streamObjArray[j];
            if (Array.isArray(currentStreamObj)) {
              return await handleStreamObjArray(currentStreamObj, actionObj);
            } else {
              currentStreamObj._isStreamObj = true;
            }

            // check if is a "beforeActions" setting function
            if (
              settings.beforeActions[actionName] &&
              typeof settings.beforeActions[actionName] === 'function'
            ) {
              const beforeActionResultObj = settings.beforeActions[actionName](
                currentStreamObj,
                Object.assign({}, actionObj)
              );
              if (beforeActionResultObj && beforeActionResultObj.settings) {
                actionSettings = beforeActionResultObj.settings;
              }
              if (beforeActionResultObj && beforeActionResultObj.streamObj) {
                currentStreamObj = beforeActionResultObj.streamObj;
              } else {
                currentStreamObj = beforeActionResultObj;
              }
            }

            // call the action and pass it the current stream object
            try {
              currentActionReturn = actionFn(currentStreamObj, actionSettings);
              if (currentActionReturn instanceof Promise)
                currentStreamObj = await currentActionReturn;
              else currentStreamObj = currentActionReturn;
              currentActionReturn = null;
            } catch (e) {
              if (typeof e === 'object') {
                actionObj.stderr.push(`<red>${e.name}</red>: ${e.message}`);
                // trigger an "event"
                trigger('stderr.data', `<red>${e.name}</red>: ${e.message}`);
                trigger(
                  `${actionName}.stderr.data`,
                  `<red>${e.name}</red>: ${e.message}`
                );
                _this.trigger(
                  'stderr.data',
                  `<red>${e.name}</red>: ${e.message}`
                );
                _this.trigger(
                  `${actionName}.stderr.data`,
                  `<red>${e.name}</red>: ${e.message}`
                );
              } else if (typeof e === 'string') {
                actionObj.stderr.push(e);
                // trigger an "event"
                trigger('stderr.data', e);
                trigger(`${actionName}.stderr.data`, e);
                _this.trigger('stderr.data', e);
                _this.trigger(`${actionName}.stderr.data`, e);
              }
              cancel(actionObj);
            }
            if (currentStreamObj.skipNextActions === true) {
              skipNextActions = true;
            }

            // check if an "afterCallback" callback has been passed in the streamObj
            if (
              !Array.isArray(currentStreamObj) &&
              currentStreamObj.afterCallback &&
              typeof currentStreamObj.afterCallback === 'function'
            ) {
              settings.after = [
                ...settings.after,
                currentStreamObj.afterCallback
              ];
              delete currentStreamObj.afterCallback;
            }

            // check if is a "afterActions" setting function
            if (
              settings.afterActions[actionName] &&
              typeof settings.afterActions[actionName] === 'function'
            ) {
              if (Array.isArray(currentStreamObj)) {
                currentStreamObj.forEach((strObj, i) => {
                  currentStreamObj[i] = settings.afterActions[actionName](
                    currentStreamObj[i],
                    Object.assign({}, actionObj)
                  );
                });
              } else {
                currentStreamObj = settings.afterActions[actionName](
                  currentStreamObj,
                  Object.assign({}, actionObj)
                );
              }
            }

            // replace the streamObj with the new one in the stack
            streamObjArray[j] = currentStreamObj;

            if (canceled) return;
          }

          return streamObjArray;
        }

        const newCurrentStreamObjArray = await handleStreamObjArray(
          currentStreamObjArray,
          actionObj
        );

        // complete the actionObj
        actionObj = {
          ...actionObj,
          end: Date.now(),
          duration: Date.now() - actionObj.start,
          streamObjArray: newCurrentStreamObjArray
        };

        currentStreamObjArray = newCurrentStreamObjArray;

        // save the result into the overall actions stats object
        overallActionsStats.actions[actionName] = Object.assign({}, actionObj);
        // trigger an "event"
        trigger('step', Object.assign({}, actionObj));
        trigger(`${actionName}.step`, Object.assign({}, actionObj));
        this.trigger('step', Object.assign({}, actionObj));
        this.trigger(`${actionName}.step`, Object.assign({}, actionObj));

        if (actionObj.stderr.length) {
          const errorString = `<red>Something went wrong during the </red>"<yellow>${actionName}</yellow>"<red> action...</red>`;
          actionObj.stderr.unshift(errorString);
          trigger('stderr.data', errorString);
          this.trigger('stderr.data', errorString);
          trigger(`${actionName}.stderr.data`, errorString);
          this.trigger(`${actionName}.stderr.data`, errorString);
        } else {
          const successString = `The action "<yellow>${actionName}</yellow>" has finished <green>successfully</green> on <magenta>${streamSourcesCount}</magenta> sources in <yellow>${__convert(
            actionObj.duration,
            's'
          )}s</yellow>`;
          actionObj.stdout.push(successString);
          trigger('stdout.data', successString);
          this.trigger('stdout.data', successString);
          trigger(`${actionName}.stdout.data`, successString);
          this.trigger(`${actionName}.stdout.data`, successString);
        }
      }

      // get the lastest stream object as streamObj
      streamObj = currentStreamObjArray[currentStreamObjArray.length - 1];

      if (
        settings.after &&
        (Array.isArray(settings.after) || typeof settings.after === 'function')
      ) {
        const afterArray = [...settings.after];
        for (let key in afterArray) {
          const fn = afterArray[key];
          streamObj = await fn(streamObj);
        }
      }

      // complete the overall stats
      overallActionsStats = {
        ...overallActionsStats,
        streamObjArray: currentStreamObjArray,
        streamObj,
        end: Date.now(),
        duration: Date.now() - overallActionsStats.start
      };
      if (canceled) return;

      const completeString = `<pSuccess>The stream "<cyan>${
        settings.name || 'unnamed'
      }</cyan>" has finished <green>successfully</green> in <yellow>${__convert(
        overallActionsStats.duration,
        's'
      )}s</yellow></pSuccess>`;
      overallActionsStats.stdout.push(completeString);
      trigger('stdout.data', completeString);
      this.trigger('stdout.data', completeString);

      // resolve this stream process
      trigger('complete', overallActionsStats);
      this.trigger('complete', overallActionsStats);
      resolve(overallActionsStats);

      // if (!__isTestEnv() && __isChildProcess()) process.exit();
    })
      .on('cancel', () => {
        canceled = true;
        // check if the current action returned value is a promise cancelable
        if (
          currentActionReturn instanceof Promise &&
          typeof currentActionReturn.cancel === 'function'
        ) {
          currentActionReturn.cancel();
        }
        // trigger some cancel events
        this.trigger('cancel');
        // exit process (has to be rethink)
        // if (__isChildProcess()) process.exit();
      })
      .start();
  }
}
