/**
 * @name                    themeHelpers
 * @as                      Helpers
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme helpers available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQ3hDLFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFLFVBQVU7U0FDdEI7UUFDRCxRQUFRLEVBQUU7WUFDTjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILE9BQU8sRUFBRSxHQUFHO1NBQ2Y7UUFDRCxRQUFRLEVBQUU7WUFDTjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEtBQUssRUFBRSxFQUFFO1NBQ1o7UUFDRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEVBQUU7U0FDWjtLQUNKLENBQUM7QUFDTixDQUFDIn0=