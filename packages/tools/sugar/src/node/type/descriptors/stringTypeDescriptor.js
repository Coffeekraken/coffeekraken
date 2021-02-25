// shared
import __isString from '../../is/string';
import __toString from '../../string/toString';
/**
 * @name              stringTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "string" with some utilities methods like "is", "cast", etc...
 *
 * @example         js
 * export default {
 *    name: 'String',
 *    id: 'string',
 *    is: (value) => typeof value === 'string',
 *    cast: (value) => '' + value,
 *    // etc...
 * };
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor = {
    name: 'String',
    id: 'string',
    is: (value) => __isString(value),
    cast: (value) => __toString(value, {
        beautify: true
    })
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmdUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBRVQsT0FBTyxVQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0sdUJBQXVCLENBQUM7QUFJL0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNuQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ3JDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQ25CLFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDaEIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDO0NBQ0wsQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=