import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export default function (env, config) {
    return {
        /**
         * @name            extends
         * @namespace       config.themeCoffeekrakenDark
         * @type            String
         * @default         themeDarkBase
         *
         * Specify which theme this one extends from
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        extends: 'themeDarkBase',
        color: {
            main: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.main
                 * @type                Color
                 * @default             #776D91
                 *
                 * Specify the <s-color="main">main</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#776D91',
                '...': '[extends.colorSchemas]',
            },

            ui: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.ui
                 * @type                Color
                 * @default             #7a738c
                 *
                 * Specify the <s-color="ui">ui</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#7a738c',
                '...': '[extends.colorSchemas]',
            },

            accent: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.accent
                 * @type                Color
                 * @default             #ffbb00
                 *
                 * Specify the <s-color="accent">accent</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#ffbb00',
                '...': '[extends.colorSchemas]',
            },

            complementary: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.complementary
                 * @type                Color
                 * @default             #5100ff
                 *
                 * Specify the <s-color="complementary">complementary</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#5100ff',
                '...': '[extends.colorSchemas]',
                default: {
                    text: {
                        lighten: 15,
                    },
                },
            },

            success: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.success
                 * @type                Color
                 * @default             #91ff00
                 *
                 * Specify the <s-color="success">success</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#91ff00',
                '...': '[extends.colorSchemas]',
            },

            warning: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.warning
                 * @type                Color
                 * @default             #ffd500
                 *
                 * Specify the <s-color="warning">warning</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#ffd500',
                '...': '[extends.colorSchemas]',
            },

            error: {
                /**
                 * @name                error
                 * @namespace           config.themeCoffeekrakenDark.color.error
                 * @type                Color
                 * @default             #ff003b
                 *
                 * Specify the <s-color="error">error</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#ff003b',
                '...': '[extends.colorSchemas]',
            },

            info: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.info
                 * @type                Color
                 * @default             #00ffff
                 *
                 * Specify the <s-color="info">info</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '#00ffff',
                '...': '[extends.colorSchemas]',
            },

            extension: {
                /**
                 * @name                color
                 * @namespace           config.themeCoffeekrakenDark.color.extension
                 * @type                Color
                 * @default             [theme.color.accent.color]
                 *
                 * Specify the <primary>extension</s-color> color value.
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
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
