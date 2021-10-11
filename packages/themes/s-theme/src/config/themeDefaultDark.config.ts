export default function (env, config) {
    return {
        extends: 'themeDarkBase',

        /**
         * @name            defaultColor
         * @namespace        config.theme.themes.themeDefaultDark
         * @type            String
         * @default         main
         *
         * Specify which color to use by default for elements that make use of the "sugar.color(current)" color.
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        defaultColor: 'main',

        color: {
            /**
             * @name                main
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             hsla(198,10,50,1)
             *
             * Specify the <s-color="main">main</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            main: {
                color: 'hsla(198,10,50,1)',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                accent
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #ffbb00
             *
             * Specify the <s-color="accent">accent</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            accent: {
                color: '#ffbb00',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                complementary
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #5100ff
             *
             * Specify the <s-color="complementary">complementary</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            complementary: {
                color: '#5100ff',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                success
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #91ff00
             *
             * Specify the <s-color="success">success</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            success: {
                color: '#91ff00',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                warning
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #ffd500
             *
             * Specify the <s-color="warning">warning</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            warning: {
                color: '#ffd500',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                error
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #ff003b
             *
             * Specify the <s-color="error">error</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            error: {
                color: '#ff003b',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                info
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #00ffff
             *
             * Specify the <s-color="info">info</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            info: {
                color: '#00ffff',
                '...': '[extends.colorSchemas]',
            },

            /**
             * @name                extension
             * @namespace           config.theme.themes.default.color
             * @type                Color
             * @default             #2b3438
             *
             * Specify the <primary>extension</s-color> color value.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            extension: {
                color: '[theme.color.accent.color]',
                blade: '#ff2d20',
                php: '#8892BF',
                js: '#f7df1e',
                node: '#68A063',
                css: '#498FE1',
                scss: '#CF649A',
                sass: '#CF649A',
                json: '#000000',
                jpg: '#B2C0E1',
                jpeg: '#B2C0E1',
                pdf: '#E7786E',
                doc: '#60D7FD',
                psd: '#F9D659',
                mp3: '#E98C61',
                png: '#C29DFB',
                aac: '#B1C5C9',
                zip: '#9CC04E',
                dmg: '#E36E4B',
            },
        },
    };
}
