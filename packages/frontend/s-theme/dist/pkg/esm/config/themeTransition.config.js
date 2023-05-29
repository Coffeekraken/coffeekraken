/**
 * @name                    themeTransition
 * @as                      Transitions
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme transition available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
    return {
        /**
         * @name                slow
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [api.theme.timing.slow] [api.theme.easing.default]
         *
         * Specify the "slow" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get slow() {
            return `all ${api.theme.timing.slow} ${api.theme.easing.default}`;
        },
        /**
         * @name                default
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [api.theme.timing.default] [api.theme.easing.default]
         *
         * Specify the "default" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get default() {
            return `all ${api.theme.timing.default} ${api.theme.easing.default}`;
        },
        /**
         * @name                fast
         * @namespace           config.themeTransition
         * @type                String
         * @default             all [api.theme.timing.fast] [api.theme.easing.default]
         *
         * Specify the "fast" transition for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get fast() {
            return `all ${api.theme.timing.fast} ${api.theme.easing.default}`;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksSUFBSTtZQUNKLE9BQU8sT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEUsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pFLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxJQUFJO1lBQ0osT0FBTyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0RSxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==