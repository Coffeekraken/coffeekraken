"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SI18nExtractParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SI18nExtract method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SI18nExtractParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                type: 'String',
                description: 'Specify a glob string relative to the cwd where to search and extract __i18n statements from',
                default: s_sugar_config_1.default.get('i18n.extract.glob'),
                required: true,
            },
            outDir: {
                type: 'String',
                description: 'Specify the output directory path where the i18n files will be stored',
                default: s_sugar_config_1.default.get('i18n.extract.outDir'),
                required: true,
            },
            fileName: {
                type: 'String',
                description: 'Specify the filename you want for your extracted i18n statements',
                default: s_sugar_config_1.default.get('i18n.extract.fileName'),
                required: true,
            },
        };
    }
}
exports.default = SI18nExtractParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2xELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDhGQUE4RjtnQkFDbEcsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2dCQUNoRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDcEQsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsa0JBQWUsMkJBQTJCLENBQUMifQ==