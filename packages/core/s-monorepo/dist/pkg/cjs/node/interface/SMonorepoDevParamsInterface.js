"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SMonorepoDevParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.dev` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMonorepoDevParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: s_sugar_config_1.default.get('monorepo.packagesGlob'),
                alias: 'p',
            },
            build: {
                description: 'Specify if you want to build your files like the .ts ones or not',
                type: 'Boolean',
                default: true,
                alias: 'b',
            },
            buildInitial: {
                description: 'Specify if you want to build the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
            test: {
                description: 'Specify if you want to run the tests on saved files or not',
                type: 'Boolean',
                default: false,
                alias: 't',
            },
            testInitial: {
                description: 'Specify if you want to test the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
            format: {
                description: 'Specify if you want to run the code formatter (SCodeFormatter) on your packages or not',
                type: 'Boolean',
                default: true,
                alias: 'f',
            },
            formatInitial: {
                description: 'Specify if you want to format your files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.default = SMonorepoDevParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUNwRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLGlHQUFpRztnQkFDckcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLDREQUE0RDtnQkFDaEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsZ0dBQWdHO2dCQUNwRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1Asd0ZBQXdGO2dCQUM1RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTtnQkFDYixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxtR0FBbUc7Z0JBQ3ZHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQW5ERCw4Q0FtREMifQ==