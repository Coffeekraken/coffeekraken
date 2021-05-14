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
        default: 
    },
    bundle: {
        type: 'Boolean',
        default: false,
        alias: 'b'
    },
    target: {
        type: 'String',
        values: ['modules', 'esnext', 'es2015', 'es2016', 'es2020']
    },
    lib: {
        type: 'Boolean',
        default: false,
        alias: 'l'
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
    }
};
export default SViteBuildInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGVCdWlsZEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaXRlQnVpbGRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxtQkFBb0IsU0FBUSxZQUFZOztBQUNyQyw4QkFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUNULEFBRFU7S0FDVDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0tBQzVEO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQUdKLGVBQWUsbUJBQW1CLENBQUMifQ==