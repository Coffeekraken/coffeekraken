"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SPostcssBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SPostcssBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SPostcssBuilderBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            input: {
                description: 'Specify the input css file for your build',
                type: 'String',
                required: true,
                alias: 'i',
                default: s_sugar_config_1.default.get('postcssBuilder.input'),
            },
            output: {
                description: 'Specify the output file path you want to save your build',
                type: 'String',
                alias: 'o',
                default: s_sugar_config_1.default.get('postcssBuilder.output'),
            },
            target: {
                description: 'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: (_a = s_env_1.default.get('target')) !== null && _a !== void 0 ? _a : 'development',
            },
            minify: {
                description: 'Specify if you want to minify your output css',
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
            purge: {
                description: 'Specify if you want to purge your output css. See the config.purgecss configuration file for more control',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.default = SPostcssBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBcUIsbUNBQW9DLFNBQVEscUJBQVk7SUFDekUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2RDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsTUFBQSxlQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxhQUFhO2FBQ2pEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCwyR0FBMkc7Z0JBQy9HLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXRDRCxzREFzQ0MifQ==