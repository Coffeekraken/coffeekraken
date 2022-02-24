// @ts-nocheck
import __SWatch from './SWatch';
/**
 * @name                      watch
 * @namespace            js.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        wip
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @param       {Object}          [settings={}]       A settings object to configure your watch process. Check the SWatch class documentation for more.
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function watch(target, settings = {}) {
    const watchedObj = new __SWatch(target, settings);
    return watchedObj;
}
export default watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBR2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEQsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=