import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __convert from '../time/convert';
import __SActionsStreamAction from './SActionsStreamAction';
import __isClass from '../is/class';
import __checkDefinitionObj from '../cli/validateDefinitionObject';

/**
 * @name          SActionStream
 * @namespace     sugar.js.stream
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
          before: null,
          after: null,
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
      currentActionReturn;

    // check if is a "before" setting function
    if (settings.before && typeof settings.before === 'function') {
      streamObj = settings.before(streamObj);
    }

    return new __SPromise(async (resolve, reject, trigger, cancel) => {
      // starting log
      const startString = `Starting the stream "<cyan>${
        settings.name || 'unnamed'
      }</cyan>"`;
      const startObj = { value: startString };
      trigger('stdout.data', startObj);
      this.trigger('stdout.data', startObj);

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
      // loop on each actions
      let currentStreamObj = streamObj;
      let overallActionsStats = {
        start: Date.now(),
        actions: {}
      };
      for (let i = 0; i < actionsOrderedNames.length; i++) {
        if (canceled) break;
        const actionName = actionsOrderedNames[i];
        let actionInstance;
        const actionSettings = settings.actions
          ? settings.actions[actionName] || {}
          : {};

        // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class
        let actionFn;
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
          actionFn = this._actionsObject[actionName].run.bind(
            this._actionsObject[actionName]
          );
        } else if (
          __isClass(this._actionsObject[actionName]) &&
          this._actionsObject[actionName].prototype instanceof
            __SActionsStreamAction
        ) {
          actionInstance = new this._actionsObject[actionName](actionSettings);
          actionFn = actionInstance.run.bind(actionInstance);
        }

        let actionObj = {
          action: actionName,
          start: Date.now(),
          streamObj: Object.assign({}, currentStreamObj)
        };
        let error = null;

        if (actionInstance) {
          actionInstance.on('stdout.data', (value) => {
            const dataObj = { ...actionObj, value: value };
            trigger('stdout.data', dataObj);
            this.trigger('stdout.data', dataObj);
            trigger(`${actionName}.stdout.data`, dataObj);
            this.trigger(`${actionName}.stdout.data`, dataObj);
          });
          actionInstance.on('stderr.data', (value) => {
            const dataObj = { ...actionObj, value: value };
            trigger('stderr.data', { dataObj });
            this.trigger('stderr.data', { dataObj });
            trigger(`${actionName}.stderr.data`, { dataObj });
            this.trigger(`${actionName}.stderr.data`, { dataObj });
          });
          actionInstance.on('reject', (value) => {
            const dataObj = { ...actionObj, value: value };
            trigger('reject', dataObj);
            this.trigger('reject', dataObj);
            trigger(`${actionName}.reject`, dataObj);
            this.trigger(`${actionName}.reject`, dataObj);
            cancel(dataObj);
          });
        }

        // trigger some "start" events
        trigger(`start`, Object.assign({}, actionObj));
        this.trigger(`start`, Object.assign({}, actionObj));
        trigger(`${actionName}.start`, Object.assign({}, actionObj));
        this.trigger(`${actionName}.start`, Object.assign({}, actionObj));
        const startString = `Starting the action "<yellow>${actionName}</yellow>"`;
        const dataObj = { ...actionObj, value: startString };
        trigger('stdout.data', dataObj);
        this.trigger('stdout.data', dataObj);
        trigger(`${actionName}.stdout.data`, dataObj);
        this.trigger(`${actionName}.stdout.data`, dataObj);

        // call the action and pass it the current stream object
        try {
          currentActionReturn = actionFn(currentStreamObj, actionSettings);
          if (currentActionReturn instanceof Promise)
            currentStreamObj = await currentActionReturn;
          else currentStreamObj = currentActionReturn;
          currentActionReturn = null;
        } catch (e) {
          // trigger an "event"
          const errorObj = { ...actionObj, value: e.message };
          trigger('stderr.data', errorObj);
          trigger(`${actionName}.stderr.data`, errorObj);
          this.trigger('stderr.data', errorObj);
          this.trigger(`${actionName}.stderr.data`, errorObj);
          cancel(errorObj);
        }
        if (canceled) return;
        // complete the actionObj
        actionObj = {
          ...actionObj,
          end: Date.now(),
          duration: Date.now() - actionObj.start,
          streamObj: Object.assign({}, currentStreamObj)
        };
        if (error) actionObj.error = error;
        // save the result into the overall actions stats object
        overallActionsStats.actions[actionName] = Object.assign({}, actionObj);
        // trigger an "event"
        trigger('step', Object.assign({}, actionObj));
        trigger(`${actionName}.step`, Object.assign({}, actionObj));
        this.trigger('step', Object.assign({}, actionObj));
        this.trigger(`${actionName}.step`, Object.assign({}, actionObj));

        if (error) {
          const errorString = `Something went wrong during the "<yellow>${actionName}</yellow>" action...`;
          const dataObj = { ...actionObj, value: errorString };
          trigger('stderr.data', dataObj);
          this.trigger('stderr.data', dataObj);
          trigger(`${actionName}.stderr.data`, dataObj);
          this.trigger(`${actionName}.stderr.data`, dataObj);
        } else {
          const successString = `The action "<yellow>${actionName}</yellow>" has finished <green>successfully</green> in <yellow>${__convert(
            actionObj.duration,
            's'
          )}s</yellow>`;
          const dataObj = { ...actionObj, value: successString };
          trigger('stdout.data', dataObj);
          this.trigger('stdout.data', dataObj);
          trigger(`${actionName}.stdout.data`, dataObj);
          this.trigger(`${actionName}.stdout.data`, dataObj);
        }
      }
      // complete the overall stats
      overallActionsStats = {
        ...overallActionsStats,
        streamObj: Object.assign({}, currentStreamObj),
        end: Date.now(),
        duration: Date.now() - overallActionsStats.start
      };
      if (canceled) return;

      const completeString = `The stream "<cyan>${
        settings.name || 'unnamed'
      }</cyan>" has finished <green>successfully</green> in <yellow>${__convert(
        overallActionsStats.duration,
        's'
      )}s</yellow>`;
      const successObj = { ...overallActionsStats, value: completeString };
      trigger('stdout.data', successObj);
      this.trigger('stdout.data', successObj);

      // resolve this stream process
      const completeObj = { ...overallActionsStats };
      trigger('complete', completeObj);
      this.trigger('complete', completeObj);
      resolve(completeObj);
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
      })
      .start();
  }
}
