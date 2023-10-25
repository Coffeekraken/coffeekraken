"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3JDLEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsV0FBVyxFQUFFLDBDQUEwQztTQUMxRDtRQUVELElBQUksS0FBSztZQUNMLHVDQUNPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUN4QixJQUFJLEVBQUUsU0FBUyxFQUNmLE1BQU0sRUFBRSxTQUFTLEVBQ2pCLGFBQWEsRUFBRSxTQUFTLElBQzFCO1FBQ04sQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ3RDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBL0JELDRCQStCQyJ9