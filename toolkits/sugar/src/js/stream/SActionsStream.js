import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __convert from '../time/convert';
import __SActionsStreamAction from './SActionsStreamAction';
import __isClass from '../is/class';
import __checkDefinitionObj from '../cli/validateDefinitionObject';
import __isChildProcess from '../is/childProcess';
import __isTestEnv from '../is/testEnv';
import { before } from 'lodash';
import __wait from '../time/wait';

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
   * @name            _currentSPromise
   * @type            SPromise
   * @private
   *
   * Store the current running process SPromise instance
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentSPromise = null;

  /**
   * @name            _currentActionName
   * @type            SPromise
   * @private
   *
   * Store the current running action name
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentActionName = null;

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

    this._currentSPromise = new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        if (!Array.isArray(settings.before))
          settings.before = [settings.before];
        if (!Array.isArray(settings.after)) settings.after = [settings.after];

        await __wait(50); // ugly hack to check when have time...

        // starting log
        const startString = `# Starting the stream "<cyan>${
          settings.name || 'unnamed'
        }</cyan>"`;
        this.log(startString);

        // check if is a "before" setting function
        if (settings.before && settings.before.length) {
          const startTime = Date.now();
          this.log(
            `[beforeCallbacks] Executing the <cyan>${settings.before.length}</cyan> callback(s) registered before the entire actions stream process...`
          );
          for (let key in settings.before) {
            const fn = settings.before[key];
            streamObj = await fn(streamObj);
          }
          this.log(
            `[beforeCallbacks] #success The <cyan>${
              settings.before.length
            }</cyan> before stream callback(s) have finished <green>successfully</green> <yellow>${__convert(
              Date.now() - startTime,
              's'
            )}s</yellow>`
          );
        }

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
          this._currentActionName = actionName;
          let actionInstance;
          let actionSettings = settings.actions
            ? settings.actions[actionName] || {}
            : {};

          let skipMessage = null,
            skipAction = 'break';
          if (skipNextActions === true) {
            skipMessage = `#warning Skipping all the next actions after the "<cyan>${
              actionsOrderedNames[i - 1]
            }</cyan>"...`;
            skipAction = 'break';
          } else if (
            Array.isArray(skipNextActions) &&
            skipNextActions.indexOf(actionName) !== -1
          ) {
            skipMessage = `#warning Skipping the "<yellow>${actionName}</yellow>" action...`;
            skipAction = 'continue';
          } else if (
            typeof skipNextActions === 'number' &&
            skipNextActions > 0
          ) {
            skipNextActions--;
            skipMessage = `#warning Skipping the "<yellow>${actionName}</yellow>" action. Reamaining action(s) to skip: <cyan>${skipNextActions}</cyan>...`;
            skipAction = 'continue';
          }

          if (skipMessage) {
            this.log(skipMessage);
            if (skipAction === 'continue') continue;
            else break;
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
            actionInstance = new this._actionsObject[actionName](
              actionSettings
            );
            actionOnce = this._actionsObject[actionName].once;
            actionFn = actionInstance.run.bind(actionInstance);
          }

          if (actionInstance) {
            actionInstance.on('stdout.data', (value) => {
              this.log(`[${this._currentActionName}] ${value}`);
            });
            actionInstance.on('stderr.data', (value) => {
              this.error(`[${this._currentActionName}] #error ${value}`);
            });
            actionInstance.on('reject', (value) => {
              this.dispatch('reject', value);
              cancel(value);
            });
            actionSettings = __deepMerge(
              actionInstance._settings,
              actionSettings
            );
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
          this.dispatch('start', Object.assign({}, actionObj));
          const startString = `[${actionName}] ## Starting the action "<yellow>${actionName}</yellow>" on <magenta>${streamSourcesCount}</magenta> sources`;
          this.log(startString);

          const _this = this;
          const handleStreamObjArray = async (streamObjArray, actionObj) => {
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
              if (!settings.beforeActions[actionName])
                settings.beforeActions[actionName] = [];
              else if (!Array.isArray(settings.beforeActions[actionName])) {
                settings.beforeActions[actionName] = [
                  settings.beforeActions[actionName]
                ];
              }
              if (settings.beforeActions[actionName].length) {
                this.log(
                  `[${actionName}] Executing the <cyan>${settings.beforeActions[actionName].length}</cyan> callback(s) registered before the <yellow>${actionName}</yellow> action...`
                );
                for (let key in settings.beforeActions[actionName]) {
                  const beforeActionFn =
                    settings.beforeActions[actionName][key];
                  const beforeActionResultObj = await beforeActionFn(
                    currentStreamObj,
                    Object.assign({}, actionObj)
                  );
                  if (beforeActionResultObj && beforeActionResultObj.settings) {
                    actionSettings = __deepMerge(
                      actionSettings,
                      beforeActionResultObj.settings
                    );
                  }
                  if (
                    beforeActionResultObj &&
                    beforeActionResultObj.streamObj
                  ) {
                    currentStreamObj = beforeActionResultObj.streamObj;
                  } else {
                    currentStreamObj = beforeActionResultObj;
                  }
                }
              }

              // call the action and pass it the current stream object
              try {
                currentActionReturn = actionFn(
                  currentStreamObj,
                  actionSettings
                );
                if (currentActionReturn instanceof Promise)
                  currentStreamObj = await currentActionReturn;
                else currentStreamObj = currentActionReturn;
                currentActionReturn = null;
              } catch (e) {
                if (typeof e === 'object') {
                  actionObj.stderr.push(
                    `#error <red>${e.name}</red>: ${e.message}`
                  );
                  this.error(
                    `[${actionName}] #error <red>${e.name}</red>: ${e.message}`
                  );
                } else if (typeof e === 'string') {
                  actionObj.stderr.push(e);
                  // trigger an "event"
                  this.error(`[${actionName}] ${e}`);
                }
                cancel(actionObj);
              }

              if (actionInstance._skipNextActions) {
                skipNextActions = actionInstance._skipNextActions;
              }

              // check if an "afterCallback" callback has been passed in the streamObj
              if (actionInstance._registeredCallbacks.length) {
                actionInstance._registeredCallbacks.forEach((callbackObj) => {
                  if (!callbackObj.action) {
                    if (callbackObj.when === 'after') {
                      settings.after = [
                        ...settings.after,
                        callbackObj.callback
                      ];
                    } else {
                      settings.before = [
                        ...settings.before,
                        callbackObj.callback
                      ];
                    }
                  } else {
                    if (callbackObj.when === 'before') {
                      if (!settings.beforeActions[callbackObj.action])
                        settings.beforeActions[callbackObj.action] = [];
                      else if (
                        !Array.isArray(
                          settings.beforeActions[callbackObj.action]
                        )
                      )
                        settings.beforeActions[callbackObj.action] = [
                          settings.beforeActions[callbackObj.action]
                        ];
                      settings.beforeActions[callbackObj.action].push(
                        callbackObj.callback
                      );
                    } else {
                      if (!settings.afterActions[callbackObj.action])
                        settings.afterActions[callbackObj.action] = [];
                      else if (
                        !Array.isArray(
                          settings.afterActions[callbackObj.action]
                        )
                      )
                        settings.afterActions[callbackObj.action] = [
                          settings.afterActions[callbackObj.action]
                        ];
                      settings.afterActions[callbackObj.action].push(
                        callbackObj.callback
                      );
                    }
                  }
                });
              }

              // check if is a "afterActions" setting function
              if (!settings.afterActions[actionName])
                settings.afterActions[actionName] = [];
              else if (!Array.isArray(settings.afterActions[actionName])) {
                settings.afterActions[actionName] = [
                  settings.afterActions[actionName]
                ];
              }
              if (settings.afterActions[actionName].length) {
                this.log(
                  `[${actionName}] Executing the <cyan>${settings.afterActions[actionName].length}</cyan> callback(s) registered after the <yellow>${actionName}</yellow> action...`
                );
                if (Array.isArray(currentStreamObj)) {
                  currentStreamObj.forEach(async (strObj, i) => {
                    for (let key in settings.afterActions[actionName]) {
                      const afterActionFn =
                        settings.afterActions[actionName][key];
                      currentStreamObj[i] = await afterActionFn(
                        currentStreamObj[i],
                        Object.assign({}, actionObj)
                      );
                    }
                  });
                } else {
                  for (let key in settings.afterActions[actionName]) {
                    const afterActionFn =
                      settings.afterActions[actionName][key];
                    currentStreamObj = await afterActionFn(
                      currentStreamObj,
                      Object.assign({}, actionObj)
                    );
                  }
                }
              }

              // replace the streamObj with the new one in the stack
              streamObjArray[j] = currentStreamObj;

              if (canceled) return streamObjArray;
            }

            return streamObjArray;
          };

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
          overallActionsStats.actions[actionName] = Object.assign(
            {},
            actionObj
          );
          // trigger an "event"
          this.dispatch('step', Object.assign({}, actionObj));

          if (actionObj.stderr.length) {
            const errorString = `[${actionName}] #error <red>Something went wrong during the </red>"<yellow>${actionName}</yellow>"<red> action...</red>`;
            actionObj.stderr.unshift(errorString);
            this.error(errorString);
          } else {
            const successString = `[${actionName}] #success The action "<yellow>${actionName}</yellow>" has finished <green>successfully</green> on <magenta>${streamSourcesCount}</magenta> sources in <yellow>${__convert(
              actionObj.duration,
              's'
            )}s</yellow>`;
            actionObj.stdout.push(successString);
            this.log(successString);
          }
        }

        // reset the actionName
        this._currentActionName = null;

        // get the lastest stream object as streamObj
        streamObj = currentStreamObjArray[currentStreamObjArray.length - 1];

        if (settings.after && settings.after.length) {
          const startTime = Date.now();
          this.log(
            `[afterCallbacks] Executing the <cyan>${settings.after.length}</cyan> callback(s) registered after the entire actions stream process...`
          );
          for (let key in settings.after) {
            const fn = settings.after[key];
            streamObj = await fn(streamObj);
          }
          this.log(
            `[afterCallbacks] #success The <cyan>${
              settings.after.length
            }</cyan> after stream callback(s) have finished <green>successfully</green> <yellow>${__convert(
              Date.now() - startTime,
              's'
            )}s</yellow>`
          );
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

        const completeString = `#success The stream "<cyan>${
          settings.name || 'unnamed'
        }</cyan>" has finished <green>successfully</green> in <yellow>${__convert(
          overallActionsStats.duration,
          's'
        )}s</yellow>`;
        overallActionsStats.stdout.push(completeString);
        this.log(completeString);

        // resolve this stream process
        this.dispatch('complete', overallActionsStats);
        resolve(overallActionsStats);

        // if (!__isTestEnv() && __isChildProcess()) process.exit();
      }
    )
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

    return this._currentSPromise;
  }

  /**
   * @name                  log
   * @type                  Function
   *
   * THis method allows you to log something that will be passed upward through the SPromise events "stdout".
   *
   * @param       {String}          ...args             The messages to log
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...args) {
    args.forEach((arg) => {
      if (this._currentSPromise)
        this._currentSPromise.trigger('stdout.data', arg);
      this.trigger('stdout.data', arg);

      if (this._currentSPromise && this._currentActionName)
        this._currentSPromise.trigger(
          `${this._currentActionName}.stdout.data`,
          arg
        );
      if (this._currentActionName)
        this.trigger(`${this._currentActionName}.stdout.data`, arg);
    });
  }

  /**
   * @name                  error
   * @type                  Function
   *
   * THis method allows you to error something that will be passed upward through the SPromise events "stderr"
   *
   * @param       {String}          ...args             The messages to error
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error(...args) {
    args.forEach((arg) => {
      if (this._currentSPromise)
        this._currentSPromise.trigger('stdout.data', arg);
      this.trigger('stdout.data', arg);
      if (this._currentSPromise && this._currentActionName)
        this._currentSPromise.trigger(
          `${this._currentActionName}.stdout.data`,
          arg
        );
      if (this._currentActionName)
        this.trigger(`${this._currentActionName}.stdout.data`, arg);
    });
  }

  /**
   * @name                  dispatch
   * @type                  Function
   *
   * THis method allows you to dispatch something that will be passed upward through the SPromise events "stderr"
   *
   * @param       {String}          ...args             The messages to dispatch
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  dispatch(event, ...args) {
    args.forEach((arg) => {
      if (this._currentSPromise) this._currentSPromise.trigger(event, arg);
      this.trigger(event, arg);
      if (this._currentSPromise && this._currentActionName)
        this._currentSPromise.trigger(
          `${this._currentActionName}.${event}`,
          arg
        );
      if (this._currentActionName)
        this.trigger(`${this._currentActionName}.${event}`, arg);
    });
  }
}
