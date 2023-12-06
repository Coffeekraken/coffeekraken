/**
 * @name                    partytown
 * @as                      Partytown
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-front partytown available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        /**
         * @name          enabled
         * @namespace     config.partytown
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
         * @namespace     config.partytown
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
