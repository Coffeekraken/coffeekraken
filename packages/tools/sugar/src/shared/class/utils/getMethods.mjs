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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvY2xhc3MvdXRpbHMvZ2V0TWV0aG9kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsVUFBVSxDQUFDLE9BQU87SUFDekIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLEdBQUc7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsU0FBUztRQUN4RCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5QixRQUFRLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUU3QyxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUM7SUFDdEUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==