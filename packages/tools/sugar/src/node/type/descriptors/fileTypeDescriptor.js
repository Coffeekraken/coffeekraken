"use strict";
// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZVR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOzs7O0FBR1QsMkRBQXFDO0FBQ3JDLDRDQUFzQjtBQUN0Qix5REFBcUM7QUFDckMscUVBQStDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2pCLElBQUksS0FBSyxZQUFZLGVBQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUMxQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLFlBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNuQixJQUFJLEtBQUssWUFBWSxlQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDM0MsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksY0FBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN6RCxPQUFPLElBQUksS0FBSyxDQUNkLCtCQUErQixrQkFBVSxDQUN2QyxLQUFLLENBQ04sNkNBQTZDLENBQy9DLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxlQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGLENBQUM7QUFFRixpQkFBUyxVQUFVLENBQUMifQ==