export default function (api) {
    return api.extends(api.config.themeBase, {
        /**
         * @name            colorSchema
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         [config.themeColorSchemaLight]
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get colorSchema() {
            return api.config.themeColorSchemaLight;
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDckM7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksV0FBVztZQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUM1QyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9