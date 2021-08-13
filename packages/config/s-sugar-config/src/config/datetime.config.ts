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
    };
}
