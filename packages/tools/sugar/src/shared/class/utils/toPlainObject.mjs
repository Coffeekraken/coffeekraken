// @ts-nocheck
/**
 * @name                          toPlainObject
 * @namespace          shared.class.utils
 * @type                          Function
 * @stable
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import toPlainObject from '@coffeekraken/sugar/shared/class/utils/toPlainObject';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function toPlainObject(theClass) {
    const originalClass = theClass || {};
    const keys = Object.getOwnPropertyNames(originalClass);
    return keys.reduce((classAsObj, key) => {
        classAsObj[key] = originalClass[key];
        return classAsObj;
    }, {});
}
export default toPlainObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9QbGFpbk9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvY2xhc3MvdXRpbHMvdG9QbGFpbk9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsUUFBUTtJQUM3QixNQUFNLGFBQWEsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDckMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==