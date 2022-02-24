// @ts-nocheck
/**
 * @name                      plainObject
 * @namespace            js.is
 * @type                      Function
 * @platform          js
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function plainObject(object) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhaW5PYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGFpbk9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsTUFBTTtJQUN0QyxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzFCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdDLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzFELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLGlCQUFpQjtRQUM1RCxPQUFPLEtBQUssQ0FBQztJQUNqQixJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsbURBQW1EO0lBQ25ELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==