// @ts-nocheck
import __isNode from '../is/node';
import __get from '../object/get';
import __set from '../object/set';
import __delete from '../object/delete';
import __parse from '../string/parse';
/**
 * @name                    env
 * @namespace            js.env
 * @type                    Function
 * @platform          js
 * @platform          node
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function env(dotPath, value) {
    if (!__isNode()) {
        if (!window.process)
            window.process = {};
        if (!window.process.env)
            window.process.env = {};
    }
    const targetObj = __isNode() ? global.process.env : window.process.env;
    if (value === -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLGVBQWUsQ0FBQztBQUNsQyxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQU07SUFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztZQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztLQUNwRDtJQUNELE1BQU0sU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFFdkUsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxzQkFBc0I7UUFDdEIsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUM5QztTQUFNLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUM1QixLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUNELDRCQUE0QjtJQUM1QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVELGVBQWUsR0FBRyxDQUFDIn0=