import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __isNode from '@coffeekraken/sugar/shared/is/node';
export default class SDatePickerComponentInterface extends __SInterface {
    static get definition() {
        var _a, _b, _c, _d;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            name: {
                type: 'String',
                required: true,
            },
            value: {
                type: 'String',
            },
            placeholder: {
                type: 'String',
            },
            format: {
                type: 'String',
                default: (_b = __SSugarConfig.get('datetime.dateFormat')) !== null && _b !== void 0 ? _b : 'YYYY-MM-DD',
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
                    ? ((_c = document
                        .querySelector('html')) === null || _c === void 0 ? void 0 : _c.getAttribute('dir')) === 'rtl'
                    : false,
            },
            i18n: {
                type: 'String',
                description: 'language defaults for month and weekday names',
                default: (_d = __SSugarConfig.get('datetime.i18n')) !== null && _d !== void 0 ? _d : {
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
            button: {
                type: 'Boolean',
                default: true,
            },
            arrowIcon: {
                type: 'String',
                default: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>',
            },
            calendarIcon: {
                type: 'String',
                default: '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>',
            },
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsbUNBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNQLElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFdBQVcsRUFBRTtnQkFDVCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQ0gsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLG1DQUN6QyxZQUFZO2FBQ25CO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDZIQUE2SDthQUNwSTtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsMkhBQTJIO2FBQ2xJO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSw0Q0FBNEM7Z0JBQ3pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxXQUFXLEVBQ1Asd0ZBQXdGO2FBQy9GO1lBQ0Qsb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2Qix1RkFBdUY7WUFDdkYsc0JBQXNCO1lBQ3RCLEtBQUs7WUFDTCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLGtEQUFrRDtnQkFDdEQsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO29CQUNoQixDQUFDLENBQUMsQ0FBQSxNQUFBLFFBQVE7eUJBQ0gsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FDcEIsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFLLEtBQUs7b0JBQ3JDLENBQUMsQ0FBQyxLQUFLO2FBQ2Q7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLCtDQUErQztnQkFDbkQsT0FBTyxFQUFFLE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsbUNBQUk7b0JBQzVDLGFBQWEsRUFBRSxnQkFBZ0I7b0JBQy9CLFNBQVMsRUFBRSxZQUFZO29CQUN2QixNQUFNLEVBQUU7d0JBQ0osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxLQUFLO3dCQUNMLE1BQU07d0JBQ04sTUFBTTt3QkFDTixRQUFRO3dCQUNSLFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxVQUFVO3dCQUNWLFVBQVU7cUJBQ2I7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixTQUFTO3dCQUNULFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixRQUFRO3dCQUNSLFVBQVU7cUJBQ2I7b0JBQ0QsYUFBYSxFQUFFO3dCQUNYLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7cUJBQ1I7aUJBQ0o7YUFDSjtZQUNELGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxXQUFXLEVBQUUseUlBQXlJO2dCQUN0SixPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFDSCxvSkFBb0o7YUFDM0o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNILDZrQ0FBNmtDO2FBQ3BsQztTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=