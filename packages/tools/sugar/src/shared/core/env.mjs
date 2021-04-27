// @ts-nocheck
import __isNode from '../is/node';
import __get from '../object/get';
import __set from '../object/set';
import __delete from '../object/delete';
import __parse from '../string/parse';
/**
 * @name                    env
 * @namespace            js.core
 * @type                    Function
 * @status              wip
 *
 * This function allows you to access environment variables through the same method in node and javascript
 *
 * @param           {String}          dotPath         The dot path (something.else) to tell which variable you want
 * @param           {Mixed}           [value=null]    The value you want to assign. If null, you will just get the wanted variable back
 * @return          {Mixed}                           The variable value
 *
 * @todo        interface
 * @todo        doc
 *
 * @example         js
 * import env from '@coffeekraken/sugar/js/dev/env';
 * console.log(env('node_env')); // => production
 * env('something.cool', { hello: 'world' });
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function env(dotPath, value) {
    if (!__isNode()) {
        if (!window.process)
            window.process = {};
        if (!window.process.env)
            window.process.env = {};
    }
    const targetObj = __isNode() ? global.process.env : window.process.env;
    if (value === null) {
        // delete the variable
        __delete(targetObj, dotPath.toUpperCase());
    }
    else if (value !== undefined) {
        __set(targetObj, dotPath.toUpperCase(), __parse(value));
    }
    // return the variable value
    return __parse(__get(targetObj, dotPath.toUpperCase()));
}
export default env;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jb3JlL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7QUFDbEMsT0FBTyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSztJQUN6QixJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0tBQ2xEO0lBQ0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUV2RSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDbEIsc0JBQXNCO1FBQ3RCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDOUIsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCw0QkFBNEI7SUFDNUIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxlQUFlLEdBQUcsQ0FBQyJ9