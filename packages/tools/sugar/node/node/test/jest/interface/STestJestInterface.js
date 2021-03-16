"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const STestInterface_1 = __importDefault(require("../../interface/STestInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
/**
 * @name                STestJestCliInterface
 * @namespace           sugar.node.test.jest.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the cli parameters for the
 * test jest process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STestJestCliInterface extends SInterface_1.default {
}
exports.default = STestJestCliInterface;
STestJestCliInterface.definition = deepMerge_1.default(STestInterface_1.default.definition, {
    input: {
        default: sugar_1.default('jest.cli.input')
    },
    watch: {
        default: sugar_1.default('jest.cli.watch')
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvdGVzdC9qZXN0L2ludGVyZmFjZS9TVGVzdEplc3RJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkVBQXFEO0FBQ3JELG9GQUE4RDtBQUM5RCxrRUFBa0Q7QUFDbEQsMEVBQW9EO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBcUIscUJBQXNCLFNBQVEsb0JBQVk7O0FBQS9ELHdDQVNDO0FBUlEsZ0NBQVUsR0FBRyxtQkFBVyxDQUFDLHdCQUFnQixDQUFDLFVBQVUsRUFBRTtJQUMzRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO0tBQ3pDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QztDQUNGLENBQUMsQ0FBQyJ9