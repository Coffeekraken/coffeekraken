"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const SDeamonInterface_1 = __importDefault(require("../../interface/SDeamonInterface"));
/**
 * @name                SFsDeamonInterface
 * @namespace           sugar.node.deamon.fs.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element that is capable of "watching" some events/actions, and respond
 * to it by launching function, or whatever you want.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsDeamonInterface extends SInterface_1.default {
}
exports.default = SFsDeamonInterface;
SFsDeamonInterface.implementsArray = [SDeamonInterface_1.default];
SFsDeamonInterface.definition = {
    watch: {
        type: 'String',
        alias: 'i',
        description: 'Specify what to watch using a glob pattern',
        required: true,
        level: 1
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZzRGVhbW9uSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUNyRCx3RkFBa0U7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBcUIsa0JBQW1CLFNBQVEsb0JBQVk7O0FBQTVELHFDQVlDO0FBWFEsa0NBQWUsR0FBRyxDQUFDLDBCQUFrQixDQUFDLENBQUM7QUFFdkMsNkJBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDIn0=