"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const SInterface_1 = __importDefault(require("@coffeekraken/sugar/node/interface/SInterface"));
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
class SSvelteCompilerParamsInterface extends SInterface_1.default {
}
SSvelteCompilerParamsInterface.definition = {
    input: {
        type: {
            type: 'Array<String>',
            plop: true
        },
        // path: 'absolute',
        default: sugar_1.default('svelte.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        // path: 'absolute',
        default: sugar_1.default('svelte.compile.inDir')
    },
    outDir: {
        type: 'String',
        // path: {
        //   absolute: true
        // },
        default: sugar_1.default('svelte.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true
        },
        // path: 'absolute',
        default: sugar_1.default('svelte.compile.rootDir')
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: (_a = sugar_1.default('svelte.compile.map')) !== null && _a !== void 0 ? _a : true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        default: sugar_1.default('svelte.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: sugar_1.default('svelte.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: sugar_1.default('svelte.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: sugar_1.default('svelte.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: sugar_1.default('svelte.compile.watch')
    },
    tsconfig: {
        type: 'String|Object',
        description: 'Specify either directly a tsconfig object or a tsconfig valid path',
        default: sugar_1.default('svelte.compile.tsconfig')
    },
    svelte: {
        type: 'Object',
        description: 'Object passed to the svelte compiler',
        default: sugar_1.default('svelte.compile.svelte') || {},
        level: 2
    }
};
exports.default = SSvelteCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUFvRTtBQUNwRSwrRkFBeUU7QUFFekU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxvQkFBWTs7QUFDaEQseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsSUFBSTtTQUNYO1FBQ0Qsb0JBQW9CO1FBQ3BCLE9BQU8sRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7UUFDOUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2Qsb0JBQW9CO1FBQ3BCLE9BQU8sRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsS0FBSztRQUNMLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7UUFDL0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELG9CQUFvQjtRQUNwQixPQUFPLEVBQUUsZUFBYSxDQUFDLHdCQUF3QixDQUFDO0tBQ2pEO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsT0FBTyxFQUFFLE1BQUEsZUFBYSxDQUFDLG9CQUFvQixDQUFDLG1DQUFJLElBQUk7UUFDcEQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULHlGQUF5RjtRQUMzRixPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixXQUFXLEVBQ1Qsb0VBQW9FO1FBQ3RFLE9BQU8sRUFBRSxlQUFhLENBQUMseUJBQXlCLENBQUM7S0FDbEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsT0FBTyxFQUFFLGVBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUU7UUFDckQsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUM7QUFHSixrQkFBZSw4QkFBOEIsQ0FBQyJ9