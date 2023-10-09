export default function (api) {
    return {
        /**
         * @name                dateFormat
         * @namespace           config.datetime
         * @type                String
         * @default             YYYY-MM-DD
         *
         * This specify the format of the date you want across your project.
         * Stick to the Moment.js (https://momentjs.com/) formating syntax to keep coherence across
         * your format definition
         *
         * @see             https://momentjs.com/
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        dateFormat: 'YYYY-MM-DD',
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        timeFormat: 'h:mm:ss',
        i18n: {
            /**
             * @name            previousMonth
             * @namespace       config.datetime.i18n
             * @type            String
             * @default         Previous Month
             *
             * This specify the "previous month" translation
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            previousMonth: 'Previous Month',
            /**
             * @name            nextMonth
             * @namespace       config.datetime.i18n
             * @type            String
             * @default         Next Month
             *
             * This specify the "next month" translation
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            nextMonth: 'Next Month',
            /**
             * @name            months
             * @namespace       config.datetime.i18n
             * @type            String
             * @default         ['January','February','March','April','May','June','July','August','September','October','November','December']
             *
             * This specify the "months" translation
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
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
            /**
             * @name            weekdays
             * @namespace       config.datetime.i18n
             * @type            String
             * @default         ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
             *
             * This specify the "weekdays" translation
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            weekdays: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            /**
             * @name            weekdaysShort
             * @namespace       config.datetime.i18n
             * @type            String
             * @default         ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
             *
             * This specify the "weekdays shorts" translation
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILFVBQVUsRUFBRSxZQUFZO1FBRXhCOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSCxVQUFVLEVBQUUsU0FBUztRQUVyQixJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsYUFBYSxFQUFFLGdCQUFnQjtZQUMvQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLFlBQVk7WUFDdkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRTtnQkFDSixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsT0FBTztnQkFDUCxPQUFPO2dCQUNQLEtBQUs7Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsV0FBVztnQkFDWCxTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsVUFBVTthQUNiO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRTtnQkFDTixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsU0FBUztnQkFDVCxXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsUUFBUTtnQkFDUixVQUFVO2FBQ2I7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ25FO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==