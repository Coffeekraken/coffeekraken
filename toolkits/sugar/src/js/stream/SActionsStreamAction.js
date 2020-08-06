import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __convert from '../time/convert';
import __validateDefinitionObject from '../object/validateDefinitionObject';
import __validateObject from '../validation/object/validateObject';
import __uniqid from '../string/uniqid';

/**
 * @name          SActionStreamAction
 * @namespace           js.stream
 * @type          Class
 * @extends       SPromise
 *
 * This class represent the base of a actions stream action.
 * An action stream action represent an action that you can register in the SActionsStream instance and
 * prodive you some usefull features like "trigger" some events, set/get data from the streamObj, defining some required streamObj properties
 * to work with, etc...
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 * - cwd (process.cwd()) {String}: The current working directory to use during the stream execution
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SActionStreamAction extends __SPromise {
  /**
   * @name            _skipNextActions
   * @type            Number|Array<String>
   * @private
   *
   * Store the next actions you want to skip
   *
   * @since           2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _skipNextActions = null;

  /**
   * @name            _registeredCallbacks
   * @type            Array<Object>
   * @private
   *
   * Store the registered callbaks
   *
   * @since           2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _registeredCallbacks = [];

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // init SPromise
    super(
      () => {},
      __deepMerge(
        {
          name: null,
          id: __uniqid(),
          cwd: process.cwd()
        },
        settings
      )
    );
    if (!this._settings.id)
      this._settings.id = this.constructor.name.toLowerCase();

    if (!this.constructor.definitionObj) {
      throw new Error(
        `Sorry but your class "${this.constructor.name}" does not have the required "definitionObj" static property...`
      );
    }

    // check the definition object
    setTimeout(() => {
      const validatekDefinitionObjResult = __validateDefinitionObject(
        this.constructor.definitionObj
      );
      if (validatekDefinitionObjResult !== true) {
        throw new Error(validatekDefinitionObjResult);
      }
    });

    super.start();

    // this.catch((e) => {
    //   console.log('error');
    // });
  }

  get settings() {
    return this._settings;
  }

  /**
   * @name          checkStreamObject
   * @type          Function
   * @async
   *
   * This method take the streamObj object passed to the "run" method and check it depending on the definitionObj
   * specified in the static definitionObj property.
   *
   * @param       {Object}        streamObj         The streamObj to check
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  checkStreamObject(streamObj) {
    // handle "default" property of the definition object
    Object.keys(this.constructor.definitionObj).forEach((key) => {
      if (
        streamObj[key] === undefined &&
        this.constructor.definitionObj[key].default !== undefined
      ) {
        streamObj[key] = this.constructor.definitionObj[key].default;
      }
    });

    // validate the streamObj depending on the static definitionObj property
    const checkWithDefinitionObjectResult = __validateObject(
      streamObj,
      this.constructor.definitionObj
    );
    if (checkWithDefinitionObjectResult !== true) {
      throw new Error(checkWithDefinitionObjectResult);
    }
    // throw new Error(checkWithDefinitionObjectResult);
    // this.trigger('error', checkWithDefinitionObjectResult);
  }

  /**
   * @name          skipNextActions
   * @type          Function
   *
   * This method allows you to tell the SActionStream class that you want to skip
   * the next actions. If you don't specify anything, it means that you want to skip
   * ALL the next actions. You can pass a number that mean that you want to skip x next action(s),
   * or an array with the actions names that you want to skip.
   *
   * @param       {Number|Array<String>|Boolean}        [what=true]        Specify what you want to skip. Can be a number or an array of actions names to skip
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  skipNextActions(what = true) {
    this._skipNextActions = what;
  }

  /**
   * @name          registerCallback
   * @type          Function
   *
   * This method allows you to register some callbacks during the stream action process.
   * You can specify when you want to register this callback like "before" or "after", and specify if
   * it's before/after the entire stream process or a particular action.
   *
   * @param       {Function}        callback          The callback function to call
   * @param       {String}          [when='after']    When you want to call this callback. Can be "before" or "after"
   * @param       {String}          [action=null]     Specify the reference action. If not set, that's mean that the entire stream process is the reference
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerCallback(callback, when = 'after', action = null) {
    this._registeredCallbacks.push({
      callback,
      when,
      action
    });
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * This method is the one that has to be overrided.
   * It will be called to run the actions on want on the streamObj passed as parameter
   * and MUST return a Promise instance that you need to resolve at the end of your processed
   * and pass it the updated streamObject.
   *
   * @param       {Object}        streamObj         The streamObj to work with
   * @param       {Object}        [settings=this._settings]     A settings object specific to this action. It will be equal to the passed instance settings and deeply merged with the settings object you have setted in the "actions.{actionName}" oject of the SActionsStream instance
   * @return      {Promise}                         A simple promise that you have to resolve at the end of your process with the updates streamObj
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, promiseFn) {
    this.checkStreamObject(streamObj);
    return new __SPromise(promiseFn, {
      id: this._settings.id
    }).start();
  }

  /**
   * @name          error
   * @type          Function
   *
   * This method allows you to error a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to error
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error(message) {
    this.trigger('error', `<red>✚</red> ${message}`);
  }

  /**
   * @name          warn
   * @type          Function
   *
   * This method allows you to warn a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to warn
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  warn(message) {
    this.trigger('log', `<yellow>⚠</yellow> ${message}`);
  }

  /**
   * @name          log
   * @type          Function
   *
   * This method allows you to log a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to log
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(message) {
    this.trigger('log', message);
  }
}
