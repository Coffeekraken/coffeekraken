export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        codeExample: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.padding.50]
             *
             * Specify the default padding inline for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingInline() {
                return api.theme.padding['50'];
            },

            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.padding.50]
             *
             * Specify the default padding block for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingBlock() {
                return api.theme.padding['50'];
            },
        },
    };
}
