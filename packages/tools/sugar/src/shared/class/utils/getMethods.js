// @ts-nocheck
/**
 * @name              getMethods
 * @namespace            js.class
 * @type              Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldE1ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxPQUFPO0lBQ3pCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUNsQixHQUFHO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLFNBQVM7UUFDeEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUIsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFFN0MsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVTtZQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=