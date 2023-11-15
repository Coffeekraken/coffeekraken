"use strict";
/**
 * @name                    themePartytown
 * @as                      Partytown
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme partytown available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        /**
         * @name          enabled
         * @namespace     config.themePartytown
         * @type          Boolean
         * @default      false
         *
         * Specify if your theme make uses of the "partytown" web workers integration.
         *
         * @see         https://partytown.builder.io
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        enabled: false,
        /**
         * @name          forward
         * @namespace     config.themePartytown
         * @type          Boolean
         * @default      []
         *
         * Specify the global function(s) to foward to the partytown webworker
         *
         * @see         https://partytown.builder.io/common-services
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        forward: [
            'dataLayer.push',
            'fbq',
            'freshpaint.addPageviewProperties',
            'freshpaint.identify',
            'freshpaint.track',
            '_hsq.push',
            'Intercom',
            '_learnq.push',
            'ttq.track',
            'ttq.page',
            'ttq.load',
            'mixpanel.track',
        ],
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLEtBQUs7UUFFZDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sRUFBRTtZQUNMLGdCQUFnQjtZQUNoQixLQUFLO1lBQ0wsa0NBQWtDO1lBQ2xDLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsV0FBVztZQUNYLFVBQVU7WUFDVixjQUFjO1lBQ2QsV0FBVztZQUNYLFVBQVU7WUFDVixVQUFVO1lBQ1YsZ0JBQWdCO1NBQ25CO0tBQ0osQ0FBQztBQUNOLENBQUM7QUEzQ0QsNEJBMkNDIn0=