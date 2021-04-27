// shared
import __isClass from '@coffeekraken/sugar/shared/is/class';
/**
 * @name              classTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "class" with some utilities methods like "is", "cast", etc...
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
    name: 'Class',
    id: 'class',
    is: (value) => __isClass(value),
    cast: (value) => {
        return new Error(`Sorry but nothing is castable to a Class`);
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NUeXBlRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy10eXBlL3NyYy9zaGFyZWQvZGVzY3JpcHRvcnMvY2xhc3NUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBR1QsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNuQyxJQUFJLEVBQUUsT0FBTztJQUNiLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3BDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ25CLE9BQU8sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=