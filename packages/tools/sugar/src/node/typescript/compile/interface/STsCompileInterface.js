"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
/**
 * @name                STsCompileInterface
 * @namespace           sugar.node.typescript.compile.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a typescript compilation.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STsCompileInterface extends SInterface_1.default {
}
STsCompileInterface.definition = {
    input: {
        type: 'String|Array<String>',
        alias: 'i',
        default: `${packageRoot_1.default()}/tsconfig.json`
    },
    cache: {
        type: 'Boolean',
        default: true
    },
    clearCache: {
        type: 'Boolean',
        default: false
    },
    prod: {
        type: 'Boolean',
        default: false
    },
    stripComments: {
        type: 'Boolean',
        default: false
    },
    tsconfig: {
        type: 'Object',
        default: sugar_1.default('ts')
    },
    transpileOnly: {
        type: 'Boolean',
        default: false
    },
    watch: {
        type: 'Boolean',
        default: false
    }
};
exports.default = STsCompileInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUc0NvbXBpbGVJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsK0VBQXlEO0FBQ3pELGtFQUFrRDtBQUVsRCw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLG1CQUFvQixTQUFRLG9CQUFZOztBQUNyQyw4QkFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsR0FBRyxxQkFBYSxFQUFFLGdCQUFnQjtLQUM1QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxJQUFJLENBQUM7S0FDN0I7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBRUosa0JBQWUsbUJBQW1CLENBQUMifQ==