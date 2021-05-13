var _a;
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
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
class SSvelteCompilerParamsInterface extends __SInterface {
}
SSvelteCompilerParamsInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        default: __sugarConfig('svelte.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: __sugarConfig('svelte.compile.inDir')
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: __sugarConfig('svelte.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: __sugarConfig('svelte.compile.rootDir')
    },
    map: {
        type: 'Boolean',
        alias: 'm',
        description: 'Generate a sourcemap file',
        default: (_a = __sugarConfig('svelte.compile.map')) !== null && _a !== void 0 ? _a : true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        default: __sugarConfig('svelte.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: __sugarConfig('svelte.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: __sugarConfig('svelte.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: __sugarConfig('svelte.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: __sugarConfig('svelte.compile.watch')
    },
    tsconfig: {
        type: 'String|Object',
        description: 'Specify either directly a tsconfig object or a tsconfig valid path',
        default: __sugarConfig('svelte.compile.tsconfig')
    },
    svelte: {
        type: 'Object',
        description: 'Object passed to the svelte compiler',
        default: __sugarConfig('svelte.compile.svelte') || {},
        level: 2
    }
};
export default SSvelteCompilerParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLDhCQUErQixTQUFRLFlBQVk7O0FBQ2hELHlDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELE9BQU8sRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7UUFDOUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztLQUMvQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFDRCxPQUFPLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixDQUFDO1FBQy9DLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELE9BQU8sRUFBRSxhQUFhLENBQUMsd0JBQXdCLENBQUM7S0FDakQ7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxPQUFPLEVBQUUsTUFBQSxhQUFhLENBQUMsb0JBQW9CLENBQUMsbUNBQUksSUFBSTtRQUNwRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUZBQXlGO1FBQzNGLE9BQU8sRUFBRSxhQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztLQUMvQztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFDVCxvRUFBb0U7UUFDdEUsT0FBTyxFQUFFLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztLQUNsRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxPQUFPLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRTtRQUNyRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0NBQ0YsQ0FBQztBQUdKLGVBQWUsOEJBQThCLENBQUMifQ==