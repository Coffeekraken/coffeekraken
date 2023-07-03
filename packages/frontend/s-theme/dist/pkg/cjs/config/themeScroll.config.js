"use strict";
/**
 * @name                    themeScroll
 * @as                      Scroll
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme scroll available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        /**
         * @name                duration
         * @namespace           config.themeScroll
         * @type                String
         * @default             300
         *
         * Specify the scroll duration for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        duration: 300,
        /**
         * @name                offset
         * @namespace           config.themeScroll
         * @type                String
         * @default             300
         *
         * Specify the scroll offset for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        offset: 0,
        /**
         * @name                offsetX
         * @namespace           config.themeScroll
         * @type                String
         * @default             [theme.layout.offset.left]
         *
         * Specify the scroll offset x for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get offsetX() {
            return api.theme.layout.offset.left;
        },
        /**
         * @name                offsetY
         * @namespace           config.themeScroll
         * @type                String
         * @default             [theme.layout.offset.top]
         *
         * Specify the scroll offset y for your theme
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get offsetY() {
            return api.theme.layout.offset.top;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsR0FBRztRQUViOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsQ0FBQztRQUVUOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdkMsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBMURELDRCQTBEQyJ9