import __parseHtml from '../console/parseHtml';
import __isClass from '../is/class';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __uniqid from '../string/uniqid';
import __convert from '../time/convert';
import __wait from '../time/wait';
import __SActionsStreamAction from './SActionsStreamAction';

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
 * - start: Triggered when the overall actions stream starts
 * - {actionName}.start: Triggered when the specified action starts
 * - {actionName}.reject: Triggered when the specified action has been rejected
 * - {actionName}.complete: Triggered when the specified action has been completed
 * - complete: Triggered when the overall actions stream has been completed
 * - resolve: Trigerred when the overall actions stream has been completed
 * - log: Triggered when a log message has been set
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
          id: __uniqid(),
          name: null,
          order: null,
          before: [],
          after: [],
          beforeActions: {},
          afterActions: {},
          actions: {}
          // exitOnComplete: __isChildProcess()
        },
        settings
      )
    );
    super.start();

    // check that we have a definition object defined
    // if (!this.constructor.definitionObj) {
    //   throw new Error(
    //     `You class "<yellow>${this.constructor.name}</yellow>" has to have a <yellow>static</yellow> <cyan>definitionObj</cyan> property defined...`
    //   );
    // }

    // check the actions
    Object.keys(actions).forEach((actionName) => {
      const actionInstance = actions[actionName];
      if (
        typeof actionInstance === 'function' ||
        (__isClass(actionInstance) &&
          actionInstance.constructor.name === 'SActionsStreamAction') ||
        actionInstance instanceof __SActionsStreamAction
      ) {
      } else {
        throw new Error(
          __parseHtml(
            `The value passed for the "<yellow>${actionName}</yellow>" action has to be either a simple function or an "<green>SActionsStreamAction</green>" instance. You have passed a "<red>${typeof actionInstance}</red>"...`
          )
        );
      }
    });

    // save the actions
    this._actionsObject = actions;

    // specify the exit code if the exitOnComplete setting is true
    this._exitCode = 0;
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
      hasErrorsOcucred = false,
      currentActionReturn,
      skipNextActions = false;

    this._currentSPromise = new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        if (!Array.isArray(settings.before))
          settings.before = [settings.before];
        if (!Array.isArray(settings.after)) settings.after = [settings.after];

        await __wait(50); // ugly hack to check when have time...

        // starting log
        const startString = `#start Starting the stream "<cyan>${
          settings.name || 'unnamed'
        }</cyan>"`;
        this.log(startString);
        this.trigger('start', {});
        trigger('start', {});

        // check if is a "before" setting function
        if (settings.before && settings.before.length) {
          const startTime = Date.now();
          this.log({
            group: 'beforeCallbacks',
            value: `Executing the <cyan>${settings.before.length}</cyan> callback(s) registered before the entire actions stream process...`
          });
          for (let key in settings.before) {
            const fn = settings.before[key];
            streamObj = await fn(streamObj);
          }
          this.log({
            group: 'beforeCallbacks',
            value: `#success The <cyan>${
              settings.before.length
            }</cyan> before stream callback(s) have finished <green>successfully</green> <yellow>${__convert(
              Date.now() - startTime,
              's'
            )}s</yellow>`
          });
        }

        // take the actions order array
        const actionsOrderedNames = Array.isArray(settings.order)
          ? settings.order
          : Object.keys(this._actionsObject);
        // check the order
        actionsOrderedNames.forEach((actionName) => {
          if (!this._actionsObject[actionName]) {
            throw new Error(
              __parseHtml(
                `You have specified the action "<yellow>${actionName}</yellow>" in your SActionsStream instance but it is not available. Here's the available actions: <green>${Object.keys(
                  this._actionsObject
                ).join(',')}</green>`
              )
            );
          }
          // else if (
          //   (this._actionsObject[actionName].constructor &&
          //     this._actionsObject[actionName].constructor.name !==
          //       'SActionsStreamAction') ||
          //   (__isClass(this._actionsObject[actionName]) &&
          //     this._actionsObject[actionName].name !== 'SActionsStreamAction')
          // ) {
          //   throw new Error(
          //     __parseHtml(
          //       `You have specified the action "<yellow>${actionName}</yellow>" in your SActionsStream instance but it seems that your passed value is not either an instance of the <green>SActionsStreamAction</green> class, either a class that extends the <green>SActionsStreamAction</green> one...`
          //     )
          //   );
          // }
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
          if (canceled || hasErrorsOcucred) break;

          const actionName = actionsOrderedNames[i];
          this._currentActionName = actionName;
          let actionInstance;
          let actionSettings = settings.actions
            ? settings.actions[actionName] || {}
            : {};

          // make sure we have a "name" property in the actionSettings object
          if (!actionSettings.name) {
            actionSettings.name = actionName;
          }

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
            this.log({
              value: skipMessage
            });
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
            actionInstance.on('log', (value) => {
              this.log({
                group: this._currentActionName,
                value: value
              });
            });
            actionInstance.on('error', (value) => {
              this.log({
                error: true,
                group: this._currentActionName,
                value: value
              });
            });
            actionInstance.on('reject', (value) => {
              this._exitCode = 1;
              this.trigger(`${this._currentActionName}.reject`, value);
              trigger(`${this._currentActionName}.reject`, value);
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
          this.trigger(
            `${this._currentActionName}.start`,
            Object.assign({}, actionObj)
          );
          trigger(
            `${this._currentActionName}.start`,
            Object.assign({}, actionObj)
          );
          const startString = `#start Starting the action "<yellow>${actionName}</yellow>" on <magenta>${streamSourcesCount}</magenta> sources`;
          this.log({
            group: actionName,
            value: startString
          });

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

              // check if is a "afterActions" setting function
              if (!settings.beforeActions[actionName])
                settings.beforeActions[actionName] = [];
              else if (!Array.isArray(settings.beforeActions[actionName])) {
                settings.beforeActions[actionName] = [
                  settings.beforeActions[actionName]
                ];
              }
              if (settings.beforeActions[actionName]) {
                this.log({
                  group: actionName,
                  value: `Executing the <cyan>${settings.beforeActions[actionName].length}</cyan> callback(s) registered after the <yellow>${actionName}</yellow> action...`
                });
                if (Array.isArray(currentStreamObj)) {
                  currentStreamObj.forEach(async (strObj, i) => {
                    let actionsArray = this._settings.beforeActions[actionName];
                    if (!Array.isArray(actionsArray))
                      actionsArray = [actionsArray];
                    for (let i = 0; i < actionsArray.length; i++) {
                      const fn = actionsArray[i];
                      try {
                        const fnResult = fn(
                          currentStreamObj[i],
                          Object.assign({}, actionObj)
                        );
                        currentStreamObj[i] = await fnResult;
                      } catch (e) {
                        const msg = `Something when wrong during the execution of the <yellow>beforeActions.${actionName}</yellow> function...`;
                        this.log({
                          error: e,
                          value: msg
                        });
                        overallActionsStats.stderr.push(msg);
                        hasErrorsOcucred = true;
                      }
                    }
                  });
                } else {
                  let actionsArray = this._settings.beforeActions[actionName];
                  if (!Array.isArray(actionsArray))
                    actionsArray = [actionsArray];
                  for (let i = 0; i < actionsArray.length; i++) {
                    const fn = actionsArray[i];
                    try {
                      const fnResult = fn(
                        currentStreamObj,
                        Object.assign({}, actionObj)
                      );
                      currentStreamObj = await fnResult;
                    } catch (e) {
                      const msg = `Something when wrong during the execution of the <yellow>beforeActions.${actionName}</yellow> function...`;
                      this.log({
                        error: e,
                        value: msg
                      });
                      overallActionsStats.stderr.push(msg);
                      hasErrorsOcucred = true;
                    }
                  }
                }
              }

              // call the action and pass it the current stream object
              try {
                currentActionReturn = actionFn(
                  currentStreamObj,
                  actionSettings
                );
                __SPromise.pipe(currentActionReturn, this._currentSPromise);
                if (currentActionReturn instanceof Promise) {
                  currentStreamObj = await currentActionReturn;
                } else currentStreamObj = currentActionReturn;
                currentActionReturn = null;
              } catch (e) {
                hasErrorsOcucred = true;

                throw e;

                // if (typeof e === 'object') {
                //   actionObj.stderr.push(`<red>${e.name}</red>: ${e.message}`);
                //   overallActionsStats.stderr.push(
                //     `<red>${e.name}</red>: ${e.message}`
                //   );
                // } else if (typeof e === 'string') {
                //   actionObj.stderr.push(e);
                //   overallActionsStats.stderr.push(e);
                // }
              }

              if (actionInstance && actionInstance._skipNextActions) {
                skipNextActions = actionInstance._skipNextActions;
              }

              // check if an "afterCallback" callback has been passed in the streamObj
              if (
                actionInstance &&
                actionInstance._registeredCallbacks.length
              ) {
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
              if (settings.afterActions[actionName]) {
                this.log({
                  group: actionName,
                  value: `Executing the <cyan>${settings.afterActions[actionName].length}</cyan> callback(s) registered after the <yellow>${actionName}</yellow> action...`
                });
                if (Array.isArray(currentStreamObj)) {
                  currentStreamObj.forEach(async (strObj, i) => {
                    let actionsArray = this._settings.afterActions[actionName];
                    if (!Array.isArray(actionsArray))
                      actionsArray = [actionsArray];
                    for (let i = 0; i < actionsArray.length; i++) {
                      const fn = actionsArray[i];
                      try {
                        const fnResult = fn(
                          currentStreamObj[i],
                          Object.assign({}, actionObj)
                        );
                        currentStreamObj[i] = await fnResult;
                      } catch (e) {
                        const msg = `Something when wrong during the execution of the <yellow>afterActions.${actionName}</yellow> function...`;
                        this.log({
                          error: e,
                          value: msg
                        });
                        overallActionsStats.stderr.push(msg);
                        hasErrorsOcucred = true;
                      }
                    }
                  });
                } else {
                  let actionsArray = this._settings.afterActions[actionName];
                  if (!Array.isArray(actionsArray))
                    actionsArray = [actionsArray];
                  for (let i = 0; i < actionsArray.length; i++) {
                    const fn = actionsArray[i];
                    try {
                      const fnResult = fn(
                        currentStreamObj,
                        Object.assign({}, actionObj)
                      );
                      currentStreamObj = await fnResult;
                    } catch (e) {
                      const msg = `Something when wrong during the execution of the <yellow>afterActions.${actionName}</yellow> function...`;
                      this.log({
                        error: e,
                        value: msg
                      });
                      overallActionsStats.stderr.push(msg);
                      hasErrorsOcucred = true;
                    }
                  }
                }
              }

              // replace the streamObj with the new one in the stack
              streamObjArray[j] = currentStreamObj;

              if (canceled || hasErrorsOcucred) return streamObjArray;
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
          this.trigger(
            `${this._currentActionName}.complete`,
            Object.assign({}, actionObj)
          );
          trigger(
            `${this._currentActionName}.complete`,
            Object.assign({}, actionObj)
          );

          if (actionObj.stderr.length) {
            const errorString = `[${actionName}] #error <red>Something went wrong during the </red>"<yellow>${actionName}</yellow>"<red> action...</red>`;
            actionObj.stderr.unshift(errorString);
            this._exitCode = 1;
            throw new Error(errorString);
          } else {
            const successString = `#success The action "<yellow>${actionName}</yellow>" has finished <green>successfully</green> on <magenta>${streamSourcesCount}</magenta> sources in <yellow>${__convert(
              actionObj.duration,
              's'
            )}s</yellow>`;
            actionObj.stdout.push(successString);
            this.log({
              group: actionName,
              value: successString
            });
          }
        }

        // reset the actionName
        this._currentActionName = null;

        // get the lastest stream object as streamObj
        streamObj = currentStreamObjArray[currentStreamObjArray.length - 1];

        if (settings.after && settings.after.length) {
          const startTime = Date.now();
          this.log({
            group: 'afterCallbacks',
            value: `Executing the <cyan>${settings.after.length}</cyan> callback(s) registered after the entire actions stream process...`
          });
          for (let key in settings.after) {
            const fn = settings.after[key];
            streamObj = await fn(streamObj);
          }
          this.log({
            group: 'afterCallbacks',
            value: `#success The <cyan>${
              settings.after.length
            }</cyan> after stream callback(s) have finished <green>successfully</green> <yellow>${__convert(
              Date.now() - startTime,
              's'
            )}s</yellow>`
          });
        }

        // complete the overall stats
        overallActionsStats = {
          ...overallActionsStats,
          streamObjArray: currentStreamObjArray,
          streamObj,
          end: Date.now(),
          duration: Date.now() - overallActionsStats.start
        };

        if (overallActionsStats.stderr.length || canceled || hasErrorsOcucred) {
          const errorString = `The stream "<cyan>${
            settings.name || 'unnamed'
          }</cyan>" has had some issues...`;
          overallActionsStats.stdout.push(errorString);
          this.log({
            error: true,
            value: errorString
          });
          this.log({
            error: true,
            value: overallActionsStats.stderr.join('\n')
          });

          this.trigger('reject', overallActionsStats);
          trigger('reject', overallActionsStats);
        } else {
          const completeString = `#success The stream "<cyan>${
            settings.name || 'unnamed'
          }</cyan>" has finished <green>successfully</green> in <yellow>${__convert(
            overallActionsStats.duration,
            's'
          )}s</yellow>`;
          overallActionsStats.stdout.push(completeString);
          this.log({
            value: completeString
          });

          // resolve this stream process
          this.trigger('complete', overallActionsStats);
          trigger('complete', overallActionsStats);
          resolve(overallActionsStats);
        }
      },
      {
        id: this._settings.id
      }
    ).start();

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
      if (this._currentSPromise) this._currentSPromise.trigger('log', arg);
      this.trigger('log', arg);
    });
  }
}
