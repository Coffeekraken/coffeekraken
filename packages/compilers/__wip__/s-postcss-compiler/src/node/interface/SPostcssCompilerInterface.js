import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SPostcssCompilerInterface
 * @namespace           sugar.node.css.compile.interface
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
class SPostcssCompilerInterface extends __SInterface {
}
SPostcssCompilerInterface.definition = {
    input: {
        type: 'Array<String>',
        path: {
            absolute: true,
            glob: 'resolve'
        },
        default: __sugarConfig('css.compile.input'),
        alias: 'i'
    },
    inDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: __sugarConfig('css.compile.inDir'),
        alias: 'o'
    },
    outDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true,
            create: true
        },
        default: __sugarConfig('css.compile.outDir'),
        alias: 'o'
    },
    rootDir: {
        type: 'String',
        path: {
            absolute: true,
            exists: true
        },
        alias: 'r',
        default: __sugarConfig('css.compile.rootDir')
    },
    bundle: {
        type: 'Boolean',
        alias: 'b',
        default: __sugarConfig('css.compile.bundle')
    },
    bundleSuffix: {
        type: 'String',
        default: __sugarConfig('css.compile.bundleSuffix')
    },
    map: {
        type: 'Boolean|String',
        alias: 'm',
        values: [true, false, 'inline'],
        description: 'Generate the sourcemap. If "true", generate a .map file alongside the dist one, if "inline", set the sourcemap inline',
        default: __sugarConfig('css.compile.map') || true,
        level: 1
    },
    prod: {
        type: 'Boolean',
        alias: 'p',
        default: __sugarConfig('css.compile.prod')
    },
    minify: {
        type: 'Boolean',
        default: __sugarConfig('css.compile.minify')
    },
    beautify: {
        type: 'Boolean',
        default: __sugarConfig('css.compile.beautify')
    },
    optimize: {
        type: 'Boolean',
        default: __sugarConfig('css.compile.optimize')
    },
    banner: {
        type: 'String',
        description: 'Specify a banner (usually a comment) that you want to put on top of your generated code',
        default: __sugarConfig('css.compile.banner')
    },
    save: {
        type: 'Boolean',
        default: __sugarConfig('css.compile.save')
    },
    watch: {
        type: 'Boolean',
        alias: 'w',
        default: __sugarConfig('css.compile.watch')
    },
    postcss: {
        type: 'Object',
        description: 'Object passed to the postcss compiler',
        default: __sugarConfig('css.compile.postcss') || {},
        level: 2
    }
};
export default SPostcssCompilerInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlckludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXJJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOztBQUMzQyxvQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLFNBQVM7U0FDaEI7UUFDRCxPQUFPLEVBQUUsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBQzNDLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzQyxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDNUMsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQzlDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsMEJBQTBCLENBQUM7S0FDbkQ7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7UUFDL0IsV0FBVyxFQUNULHVIQUF1SDtRQUN6SCxPQUFPLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksSUFBSTtRQUNqRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsa0JBQWtCLENBQUM7S0FDM0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCx5RkFBeUY7UUFDM0YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztLQUMzQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFO1FBQ25ELEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBR0osZUFBZSx5QkFBeUIsQ0FBQyJ9