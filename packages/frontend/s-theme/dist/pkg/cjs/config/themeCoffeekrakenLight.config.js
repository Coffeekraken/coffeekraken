"use strict";
/**
 * @name                    themeCoffeekrakenLight
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme coffeekraken light available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Coffeekraken light',
            description: 'Nice and elegant coffeekraken light theme',
        },
        get color() {
            return Object.assign(Object.assign({}, api.config.themeColor), { main: '#737A8C', accent: '#F7C33F', complementary: '#F9656E' });
        },
        /**
         * @name            shades
         * @namespace        config.themeCoffeekrakenLight
         * @type            String
         * @default         config.themeShadesDark
         *
         * Specify the color shades to be used in the light theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shades() {
            return api.extends(api.config.themeShadesLight, {
                background: {
                    lighten: 47,
                },
            });
        },
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3JDLEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsV0FBVyxFQUFFLDJDQUEyQztTQUMzRDtRQUVELElBQUksS0FBSztZQUNMLHVDQUNPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUN4QixJQUFJLEVBQUUsU0FBUyxFQUNmLE1BQU0sRUFBRSxTQUFTLEVBQ2pCLGFBQWEsRUFBRSxTQUFTLElBQzFCO1FBQ04sQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE1BQU07WUFDTixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDNUMsVUFBVSxFQUFFO29CQUNSLE9BQU8sRUFBRSxFQUFFO2lCQUNkO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuQ0QsNEJBbUNDIn0=