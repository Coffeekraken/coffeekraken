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

  /**
   * @name          _beforeCallbacks
   * @type          Function
   * @private
   * @async
   *
   * This method take care of executing the callbacks of the "before" stack
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _beforeCallbacks() {
    // check if is a "before" setting function
    if (
      this._currentStream.settings.before &&
      this._currentStream.settings.before.length
    ) {
      const startTime = Date.now();
      this.log({
        group: 'beforeCallbacks',
        value: `Executing the <cyan>${this._currentStream.settings.before.length}</cyan> callback(s) registered before the entire actions stream process...`
      });
      try {
        for (let key in this._currentStream.settings.before) {
          const fn = this._currentStream.settings.before[key];
          this._currentStream.streamObj = fn(this._currentStream.streamObj);
        }
        this.log({
          group: 'beforeCallbacks',
          value: `#success The <cyan>${
            this._currentStream.settings.before.length
          }</cyan> before stream callback(s) have finished <green>successfully</green> <yellow>${__convert(
            Date.now() - startTime,
            's'
          )}s</yellow>`
        });
      } catch (e) {
        if (typeof e === 'object') {
          this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
          this._currentStream.stats.stderr.push(__toString(e));
        } else if (typeof e === 'string') {
          this._currentStream.currentActionObj.stats.stderr.push(e);
          this._currentStream.stats.stderr.push(e);
        }
      }
    }

    return this._currentStream.streamObj;
  }

  /**
   * @name          _afterCallbacks
   * @type          Function
   * @private
   * @async
   *
   * This method take care of executing the callbacks of the "after" stack
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _afterCallbacks() {
    if (
      this._currentStream.settings.after &&
      this._currentStream.settings.after.length
    ) {
      const startTime = Date.now();
      this.log({
        group: 'afterCallbacks',
        value: `Executing the <cyan>${this._currentStream.settings.after.length}</cyan> callback(s) registered after the entire actions stream process...`
      });
      try {
        for (let key in this._currentStream.settings.after) {
          const fn = this._currentStream.settings.after[key];
          const fnResult = fn(this._currentStream.streamObj);
          if (fnResult instanceof Promise) {
            this._currentStream.streamObj = await fnResult;
          } else {
            this._currentStream.streamObj = fnResult;
          }
        }
        this.log({
          group: 'afterCallbacks',
          value: `#success The <cyan>${
            this._currentStream.settings.after.length
          }</cyan> after stream callback(s) have finished <green>successfully</green> <yellow>${__convert(
            Date.now() - startTime,
            's'
          )}s</yellow>`
        });
      } catch (e) {
        if (typeof e === 'object') {
          this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
          this._currentStream.stats.stderr.push(__toString(e));
        } else if (typeof e === 'string') {
          this._currentStream.currentActionObj.stats.stderr.push(e);
          this._currentStream.stats.stderr.push(e);
        }
      }
    }

    return this._currentStream.streamObj;
  }

  async _handleStreamObjArray() {
    let stack;
    if (!Array.isArray(this._currentStream.streamObj))
      stack = [this._currentStream.streamObj];
    else stack = this._currentStream.streamObj;

    for (let j = 0; j < stack.length; j++) {
      let currentStreamObj = stack[j];

      // before action callbacks
      const beforeActionCallbacksResult = this._beforeActionCallbacks(
        currentStreamObj
      );
      if (beforeActionCallbacksResult instanceof Promise) {
        currentStreamObj = await beforeActionCallbacksResult;
      } else {
        currentStreamObj = beforeActionCallbacksResult;
      }

      // call the action and pass it the current stream object
      try {
        let currentActionReturn = this._currentStream.currentActionObj.instance.run(
          currentStreamObj,
          this._currentStream.currentActionObj.settings
        );

        if (currentActionReturn instanceof Promise) {
          __SPromise.pipe(currentActionReturn, this._currentStream.promise);
          __SPromise.pipe(currentActionReturn, this);
          this._currentStream.currentActionObj.promise = currentActionReturn;
          currentStreamObj = await currentActionReturn;
        } else currentStreamObj = currentActionReturn;
        currentActionReturn = null;
      } catch (e) {
        if (typeof e === 'object') {
          this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
          this._currentStream.stats.stderr.push(__toString(e));
        } else if (typeof e === 'string') {
          this._currentStream.currentActionObj.stats.stderr.push(e);
          this._currentStream.stats.stderr.push(e);
        }
      }

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

      // after action callbacks
      const afterActionCallbacksResult = this._afterActionCallbacks(
        currentStreamObj
      );
      if (afterActionCallbacksResult instanceof Promise) {
        currentStreamObj = await afterActionCallbacksResult;
      } else {
        currentStreamObj = afterActionCallbacksResult;
      }

      // replace the streamObj with the new one in the stack
      stack[j] = currentStreamObj;

      if (this._currentStream.stats.canceled || this.hasCurrentStreamErrors()) {
        if (stack.length <= 1) {
          this._currentStream.streamObj = stack[0];
        } else {
          this._currentStream.streamObj = stack;
        }
        return this._currentStream.streamObj;
      }
    }

    if (stack.length <= 1) {
      this._currentStream.streamObj = stack[0];
    } else {
      this._currentStream.streamObj = stack;
    }
    return this._currentStream.streamObj;
  }

  /**
   * @name            _afterActionCallbacks
   * @type             Function
   * @private
   * @async
   *
   * This method take care of the callback registered after a specific action
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _afterActionCallbacks(streamObj) {
    if (
      !this._currentStream.settings.afterActions[
        this._currentStream.currentActionObj.name
      ]
    )
      this._currentStream.settings.afterActions[
        this._currentStream.currentActionObj.name
      ] = [];
    else if (
      !Array.isArray(
        this._currentStream.settings.afterActions[
          this._currentStream.currentActionObj.name
        ]
      )
    ) {
      this._currentStream.settings.afterActions[
        this._currentStream.currentActionObj.name
      ] = [
        this._currentStream.settings.afterActions[
          this._currentStream.currentActionObj.name
        ]
      ];
    }
    if (
      this._currentStream.settings.afterActions[
        this._currentStream.currentActionObj.name
      ] &&
      this._currentStream.settings.afterActions[
        this._currentStream.currentActionObj.name
      ].length
    ) {
      const count = this._currentStream.settings.afterActions[
        this._currentStream.currentActionObj.name
      ].length;
      this.log({
        group: this._currentStream.currentActionObj.name,
        value: `Executing the <cyan>${count}</cyan> callback(s) registered after the <yellow>${this._currentStream.currentActionObj.name}</yellow> action...`
      });
      if (Array.isArray(streamObj)) {
        streamObj.forEach(async (strObj, i) => {
          let actionsArray = this._currentStream.settings.afterActions[
            this._currentStream.currentActionObj.name
          ];
          for (let i = 0; i < actionsArray.length; i++) {
            const fn = actionsArray[i];
            try {
              const fnResult = fn(
                streamObj[i],
                Object.assign({}, this._currentStream.currentActionObj)
              );
              if (fnResult instanceof Promise) {
                streamObj[i] = await fnResult;
              } else {
                streamObj[i] = fnResult;
              }
            } catch (e) {
              const msg = `Something when wrong during the execution of the <yellow>afterActions.${this._currentStream.currentActionObj.name}</yellow> function...`;
              this._currentStream.stats.stderr.push(msg);
              this._currentStream.stats.stderr.push(__toString(e));
            }
          }
        });
      } else {
        let actionsArray = this._currentStream.settings.afterActions[
          this._currentStream.currentActionObj.name
        ];
        if (!Array.isArray(actionsArray)) actionsArray = [actionsArray];
        for (let i = 0; i < actionsArray.length; i++) {
          const fn = actionsArray[i];
          try {
            const fnResult = fn(
              streamObj,
              Object.assign({}, this._currentStream.currentActionObj)
            );
            if (fnResult instanceof Promise) {
              streamObj = await fnResult;
            } else {
              streamObj = fnResult;
            }
          } catch (e) {
            const msg = `Something when wrong during the execution of the <yellow>afterActions.${this._currentStream.currentActionObj.name}</yellow> function...`;
            this._currentStream.stats.stderr.push(msg);
            this._currentStream.stats.stderr.push(__toString(e));
          }
        }
      }
    }

    return streamObj;
  }

  /**
   * @name            _beforeActionCallbacks
   * @type             Function
   * @private
   * @async
   *
   * This method take care of the callback registered before a specific action
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _beforeActionCallbacks(streamObj) {
    // check if is a "afterActions" setting function
    if (
      !this._currentStream.settings.beforeActions[
        this._currentStream.currentActionObj.name
      ]
    )
      this._currentStream.settings.beforeActions[
        this._currentStream.currentActionObj.name
      ] = [];
    else if (
      !Array.isArray(
        this._currentStream.settings.beforeActions[
          this._currentStream.currentActionObj.name
        ]
      )
    ) {
      this._currentStream.settings.beforeActions[
        this._currentStream.currentActionObj.name
      ] = [
        this._currentStream.settings.beforeActions[
          this._currentStream.currentActionObj.name
        ]
      ];
    }
    if (
      this._currentStream.settings.beforeActions[
        this._currentStream.currentActionObj.name
      ] &&
      this._currentStream.settings.beforeActions[
        this._currentStream.currentActionObj.name
      ].length
    ) {
      const count = this._currentStream.settings.beforeActions[
        this._currentStream.currentActionObj.name
      ].length;
      this.log({
        group: this._currentStream.currentActionObj.name,
        value: `Executing the <cyan>${count}</cyan> callback(s) registered after the <yellow>${this._currentStream.currentActionObj.name}</yellow> action...`
      });
      if (Array.isArray(streamObj)) {
        streamObj.forEach(async (strObj, i) => {
          let actionsArray = this._currentStream.settings.beforeActions[
            this._currentStream.currentActionObj.name
          ];
          for (let i = 0; i < actionsArray.length; i++) {
            const fn = actionsArray[i];
            try {
              const fnResult = fn(
                streamObj[i],
                Object.assign({}, this._currentStream.currentActionObj)
              );
              if (fnResult instanceof Promise) {
                streamObj[i] = await fnResult;
              } else {
                streamObj[i] = fnResult;
              }
            } catch (e) {
              const msg = `Something when wrong during the execution of the <yellow>beforeActions.${this._currentStream.currentActionObj.name}</yellow> function...`;
              this._currentStream.stats.stderr.push(msg);
              this._currentStream.stats.stderr.push(__toString(e));
            }
          }
        });
      } else {
        let actionsArray = this._currentStream.settings.beforeActions[
          this._currentStream.currentActionObj.name
        ];
        for (let i = 0; i < actionsArray.length; i++) {
          const fn = actionsArray[i];
          try {
            const fnResult = fn(
              streamObj,
              Object.assign({}, this._currentStream.currentActionObj)
            );
            if (fnResult instanceof Promise) {
              streamObj = await fnResult;
            } else {
              streamObj = fnResult;
            }
          } catch (e) {
            const msg = `Something when wrong during the execution of the <yellow>beforeActions.${this._currentStream.currentActionObj.name}</yellow> function...`;
            this._currentStream.stats.stderr.push(msg);
            this._currentStream.stats.stderr.push(__toString(e));
          }
        }
      }
    }

    return streamObj;
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

    this._currentStream = {
      promise: null,
      streamObj,
      currentActionObj: {
        name: null,
        promise: null,
        instance: null,
        sourcesCount: 0,
        settings: null
      },
      settings,
      stack: [],
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
      async (resolve, reject, trigger, cancel) => {
        await __wait(100); // ugly hack to check when have time...

        // starting log
        const startString = `#start Starting the stream "<cyan>${
          settings.name || 'unnamed'
        }</cyan>"`;
        this.log(startString);
        this.trigger('start', {});
        trigger('start', {});

        // before callbacks
        await this._beforeCallbacks();

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

          // loop on each actions
          streamObj._isStreamObj = true;
          this._currentStream.stack.push(streamObj);

          for (let i = 0; i < actionsOrderedNames.length; i++) {
            if (this._currentStream.canceled || this.hasCurrentStreamErrors()) {
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
              this._currentStream.stats.skipNextActions.indexOf(actionName) !==
                -1
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
            countSources(this._currentStream.stack);

            this._currentStream.currentActionObj = {
              name: actionName,
              sourcesCount: streamSourcesCount,
              instance: actionInstance,
              settings: actionSettings,
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
                  this.trigger(
                    `${this._currentStream.currentActionObj.name}.reject`,
                    value
                  );
                  trigger(
                    `${this._currentStream.currentActionObj.name}.reject`,
                    value
                  );
                  cancel(value);
                }
              );
              actionSettings = __deepMerge(
                this._currentStream.currentActionObj.instance._settings,
                actionSettings
              );
            }

            // trigger some "start" events
            this.trigger(
              `${this._currentStream.currentActionObj.name}.start`,
              Object.assign({}, this._currentStream.currentActionObj)
            );
            trigger(
              `${this._currentStream.currentActionObj.name}.start`,
              Object.assign({}, this._currentStream.currentActionObj)
            );
            const startString = `#start Starting the action "<yellow>${this._currentStream.currentActionObj.name}</yellow>" on <magenta>${this._currentStream.currentActionObj.sourcesCount}</magenta> sources`;
            this.log({
              group: this._currentStream.currentActionObj.name,
              value: startString
            });

            await this._handleStreamObjArray();

            if (this.hasCurrentStreamErrors()) {
              break;
            }

            if (this.constructor.interface) {
              // if (
              //   this._currentStream.streamObj.map &&
              //   typeof this._currentStream.streamObj.map === 'function'
              // ) {
              //   throw 'COCO';
              // }

              // throw __toString(this.constructor.interface.definitionObj, {
              //   beautify: true
              // });
              const issuesString = this.constructor.interface.apply(
                Array.isArray(this._currentStream.streamObj)
                  ? this._currentStream.streamObj[0]
                  : this._currentStream.streamObj,
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

            // save the action stats into the global stream object stack
            this._currentStream.stack.push(this._currentStream.streamObj);

            // trigger an "event"
            this.trigger(
              `${this._currentStream.currentActionObj.name}.complete`,
              Object.assign({}, this._currentStream.currentActionObj)
            );
            trigger(
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
              this.log({
                group: this._currentStream.currentActionObj.name,
                value: successString
              });
            }
          }
        }

        // after callbacks
        await this._afterCallbacks();

        if (this.constructor.interface) {
          const issuesString = this.constructor.interface.apply(
            Array.isArray(this._currentStream.streamObj)
              ? this._currentStream.streamObj[0]
              : this._currentStream.streamObj,
            { return: 'string', throw: false }
          );
          if (issuesString !== true) {
            this._currentStream.stats.stderr.push(issuesString);
          }
        }

        // complete the overall stats
        this._currentStream.stats = {
          ...this._currentStream.stats,
          streamObj: this._currentStream.streamObj,
          endTime: Date.now(),
          duration: Date.now() - this._currentStream.stats.startTime
        };

        if (
          this.hasCurrentStreamErrors() ||
          this._currentStream.stats.canceled
        ) {
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

          this.trigger('reject', this._currentStream.stats);
          trigger('reject', this._currentStream.stats);
        } else {
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

          // resolve this stream process
          this.trigger('complete', this._currentStream.stats);
          trigger('complete', this._currentStream.stats);
          resolve(this._currentStream.stats);
        }
      },
      {
        id: this._settings.id
      }
    ).start();

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
  _coco = 'hello';
  log(...args) {
    args.forEach((arg) => {
      if (this._currentStream && this._currentStream.promise) {
        this._currentStream.promise.trigger('log', arg);
      }
      this.trigger('log', arg);
    });
  }
}
