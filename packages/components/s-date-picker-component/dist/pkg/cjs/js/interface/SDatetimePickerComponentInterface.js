"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SDatetimePickerComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDatetimePickerComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDatetimePickerComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                description: "Specify the name that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'color',
            },
            value: {
                description: 'Specify the initial value for your picker',
                type: 'String',
            },
            updateInput: {
                description: 'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['validate', 'reset'],
                default: ['validate', 'reset'],
            },
            format: {
                description: 'Specify thr format you want for the date(time). See this (https://www.npmjs.com/package/date-format-parse) for formating possibilities',
                type: 'String',
                default: 'YYYY-MM-DD',
            },
            inline: {
                description: 'Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            calendar: {
                description: 'Specify if you want to display a calendar or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            i18n: {
                description: 'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',
                type: 'Object',
                default: {
                    reset: 'Reset',
                    clear: 'Clear',
                    validate: 'Validate',
                    months: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                },
            },
            placeholder: {
                description: "Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'Select a color',
            },
            floatSettings: {
                description: 'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',
                type: 'Object',
                default: {},
            },
            copyIconClass: {
                description: 'Specify the class you want to apply on the "i" that display the "copy" icon',
                type: 'String',
                default: 's-icon s-icon--copy',
            },
            copiedIconClass: {
                description: 'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',
                type: 'String',
                default: 's-icon s-icon--copied',
            },
            buttonIconClass: {
                description: 'Specify the class you want to apply on the injected button icon',
                type: 'String',
                default: 's-icon s-icon--color',
            },
            backdropClass: {
                description: 'Specify the class to apply on the backdrop when the "backdrop" prop is true',
                type: 'String',
                default: 's-backdrop',
            },
            disable: {
                description: 'Specify what you want to disable. It can be "weekend", "week" or "2022-12-19" (dates)',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                default: [],
            },
            disabled: {
                description: 'Specify if the color picker is disabled',
                type: 'Boolean',
                default: false,
            },
            backdrop: {
                description: 'Specify if you want the ".s-backdrop" element or not',
                type: 'Boolean',
                default: false,
            },
            actions: {
                description: 'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['clear', 'reset', 'validate'],
                default: ['reset', 'validate'],
            },
            hours: {
                description: 'Specify the hours you want in the time selector',
                type: 'Array<Number>',
                default: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23,
                ],
            },
            minutes: {
                description: 'Specify the minutes you want in the time selector',
                type: 'Array<Number>',
                default: [0, 5, 10, 15, 20, 25, 30, 25, 40, 45, 50, 55],
            },
            fromYear: {
                description: 'Specify the first year to allow selection from',
                type: 'Number',
                default: new Date().getFullYear() - 100,
            },
            toYear: {
                description: 'Specify the last year to allow selection from',
                type: 'Number',
                default: new Date().getFullYear() + 100,
            },
        };
    }
}
exports.default = SDatetimePickerComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3ZFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGdHQUFnRztnQkFDcEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLG1JQUFtSTtnQkFDdkksSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7YUFDakM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHdJQUF3STtnQkFDNUksSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFlBQVk7YUFDeEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLGdJQUFnSTtnQkFDcEksSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtHQUErRztn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