import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __isNode from '@coffeekraken/sugar/shared/is/node';

/**
 * @name                SDatePickerComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDatePickerComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SDatePickerComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                descrition: 'Specify the name for your input name',
                type: 'String',
                required: true,
            },
            value: {
                description: 'Specify the initial value',
                type: 'String',
            },
            placeholder: {
                description: 'Specify a placeholder for your input',
                type: 'String',
                default: 'Select a date',
            },
            format: {
                description: 'Specify the format to use for your datepicker',
                type: 'String',
                default:
                    __SSugarConfig.get('datetime.dateFormat') ?? 'YYYY-MM-DD',
            },
            firstDay: {
                type: 'Number',
                description:
                    'Specify the first day of the week. 0 is sunday, 1 monday, etc...',
                default: 1,
            },
            minDate: {
                type: 'String',
                description:
                    'the minimum/earliest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())',
            },
            maxDate: {
                type: 'String',
                description:
                    'the maximum/latest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())',
            },
            disableWeekends: {
                type: 'Boolean',
                description: 'disallow selection of Saturdays or Sundays',
                default: false,
            },
            yearRange: {
                type: {
                    type: 'Array<Number>',
                    splitChars: [','],
                },
                description:
                    'number of years either side (e.g. 10) or array of upper/lower range (e.g. [1900,2015])',
            },
            // showWeekNumber: {
            //     type: 'Boolean',
            //     description: ' show the ISO week number at the head of the row (default false)',
            //     default: false,
            // },
            rtl: {
                type: 'Boolean',
                description: 'reverse the calendar for right-to-left languages',
                default: !__isNode()
                    ? document.querySelector('html')?.getAttribute('dir') ===
                      'rtl'
                    : false,
            },
            i18n: {
                type: 'String',
                description: 'language defaults for month and weekday names',
                default: __SSugarConfig.get('datetime.i18n') ?? {
                    previousMonth: 'Previous Month',
                    nextMonth: 'Next Month',
                    months: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ],
                    weekdays: [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ],
                    weekdaysShort: [
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                    ],
                },
            },
            numberOfMonths: {
                type: 'Number',
                description: 'number of visible calendars',
                default: 1,
            },
            events: {
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                description: `array of dates that you would like to differentiate from regular days (e.g. ['Sat Jun 28 2017', 'Sun Jun 29 2017', 'Tue Jul 01 2017',])`,
                default: [],
            },
            input: {
                description:
                    "Specify if you want a visible input injected if you don't have specified yours.",
                type: 'Boolean',
                default: false,
                physical: true,
            },
            button: {
                description:
                    'Specify if you want a button attached to your input or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            arrowIcon: {
                description:
                    'Specify the svg code for the arrow used across the datepicker',
                type: 'String',
                default:
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>',
            },
            calendarIcon: {
                description:
                    'Specify the svg code for the calendar icon used in the button',
                type: 'String'
            },
        };
    }
}
