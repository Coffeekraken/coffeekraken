// @ts-nocheck

import __autoCast from '../string/autoCast';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __get from '../object/get';
import __flatten from '../object/flatten';
import SPromise from '../../node/promise/SPromise';
import __serialize from 'fast-safe-stringify';
import __typeMap from './typeMap';

/**
 * @name 		                    SAction
 * @namespace           sugar.js.action
 * @type                        Class
 *
 * This class represent an action. An action is something that happened depending on
 * settings. It can be an "url" action that will change the user page, a "login" action
 * that will allow the user to log in his favorite services like "google", etc...
 * All this is wrapped into a nicely formated system that use the SPromise class
 * to let you know the state of the action, etc...
 *
 * @example 	js
 * import SAction from '@coffeekraken/sugar/js/action/SAction';
 * class MyCoolAction extends SAction {
 *    constructor(descriptorObj, settings = {}) {
 *      super(descriptorObj, settings);
 *    }
 * }
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SAction extends __SPromise {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store this action instance settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name            _descriptorObj
   * @type            Object
   * @private
   *
   * Store this action instance settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _descriptorObj = {};

  /**
   * @name              _promise
   * @type              SPromise
   * @static
   * @private
   *
   * Store the global SPromise instance used to dispatch global events
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _promise = new __SPromise({
    id: 'SAction'
  });

  /**
   * @name              on
   * @type              Function
   * @static
   *
   * This function allows you to subscribe to general SAction actions events by
   * prefixing it with the action class name like "SUrlAction.{event}", etc...
   *
   * @return      {Function}          A function that you can call to unregister to the event
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static on(event, callback) {
    SAction._promise.on(event, callback);
    return () => {
      SAction._promise.off(event, callback);
    };
  }

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Constructor
   *
   * @param           	{SActionConfig|Object} 		            request 	            	The request object used to make ajax call
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(descriptorObj, settings = {}) {
    super((resolve, reject, trigger, cancel) => {});
    this._settings = __deepMerge({}, settings);
    this._descriptorObj = descriptorObj;
  }

  /**
   * @name            run
   * @type            Function
   *
   * This method is meant to be overrided by your custom actions classes.
   * You still need to call it using the ```super.run()``` statement in order
   * to keep all the features like promises events, etc...
   *
   * @return      {SPromise}      An SPromise instance only for this particular run process. You can subscribe to the same "events" has on the class itself but these events are happening only for this run process.
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run() {
    const promise = new __SPromise(
      (resolve, reject, trigger) => {
        SAction._promise.trigger(`${this.constructor.name}.run`, this);
        trigger(`run`, this);
        this.trigger(`run`, this);
      },
      {
        id: SAction._promise.id + 'Run'
      }
    );
    promise.complete = () => {
      SAction._promise.trigger(`${this.constructor.name}.complete`, this);
      promise.trigger('complete', this);
      this.trigger(`complete`, this);
    };
    return promise;
  }

  /**
   * @name          toJson
   * @type          Function
   *
   * This method is usefull to turn your action instance into a
   * proper JSON object to you can pass it through http request, etc...
   * You can then instanciate back your action by using the ```
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toJson() {
    const types = __flatten(__typeMap);
    let type = null;
    for (const key in types) {
      if (types[key] === this.constructor) {
        type = key.replace('.default', '');
        break;
      }
    }

    if (!type)
      throw new Error(
        `You try to convert your "<primary>${this.constructor.name}</primary>" instance to JSON but this Class is not registered into the "<cyan>js.action.typeMap</cyan>" mapping object. Please add it to it before continue...`
      );

    return {
      type: type,
      descriptorObj: this._descriptorObj,
      settings: this._settings
    };
  }
}
