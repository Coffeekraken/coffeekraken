// @ts-nocheck
// @shared
import __parseArgs from './parseArgs';
import __completeArgsObject from './completeArgsObject';
/**
 * @name                  argsToObject
 * @namespace           sugar.js.cli
 * @type                  Function
 * @status              beta
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object|String}        argsObj        The arguments object or string
 * @param       {Object}            [settings]        The settings object to configure your conversion process:
 * - definition (null) {Object}: Specify a definition to use
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return      {Object}                              The final values object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import argsToObject from '@coffeekraken/sugar/js/cli/argsToObject';
 * argsToObject('-a Yop, {
 *    definition: {
 *      arg1: {
 *       type: 'String',
 *       alias: 'a',
 *       default: 'Plop'
 *     },
 *     myOtherArg: {
 *       type: 'String'
 *     },
 *     lastArg: {
 *       type: 'String',
 *       alias: 'l',
 *       default: 'Nelson'
 *     }
 *  }
 * });
 * // => { arg1: 'Yop', lastArg: 'Nelson' }
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function argsToObject(argsObj, settings = {}) {
    if (typeof argsObj === 'string') {
        return __parseArgs(argsObj, {
            definition: settings.definition
        });
    }
    return __completeArgsObject(argsObj || {}, settings);
}
export default argsToObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDRztBQUNILFNBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMxQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUMvQixPQUFPLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDMUIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1NBQ2hDLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxvQkFBb0IsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFDRCxlQUFlLFlBQVksQ0FBQyJ9