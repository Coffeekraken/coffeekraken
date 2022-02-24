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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDatePickerComponentInterface extends __SInterface {
    static get _definition() {
        var _a, _b, _c;
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
                default: (_a = __SSugarConfig.get('datetime.dateFormat')) !== null && _a !== void 0 ? _a : 'YYYY-MM-DD',
            },
            firstDay: {
                type: 'Number',
                description: 'Specify the first day of the week. 0 is sunday, 1 monday, etc...',
                default: 1,
            },
            minDate: {
                type: 'String',
                description: 'the minimum/earliest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())',
            },
            maxDate: {
                type: 'String',
                description: 'the maximum/latest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())',
            },
            disableWeekends: {
                type: 'Boolean',
                description: 'disallow selection of Saturdays or Sundays',
                default: false,
            },
            disabled: {
                type: 'Boolean',
                description: 'Specify if your date picker is disabled',
                default: false
            },
            yearRange: {
                type: {
                    type: 'Array<Number>',
                    splitChars: [','],
                },
                description: 'number of years either side (e.g. 10) or array of upper/lower range (e.g. [1900,2015])',
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
                    ? ((_b = document.querySelector('html')) === null || _b === void 0 ? void 0 : _b.getAttribute('dir')) ===
                        'rtl'
                    : false,
            },
            i18n: {
                type: 'String',
                description: 'language defaults for month and weekday names',
                default: (_c = __SSugarConfig.get('datetime.i18n')) !== null && _c !== void 0 ? _c : {
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
                description: "Specify if you want a visible input injected if you don't have specified yours.",
                type: 'Boolean',
                default: false,
                physical: true,
            },
            button: {
                description: 'Specify if you want a button attached to your input or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            arrowIcon: {
                description: 'Specify the svg code for the arrow used across the datepicker',
                type: 'String',
                default: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>',
            },
            calendarIcon: {
                description: 'Specify the svg code for the calendar icon used in the button',
                type: 'String'
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLHNDQUFzQztnQkFDbEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJCQUEyQjtnQkFDeEMsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGVBQWU7YUFDM0I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNILE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxtQ0FBSSxZQUFZO2FBQ2hFO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDZIQUE2SDthQUNwSTtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsMkhBQTJIO2FBQ2xJO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxXQUFXLEVBQ1Asd0ZBQXdGO2FBQy9GO1lBQ0Qsb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2Qix1RkFBdUY7WUFDdkYsc0JBQXNCO1lBQ3RCLEtBQUs7WUFDTCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO29CQUNoQixDQUFDLENBQUMsQ0FBQSxNQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLDBDQUFFLFlBQVksQ0FBQyxLQUFLLENBQUM7d0JBQ25ELEtBQUs7b0JBQ1AsQ0FBQyxDQUFDLEtBQUs7YUFDZDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxPQUFPLEVBQUUsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxtQ0FBSTtvQkFDNUMsYUFBYSxFQUFFLGdCQUFnQjtvQkFDL0IsU0FBUyxFQUFFLFlBQVk7b0JBQ3ZCLE1BQU0sRUFBRTt3QkFDSixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxPQUFPO3dCQUNQLEtBQUs7d0JBQ0wsTUFBTTt3QkFDTixNQUFNO3dCQUNOLFFBQVE7d0JBQ1IsV0FBVzt3QkFDWCxTQUFTO3dCQUNULFVBQVU7d0JBQ1YsVUFBVTtxQkFDYjtvQkFDRCxRQUFRLEVBQUU7d0JBQ04sUUFBUTt3QkFDUixRQUFRO3dCQUNSLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFFBQVE7d0JBQ1IsVUFBVTtxQkFDYjtvQkFDRCxhQUFhLEVBQUU7d0JBQ1gsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDUjtpQkFDSjthQUNKO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELFdBQVcsRUFBRSx5SUFBeUk7Z0JBQ3RKLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGlGQUFpRjtnQkFDckYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDREQUE0RDtnQkFDaEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNILG9KQUFvSjthQUMzSjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsK0RBQStEO2dCQUNuRSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==