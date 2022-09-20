export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name                margin
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             false
         *
         * Specify if the "margins" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        margin: false,
        /**
         * @name                padding
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             true
         *
         * Specify if the "paddings" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        padding: true,
        /**
         * @name                offsize
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             false
         *
         * Specify if the "offsize" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offsize: false,
        /**
         * @name                font
         * @namespace           config.themeScalable
         * @type                Boolean
         * @default             true
         *
         * Specify if the "fonts" are scalable in your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        font: true,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFDYjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLElBQUk7UUFDYjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLEtBQUs7UUFDZDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDO0FBQ04sQ0FBQyJ9