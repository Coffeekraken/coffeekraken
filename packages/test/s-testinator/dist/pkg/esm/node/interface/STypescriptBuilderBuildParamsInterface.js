// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SCliMonoListParamsInterface
 * @namespace           node.mono.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.list` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliMonoListParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                default: __SSugarConfig.get('typescriptBuilder.glob'),
                alias: 'g',
            },
            inDir: {
                description: 'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                default: __SSugarConfig.get('typescriptBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                description: 'Specify a directory where you want to put the builded files',
                type: 'String',
                default: __SSugarConfig.get('typescriptBuilder.outDir'),
                alias: 'o',
            },
            packageRoot: {
                description: 'Specify in which package the build is happening',
                type: 'String',
            },
            formats: {
                description: 'Specify the formats you want to generate. Can be "esm" or/and "cjs"',
                type: 'Array<String>',
                values: ['esm', 'cjs'],
                default: __SSugarConfig.get('typescriptBuilder.formats'),
                alias: 'f',
            },
            platform: {
                description: 'Specify for which platform you want to generate the typescript files. Can be "browser" or "node"',
                type: 'String',
                values: ['esm', 'cjs'],
                default: __SSugarConfig.get('typescriptBuilder.platform'),
                alias: 'p',
            },
            watch: {
                description: 'Specify if the files have to be build again at each update',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            buildInitial: {
                description: 'Specify if you want to build the files at start when using the "watch" flag',
                type: 'Boolean',
                default: false,
                alias: 'b',
            },
            customSettings: {
                description: 'Specify some custom settings for the typescript builder by passing a glob pattern relative to the inDir, and some custom settings to use for these files',
                type: 'Object',
                default: __SSugarConfig.get('typescriptBuilder.customSettings'),
                alias: 'c',
            },
            exclude: {
                description: 'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                default: __SSugarConfig.get('typescriptBuilder.exclude'),
                alias: 'e',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTywyQkFBNEIsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2dCQUNyRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2dCQUN0RCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw2REFBNkQ7Z0JBQ2pFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2dCQUN2RCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztnQkFDeEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asa0dBQWtHO2dCQUN0RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztnQkFDekQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsNERBQTREO2dCQUNoRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLDBKQUEwSjtnQkFDOUosSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7Z0JBQy9ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO2dCQUN4RCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9