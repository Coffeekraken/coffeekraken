"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
/**
 * @name            SNpmUnusedParamsInterface
 * @namespace       sugar.node.npm.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Interface that represent the SNpmDependenciesProcess parameters
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SNpmUnusedParamsInteUnuseds extends SInterface_1.default {
}
exports.default = SNpmUnusedParamsInteUnuseds;
SNpmUnusedParamsInteUnuseds.definition = {
    clean: {
        type: 'Boolean',
        alias: 'r',
        description: 'Specify if you want the found unused dependencies to be reflected back into the package.json file',
        default: false
    },
    skipDev: {
        type: 'Boolean',
        description: 'Specify if you want to skip the "devDependencies" check',
        default: false
    },
    skipMissing: {
        type: 'Boolean',
        description: 'Specify if you want to skip the missing packages check',
        default: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL25wbS9pbnRlcmZhY2UvU05wbVVudXNlZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUVILE1BQXFCLDJCQUE0QixTQUFRLG9CQUFXOztBQUFwRSw4Q0FvQkM7QUFuQlEsc0NBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULG1HQUFtRztRQUNyRyxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSx3REFBd0Q7UUFDckUsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUMifQ==