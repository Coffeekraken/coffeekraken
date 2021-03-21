"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../../shared/class/SInterface"));
const STestInterface_1 = __importDefault(require("../../../shared/interface/STestInterface"));
const sugar_1 = __importDefault(require("../../../../shared/config/sugar"));
const deepMerge_1 = __importDefault(require("../../../../shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlc3RKZXN0SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Rlc3RKZXN0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFGQUErRDtBQUMvRCw4RkFBd0U7QUFDeEUsNEVBQTREO0FBQzVELG9GQUE4RDtBQUU5RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLHFCQUFzQixTQUFRLG9CQUFZOztBQUEvRCx3Q0FTQztBQVJRLGdDQUFVLEdBQUcsbUJBQVcsQ0FBQyx3QkFBZ0IsQ0FBQyxVQUFVLEVBQUU7SUFDM0QsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QztJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRSxlQUFhLENBQUMsZ0JBQWdCLENBQUM7S0FDekM7Q0FDRixDQUFDLENBQUMifQ==