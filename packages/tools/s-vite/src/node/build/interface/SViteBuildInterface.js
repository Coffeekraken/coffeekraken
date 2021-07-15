import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SViteBuildInterface
 * @namespace           s-vite
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SFrontstackViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SViteBuildInterface extends __SInterface {
}
SViteBuildInterface.definition = {
    input: {
        type: 'String',
        path: {
            exists: true,
            absolute: true
        },
        default: `${__SSugarConfig.get('storage.src.jsDir')}/index.ts`,
        required: true
    },
    type: {
        type: 'Array<String>',
        values: ['lib', 'bundle', 'module'],
        default: ['bundle', 'module'],
        alias: 't'
    },
    format: {
        type: 'Array<String>',
        values: ['es', 'umd', 'cjs', 'iife'],
        default: [],
        alias: 'f'
    },
    verbose: {
        type: 'Boolean',
        default: true,
        alias: 'v'
    },
    target: {
        type: 'String',
        values: ['modules', 'esnext', 'es2015', 'es2016', 'es2020'],
        default: undefined
    },
    watch: {
        type: 'Boolean',
        default: false,
        alias: 'w'
    },
    lib: {
        type: 'Boolean',
        default: false,
        alias: 'l'
    },
    bundle: {
        type: 'Boolean',
        default: false,
        alias: 'b'
    },
    noWrite: {
        type: 'Boolean',
        default: false
    },
    prod: {
        type: 'Boolean',
        default: false,
        alias: 'p'
    },
    chunks: {
        type: 'Boolean',
        default: false,
        alias: 'c'
    },
    minify: {
        type: 'Boolean',
        default: false,
        alias: 'm'
    },
    analyze: {
        type: 'Boolean',
        default: false,
        alias: 'a'
    }
};
export default SViteBuildInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGVCdWlsZEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaXRlQnVpbGRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxtQkFBb0IsU0FBUSxZQUFZOztBQUNyQyw4QkFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0QsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXO1FBQzlELFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDO1FBQzVCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7UUFDakMsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDM0QsT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFHSixlQUFlLG1CQUFtQixDQUFDIn0=