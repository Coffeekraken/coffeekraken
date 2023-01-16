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
