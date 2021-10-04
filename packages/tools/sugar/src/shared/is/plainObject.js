// @ts-nocheck
/**
 * @name                      plainObject
 * @namespace            js.is
 * @type                      Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import isPlainObject from '@coffeekraken/sugar/js/is/plainObject';
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function plainObject(object) {
    if (!object)
        return false;
    if (typeof object !== 'object')
        return false;
    if (object.constructor && object.constructor.name !== 'Object')
        return false;
    if (Object.prototype.toString.call(object) !== '[object Object]')
        return false;
    if (object !== Object(object))
        return false;
    // if (object.constructor !== Object) return false;
    return true;
}
export default plainObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW5PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGFpbk9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsV0FBVyxDQUFDLE1BQU07SUFDdkIsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLEtBQUssQ0FBQztJQUMxQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM3QyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUMxRCxPQUFPLEtBQUssQ0FBQztJQUNqQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxpQkFBaUI7UUFDNUQsT0FBTyxLQUFLLENBQUM7SUFDakIsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLG1EQUFtRDtJQUNuRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==