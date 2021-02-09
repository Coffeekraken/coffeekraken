"use strict";
// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFile_1 = __importDefault(require("../../fs/SFile"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("../../is/path"));
const toString_1 = __importDefault(require("../../string/toString"));
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
        if (value instanceof SFile_1.default)
            return true;
        if (typeof value === 'string') {
            return fs_1.default.existsSync(value);
        }
        return false;
    },
    cast: (value) => {
        if (value instanceof SFile_1.default)
            return value;
        if (typeof value !== 'string' || path_1.default(value) !== true) {
            return new Error(`Sorry but the passed value "${toString_1.default(value)}" is not a valid path to a hypotetical file`);
        }
        return new SFile_1.default(value);
    }
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZVR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOzs7OztBQUdULDJEQUFxQztBQUNyQyw0Q0FBc0I7QUFDdEIseURBQXFDO0FBQ3JDLHFFQUErQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNqQixJQUFJLEtBQUssWUFBWSxlQUFPO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDMUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxZQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxLQUFLLFlBQVksZUFBTztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzNDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLGNBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDekQsT0FBTyxJQUFJLEtBQUssQ0FDZCwrQkFBK0Isa0JBQVUsQ0FDdkMsS0FBSyxDQUNOLDZDQUE2QyxDQUMvQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksZUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=