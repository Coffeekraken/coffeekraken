// @ts-nocheck
// @shared

import __clone from '../object/clone';
import __parseHtml from '../console/parseHtml';
import __SError from '../error/SError';
import __isClass from '../is/class';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __toString from '../string/toString';
import __trimLines from '../string/trimLines';
import __uniqid from '../string/uniqid';
import __convert from '../time/convert';
import __wait from '../time/wait';
import __SActionsStreamAction from './SActionsStreamAction';
import __SCache from '../cache/SCache';
import __sha256 from '../crypt/sha256';
import __upperFirst from '../string/upperFirst';
import __isChildProcess from '../is/childProcess';

/**
 * @name          SActionStream
 * @namespace           sugar.js.stream
 * @type          Class
 * @extends       SPromise
 * @status              beta
 *
 * This class represent the base of a actions stream.
 * An action stream if simply some functions that are called one after the other
 * and that pass to each other some value(s) on which to work.
 * Here's all the "events" that you can subscribe on the SActionStream instance, or on the returned SPromise when calling the "start" method:
 * - start: emited when the overall actions stream starts
 * - {actionName}.start: emited when the specified action starts
 * - {actionName}.reject: emited when the specified action has been rejected
 * - {actionName}.complete: emited when the specified action has been completed
 * - complete: emited when the overall actions stream has been completed
 * - resolve: Trigerred when the overall actions stream has been completed
 * - log: emited when a log message has been set
 * - cancel: emited when the stream has been canceled using the "cancel" method of the returned SPromise when calling the "start" method
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SActionStream extends __SPromise {
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
   * @name            _currentStream
   * @type            SPromise
   * @private
   *
   * Store the current running stream. Here's the object structure:
   * {
   *    promise: Store the SPromise instance for the stream
   *    currentActionObj: {
   *       name: Store the name of the current action executing in the stream
   *       promise: Store the promise returned from the ```run``` action instance method
   *    }
   * }
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentStream = null;

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
      __deepMerge(
        {
          id: `SActionsStream`,
          cache: false,
          name: null,
          order: null,
          before: [],
          after: [],
          beforeActions: {},
          afterActions: {},
          actions: {},
          logs: {
            start: true,
            success: true,
            error: true,
            exclude: []
          }
        },
        settings
      )
    );

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
        throw new __SError(
          __parseHtml(
            `The value passed for the "<yellow>${actionName}</yellow>" action has to be either a simple function or an "<green>SActionsStreamAction</green>" instance. You have passed a "<red>${typeof actionInstance}</red>"...`
          )
        );
      }
    });

    // init a SCache instance if needed
    if (this._settings.cache) {
      this._sCache = new __SCache(
        settings.id,
        settings.cache === true ? {} : settings.cache
      );
    }

    // save the actions
    this._actionsObject = actions;
  }

  /**
   * @name          hasCurrentStreamErrors
   * @type          Function
   *
   * This method return true or false depending if the current stream has some errors or not
   *
   * @return      {Boolean}           true if not errors, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hasCurrentStreamErrors() {
    return this._currentStream && this._currentStream.stats.stderr.length;
  }

  async _applyFnOnStreamObj(streamObjOrArray, processFn, settings = {}) {
    settings = __deepMerge(
      {
        processFnArgs: [],
        type: 'main',
        resultProcessor: null
      },
      settings
    );

    const logActionStatus = () => {
      let logString = `Processing <cyan>${
        Array.isArray(this._currentStream.streamObjArray)
          ? this._currentStream.streamObjArray.length
          : 1
      }</cyan> source${
        Array.isArray(this._currentStream.streamObjArray)
          ? this._currentStream.streamObjArray.length > 1
            ? 's'
            : ''
          : ''
      } | Processed <green>${
        this._currentStream.currentActionObj.processed
      }</green>`;
      if (this._settings.cache) {
        logString += ` | From cache: <yellow>${this._currentStream.currentActionObj.fromCache}</yellow>`;
      }
      if (
        this._settings.logs.exclude.indexOf(
          this._currentStream.currentActionObj.id
        ) === -1
      ) {
        this.log({
          temp: true,
          group: this._currentStream.currentActionObj.name,
          value: logString
        });
      }
    };

    const processFnArray = !Array.isArray(processFn) ? [processFn] : processFn;
    const isArray = Array.isArray(streamObjOrArray);
    let streamObjArray = streamObjOrArray;
    if (!isArray) streamObjArray = [streamObjArray];
    for (const streamObjArrayIdx in streamObjArray) {
      let streamObj = streamObjArray[streamObjArrayIdx];
      // if (streamObj.$fromCache) return;

      // set the current action in the streamObj
      streamObj.$action = settings.type;

      // calculate the hash of this particular action
      const actionHash = __sha256.encrypt(
        __toString({
          ...__clone(streamObj),
          settings: this._settings
        })
      );

      // get the value from the cache if available
      if (
        (this._currentStream.currentActionObj.instance &&
          this._currentStream.currentActionObj.instance.settings.cache &&
          this._sCache) ||
        (this._sCache && !this._currentStream.currentActionObj.instance)
      ) {
        const cachedStreamObj = await this._sCache.get(actionHash);
        if (cachedStreamObj) {
          streamObj = cachedStreamObj;
          streamObj.$fromCache = true;
          streamObjArray[streamObjArrayIdx] = streamObj;
          this._currentStream.currentActionObj.fromCache++;
          logActionStatus();
          return;
        }
      }

      const processFnArgs = [streamObj, ...settings.processFnArgs];

      for (const processFnArrayIdx in processFnArray) {
        const processFn = processFnArray[processFnArrayIdx];
        try {
          let processFnResult = processFn(...processFnArgs);
          if (settings.resultProcessor)
            processFnResult = settings.resultProcessor.bind(this)(
              processFnResult
            );
          if (processFnResult instanceof Promise) {
            // processFnResult.catch((e) => {
            //   throw 'PLCPLC';

            // });

            streamObj = await processFnResult;
          } else {
            streamObj = processFnResult;
          }
        } catch (e) {}
      }

      streamObjArray[streamObjArrayIdx] = streamObj;

      if (settings.type.match(/.*\.main$/)) {
        this._currentStream.currentActionObj.processed++;
        logActionStatus();
      }

      // save in cache
      if (this._settings.cache) await this._saveInCache(actionHash, streamObj);
    }

    if (isArray) return streamObjArray;
    return streamObjArray[0];
  }

  async _handleStreamObjArray() {
    let stack = this._currentStream.streamObjArray;

    for (let j = 0; j < stack.length; j++) {
      let currentStreamObj = stack[j];
      if (currentStreamObj.$fromCache) {
        logActionStatus();
        continue;
      }

      if (
        this._currentStream.settings.beforeActions &&
        this._currentStream.settings.beforeActions[
          this._currentStream.currentActionObj.name
        ]
      ) {
        currentStreamObj = await this._applyFnOnStreamObj(
          currentStreamObj,
          this._currentStream.settings.beforeActions[
            this._currentStream.currentActionObj.name
          ],
          {
            type: `${this._currentStream.currentActionObj.name}.before`
          }
        );
      }

      // call the action and pass it the current stream object
      currentStreamObj = await this._applyFnOnStreamObj(
        currentStreamObj,
        (...args) => {
          return new Promise(async (resolve) => {
            const res = await this._currentStream.currentActionObj.instance.run(
              ...args
            );
            return resolve(res);
          });
        },
        {
          type: `${this._currentStream.currentActionObj.name}.main`,
          processFnArgs: [
            this._currentStream.currentActionObj.instance.settings
          ],
          resultProcessor: (fnResult) => {
            if (fnResult instanceof Promise) {
              __SPromise.pipe(fnResult, this._currentStream.promise);
              __SPromise.pipe(fnResult, this);
              this._currentStream.currentActionObj.promise = fnResult;
            }
            return fnResult;
          }
        }
      );

      if (
        this._currentStream.currentActionObj.instance &&
        this._currentStream.currentActionObj.instance._skipNextActions
      ) {
        this._currentStream.stats.skipNextActions = this._currentStream.currentActionObj.instance._skipNextActions;
      }

      // check if an "afterCallback" callback has been passed in the streamObj
      if (
        this._currentStream.currentActionObj.instance &&
        this._currentStream.currentActionObj.instance._registeredCallbacks &&
        this._currentStream.currentActionObj.instance._registeredCallbacks
          .length
      ) {
        this._currentStream.currentActionObj.instance._registeredCallbacks.forEach(
          (callbackObj) => {
            if (!callbackObj.action) {
              if (callbackObj.when === 'after') {
                this._currentStream.settings.after = [
                  ...this._currentStream.settings.after,
                  callbackObj.callback
                ];
              } else {
                this._currentStream.settings.before = [
                  ...this._currentStream.settings.before,
                  callbackObj.callback
                ];
              }
            } else {
              if (callbackObj.when === 'before') {
                if (
                  !this._currentStream.settings.beforeActions[
                    callbackObj.action
                  ]
                )
                  this._currentStream.settings.beforeActions[
                    callbackObj.action
                  ] = [];
                else if (
                  !Array.isArray(
                    this._currentStream.settings.beforeActions[
                      callbackObj.action
                    ]
                  )
                )
                  this._currentStream.settings.beforeActions[
                    callbackObj.action
                  ] = [
                    this._currentStream.settings.beforeActions[
                      callbackObj.action
                    ]
                  ];
                this._currentStream.settings.beforeActions[
                  callbackObj.action
                ].push(callbackObj.callback);
              } else {
                if (
                  !this._currentStream.settings.afterActions[callbackObj.action]
                )
                  this._currentStream.settings.afterActions[
                    callbackObj.action
                  ] = [];
                else if (
                  !Array.isArray(
                    this._currentStream.settings.afterActions[
                      callbackObj.action
                    ]
                  )
                )
                  this._currentStream.settings.afterActions[
                    callbackObj.action
                  ] = [
                    this._currentStream.settings.afterActions[
                      callbackObj.action
                    ]
                  ];
                this._currentStream.settings.afterActions[
                  callbackObj.action
                ].push(callbackObj.callback);
              }
            }
          }
        );
      }

      if (
        this._currentStream.settings.afterActions &&
        this._currentStream.settings.afterActions[
          this._currentStream.currentActionObj.name
        ]
      ) {
        currentStreamObj = await this._applyFnOnStreamObj(
          currentStreamObj,
          this._currentStream.settings.afterActions[
            this._currentStream.currentActionObj.name
          ],
          {
            type: `${this._currentStream.currentActionObj.name}.after`
          }
        );
      }

      // replace the streamObj with the new one in the stack
      stack[j] = currentStreamObj;

      if (this._currentStream.stats.canceled || this.hasCurrentStreamErrors()) {
        this._currentStream.streamObjArray = stack;
        return this._currentStream.streamObjArray;
      }
    }

    // flatten the stack
    stack = stack.flat(1);

    // filter the streamObjects that comes from the cache
    stack = stack.filter((streamObj) => {
      return streamObj.$fromCache === undefined;
    });

    this._currentStream.streamObjArray = stack;
    return this._currentStream.streamObjArray;
  }

  /**
   * @name            _saveInCache
   * @type            Function
   * @private
   *
   * This method simmply take the stream object and save it into the cache
   *
   * @param       {Object}        streamObj         The stream object to save into cache
   * @return      {Promise}                         A promise resolved when the streamObj has been saved
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _saveInCache(hash, streamObj) {
    // save in cache
    if (
      (this._currentStream.currentActionObj.instance &&
        this._currentStream.currentActionObj.instance.settings.cache &&
        this._sCache) ||
      (this._sCache && !this._currentStream.currentActionObj.instance)
    ) {
      await this._sCache.set(hash, streamObj);
    }
    return true;
  }

  /**
   * @name          start
   * @type          Function
   * @async
   *
   * This method launch the action stream and return an SPromise instance for this particular stream "process"
   *
   * @param       {Object}          [streamObj={}]           An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...
   * @param       {Object}          [settings={}]           An object of settings to override the instance level one if wanted
   * @return      {SPromise}                                An SPromise instance for this particular stream "process" on which you can subscribe to the same "events" that on the SActionsStrean instance.
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

    let currentStreamObj = streamObj;

    this._currentStream = {
      promise: null,
      streamObjArray: Array.isArray(currentStreamObj)
        ? currentStreamObj
        : [currentStreamObj],
      currentActionObj: {
        name: null,
        promise: null,
        instance: null,
        sourcesCount: 0,
        fromCache: 0,
        processed: 0,
        stats: {
          stderr: [],
          stdout: []
        }
      },
      settings,
      stats: {
        startTime: Date.now(),
        endTime: null,
        stderr: [],
        stdout: [],
        skipNextActions: false,
        canceled: false,
        actions: {}
      }
    };

    // make sure the before, after, beforeAction and afterAction stacks are Arrays
    if (settings.before && !Array.isArray(settings.before))
      settings.before = [settings.before];
    if (settings.after && !Array.isArray(settings.after))
      settings.after = [settings.after];

    this._currentStream.promise = new __SPromise(
      async ({ resolve, reject, emit, cancel }) => {
        await __wait(100); // ugly hack to check when have time...

        try {
          // starting log
          if (
            this._settings.logs.exclude.indexOf(
              this._currentStream.currentActionObj.id
            ) === -1 &&
            this._settings.logs.start
          ) {
            const startString = `#start Starting the stream "<cyan>${
              settings.name || 'unnamed'
            }</cyan>"`;
            this.log({
              value: startString
            });
          }
          emit('start', {});

          currentStreamObj = await this._applyFnOnStreamObj(
            currentStreamObj,
            this._settings.before,
            {
              type: 'before'
            }
          );

          if (!this.hasCurrentStreamErrors()) {
            // take the actions order array
            const actionsOrderedNames = Array.isArray(settings.order)
              ? settings.order
              : Object.keys(this._actionsObject);
            // check the order
            actionsOrderedNames.forEach((actionName) => {
              if (!this._actionsObject[actionName]) {
                this._currentStream.stats.stderr.push(
                  __parseHtml(
                    `You have specified the action "<yellow>${actionName}</yellow>" in your SActionsStream instance but it is not available. Here's the available actions: <green>${Object.keys(
                      this._actionsObject
                    ).join(',')}</green>`
                  )
                );
              }
            });

            for (let i = 0; i < actionsOrderedNames.length; i++) {
              if (
                this._currentStream.canceled ||
                this.hasCurrentStreamErrors()
              ) {
                // this.log('stop');
                break;
              }

              const actionName = actionsOrderedNames[i];
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
              if (this._currentStream.stats.skipNextActions === true) {
                skipMessage = `#warning Skipping all the next actions after the "<cyan>${
                  actionsOrderedNames[i - 1]
                }</cyan>" one...`;
                skipAction = 'break';
              } else if (
                Array.isArray(this._currentStream.stats.skipNextActions) &&
                this._currentStream.stats.skipNextActions.indexOf(
                  actionName
                ) !== -1
              ) {
                skipMessage = `#warning Skipping the "<yellow>${actionName}</yellow>" action...`;
                skipAction = 'continue';
              } else if (
                typeof this._currentStream.stats.skipNextActions === 'number' &&
                this._currentStream.stats.skipNextActions > 0
              ) {
                this._currentStream.stats.skipNextActions--;
                skipMessage = `#warning Skipping the "<yellow>${actionName}</yellow>" action. Reamaining action(s) to skip: <cyan>${this._currentStream.stats.skipNextActions}</cyan>...`;
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
              if (
                __isClass(this._actionsObject[actionName]) &&
                this._actionsObject[actionName].prototype instanceof
                  __SActionsStreamAction
              ) {
                actionInstance = new this._actionsObject[actionName](
                  actionSettings
                );
              } else {
                this._currentStream.stats.stderr.push(
                  `Your action "<yellow>${actionName}</yellow>" has to be a class extending the <cyan>SActionsStreamAction</cyan> one...`
                );
                break;
              }

              this._currentStream.currentActionObj = {
                name: actionName,
                sourcesCount: this._currentStream.streamObjArray.length,
                processed: 0,
                fromCache: 0,
                instance: actionInstance,
                stats: {
                  action: actionName,
                  startTime: Date.now(),
                  stderr: [],
                  stdout: []
                }
              };

              if (this._currentStream.currentActionObj.instance) {
                this._currentStream.currentActionObj.instance.on(
                  'reject',
                  (value) => {
                    emit(`${this._currentStream.currentActionObj.name}.error`, {
                      value
                    });
                    cancel(value);
                  }
                );
                actionSettings = __deepMerge(
                  this._currentStream.currentActionObj.instance._settings,
                  actionSettings
                );
              }

              // emit some "start" events
              emit(
                `${this._currentStream.currentActionObj.name}.start`,
                Object.assign({}, this._currentStream.currentActionObj)
              );
              if (
                this._settings.logs.exclude.indexOf(
                  this._currentStream.currentActionObj.id
                ) === -1
              ) {
                const startString = `#start Starting the action "<yellow>${this._currentStream.currentActionObj.name}</yellow>" on <magenta>${this._currentStream.currentActionObj.sourcesCount}</magenta> sources`;
                this.log({
                  group: this._currentStream.currentActionObj.name,
                  value: startString
                });
              }

              await this._handleStreamObjArray();

              if (this.hasCurrentStreamErrors()) {
                break;
              }

              if (this.constructor.interface) {
                const issuesString = this.constructor.interface.apply(
                  this._currentStream.streamObjArray[0],
                  { return: 'string', throw: false }
                );
                if (issuesString !== true) {
                  this._currentStream.stats.stderr.push(issuesString);
                  this._currentStream.currentActionObj.stats.stderr.push(
                    issuesString
                  );
                }
              }

              // complete the actionObj
              this._currentStream.currentActionObj.stats = {
                ...this._currentStream.currentActionObj.stats,
                endTime: Date.now(),
                duration:
                  Date.now() -
                  this._currentStream.currentActionObj.stats.startTime
              };

              // save the result into the overall actions stats object
              this._currentStream.stats.actions[
                this._currentStream.currentActionObj.name
              ] = Object.assign({}, this._currentStream.currentActionObj);

              // emit an "event"
              emit(
                `${this._currentStream.currentActionObj.name}.complete`,
                Object.assign({}, this._currentStream.currentActionObj)
              );

              if (this._currentStream.currentActionObj.stats.stderr.length) {
                const errorString = `#error <red>Something went wrong during the </red>"<yellow>${this._currentStream.currentActionObj.name}</yellow>"<red> action...</red>`;
                this._currentStream.currentActionObj.stats.stderr.push(
                  errorString
                );
                this._currentStream.stats.stderr.push(errorString);
                break;
              } else {
                const successString = `#success The action "<yellow>${
                  this._currentStream.currentActionObj.name
                }</yellow>" has finished <green>successfully</green> on <magenta>${
                  this._currentStream.currentActionObj.sourcesCount
                }</magenta> sources in <yellow>${__convert(
                  this._currentStream.currentActionObj.stats.duration,
                  's'
                )}s</yellow>`;
                this._currentStream.currentActionObj.stats.stdout.push(
                  successString
                );
                if (
                  this._settings.logs.exclude.indexOf(
                    this._currentStream.currentActionObj.id
                  ) === -1
                ) {
                  this.log({
                    group: this._currentStream.currentActionObj.name,
                    value: successString
                  });
                }
              }
            }
          }

          currentStreamObj = await this._applyFnOnStreamObj(
            currentStreamObj,
            this._settings.after,
            {
              type: 'after'
            }
          );

          if (this.constructor.interface) {
            const issuesString = this.constructor.interface.apply(
              this._currentStream.streamObjArray[0],
              { return: 'string', throw: false }
            );
            if (issuesString !== true) {
              this._currentStream.stats.stderr.push(issuesString);
            }
          }

          // complete the overall stats
          this._currentStream.stats = {
            ...this._currentStream.stats,
            streamObj: this._currentStream.streamObjArray,
            endTime: Date.now(),
            duration: Date.now() - this._currentStream.stats.startTime
          };

          if (
            this.hasCurrentStreamErrors() ||
            this._currentStream.stats.canceled
          ) {
            if (this._settings.logs.error) {
              const errorString = `The stream "<cyan>${
                settings.name || 'unnamed'
              }</cyan>" has had some issues...`;
              this._currentStream.stats.stdout.push(errorString);
              this.log({
                error: true,
                value: errorString
              });
              this.log({
                error: true,
                value: __trimLines(this._currentStream.stats.stderr.join('\n'))
              });
            }

            emit('reject', this._currentStream.stats);
          } else {
            if (this._settings.logs.success) {
              const completeString = `#success The stream "<cyan>${
                this._currentStream.settings.name || 'unnamed'
              }</cyan>" has finished <green>successfully</green> in <yellow>${__convert(
                this._currentStream.stats.duration,
                's'
              )}s</yellow>`;
              this._currentStream.stats.stdout.push(completeString);

              this.log({
                value: completeString
              });
            }

            // resolve this stream process
            emit('success', {});
            resolve(this._currentStream.stats);
          }
        } catch (e) {
          if (this._settings.logs.error) {
            this.log({
              value: e.toString()
            });
          }
        }
      },
      {
        id: this._settings.id
      }
    );

    // this._currentStream.promise.catch((e) => {

    // });

    // } catch (e) {
    // if (typeof e === 'object') {
    //   this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
    //   this._currentStream.stats.stderr.push(__toString(e));
    // } else if (typeof e === 'string') {
    //   this._currentStream.currentActionObj.stats.stderr.push(e);
    //   this._currentStream.stats.stderr.push(e);
    // }
    // }

    // __SPromise.pipe(this._currentStream, this);

    return this._currentStream.promise;
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
      if (this._currentStream && this._currentStream.promise) {
        this._currentStream.promise.emit('log', arg);
      }
    });
  }
};
