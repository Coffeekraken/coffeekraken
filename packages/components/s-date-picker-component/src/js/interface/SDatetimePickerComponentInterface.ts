import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDatetimePickerComponentInterface
 * @namespace           js.interface
 * @type.                      Class
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

export default class SDatetimePickerComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description:
                    "Specify the name that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'color',
            },
            value: {
                description: 'Specify the initial value for your picker',
                type: 'String',
            },
            updateInput: {
                description:
                    'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['select', 'validate', 'reset', 'clear', 'close'],
                default: ['select', 'validate', 'reset', 'clear', 'close'],
            },
            format: {
                description:
                    'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',
                type: 'String',
                default: 'yyyy-mm-dd',
            },
            inline: {
                description:
                    'Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input',
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
                description:
                    'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',
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
                description:
                    "Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'Select a color',
            },
            input: {
                description:
                    'Specify if you dont want an automatically injected text input when you dont provide yours',
                type: 'Boolean',
                default: false,
            },
            button: {
                description: 'Specify if you want to display the button or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            floatSettings: {
                description:
                    'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',
                type: 'Object',
                default: {
                    position: 'auto',
                    shift: 10,
                    offset: 0,
                    arrow: false,
                    arrowSize: 15,
                    arrowPadding: 10,
                },
            },
            copyIconClass: {
                description:
                    'Specify the class you want to apply on the "i" that display the "copy" icon',
                type: 'String',
                default: 's-icon s-icon--copy',
            },
            copiedIconClass: {
                description:
                    'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',
                type: 'String',
                default: 's-icon s-icon--copied',
            },
            buttonIconClass: {
                description:
                    'Specify the class you want to apply on the injected button icon',
                type: 'String',
                default: 's-icon s-icon--color',
            },
            disable: {
                description:
                    'Specify what you want to disable. It can be "weekend", "week" or "2022-12-19" (dates)',
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
                description:
                    'Specify if you want the ".s-backdrop" element or not',
                type: 'Boolean',
                default: false,
            },
            actions: {
                description:
                    'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',
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
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                ],
            },
            minutes: {
                description:
                    'Specify the minutes you want in the time selector',
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
