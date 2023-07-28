/**
 * @name                    themeDefaultLight
 * @as                      Default light theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme default light available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default light',
            description: 'Nice and elegant light theme',
        },
        /**
         * @name            shades
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         config.themeShadesLight
         *
         * Specify the color shades to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shades() {
            return api.config.themeShadesLight;
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDckMsS0FBSyxFQUFFO1lBQ0gsS0FBSyxFQUFFLGVBQWU7WUFDdEIsV0FBVyxFQUFFLDhCQUE4QjtTQUM5QztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDdkMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUMifQ==