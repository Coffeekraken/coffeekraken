export default function (api) {
    return {
        /**
         * @name                enabled
         * @namespace           config.themeClassmap
         * @type                Boolean
         * @default             false
         *
         * Specify if your project make uses of the classmap feature or not
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        enabled: false,

        /**
         * @name                url
         * @namespace           config.themeClassmap
         * @type                String
         * @default             /classmap.json
         *
         * Specify the url to load the classmap from
         *
         * @since               2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        url: '/classmap.json',
    };
}
