"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSCxVQUFVLEVBQUUsWUFBWTtRQUV4Qjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsVUFBVSxFQUFFLFNBQVM7UUFFckIsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILGFBQWEsRUFBRSxnQkFBZ0I7WUFDL0I7Ozs7Ozs7Ozs7ZUFVRztZQUNILFNBQVMsRUFBRSxZQUFZO1lBQ3ZCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUU7Z0JBQ0osU0FBUztnQkFDVCxVQUFVO2dCQUNWLE9BQU87Z0JBQ1AsT0FBTztnQkFDUCxLQUFLO2dCQUNMLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixRQUFRO2dCQUNSLFdBQVc7Z0JBQ1gsU0FBUztnQkFDVCxVQUFVO2dCQUNWLFVBQVU7YUFDYjtZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQUU7Z0JBQ04sUUFBUTtnQkFDUixRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxVQUFVO2dCQUNWLFFBQVE7Z0JBQ1IsVUFBVTthQUNiO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNuRTtLQUNKLENBQUM7QUFDTixDQUFDO0FBdEhELDRCQXNIQyJ9