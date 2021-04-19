"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SJsCompilerInterface
 * @namespace           sugar.node.js.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SJsCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompilerInterface extends s_interface_1.default {
}
SJsCompilerInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        default: s_sugar_config_1.default('js.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: s_sugar_config_1.default('js.compile.inDir'),
        alias: 'o'
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: s_sugar_config_1.default('js.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: s_sugar_config_1.default('js.compile.rootDir')
    },
    format: {
        type: 'String',
        alias: 'f',
        values: ['iife', 'cjs', 'esm'],
        default: s_sugar_config_1.default('js.compile.format')
    },
    bundle: {
        type: 'Boolean',
        alias: 'b',
        default: s_sugar_config_1.default('js.compile.bundle')
    },
    bundleSuffix: {
        type: 'String',
        default: s_sugar_config_1.default('js.compile.bundleSuffix')
    },
    // tsconfig: {
    //   type: 'String',
    //   description:
    //     'Specify which tsconfig file you want to use when compiling ts files. Can be either a path to a valid tsconfig file, or a ts stack name like "node", "js" or "shared".',
    //   alias: 't',
    //   default: __sugarConfig('js.compile.tsconfig')
    // },
    map: {
        type: 'Boolean|String',
        alias: 'm',
        values: [true, false, 'inline'],
        description: 'Generate the sourcemap. If "true", generate a .map file alongside the dist one, if "inline", set the sourcemap inline',
        default: s_sugar_config_1.default('js.compile.map') || true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: s_sugar_config_1.default('js.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: s_sugar_config_1.default('js.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: s_sugar_config_1.default('js.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: s_sugar_config_1.default('js.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: s_sugar_config_1.default('js.compile.watch')
    },
    esbuild: {
        type: 'Object',
        description: 'Object passed to the esbuild compiler',
        default: s_sugar_config_1.default('js.compile.esbuild') || {},
        level: 2
    }
};
exports.default = SJsCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxvQkFBcUIsU0FBUSxxQkFBWTs7QUFDdEMsK0JBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDM0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUM5QixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLHdCQUFhLENBQUMseUJBQXlCLENBQUM7S0FDbEQ7SUFDRCxjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLGlCQUFpQjtJQUNqQiwrS0FBK0s7SUFDL0ssZ0JBQWdCO0lBQ2hCLGtEQUFrRDtJQUNsRCxLQUFLO0lBQ0wsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQy9CLFdBQVcsRUFDVCx1SEFBdUg7UUFDekgsT0FBTyxFQUFFLHdCQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJO1FBQ2hELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsaUJBQWlCLENBQUM7S0FDMUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUZBQXlGO1FBQzNGLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQztLQUMxQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUU7UUFDbEQsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUM7QUFHSixrQkFBZSxvQkFBb0IsQ0FBQyJ9