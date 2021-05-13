// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
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
class STsCompilerInterface extends __SInterface {
}
STsCompilerInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        alias: 'i',
        default: __sugarConfig('ts.compile.input')
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'o',
        default: __sugarConfig('ts.compile.inDir')
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        alias: 'o',
        default: __sugarConfig('ts.compile.outDir')
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: __sugarConfig('ts.compile.rootDir')
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
        default: __sugarConfig('ts.compile.map')
    },
    stack: {
        type: 'Array<String>',
        alias: 's',
        default: __sugarConfig('ts.compile.stack')
    },
    config: {
        type: 'String',
        alias: 'c',
        description: 'Specify either a full tsconfig file path to use as config, or a pre-build config name like "js", "node", etc...',
        default: __sugarConfig('ts.compile.config')
    },
    banner: {
        type: 'String',
        alias: 'b',
        default: __sugarConfig('ts.compile.banner')
    },
    save: {
        type: 'Boolean',
        alias: 's',
        default: __sugarConfig('ts.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: __sugarConfig('ts.compile.watch')
    },
    compilerOptions: {
        type: 'Object',
        default: __sugarConfig('ts.compile.compilerOptions')
    }
};
export default STsCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RzQ29tcGlsZXJJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHNDb21waWxlckludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLG9CQUFxQixTQUFRLFlBQVk7O0FBQ3RDLCtCQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0tBQzNDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0tBQzdDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQ1QsK0dBQStHO1FBQ2pILE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsaUhBQWlIO1FBQ25ILE9BQU8sRUFBRSxhQUFhLENBQUMsbUJBQW1CLENBQUM7S0FDNUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0tBQzFDO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsa0JBQWtCLENBQUM7S0FDM0M7SUFDRCxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsNEJBQTRCLENBQUM7S0FDckQ7Q0FDRixDQUFDO0FBRUosZUFBZSxvQkFBb0IsQ0FBQyJ9