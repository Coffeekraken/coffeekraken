/**
 * @name                    themeDefaultDark
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme default dark available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default dark',
            description: 'Nice and elegant dark theme',
        },
        /**
         * @name            colorSchema
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         config.themeColorSchemaDark
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get colorSchema() {
            return api.config.themeColorSchemaDark;
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDckMsS0FBSyxFQUFFO1lBQ0gsS0FBSyxFQUFFLGNBQWM7WUFDckIsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFdBQVc7WUFDWCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDM0MsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUMifQ==