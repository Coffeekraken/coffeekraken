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
    return (global || window)._sActiveSpace || null;
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
  }
};
