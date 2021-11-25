export interface ISDatetimeConfigI18n {
    previousMonth: string;
    nextMonth: string;
    months: string[12];
    weekdays: string[7];
    weekdaysShort: string[7];
}

export default function (env) {
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
    };
}
