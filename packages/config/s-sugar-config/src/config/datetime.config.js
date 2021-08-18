export default function (env) {
    return {
        /**
         * @name                dateFormat
         * @namespace           config.datetime
         * @type                String
         * @default             D MMM YYYY
         *
         * This specify the format of the date you want across your project.
         * Stick to the Moment.js (https://momentjs.com/) formating syntax to keep coherence across
         * your format definition
         *
         * @see             https://momentjs.com/
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        dateFormat: 'D MMM YYYY',
        /**
         * @name                timeFormat
         * @namespace           config.datetime
         * @type                String
         * @default             h:mm:ss
         *
         * This specify the format of the time you want across your project.
         * Stick to the Moment.js (https://momentjs.com/) formating syntax to keep coherence across
         * your format definition
         *
         * @see         https://momentjs.com/
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        timeFormat: 'h:mm:ss',
        /**
         * @name            i18n
         * @namespace       config.datetime
         * @type            ISDatetimeConfigI18n
         *
         * This specify some traductions for date and time display like days of the week, months names, etc...
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        i18n: {
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
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZXRpbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILFVBQVUsRUFBRSxZQUFZO1FBRXhCOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSCxVQUFVLEVBQUUsU0FBUztRQUVyQjs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLEVBQUU7WUFDRixhQUFhLEVBQUUsZ0JBQWdCO1lBQy9CLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDSixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsT0FBTztnQkFDUCxPQUFPO2dCQUNQLEtBQUs7Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsV0FBVztnQkFDWCxTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsVUFBVTthQUNiO1lBQ0QsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1lBQ3hGLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNuRTtLQUNKLENBQUM7QUFDTixDQUFDIn0=