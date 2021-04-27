// @ts-nocheck
import __SWatch from './SWatch';
/**
 * @name                      watch
 * @namespace            js.object
 * @type                      Function
 * @status              wip
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function watch(target, settings = {}) {
    const watchedObj = new __SWatch(target, settings);
    return watchedObj;
}
export default watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL29iamVjdC93YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBR2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9