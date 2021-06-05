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
            absolute: true
        }
    },
    type: {
        type: 'String',
        values: ['lib', 'bundle', 'module'],
        default: 'module',
        alias: 't'
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
    noWrite: {
        type: 'Boolean',
        default: false
    },
    prod: {
        type: 'Boolean',
        default: false,
        alias: 'p'
    },
    bundle: {
        type: 'Boolean',
        default: false,
        alias: 'b'
    },
    lib: {
        type: 'Boolean',
        default: false,
        alias: 'l'
    },
    chunks: {
        type: 'Boolean',
        default: false,
        alias: 'c'
    }
};
export default SViteBuildInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGVCdWlsZEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaXRlQnVpbGRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxtQkFBb0IsU0FBUSxZQUFZOztBQUNyQyw4QkFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUNuQyxPQUFPLEVBQUUsUUFBUTtRQUNqQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQzNELE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFHSixlQUFlLG1CQUFtQixDQUFDIn0=