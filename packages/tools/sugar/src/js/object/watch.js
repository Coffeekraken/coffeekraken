import __SWatch from './SWatch';
/**
 * @name                      watch
 * @namespace           sugar.js.object
 * @type                      Function
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @param       {Object}          [settings={}]       A settings object to configure your watch process. Check the SWatch class documentation for more.
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
 *
 * @example       js
 * import watch from '@coffeekraken/sugar/js/object/watch';
 * let myObj = watch({
 *    hello: 'world'
 * }).on('*', watchResult => {
 *    // do something...
 * });
 * myObj.hello = 'plop';
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function watch(target, settings = {}) {
    const watchedObj = new __SWatch(target, settings);
    return watchedObj;
}
