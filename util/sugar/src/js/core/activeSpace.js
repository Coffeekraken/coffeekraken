import __deepMerge from '../object/deepMerge';
import __minimatch from 'minimatch';

/**
 * @name                    activeSpace
 * @namespace               sugar.js.core
 * @type                    Object
 *
 * This object expose some functions that are usefull to manage the "active" space of your application.
 * An active space is represented by a string formated like so "something.cool.hello". This mean that your app is
 * in the "something.cool.hello" space and depending on that, you can enable or disable some features like for example
 * keypress that have to be active only in certain "space" of your application.
 * The exposed functions are these ones:
 * - set: This allows you to set the active space
 * - get: This allows you to get the current active space
 * - is: This allows you to check if the passed active space string is in the current active space
 * - previous: This allows you to go back 1 activeSpace in the stack
 * - on: This allows you to register callbacks attached to an activeSpace
 * - append: This allows you to append an activeSpace string to the current one
 *
 * @example           js
 * const activeSpace = require('@coffeekraken/sugar/core/activeSpace');
 * activeSpace.set('hello.world');
 * activeSpace.get(); // => hello.world
 * activeSpace.is('hello'); // => false
 * activeSpace.is('hello.world.coco'); // => false
 * activeSpace.is('hello.**'); // => true
 *
 * @since       2.0.0
 * @see       https://www.npmjs.com/package/minimatch
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const _activeSpaceCallbacksStack = {};
const _activeSpaceStack = [];
export default {
  /**
   * @name                get
   * @type                Function
   *
   * This function allows you to get the current active space
   *
   * @return      {String}                  The current active space
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get: () => {
    return (global || window)._sActiveSpace || null;
  },

  /**
   * @name                set
   * @type                Function
   *
   * This function allows you to set the current active space
   *
   * @param       {String}      activeSpace       The active space to set
   * @return      {String}                  The current active space
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set: (activeSpace) => {
    (global || window)._sActiveSpace = activeSpace;

    // check if the passed activeSpace is the same as the last one
    if (_activeSpaceStack[_activeSpaceStack.length - 1] !== activeSpace) {
      _activeSpaceStack.push(activeSpace);
    }

    // call the registered callbacks that match this activeSpace
    Object.keys(_activeSpaceCallbacksStack).forEach((activeSpaceToCheck) => {
      // check if the active space match or not
      if (!this.is(activeSpaceToCheck)) return;
      // loop on every callbacks registered
      _activeSpaceCallbacksStack[activeSpaceToCheck].forEach(
        (activeSpaceCallbackObj) => {
          // call the callback
          activeSpaceCallbackObj.callback();
          // increase the called property
          activeSpaceCallbackObj.called++;
          // check if we have reached call count
          if (activeSpaceCallbackObj.settings.count === -1) return;
          if (
            activeSpaceCallbackObj.called >=
            activeSpaceCallbackObj.settings.count
          ) {
            activeSpaceCallbackObj.delete = true;
          }
          // filter activeSpaceCallbackObj to remove the "delete" once
          _activeSpaceCallbacksStack[
            activeSpaceToCheck
          ] = _activeSpaceCallbacksStack[activeSpaceToCheck].filter((obj) => {
            return obj.delete !== true;
          });
        }
      );
    });

    return (global || window)._sActiveSpace || null;
  },

  /**
   * @name              append
   * @type              Function
   *
   * This function take the current activeSpace string and add the passed one to set the new activeSpace string
   *
   * @param       {String}      activeSpace         The activeSpace to append
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  append: (activeSpace) => {
    // get the current one
    const currentActiveSpace = this.get() || '';
    const currentActiveSpaceArray = currentActiveSpace.split('.');
    const activeSpaceArray = activeSpace.split('.');
    this.set([...currentActiveSpaceArray, ...activeSpaceArray].join('.'));
  },

  /**
   * @name                previous
   * @type                Function
   *
   * This function simply go back by 1 in the activeSpace stack
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  previous: () => {
    if (_activeSpaceStack.length <= 1) return;
    _activeSpaceStack.pop();
    this.set(_activeSpaceStack[_activeSpaceStack.length - 1]);
  },

  /**
   * @name                is
   * @type                Function
   *
   * This function allows you to check if the active space string that you pass match with the current active space or not.
   * The checking process is done using the "minimatch" package that let you use cool features like "*", "**", etc...
   *
   * @param       {String}        activeSpaceToCheck          The active space string that you want to check
   * @return      {Boolean}                                   true if the passed active space string match the current one, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  is: (activeSpaceToCheck) => {
    const currentActiveSpace = (global || window)._sActiveSpace || null;
    if (!currentActiveSpace) return false;
    return __minimatch(currentActiveSpace, activeSpaceToCheck);
  },

  /**
   * @name            on
   * @type            Function
   *
   * This function allows you to register a callback linked with an activeSpace string
   * that will be called once the activeSpace is matched
   *
   * @param         {String}        activeSpaceToCheck        The active space to check
   * @param         {Function}      callback                  The callback function to call when the activeSpace is matched
   * @param         {Object}        [settings={}]             A settings object to configure your activeSpace callback behavior:
   * - once (false) {Boolean}: Specify if you want the callback to be called only once. This will just set the "count" setting to 1
   * - count (-1) {Number}: Specify how many times you want the callback to be called. -1 mean unlimited.
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  on: (activeSpaceToCheck, callback, settings = {}) => {
    settings = __deepMerge(
      {
        once: false,
        count: -1
      },
      settings
    );
    // check if this activeSpace is already eixisting
    if (!_activeSpaceCallbacksStack[activeSpaceToCheck])
      _activeSpaceCallbacksStack[activeSpaceToCheck] = [];
    // check if the once setting is true
    if (settings.once) settings.count = 1;
    // add the callback object to the stack
    _activeSpaceCallbacksStack[activeSpaceToCheck].push({
      activeSpaceToCheck,
      callback,
      settings,
      called: 0
    });
  }
};
