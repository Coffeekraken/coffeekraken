// @ts-nocheck
import __typeMap from './typeMap';
import __get from '../object/get';
import __flatten from '../object/flatten';
/**
 * @name            instanciate
 * @namespace       sugar.js.action
 * @type            Function
 * @static
 *
 * This static method simply take an action descriptor object, instanciate
 * an action object from the corresponding class and return this instance.
 *
 * @param       {Object}      actionObj         The action object that MUST have at least an ```type``` property, an ```descriptor``` one and optionaly a ```settings``` one.
 * @return      {SAction}                       The instanciated SAction object
 *
 * @example       js
 * import SAction from '@coffeekraken/sugar/js/action/SAction';
 * const myInstance = instanciate({
 *    type: 'url',
 *    descriptor: {
 *      url: 'https://google.com',
 *      target: '_popup'
 *    },
 *    settings: {}
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function instanciate(actionObj) {
    if (!actionObj.type) {
        throw new Error(`instanciate: The actionObj parameter MUST have a <cyan>type</cyan> property...`);
    }
    if (!actionObj.descriptorObj) {
        throw new Error(`instanciate: The actionObj parameter MUST have a <cyan>descriptorObj</cyan> property of type Object...`);
    }
    const cls = __get(__typeMap, actionObj.type);
    if (!cls) {
        throw new Error(`instanciate: Your passed "type" is not valid and must be one of those: ${Object.keys(__flatten(__typeMap)).join(', ')}...`);
    }
    // instanciate the object
    const instance = new cls(actionObj.descriptorObj, actionObj.settings || {});
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2lhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnN0YW5jaWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUNsQyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLFNBQVM7SUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYixnRkFBZ0YsQ0FDakYsQ0FBQztLQUNIO0lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDYix3R0FBd0csQ0FDekcsQ0FBQztLQUNIO0lBRUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFN0MsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE1BQU0sSUFBSSxLQUFLLENBQ2IsMEVBQTBFLE1BQU0sQ0FBQyxJQUFJLENBQ25GLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FDckIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDbEIsQ0FBQztLQUNIO0lBRUQseUJBQXlCO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RSxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIn0=