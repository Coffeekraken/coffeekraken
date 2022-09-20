export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name                slow
         * @namespace           config.themeTiming
         * @type                String
         * @default             0.6s
         *
         * Specify the "slow" timing  for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        slow: '.6s',
        /**
         * @name                default
         * @namespace           config.themeTiming
         * @type                String
         * @default             0.3s
         *
         * Specify the "default" timing  for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        default: '.3s',
        /**
         * @name                fast
         * @namespace           config.themeTiming
         * @type                String
         * @default             0.1s
         *
         * Specify the "fast" timing  for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        fast: '.1s',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLEtBQUs7UUFDWDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLEtBQUs7UUFDZDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDO0FBQ04sQ0FBQyJ9