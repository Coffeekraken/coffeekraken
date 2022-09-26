// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                STypescriptBuilderBuildParamsInterface
 * @namespace           node.interface
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
export default class STypescriptBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.glob');
                },
                alias: 'g',
            },
            inDir: {
                description: 'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.inDir');
                },
                alias: 'i',
            },
            outDir: {
                description: 'Specify a directory where you want to put the builded files. Support the %moduleSystem and %platform token.',
                type: 'String',
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.outDir');
                },
                alias: 'o',
            },
            packageRoot: {
                description: 'Specify in which package the build is happening',
                type: 'String',
                default: process.cwd(),
            },
            formats: {
                description: 'Specify the formats you want to generate. Can be "esm" or/and "cjs"',
                type: 'Array<String>',
                values: ['esm', 'cjs'],
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.formats');
                },
                alias: 'f',
            },
            platform: {
                description: 'Specify for which platform you want to generate the typescript files. Can be "browser" or "node"',
                type: 'String',
                values: ['esm', 'cjs'],
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.platform');
                },
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
                get default() {
                    __SSugarConfig.getSafe('typescriptBuilder.customSettings');
                },
                alias: 'c',
            },
            exclude: {
                description: 'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                get default() {
                    __SSugarConfig.getSafe('typescriptBuilder.exclude');
                },
                alias: 'e',
            },
            save: {
                description: 'Specify if you want to save the result of the build in a file or not',
                type: 'Boolean',
                default: true,
                alias: 's',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQ0FBdUMsU0FBUSxZQUFZO0lBQzVFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksT0FBTztvQkFDUCxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksT0FBTztvQkFDUCxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDN0QsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw2R0FBNkc7Z0JBQ2pILElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksT0FBTztvQkFDUCxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixJQUFJLE9BQU87b0JBQ1AsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQy9ELENBQUM7Z0JBQ0QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asa0dBQWtHO2dCQUN0RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixJQUFJLE9BQU87b0JBQ1AsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ2hFLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsNERBQTREO2dCQUNoRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLDBKQUEwSjtnQkFDOUosSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxPQUFPO29CQUNQLGNBQWMsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixJQUFJLE9BQU87b0JBQ1AsY0FBYyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==