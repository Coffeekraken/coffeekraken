// @ts-nocheck
/**
 * @name              getMethods
 * @namespace            js.class
 * @type              Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function take an instance as parameter and return all the methods in array format
 *
 * @param         {Object}        instance        The instance of the object to get the methods names of
 * @return        {Array}                         A simple array of all the methods names
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import getMethods from '@coffeekraken/sugar/js/class/getMethods';
 * myClass {
 *  constructor() {}
 *  hello() {}
 *  world() {}
 * }
 * const myInstance = new myClass();
 * getMethods(myInstance); // => ['hello','world']
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getMethods(toCheck) {
    let props = [];
    let obj = toCheck;
    do {
        const _props = Object.getOwnPropertyNames(obj);
        if (_props.indexOf('__defineGetter__') !== -1)
            continue;
        props = props.concat(_props);
    } while ((obj = Object.getPrototypeOf(obj)));
    return props.sort().filter(function (e, i, arr) {
        if (e != arr[i + 1] && typeof toCheck[e] == 'function')
            return true;
    });
}
export default getMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxPQUFPO0lBQ3ZCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUNsQixHQUFHO1FBQ0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLFNBQVM7UUFDeEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEMsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFFN0MsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVTtZQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=