"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../shared/interface/SInterface"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1VbnVzZWRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRkFBK0Q7QUFFL0Q7Ozs7Ozs7Ozs7O0dBV0c7QUFFSCxNQUFxQiwyQkFBNEIsU0FBUSxvQkFBVzs7QUFBcEUsOENBb0JDO0FBbkJRLHNDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCxtR0FBbUc7UUFDckcsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDIn0=