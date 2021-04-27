"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class STsCompilerInterface extends s_interface_1.default {
}
STsCompilerInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        alias: 'i',
        default: s_sugar_config_1.default('ts.compile.input')
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'o',
        default: s_sugar_config_1.default('ts.compile.outDir')
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: s_sugar_config_1.default('ts.compile.rootDir')
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
        default: s_sugar_config_1.default('ts.compile.map')
    },
    stack: {
        type: 'Array<String>',
        alias: 's',
        default: s_sugar_config_1.default('ts.compile.stack')
    },
    config: {
        type: 'String',
        alias: 'c',
        description: 'Specify either a full tsconfig file path to use as config, or a pre-build config name like "js", "node", etc...',
        default: s_sugar_config_1.default('ts.compile.config')
    },
    banner: {
        type: 'String',
        alias: 'b',
        default: s_sugar_config_1.default('ts.compile.banner')
    },
    save: {
        type: 'Boolean',
        alias: 's',
        default: s_sugar_config_1.default('ts.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: s_sugar_config_1.default('ts.compile.watch')
    },
    compilerOptions: {
        type: 'Object',
        default: s_sugar_config_1.default('ts.compile.compilerOptions')
    }
};
exports.default = STsCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxvQkFBcUIsU0FBUSxxQkFBWTs7QUFDdEMsK0JBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUNULCtHQUErRztRQUNqSCxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQy9CLE9BQU8sRUFBRSx3QkFBYSxDQUFDLGdCQUFnQixDQUFDO0tBQ3pDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsaUhBQWlIO1FBQ25ILE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyw0QkFBNEIsQ0FBQztLQUNyRDtDQUNGLENBQUM7QUFFSixrQkFBZSxvQkFBb0IsQ0FBQyJ9