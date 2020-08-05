/**
 * @name              implements
 * @namespace           js.class
 * @type              Function
 *
 * This function allows you to make sure the class you are working on or a class instance you want to work with
 * implements a certain interface defined by the "js.class.interface" function.
 * An interface is nothing else than a object that define the properties, methods, etc... that the class who implements it
 * MUST have. An error will be thrown with the description of what is failling so you can handle the issue quickly and efficiently...
 *
 * @param         {Object}               instance                The class instance you want to check
 * @param         {Object}               interface               The interface that the class instance has to match
 * @param         {Object}                [settings={}]         An object of settings to configure your implement test:
 * - throw (true) {Boolean}: Specify if you want that an error is throwned if the test does not pass
 * @return        {Boolean}                                      true if the test pass, a string describing the error if not...
 *
 * @example         js
 * import implements from '@coffeekraken/sugar/js/class/implements';
 * import myCoolInterface from './interfaces/myCoolInterface';
 * class MyCoolClass {
 *    constructor() {
 *      implements(this, myCoolInterface);
 *    }
 * }
 */
