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
export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUVkOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsZ0JBQWdCO1lBQ2hCLEtBQUs7WUFDTCxrQ0FBa0M7WUFDbEMscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixXQUFXO1lBQ1gsVUFBVTtZQUNWLGNBQWM7WUFDZCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFVBQVU7WUFDVixnQkFBZ0I7U0FDbkI7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9