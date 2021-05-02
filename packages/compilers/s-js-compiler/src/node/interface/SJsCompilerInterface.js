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
            exists: true,
            create: true
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
    platform: {
        type: 'String',
        alias: 'p',
        values: ['node', 'browser'],
        default: s_sugar_config_1.default('js.compile.platform')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxvQkFBcUIsU0FBUSxxQkFBWTs7QUFDdEMsK0JBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzQyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQzlCLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7UUFDM0IsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHlCQUF5QixDQUFDO0tBQ2xEO0lBQ0QsY0FBYztJQUNkLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsK0tBQStLO0lBQy9LLGdCQUFnQjtJQUNoQixrREFBa0Q7SUFDbEQsS0FBSztJQUNMLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztRQUMvQixXQUFXLEVBQ1QsdUhBQXVIO1FBQ3pILE9BQU8sRUFBRSx3QkFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSTtRQUNoRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSx3QkFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHlGQUF5RjtRQUMzRixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMsaUJBQWlCLENBQUM7S0FDMUM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsa0JBQWtCLENBQUM7S0FDM0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx1Q0FBdUM7UUFDcEQsT0FBTyxFQUFFLHdCQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFO1FBQ2xELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBR0osa0JBQWUsb0JBQW9CLENBQUMifQ==