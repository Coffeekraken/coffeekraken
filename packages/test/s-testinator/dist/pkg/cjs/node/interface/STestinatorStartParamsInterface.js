"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
class STestinatorStartParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('testinator.glob'),
                alias: 'g',
            },
            inDir: {
                description: 'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                default: s_sugar_config_1.default.get('testinator.inDir'),
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
                default: s_sugar_config_1.default.get('testinator.exclude'),
                alias: 'e',
            },
        };
    }
}
exports.default = STestinatorStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDOUMsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7Z0JBQy9DLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDREQUE0RDtnQkFDaEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsNkVBQTZFO2dCQUNqRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUNELGtEQTRDQyJ9