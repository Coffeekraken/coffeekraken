export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name                default
         * @namespace           config.themeEasing
         * @type                String
         * @default             cubic-bezier(0.700, 0.000, 0.305, 0.995)
         *
         * Specify the "default" easing for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        default: 'cubic-bezier(0.700, 0.000, 0.305, 0.995)',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLDBDQUEwQztLQUN0RCxDQUFDO0FBQ04sQ0FBQyJ9