"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLElBQUk7WUFDSixPQUFPLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RFLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6RSxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksSUFBSTtZQUNKLE9BQU8sT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEUsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBL0NELDRCQStDQyJ9