"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SSvelteCompilerParamsInterface
 * @namespace           sugar.node.svelte.compile.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SSvelteCompiler
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompilerParamsInterface extends s_interface_1.default {
}
SSvelteCompilerParamsInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        default: s_sugar_config_1.default('svelte.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: s_sugar_config_1.default('svelte.compile.inDir')
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: s_sugar_config_1.default('svelte.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: s_sugar_config_1.default('svelte.compile.rootDir')
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: (_a = s_sugar_config_1.default('svelte.compile.map')) !== null && _a !== void 0 ? _a : true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        default: s_sugar_config_1.default('svelte.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: s_sugar_config_1.default('svelte.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: s_sugar_config_1.default('svelte.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: s_sugar_config_1.default('svelte.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: s_sugar_config_1.default('svelte.compile.watch')
    },
    tsconfig: {
        type: 'String|Object',
        description: 'Specify either directly a tsconfig object or a tsconfig valid path',
        default: s_sugar_config_1.default('svelte.compile.tsconfig')
    },
    svelte: {
        type: 'Object',
        description: 'Object passed to the svelte compiler',
        default: s_sugar_config_1.default('svelte.compile.svelte') || {},
        level: 2
    }
};
exports.default = SSvelteCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsc0JBQXNCLENBQUM7UUFDOUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsdUJBQXVCLENBQUM7UUFDL0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsd0JBQXdCLENBQUM7S0FDakQ7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxPQUFPLFFBQUUsd0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxtQ0FBSSxJQUFJO1FBQ3BELEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHlGQUF5RjtRQUMzRixPQUFPLEVBQUUsd0JBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLHdCQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixXQUFXLEVBQ1Qsb0VBQW9FO1FBQ3RFLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHlCQUF5QixDQUFDO0tBQ2xEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELE9BQU8sRUFBRSx3QkFBYSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRTtRQUNyRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0NBQ0YsQ0FBQztBQUdKLGtCQUFlLDhCQUE4QixDQUFDIn0=