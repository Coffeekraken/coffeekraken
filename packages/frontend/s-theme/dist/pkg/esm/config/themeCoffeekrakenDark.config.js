/**
 * @name                    themeCoffeekrakenDark
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme coffeekraken dark available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Coffeekraken dark',
            description: 'Nice and elegant coffeekraken dark theme',
        },
        get color() {
            return Object.assign(Object.assign({}, api.config.themeColor), { main: '#818898', accent: '#f0f0f0', complementary: '#F9656E' });
        },
        /**
         * @name            shades
         * @namespace        config.themeCoffeekrakenDark
         * @type            String
         * @default         config.themeShadesDark
         *
         * Specify the color shades to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shades() {
            return api.config.themeShadesDark;
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDckMsS0FBSyxFQUFFO1lBQ0gsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixXQUFXLEVBQUUsMENBQTBDO1NBQzFEO1FBRUQsSUFBSSxLQUFLO1lBQ0wsdUNBQ08sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQ3hCLElBQUksRUFBRSxTQUFTLEVBQ2YsTUFBTSxFQUFFLFNBQVMsRUFDakIsYUFBYSxFQUFFLFNBQVMsSUFDMUI7UUFDTixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksTUFBTTtZQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDdEMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUMifQ==