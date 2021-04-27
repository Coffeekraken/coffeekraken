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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsc0JBQXNCLENBQUM7UUFDOUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsdUJBQXVCLENBQUM7UUFDL0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLHdCQUFhLENBQUMsd0JBQXdCLENBQUM7S0FDakQ7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxPQUFPLEVBQUUsTUFBQSx3QkFBYSxDQUFDLG9CQUFvQixDQUFDLG1DQUFJLElBQUk7UUFDcEQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUZBQXlGO1FBQzNGLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxzQkFBc0IsQ0FBQztLQUMvQztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFDVCxvRUFBb0U7UUFDdEUsT0FBTyxFQUFFLHdCQUFhLENBQUMseUJBQXlCLENBQUM7S0FDbEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsT0FBTyxFQUFFLHdCQUFhLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFO1FBQ3JELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBR0osa0JBQWUsOEJBQThCLENBQUMifQ==