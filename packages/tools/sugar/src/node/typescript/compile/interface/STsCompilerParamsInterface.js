"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../../config/sugar"));
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
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
        type: 'Array<String>',
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
        type: 'String|Boolean',
        values: [true, false, 'inline'],
        default: sugar_1.default('ts.compile.map')
    },
    stack: {
        type: 'String',
        alias: 's',
        default: sugar_1.default('ts.compile.stack')
    },
    banner: {
        type: 'String',
        default: sugar_1.default('ts.compile.banner')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: sugar_1.default('ts.compile.watch')
    },
    compilerOptions: {
        type: 'Object',
        default: sugar_1.default('ts.compile.compilerOptions')
    }
};
exports.default = STsCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlclBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRUFBa0Q7QUFDbEQsK0VBQXlEO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFDNUMscUNBQVUsR0FBRztJQUNsQixnQ0FBZ0M7SUFDaEMsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxlQUFhLENBQUMsZ0JBQWdCLENBQUM7S0FDekM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLDRCQUE0QixDQUFDO0tBQ3JEO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLDBCQUEwQixDQUFDIn0=