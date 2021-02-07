"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
/**
 * @name                STsCompilerParamsInterface
 * @namespace           sugar.node.typescript.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
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
class STsCompilerParamsInterface extends SInterface_1.default {
}
STsCompilerParamsInterface.definition = {
    // ...__TscInterface.definition,
    input: {
        type: 'String|Array<String>',
        alias: 'i',
        default: sugar_1.default('ts.compile.input')
    },
    outputDir: {
        type: 'String',
        alias: 'o',
        default: sugar_1.default('ts.compile.outputDir')
    },
    rootDir: {
        type: 'String',
        default: sugar_1.default('ts.compile.rootDir')
    },
    map: {
        type: 'Boolean|String',
        values: [true, false, 'inline'],
        default: sugar_1.default('ts.compile.map')
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: sugar_1.default('ts.compile.prod')
    },
    stripComments: {
        type: 'Boolean',
        default: sugar_1.default('ts.compile.stripComments')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('ts.compile.minify')
    },
    banner: {
        type: 'String',
        default: sugar_1.default('ts.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: sugar_1.default('ts.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: sugar_1.default('ts.compile.watch')
    },
    stacks: {
        type: 'Array<String>',
        alias: 's',
        default: sugar_1.default('ts.compile.stacks')
    },
    tsconfig: {
        type: 'Object',
        default: sugar_1.default('ts.compile.tsconfig')
    }
};
exports.default = STsCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlclBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwrRUFBeUQ7QUFDekQsa0VBQWtEO0FBR2xEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFDNUMscUNBQVUsR0FBRztJQUNsQixnQ0FBZ0M7SUFDaEMsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsa0JBQWtCLENBQUM7S0FDM0M7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztLQUMvQztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLDBCQUEwQixDQUFDO0tBQ25EO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsa0JBQWtCLENBQUM7S0FDM0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7Q0FDRixDQUFDO0FBRUosa0JBQWUsMEJBQTBCLENBQUMifQ==