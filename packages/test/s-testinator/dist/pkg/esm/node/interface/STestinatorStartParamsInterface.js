// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                STestinatorStartParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar testinator.start` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STestinatorStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                default: __SSugarConfig.get('testinator.glob'),
                alias: 'g',
            },
            inDir: {
                description: 'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                default: __SSugarConfig.get('testinator.inDir'),
                alias: 'i',
            },
            packageRoot: {
                description: 'Specify in which package the build is happening',
                type: 'String',
            },
            watch: {
                description: 'Specify if the files have to be build again at each update',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            testInitial: {
                description: 'Specify if you want to build the files at start when using the "watch" flag',
                type: 'Boolean',
                default: false,
                alias: 't',
            },
            exclude: {
                description: 'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                default: __SSugarConfig.get('testinator.exclude'),
                alias: 'e',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxZQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QyxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2dCQUMvQyxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw0REFBNEQ7Z0JBQ2hFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=