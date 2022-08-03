"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
class SCliMonoListParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('typescriptBuilder.glob'),
                alias: 'g',
            },
            inDir: {
                description: 'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                default: s_sugar_config_1.default.get('typescriptBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                description: 'Specify a directory where you want to put the builded files',
                type: 'String',
                default: s_sugar_config_1.default.get('typescriptBuilder.outDir'),
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
                default: s_sugar_config_1.default.get('typescriptBuilder.formats'),
                alias: 'f',
            },
            platform: {
                description: 'Specify for which platform you want to generate the typescript files. Can be "browser" or "node"',
                type: 'String',
                values: ['esm', 'cjs'],
                default: s_sugar_config_1.default.get('typescriptBuilder.platform'),
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
                default: s_sugar_config_1.default.get('typescriptBuilder.customSettings'),
                alias: 'c',
            },
            exclude: {
                description: 'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('typescriptBuilder.exclude'),
                alias: 'e',
            },
        };
    }
}
exports.default = SCliMonoListParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDckQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7Z0JBQ3RELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZEQUE2RDtnQkFDakUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2dCQUN2RCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxxRUFBcUU7Z0JBQ3pFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUN0QixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7Z0JBQ3hELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLGtHQUFrRztnQkFDdEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztnQkFDdEIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2dCQUN6RCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw0REFBNEQ7Z0JBQ2hFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1AsMEpBQTBKO2dCQUM5SixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7Z0JBQy9ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztnQkFDeEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUExRUQsOENBMEVDIn0=