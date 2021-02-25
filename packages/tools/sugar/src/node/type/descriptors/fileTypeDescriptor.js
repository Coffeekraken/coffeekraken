// shared
import __SFile from '../../fs/SFile';
import __fs from 'fs';
import __isPath from '../../is/path';
import __toString from '../../string/toString';
/**
 * @name              fileTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "file" with some utilities methods like "is", "cast", etc...
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
    name: 'File',
    id: 'file',
    is: (value) => {
        if (value instanceof __SFile)
            return true;
        if (typeof value === 'string') {
            return __fs.existsSync(value);
        }
        return false;
    },
    cast: (value) => {
        if (value instanceof __SFile)
            return value;
        if (typeof value !== 'string' || __isPath(value) !== true) {
            return new Error(`Sorry but the passed value "${__toString(value)}" is not a valid path to a hypotetical file`);
        }
        return new __SFile(value);
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZVR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFHVCxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2pCLElBQUksS0FBSyxZQUFZLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUMxQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNuQixJQUFJLEtBQUssWUFBWSxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDM0MsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN6RCxPQUFPLElBQUksS0FBSyxDQUNkLCtCQUErQixVQUFVLENBQ3ZDLEtBQUssQ0FDTiw2Q0FBNkMsQ0FDL0MsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=