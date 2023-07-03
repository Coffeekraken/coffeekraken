// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SPackageExportsParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.exports` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageExportsParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to exports',
                type: 'Array<String>',
                default: __SSugarConfig.get('package.exports.glob'),
                alias: 'g',
            },
            buildInitial: {
                description: 'Specify if you want to process to the export at start even with the "watch" parameter to true',
                type: 'Boolean',
                default: false,
                alias: 'b',
            },
            folderModuleMap: {
                description: 'Specify some folders you want to map to a specific package type like "module" or "commonjs"',
                type: 'Object',
                default: __SSugarConfig.get('package.exports.folderModuleMap'),
                alias: 'f',
            },
            folderPlatformMap: {
                description: 'Specify some folders you want to map to a specific platform like "node" or "browser", etc...',
                type: 'Object',
                default: __SSugarConfig.get('package.exports.folderPlatformMap'),
                alias: 'p',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyw4QkFBK0IsU0FBUSxZQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGlGQUFpRjtnQkFDckYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCwrRkFBK0Y7Z0JBQ25HLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLDZGQUE2RjtnQkFDakcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUM7Z0JBQzlELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQ1AsOEZBQThGO2dCQUNsRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FDdkIsbUNBQW1DLENBQ3RDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=