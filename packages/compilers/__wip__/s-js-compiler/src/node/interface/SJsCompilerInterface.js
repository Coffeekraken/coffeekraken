import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
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
class SJsCompilerInterface extends __SInterface {
}
SJsCompilerInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        default: __sugarConfig('js.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        default: __sugarConfig('js.compile.inDir'),
        alias: 'o'
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: __sugarConfig('js.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: __sugarConfig('js.compile.rootDir')
    },
    format: {
        type: 'String',
        alias: 'f',
        values: ['iife', 'cjs', 'esm'],
        default: __sugarConfig('js.compile.format')
    },
    platform: {
        type: 'String',
        alias: 'p',
        values: ['node', 'browser'],
        default: __sugarConfig('js.compile.platform')
    },
    bundle: {
        type: 'Boolean',
        alias: 'b',
        default: __sugarConfig('js.compile.bundle')
    },
    bundleSuffix: {
        type: 'String',
        default: __sugarConfig('js.compile.bundleSuffix')
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
        default: __sugarConfig('js.compile.map') || true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: __sugarConfig('js.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: __sugarConfig('js.compile.minify')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: __sugarConfig('js.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: __sugarConfig('js.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: __sugarConfig('js.compile.watch')
    },
    esbuild: {
        type: 'Object',
        description: 'Object passed to the esbuild compiler',
        default: __sugarConfig('js.compile.esbuild') || {},
        level: 2
    }
};
export default SJsCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXJJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLG9CQUFxQixTQUFRLFlBQVk7O0FBQ3RDLCtCQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELE9BQU8sRUFBRSxhQUFhLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztRQUMxQyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELE9BQU8sRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDM0MsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztRQUMzQixPQUFPLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMseUJBQXlCLENBQUM7S0FDbEQ7SUFDRCxjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLGlCQUFpQjtJQUNqQiwrS0FBK0s7SUFDL0ssZ0JBQWdCO0lBQ2hCLGtEQUFrRDtJQUNsRCxLQUFLO0lBQ0wsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQy9CLFdBQVcsRUFDVCx1SEFBdUg7UUFDekgsT0FBTyxFQUFFLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUk7UUFDaEQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1QseUZBQXlGO1FBQzNGLE9BQU8sRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsaUJBQWlCLENBQUM7S0FDMUM7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxPQUFPLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRTtRQUNsRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0NBQ0YsQ0FBQztBQUdKLGVBQWUsb0JBQW9CLENBQUMifQ==