(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZXRpbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBUUEsbUJBQXlCLEdBQUc7UUFDeEIsT0FBTztZQUNIOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxVQUFVLEVBQUUsWUFBWTtZQUV4Qjs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsVUFBVSxFQUFFLFNBQVM7WUFFckIsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILGFBQWEsRUFBRSxnQkFBZ0I7Z0JBQy9COzs7Ozs7Ozs7O21CQVVHO2dCQUNILFNBQVMsRUFBRSxZQUFZO2dCQUN2Qjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUU7b0JBQ0osU0FBUztvQkFDVCxVQUFVO29CQUNWLE9BQU87b0JBQ1AsT0FBTztvQkFDUCxLQUFLO29CQUNMLE1BQU07b0JBQ04sTUFBTTtvQkFDTixRQUFRO29CQUNSLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxVQUFVO29CQUNWLFVBQVU7aUJBQ2I7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFO29CQUNOLFFBQVE7b0JBQ1IsUUFBUTtvQkFDUixTQUFTO29CQUNULFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixRQUFRO29CQUNSLFVBQVU7aUJBQ2I7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO2FBQ25FO1NBQ0osQ0FBQztJQUNOLENBQUM7SUF0SEQsNEJBc0hDIn0=