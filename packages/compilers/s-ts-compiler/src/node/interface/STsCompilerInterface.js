"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const SInterface_1 = __importDefault(require("@coffeekraken/sugar/node/interface/SInterface"));
/**
 * @name                STsCompilerInterface
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
class STsCompilerInterface extends SInterface_1.default {
}
STsCompilerInterface.definition = {
    // ...__TscInterface.definition,
    input: {
        type: 'Array<String>',
        alias: 'i',
        default: sugar_1.default('ts.compile.input')
    },
    outDir: {
        type: 'String',
        alias: 'o',
        default: sugar_1.default('ts.compile.outDir')
    },
    rootDir: {
        type: 'String',
        alias: 'r',
        default: sugar_1.default('ts.compile.rootDir')
    },
    clear: {
        type: 'Boolean',
        description: 'Specify if you want to clear the "outDir" before compiling the new files. Works only if "outDir" is specified',
        default: false
    },
    map: {
        type: 'String|Boolean',
        alias: 'm',
        values: [true, false, 'inline'],
        default: sugar_1.default('ts.compile.map')
    },
    stack: {
        type: 'String',
        alias: 's',
        default: sugar_1.default('ts.compile.stack')
    },
    config: {
        type: 'String',
        alias: 'c',
        description: 'Specify either a full tsconfig file path to use as config, or a pre-build config name like "js", "node", etc...',
        default: sugar_1.default('ts.compile.config')
    },
    banner: {
        type: 'String',
        alias: 'b',
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
exports.default = STsCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxvRkFBb0U7QUFDcEUsK0ZBQXlFO0FBRXpFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxvQkFBcUIsU0FBUSxvQkFBWTs7QUFDdEMsK0JBQVUsR0FBRztJQUNsQixnQ0FBZ0M7SUFDaEMsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUNULCtHQUErRztRQUNqSCxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSxlQUFhLENBQUMsZ0JBQWdCLENBQUM7S0FDekM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsaUhBQWlIO1FBQ25ILE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLDRCQUE0QixDQUFDO0tBQ3JEO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLG9CQUFvQixDQUFDIn0=