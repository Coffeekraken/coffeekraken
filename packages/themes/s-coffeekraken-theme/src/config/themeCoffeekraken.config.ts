export default function (env, config) {
    return {
        /**
         * @name            themeName
         * @namespace       config.themeCoffeekraken
         * @type            String
         * @default         coffeekraken
         *
         * Specify the theme name
         *
         * @since           2.0.0
         * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        themeName: 'coffeekraken',

        variants: {
            /**
             * @name            dark
             * @namespace       config.themeCoffeekraken.variants
             * @type            String
             * @default         coffeekraken
             *
             * Specify the dark theme variant
             *
             * @since           2.0.0
             * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            dark: '[config.themeCoffeekrakenDark]',
        },
    };
}
