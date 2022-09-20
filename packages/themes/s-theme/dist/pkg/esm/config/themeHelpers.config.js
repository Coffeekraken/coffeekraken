export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            states
         * @namespace       config.themeHelpers
         * @type            String[]
         * @default         ['mounted','active','loading']
         *
         * Specify some states for which you want to generate helper classes like `s-when:mounted`, `s-until:loading`, etc...
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        states: ['mounted', 'active', 'loading'],
        clearfix: {
            /**
             * @name            default
             * @namespace       config.themeHelpers.clearfix
             * @type            String
             * @values          'overflow','facebook','float','micro','after'
             * @default         overflow
             *
             * Specify which clearfix method has to be used as the default one
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            default: 'overflow',
        },
        disabled: {
            /**
             * @name            opacity
             * @namespace       config.themeHelpers.disabled
             * @type            Number
             * @default         0.4
             *
             * Specify the opacity of disabled items applied either using the `@sugar.disabled` mixin, of through
             * the `s-disabled` helper class
             *
             * @cince       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            opacity: 0.4,
        },
        truncate: {
            /**
             * @name               count
             * @namespace           config.themeHelpers.truncate
             * @type                Number
             * @default             10
             *
             * Specify how many s-truncate:{lines} classes you want to generate. By default this count is set to 10
             * so you can truncate a container up to 10 lines of texts.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            count: 10,
        },
        order: {
            /**
             * @name               count
             * @namespace           config.themeHelpers.order
             * @type                Number
             * @default             20
             *
             * Specify how many s-order:{i} classes you want to generate. By default this count is set to 20.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            count: 20,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDeEMsUUFBUSxFQUFFO1lBQ047Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxPQUFPLEVBQUUsVUFBVTtTQUN0QjtRQUNELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFLEdBQUc7U0FDZjtRQUNELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLEVBQUU7U0FDWjtRQUNELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsRUFBRTtTQUNaO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==