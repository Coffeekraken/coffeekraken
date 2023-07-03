"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                STypescriptBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
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
class STypescriptBuilderBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                get default() {
                    return s_sugar_config_1.default.getSafe('typescriptBuilder.glob');
                },
                alias: 'g',
            },
            inDir: {
                description: 'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                get default() {
                    return s_sugar_config_1.default.getSafe('typescriptBuilder.inDir');
                },
                alias: 'i',
            },
            outDir: {
                description: 'Specify a directory where you want to put the builded files. Support the %moduleSystem and %platform token.',
                type: 'String',
                get default() {
                    return s_sugar_config_1.default.getSafe('typescriptBuilder.outDir');
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
                    return s_sugar_config_1.default.getSafe('typescriptBuilder.formats');
                },
                alias: 'f',
            },
            platform: {
                description: 'Specify for which platform you want to generate the typescript files. Can be "browser" or "node"',
                type: 'String',
                values: ['esm', 'cjs'],
                get default() {
                    return s_sugar_config_1.default.getSafe('typescriptBuilder.platform');
                },
                alias: 'p',
            },
            declarationFiles: {
                description: 'Specify if you want the ".d.ts" files to be generated or not',
                type: 'Boolean',
                default: true
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
                    s_sugar_config_1.default.getSafe('typescriptBuilder.customSettings');
                },
                alias: 'c',
            },
            exclude: {
                description: 'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                get default() {
                    s_sugar_config_1.default.getSafe('typescriptBuilder.exclude');
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
exports.default = STypescriptBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzVFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksT0FBTztvQkFDUCxPQUFPLHdCQUFjLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQ0QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLE9BQU87b0JBQ1AsT0FBTyx3QkFBYyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZHQUE2RztnQkFDakgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxPQUFPO29CQUNQLE9BQU8sd0JBQWMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixJQUFJLE9BQU87b0JBQ1AsT0FBTyx3QkFBYyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLGtHQUFrRztnQkFDdEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxPQUFPO29CQUNQLE9BQU8sd0JBQWMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztnQkFDRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsZ0JBQWdCLEVBQUc7Z0JBQ2YsV0FBVyxFQUFFLDhEQUE4RDtnQkFDM0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDREQUE0RDtnQkFDaEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsNkVBQTZFO2dCQUNqRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCwwSkFBMEo7Z0JBQzlKLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksT0FBTztvQkFDUCx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksT0FBTztvQkFDUCx3QkFBYyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFyR0QseURBcUdDIn0=