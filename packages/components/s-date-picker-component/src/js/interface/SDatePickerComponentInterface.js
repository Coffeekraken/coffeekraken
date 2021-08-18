var _a, _b;
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SDatePickerComponentInterface extends __SInterface {
}
SDatePickerComponentInterface.definition = {
    name: {
        type: 'String',
        required: true,
    },
    value: {
        type: 'String',
    },
    format: {
        type: 'String',
        default: __SSugarConfig.get('datetime.dateFormat'),
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
    showWeekNumber: {
        type: 'Boolean',
        description: ' show the ISO week number at the head of the row (default false)',
        default: false,
    },
    rtl: {
        type: 'Boolean',
        description: 'reverse the calendar for right-to-left languages',
        default: ((_a = document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.getAttribute('dir')) === 'rtl',
    },
    i18n: {
        type: 'String',
        description: 'language defaults for month and weekday names',
        default: (_b = __SSugarConfig.get('datetime.i18n')) !== null && _b !== void 0 ? _b : {
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
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyw2QkFBOEIsU0FBUSxZQUFZOztBQUM1RCx3Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7S0FDckQ7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNQLDZIQUE2SDtLQUNwSTtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNQLDJIQUEySDtLQUNsSTtJQUNELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNwQjtRQUNELFdBQVcsRUFBRSx3RkFBd0Y7S0FDeEc7SUFDRCxjQUFjLEVBQUU7UUFDWixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsT0FBTyxFQUFFLEtBQUs7S0FDakI7SUFDRCxHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxrREFBa0Q7UUFDL0QsT0FBTyxFQUFFLENBQUEsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQUssS0FBSztLQUN6RTtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLCtDQUErQztRQUM1RCxPQUFPLEVBQUUsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxtQ0FBSTtZQUM1QyxhQUFhLEVBQUUsZ0JBQWdCO1lBQy9CLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDSixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsT0FBTztnQkFDUCxPQUFPO2dCQUNQLEtBQUs7Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsV0FBVztnQkFDWCxTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsVUFBVTthQUNiO1lBQ0QsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1lBQ3hGLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNuRTtLQUNKO0lBQ0QsY0FBYyxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDcEI7UUFDRCxXQUFXLEVBQUUseUlBQXlJO1FBQ3RKLE9BQU8sRUFBRSxFQUFFO0tBQ2Q7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQ0gsb0pBQW9KO0tBQzNKO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQ0gsNmtDQUE2a0M7S0FDcGxDO0NBQ0osQ0FBQyJ9