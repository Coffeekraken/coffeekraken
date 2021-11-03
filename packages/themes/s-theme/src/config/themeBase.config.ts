export default function (env, config) {
    return {
        easing: {
            /**
             * @name                default
             * @namespace           config.themeBase.easing
             * @type                String
             * @default             cubic-bezier(0.700, 0.000, 0.305, 0.995)
             *
             * Specify the "default" easing for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: 'cubic-bezier(0.700, 0.000, 0.305, 0.995)',
        },

        timing: {
            /**
             * @name                slow
             * @namespace           config.themeBase.timing
             * @type                String
             * @default             0.6s
             *
             * Specify the "slow" timing  for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            slow: '.6s',
            /**
             * @name                default
             * @namespace           config.themeBase.timing
             * @type                String
             * @default             0.3s
             *
             * Specify the "default" timing  for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '.3s',
            /**
             * @name                fast
             * @namespace           config.themeBase.timing
             * @type                String
             * @default             0.1s
             *
             * Specify the "fast" timing  for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            fast: '.1s',
        },

        transition: {
            /**
             * @name                slow
             * @namespace           config.themeBase.transition
             * @type                String
             * @default             all [theme.timing.slow] [theme.easing.default]
             *
             * Specify the "slow" transition for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            slow: 'all [theme.timing.slow] [theme.easing.default]',
            /**
             * @name                default
             * @namespace           config.themeBase.transition
             * @type                String
             * @default             all [theme.timing.default] [theme.easing.default]
             *
             * Specify the "default" transition for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: 'all [theme.timing.default] [theme.easing.default]',
            /**
             * @name                fast
             * @namespace           config.themeBase.transition
             * @type                String
             * @default             all [theme.timing.fast] [theme.easing.default]
             *
             * Specify the "fast" transition for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            fast: 'all [theme.timing.fast] [theme.easing.default]',
        },

        helpers: {
            clearfix: {
                /**
                 * @name            default
                 * @namespace       config.themeBase.helpers.clearfix
                 * @type            String
                 * @values          'overflow','facebook','float','micro','after'
                 * @default         overflow
                 *
                 * Specify which clearfix method has to be used as the default one
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: 'overflow',
            },
            disabled: {
                /**
                 * @name            opacity
                 * @namespace       config.themeBase.helpers.disabled
                 * @type            Number
                 * @default         0.3
                 *
                 * Specify the opacity of disabled items applied either using the `@sugar.disabled` mixin, of through
                 * the `s-disabled` helper class
                 *
                 * @cince       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                opacity: 0.3,
            },
            truncate: {
                /**
                 * @name               count
                 * @namespace           config.themeBase.helpers.truncate
                 * @type                Number
                 * @default             10
                 *
                 * Specify how many s-truncate:{lines} classes you want to generate. By default this count is set to 10
                 * so you can truncate a container up to 10 lines of texts.
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                count: 10,
            },
        },

        layout: {
            container: {
                default: {
                    /**
                     * @name                max-width
                     * @namespace           config.themeBase.layout.container.default
                     * @type                String
                     * @default             1280px
                     *
                     * Specify the "default" container max-width for your theme
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'max-width': '1280px',
                },
                full: {
                    /**
                     * @name                max-width
                     * @namespace           config.themeBase.layout.container.full
                     * @type                String
                     * @default             none
                     *
                     * Specify the "full" container max-width for your theme
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'max-width': 'none',
                },
            },
            grid: {
                /**
                 * @name                1
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             1
                 *
                 * Specify the 1 column grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                1: 1,
                /**
                 * @name                2
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             2
                 *
                 * Specify the 2 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                2: 2,
                /**
                 * @name                3
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             3
                 *
                 * Specify the 3 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                3: 3,
                /**
                 * @name                4
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             4
                 *
                 * Specify the 4 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                4: 4,
                /**
                 * @name                5
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             5
                 *
                 * Specify the 5 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                5: 5,
                /**
                 * @name                6
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             6
                 *
                 * Specify the 6 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                6: 6,
                /**
                 * @name                7
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             7
                 *
                 * Specify the 7 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                7: 7,
                /**
                 * @name                8
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             8
                 *
                 * Specify the 8 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                8: 8,
                /**
                 * @name                9
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             9
                 *
                 * Specify the 9 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                9: 9,
                /**
                 * @name                10
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             10
                 *
                 * Specify the 10 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: 10,
                /**
                 * @name                11
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             11
                 *
                 * Specify the 11 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                11: 11,
                /**
                 * @name                12
                 * @namespace           config.themeBase.layout.grid
                 * @type                Number
                 * @default             12
                 *
                 * Specify the 12 columns grid for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                12: 12,
            },
            layout: {
                /**
                 * @name                1
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1
                 *
                 * Specify the 1 layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '1': '1',
                /**
                 * @name                12
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2
                 *
                 * Specify the 2 columns layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '12': '1 2',
                /**
                 * @name                123
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 3
                 *
                 * Specify the 3 columns layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '123': '1 2 3',
                /**
                 * @name                1234
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 3 4
                 *
                 * Specify the 4 columns layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '1234': '1 2 3 4',
                /**
                 * @name                122
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 2
                 *
                 * Specify the 2 columns (1/3 - 2/3) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '122': '1 2 2',
                /**
                 * @name                122
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 1 2
                 *
                 * Specify the 2 columns (2/3 - 1/3) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '112': '1 1 2',
                /**
                 * @name                1222
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 2 2
                 *
                 * Specify the 2 columns (1/4 - 3/4) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '1222': '1 2 2 2',
                /**
                 * @name                1112
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 1 1 2
                 *
                 * Specify the 2 columns (3/4 - 1/4) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '1112': '1 1 1 2',
                /**
                 * @name                12222
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 2 2 2
                 *
                 * Specify the 2 columns (1/5 - 4/5) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '12222': '1 2 2 2 2',
                /**
                 * @name                11112
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 1 1 1 2
                 *
                 * Specify the 2 columns (4/5 - 1/5) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '11112': '1 1 1 1 2',
                /**
                 * @name                122222
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 2 2 2 2
                 *
                 * Specify the 2 columns (1/6 - 5/6) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '122222': '1 2 2 2 2 2',
                /**
                 * @name                111112
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 1 1 1 1 2
                 *
                 * Specify the 2 columns (1/6 - 5/6) layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '111112': '1 1 1 1 1 2',
                /**
                 * @name                12345
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 3 4 5
                 *
                 * Specify the 5 columns layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '12345': '1 2 3 4 5',
                /**
                 * @name                123456
                 * @namespace           config.themeBase.layout.layout
                 * @type                String
                 * @default             1 2 3 4 5 6
                 *
                 * Specify the 6 columns layout for your theme.
                 * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                '123456': '1 2 3 4 5 6',
            },
        },

        ratio: {
            /**
             * @name                1
             * @namespace           config.themeBase.ratio
             * @type                Number
             * @default             1
             *
             * Specify the ratio 1/1 for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '1': 1,
            /**
             * @name                21-9
             * @namespace           config.themeBase.ratio
             * @type                Number
             * @default             21/9
             *
             * Specify the ratio 21/9 for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '21-9': 21 / 9,
            /**
             * @name                16-9
             * @namespace           config.themeBase.ratio
             * @type                Number
             * @default             16/9
             *
             * Specify the ratio 16/9 for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '16-9': 16 / 9,
            /**
             * @name                2-3
             * @namespace           config.themeBase.ratio
             * @type                Number
             * @default             2/3
             *
             * Specify the ratio 2/3 for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '2-3': 2 / 3,
            /**
             * @name                4-3
             * @namespace           config.themeBase.ratio
             * @type                Number
             * @default             4/3
             *
             * Specify the ratio 4/3 for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '4-3': 4 / 3,
            /**
             * @name                3-4
             * @namespace           config.themeBase.ratio
             * @type                Number
             * @default             3/4
             *
             * Specify the ratio 3/4 for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '3-4': 3 / 4,
        },

        scalable: {
            /**
             * @name                margin
             * @namespace           config.themeBase.scalable
             * @type                Boolean
             * @default             false
             *
             * Specify if the "margins" are scalable in your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            margin: false,
            /**
             * @name                padding
             * @namespace           config.themeBase.scalable
             * @type                Boolean
             * @default             true
             *
             * Specify if the "paddings" are scalable in your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            padding: true,
            /**
             * @name                font
             * @namespace           config.themeBase.scalable
             * @type                Boolean
             * @default             true
             *
             * Specify if the "fonts" are scalable in your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            font: true,
        },

        scale: {
            /**
             * @name                01
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.1
             *
             * Specify the 01 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '01': 0.1,
            /**
             * @name                02
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.2
             *
             * Specify the 02 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '02': 0.2,
            /**
             * @name                03
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.3
             *
             * Specify the 03 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '03': 0.3,
            /**
             * @name                04
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.4
             *
             * Specify the 04 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '04': 0.4,
            /**
             * @name                05
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.5
             *
             * Specify the 05 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '05': 0.5,
            /**
             * @name                06
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.6
             *
             * Specify the 06 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '06': 0.6,
            /**
             * @name                07
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.7
             *
             * Specify the 07 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '07': 0.7,
            /**
             * @name                08
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.8
             *
             * Specify the 08 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '08': 0.8,
            /**
             * @name                09
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             0.9
             *
             * Specify the 09 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '09': 0.9,
            /**
             * @name                10
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1
             *
             * Specify the 10 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '10': 1,
            /**
             * @name                11
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.1
             *
             * Specify the 11 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '11': 1.1,
            /**
             * @name                12
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.2
             *
             * Specify the 12 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '12': 1.2,
            /**
             * @name                13
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.3
             *
             * Specify the 13 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '13': 1.3,
            /**
             * @name                14
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.4
             *
             * Specify the 14 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '14': 1.4,
            /**
             * @name                15
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.5
             *
             * Specify the 15 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '15': 1.5,
            /**
             * @name                16
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.6
             *
             * Specify the 16 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '16': 1.6,
            /**
             * @name                17
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.7
             *
             * Specify the 17 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '17': 1.7,
            /**
             * @name                18
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.8
             *
             * Specify the 18 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '18': 1.8,
            /**
             * @name                19
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             1.9
             *
             * Specify the 19 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '19': 1.9,
            /**
             * @name                20
             * @namespace           config.themeBase.scale
             * @type                Number
             * @default             2
             *
             * Specify the 20 scale for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '20': 2,
        },

        opacity: {
            /**
             * @name                0
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0
             *
             * Specify the 0 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '0': 0,
            /**
             * @name                10
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.1
             *
             * Specify the 10 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '10': 0.1,
            /**
             * @name                20
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.2
             *
             * Specify the 20 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '20': 0.2,
            /**
             * @name                30
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.3
             *
             * Specify the 30 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '30': 0.3,
            /**
             * @name                40
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.4
             *
             * Specify the 40 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '40': 0.4,
            /**
             * @name                50
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.5
             *
             * Specify the 50 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '50': 0.5,
            /**
             * @name                60
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.6
             *
             * Specify the 60 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '60': 0.6,
            /**
             * @name                70
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.7
             *
             * Specify the 70 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '70': 0.7,
            /**
             * @name                80
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.8
             *
             * Specify the 80 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '80': 0.8,
            /**
             * @name                90
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             0.9
             *
             * Specify the 90 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '90': 0.9,
            /**
             * @name                100
             * @namespace           config.themeBase.opacity
             * @type                Number
             * @default             1
             *
             * Specify the 100 opacity for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '100': 1,
        },

        width: {
            /**
             * @name                0
             * @namespace           config.themeBase.width
             * @type                String
             * @default             0
             *
             * Specify the 0 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '0': '0',
            /**
             * @name                10
             * @namespace           config.themeBase.width
             * @type                String
             * @default             10%
             *
             * Specify the 10 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '10': '10%',
            /**
             * @name                20
             * @namespace           config.themeBase.width
             * @type                String
             * @default             20%
             *
             * Specify the 20 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '20': '20%',
            /**
             * @name                30
             * @namespace           config.themeBase.width
             * @type                String
             * @default             30%
             *
             * Specify the 30 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '30': '30%',
            /**
             * @name                40
             * @namespace           config.themeBase.width
             * @type                String
             * @default             40%
             *
             * Specify the 40 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '40': '40%',
            /**
             * @name                50
             * @namespace           config.themeBase.width
             * @type                String
             * @default             50%
             *
             * Specify the 50 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '50': '50%',
            /**
             * @name                60
             * @namespace           config.themeBase.width
             * @type                String
             * @default             60%
             *
             * Specify the 60 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '60': '60%',
            /**
             * @name                70
             * @namespace           config.themeBase.width
             * @type                String
             * @default             70%
             *
             * Specify the 70 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '70': '70%',
            /**
             * @name                80
             * @namespace           config.themeBase.width
             * @type                String
             * @default             80%
             *
             * Specify the 80 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '80': '80%',
            /**
             * @name                90
             * @namespace           config.themeBase.width
             * @type                String
             * @default             90%
             *
             * Specify the 90 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '90': '90%',
            /**
             * @name                100
             * @namespace           config.themeBase.width
             * @type                String
             * @default             100%
             *
             * Specify the 100 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '100': '100%',
        },

        height: {
            /**
             * @name                0
             * @namespace           config.themeBase.height
             * @type                String
             * @default             0
             *
             * Specify the 0 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '0': '0',
            /**
             * @name                10
             * @namespace           config.themeBase.height
             * @type                String
             * @default             10%
             *
             * Specify the 10 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '10': '10%',
            /**
             * @name                20
             * @namespace           config.themeBase.height
             * @type                String
             * @default             20%
             *
             * Specify the 20 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '20': '20%',
            /**
             * @name                30
             * @namespace           config.themeBase.height
             * @type                String
             * @default             30%
             *
             * Specify the 30 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '30': '30%',
            /**
             * @name                40
             * @namespace           config.themeBase.height
             * @type                String
             * @default             40%
             *
             * Specify the 40 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '40': '40%',
            /**
             * @name                50
             * @namespace           config.themeBase.height
             * @type                String
             * @default             50%
             *
             * Specify the 50 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '50': '50%',
            /**
             * @name                60
             * @namespace           config.themeBase.height
             * @type                String
             * @default             60%
             *
             * Specify the 60 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '60': '60%',
            /**
             * @name                70
             * @namespace           config.themeBase.height
             * @type                String
             * @default             70%
             *
             * Specify the 70 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '70': '70%',
            /**
             * @name                80
             * @namespace           config.themeBase.height
             * @type                String
             * @default             80%
             *
             * Specify the 80 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '80': '80%',
            /**
             * @name                90
             * @namespace           config.themeBase.height
             * @type                String
             * @default             90%
             *
             * Specify the 90 height for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '90': '90%',
            /**
             * @name                100
             * @namespace           config.themeBase.height
             * @type                String
             * @default             100%
             *
             * Specify the 100 width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            '100': '100%',
        },

        depth: {
            /**
             * @name                default
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             [theme.depth.50]
             *
             * Specify the default depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[theme.depth.50]',
            /**
             * @name                0
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             0
             *
             * Specify the 0 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0',
            /**
             * @name                10
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 10 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: `0px 0.6px 0.4px rgba(0, 0, 0, 0.006),
  0px 1.3px 1px rgba(0, 0, 0, 0.008),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),
  0px 20px 15px rgba(0, 0, 0, 0.02)`,
            /**
             * @name                20
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 20 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: `0px 0.6px 0.4px rgba(0, 0, 0, 0.006),
  0px 1.3px 1px rgba(0, 0, 0, 0.008),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),
  0px 20px 15px rgba(0, 0, 0, 0.02)`,
            /**
             * @name                30
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 30 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: `0px 0.6px 0.4px rgba(0, 0, 0, 0.008),
  0px 1.3px 1px rgba(0, 0, 0, 0.012),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),
  0px 20px 15px rgba(0, 0, 0, 0.03)`,
            /**
             * @name                40
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 40 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: `0px 0.8px 0.6px rgba(0, 0, 0, 0.008),
  0px 2px 1.3px rgba(0, 0, 0, 0.012),
  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),
  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),
  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),
  0px 30px 20px rgba(0, 0, 0, 0.03)`,
            /**
             * @name                50
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 50 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: `0px 1px 0.8px rgba(0, 0, 0, 0.011),
  0px 2.3px 2px rgba(0, 0, 0, 0.016),
  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),
  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),
  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),
  0px 35px 30px rgba(0, 0, 0, 0.04)`,
            /**
             * @name                60
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 60 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: `0px 1px 0.7px rgba(0, 0, 0, 0.011),
  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),
  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),
  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),
  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),
  0px 35px 25px rgba(0, 0, 0, 0.04)`,
            /**
             * @name                70
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 70 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: `0px 1.1px 0.8px rgba(0, 0, 0, 0.011),
  0px 2.7px 2px rgba(0, 0, 0, 0.016),
  0px 5px 3.8px rgba(0, 0, 0, 0.02),
  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),
  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),
  0px 40px 30px rgba(0, 0, 0, 0.04)`,
            /**
             * @name                80
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 80 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: `0px 1.1px 1px rgba(0, 0, 0, 0.011),
  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),
  0px 5px 4.4px rgba(0, 0, 0, 0.02),
  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),
  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),
  0px 40px 35px rgba(0, 0, 0, 0.04)`,
            /**
             * @name                90
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 90 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: `0px 1.4px 1.1px rgba(0, 0, 0, 0.011),
  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),
  0px 6.1px 5px rgba(0, 0, 0, 0.02),
  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),
  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),
  0px 49px 40px rgba(0, 0, 0, 0.04)`,
            /**
             * @name                100
             * @namespace           config.themeBase.depth
             * @type                String
             * @default             ...
             *
             * Specify the 100 depth for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: `0px 1.4px 1.4px rgba(0, 0, 0, 0.011),
  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),
  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),
  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),
  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),
  0px 49px 52px rgba(0, 0, 0, 0.04)`,
        },

        color: {
            extension: {
                /**
                 * @name                color
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             [theme.color.accent.color]
                 *
                 * Specify the color extension value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                color: '[theme.color.accent.color]',
                /**
                 * @name                blade
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #ff2d20
                 *
                 * Specify the blade extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                blade: '#ff2d20',
                /**
                 * @name                php
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #8892BF
                 *
                 * Specify the php extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                php: '#8892BF',
                /**
                 * @name                js
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #f7df1e
                 *
                 * Specify the js extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                js: '#f7df1e',
                /**
                 * @name                ts
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #0374C1
                 *
                 * Specify the ts extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                ts: '#0374C1',
                /**
                 * @name                node
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #68A063
                 *
                 * Specify the node extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                node: '#68A063',
                /**
                 * @name                css
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #498FE1
                 *
                 * Specify the css extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                css: '#498FE1',
                /**
                 * @name                scss
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #CF649A
                 *
                 * Specify the scss extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                scss: '#CF649A',
                /**
                 * @name                sass
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #CF649A
                 *
                 * Specify the sass extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                sass: '#CF649A',
                /**
                 * @name                json
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #000000
                 *
                 * Specify the json extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                json: '#000000',
                /**
                 * @name                jpg
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #B2C0E1
                 *
                 * Specify the jpg extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                jpg: '#B2C0E1',
                /**
                 * @name                jpeg
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #B2C0E1
                 *
                 * Specify the jpeg extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                jpeg: '#B2C0E1',
                /**
                 * @name                pdf
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #E7786E
                 *
                 * Specify the pdf extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                pdf: '#E7786E',
                /**
                 * @name                doc
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #60D7FD
                 *
                 * Specify the doc extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                doc: '#60D7FD',
                /**
                 * @name                psd
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #F9D659
                 *
                 * Specify the psd extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                psd: '#F9D659',
                /**
                 * @name                mp3
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #E98C61
                 *
                 * Specify the mp3 extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                mp3: '#E98C61',
                /**
                 * @name                png
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #C29DFB
                 *
                 * Specify the png extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                png: '#C29DFB',
                /**
                 * @name                aac
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #B1C5C9
                 *
                 * Specify the aac extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                aac: '#B1C5C9',
                /**
                 * @name                zip
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #9CC04E
                 *
                 * Specify the zip extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                zip: '#9CC04E',
                /**
                 * @name                dmg
                 * @namespace           config.themeBase.color.extension
                 * @type                Color
                 * @default             #E36E4B
                 *
                 * Specify the dmg extension color value
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                dmg: '#E36E4B',
            },
        },

        size: {
            /**
             * @name          default
             * @namespace     config.themeBase.size
             * @type          String
             * @default       16px
             *
             * Declare the font size "default"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '16px',

            /**
             * @name          0
             * @namespace     config.themeBase.size
             * @type          String
             * @default       0.25rem
             *
             * Declare the font size "50"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0.25rem',

            /**
             * @name          5
             * @namespace     config.themeBase.size
             * @type          String
             * @default       0.5rem
             *
             * Declare the font size "50"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            5: '0.5rem',

            /**
             * @name          10
             * @namespace     config.themeBase.size
             * @type          String
             * @default       0.65rem
             *
             * Declare the font size "10"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '0.65rem',

            /**
             * @name          20
             * @namespace     config.themeBase.size
             * @type          String
             * @default       0.75rem
             *
             * Declare the font size "20"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '0.75rem',

            /**
             * @name          30
             * @namespace     config.themeBase.size
             * @type          String
             * @default       1rem
             *
             * Declare the font size "30"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '1rem',

            /**
             * @name          40
             * @namespace     config.themeBase.size
             * @type          String
             * @default       1.25rem
             *
             * Declare the font size "40"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '1.25rem',

            /**
             * @name          50
             * @namespace     config.themeBase.size
             * @type          String
             * @default       1.50rem
             *
             * Declare the font size "50"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '1.50em',

            /**
             * @name          60
             * @namespace     config.themeBase.size
             * @type          String
             * @default       2rem
             *
             * Declare the font size "60"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '2rem',

            /**
             * @name          70
             * @namespace     config.themeBase.size
             * @type          String
             * @default       2.5rem
             *
             * Declare the font size "70"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '2.5rem',

            /**
             * @name          80
             * @namespace     config.themeBase.size
             * @type          String
             * @default       3rem
             *
             * Declare the font size "80"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '3rem',

            /**
             * @name          90
             * @namespace     config.themeBase.size
             * @type          String
             * @default       4rem
             *
             * Declare the font size "90"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '4rem',

            /**
             * @name          100
             * @namespace     config.themeBase.size
             * @type          String
             * @default       5rem
             *
             * Declare the font size "100"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '5rem',
        },

        font: {
            family: {
                default: {
                    /**
                     * @name            font-family
                     * @namespace       config.themeBase.font.family.default
                     * @type            String
                     * @default         "Titillium Web"
                     *
                     * Declare the "default" font-family
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-family': '"Titillium Web"',
                    /**
                     * @name            font-weight
                     * @namespace       config.themeBase.font.family.default
                     * @type            Number
                     * @default         400
                     *
                     * Declare the "default" font-weight
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-weight': 400,
                    /**
                     * @name            import
                     * @namespace       config.themeBase.font.family.default
                     * @type            String
                     * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap
                     *
                     * Declare the "default" import
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap',
                },

                title: {
                    /**
                     * @name            font-family
                     * @namespace       config.themeBase.font.family.title
                     * @type            String
                     * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap
                     *
                     * Declare the "default" font-family
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-family': '"Titillium Web"',
                    /**
                     * @name            font-weight
                     * @namespace       config.themeBase.font.family.title
                     * @type            String
                     * @default         600
                     *
                     * Declare the "default" font-weight
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-weight': 600,
                    /**
                     * @name            import
                     * @namespace       config.themeBase.font.family.title
                     * @type            String
                     * @default         https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap
                     *
                     * Declare the "default" import
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap',
                },

                quote: {
                    /**
                     * @name            font-family
                     * @namespace       config.themeBase.font.family.quote
                     * @type            String
                     * @default         "Palatino, Times, Georgia, serif"
                     *
                     * Declare the "quote" font-family
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-family': '"Palatino, Times, Georgia, serif"',
                    /**
                     * @name            font-weight
                     * @namespace       config.themeBase.font.family.quote
                     * @type            String
                     * @default         normal
                     *
                     * Declare the "quote" font-weight
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-weight': 'normal',
                    /**
                     * @name            font-style
                     * @namespace       config.themeBase.font.family.quote
                     * @type            String
                     * @default         normal"
                     *
                     * Declare the "quote" font-style
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-style': 'normal',
                    /**
                     * @name            font-display
                     * @namespace       config.themeBase.font.family.quote
                     * @type            String
                     * @default         auto
                     *
                     * Declare the "quote" font-display
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-display': 'auto',
                    /**
                     * @name            cap-height
                     * @namespace       config.themeBase.font.family.quote
                     * @type            Number
                     * @default         0.65
                     *
                     * Declare the "quote" cap-height
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'cap-height': 0.65,
                },

                code: {
                    /**
                     * @name            font-family
                     * @namespace       config.themeBase.font.family.code
                     * @type            String
                     * @default         "Menlo, Monaco, Consolas, Courier New, monospace"
                     *
                     * Declare the "code" font-family
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-family':
                        'Menlo, Monaco, Consolas, Courier New, monospace',
                    /**
                     * @name            font-weight
                     * @namespace       config.themeBase.font.family.code
                     * @type            String
                     * @default         normal
                     *
                     * Declare the "code" font-weight
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-weight': 'normal',
                    /**
                     * @name            font-style
                     * @namespace       config.themeBase.font.family.code
                     * @type            String
                     * @default         normal
                     *
                     * Declare the "code" font-style
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-style': 'normal',
                    /**
                     * @name            font-display
                     * @namespace       config.themeBase.font.family.code
                     * @type            String
                     * @default         auto
                     *
                     * Declare the "code" font-display
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'font-display': 'auto',
                    /**
                     * @name            cap-height
                     * @namespace       config.themeBase.font.family.code
                     * @type            Number
                     * @default         0.65
                     *
                     * Declare the "code" cap-height
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'cap-height': 0.65,
                },
            },

            size: {
                /**
                 * @name          default
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.default]
                 *
                 * Declare the "default" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '[theme.size.default]',

                /**
                 * @name          0
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.0]
                 *
                 * Declare the "0" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '[theme.size.0]',

                /**
                 * @name          5
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.5]
                 *
                 * Declare the "5" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                5: '[theme.size.5]',

                /**
                 * @name          10
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.10]
                 *
                 * Declare the "10" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '[theme.size.10]',

                /**
                 * @name          20
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.20]
                 *
                 * Declare the "20" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '[theme.size.20]',

                /**
                 * @name          30
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.30]
                 *
                 * Declare the "30" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '[theme.size.30]',

                /**
                 * @name          40
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.40]
                 *
                 * Declare the "40" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '[theme.size.40]',

                /**
                 * @name          50
                 * @namespace     config.themeBase.font.size
                 * @type          String
                 * @default       [theme.size.50]
                 *
                 * Declare the "50" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '[theme.size.50]',

                /**
                 * @name          60
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.60]
                 *
                 * Declare the "60" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '[theme.size.60]',

                /**
                 * @name          70
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.70]
                 *
                 * Declare the "70" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '[theme.size.70]',

                /**
                 * @name          80
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.80]
                 *
                 * Declare the "80" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '[theme.size.80]',

                /**
                 * @name          90
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default      [theme.size.90]
                 *
                 * Declare the "90" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '[theme.size.90]',

                /**
                 * @name          100
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default      [theme.size.100]
                 *
                 * Declare the "100" font size
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '[theme.size.100]',
            },
        },

        border: {
            width: {
                /**
                 * @name              default
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           [theme.border.width.10]
                 *
                 * Specify the "default" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '[theme.border.width.10]',

                /**
                 * @name              0
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           0
                 *
                 * Specify the "0" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '0px',

                /**
                 * @name              10
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           1px
                 *
                 * Specify the "10" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '1px',

                /**
                 * @name              20
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           2px
                 *
                 * Specify the "20" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '2px',

                /**
                 * @name              30
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           4px
                 *
                 * Specify the "30" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '4px',

                /**
                 * @name              40
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           6px
                 *
                 * Specify the "40" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '6px',

                /**
                 * @name              50
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           8px
                 *
                 * Specify the "50" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '8px',

                /**
                 * @name              60
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           12px
                 *
                 * Specify the "60" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '12px',

                /**
                 * @name              70
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           16px
                 *
                 * Specify the "70" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '16px',

                /**
                 * @name              80
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           20px
                 *
                 * Specify the "80" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '20px',

                /**
                 * @name              90
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           24px
                 *
                 * Specify the "90" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '24px',

                /**
                 * @name              100
                 * @namespace         config.themeBase.border.width
                 * @type              Number
                 * @default           30px
                 *
                 * Specify the "90" border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '30px',
            },

            radius: {
                /**
                 * @name              default
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           10px
                 *
                 * Specify the "0" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '10px',

                /**
                 * @name              0
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           0
                 *
                 * Specify the "0" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '0',

                /**
                 * @name              10
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           4px
                 *
                 * Specify the "10" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '4px',

                /**
                 * @name              20
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           8px
                 *
                 * Specify the "20" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '8px',

                /**
                 * @name              30
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           12px
                 *
                 * Specify the "30" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '12px',

                /**
                 * @name              40
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           16px
                 *
                 * Specify the "40" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '16px',

                /**
                 * @name              50
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           20px
                 *
                 * Specify the "50" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '20px',

                /**
                 * @name              60
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           26px
                 *
                 * Specify the "60" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '26px',

                /**
                 * @name              70
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           32px
                 *
                 * Specify the "70" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '32px',

                /**
                 * @name              80
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           40px
                 *
                 * Specify the "80" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '40px',

                /**
                 * @name              90
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           50px
                 *
                 * Specify the "90" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '50px',

                /**
                 * @name              100
                 * @namespace         config.themeBase.border.radius
                 * @type              Number
                 * @default           60px
                 *
                 * Specify the "90" border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '60px',
            },
        },

        space: {
            /**
             * @name            default
             * @namespace       config.themeBase.space
             * @type            String
             * @default         3rem
             *
             * Specify the "default" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '3rem',

            /**
             * @name            0
             * @namespace       config.themeBase.space
             * @type            String
             * @default         0
             *
             * Specify the "0" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0',

            /**
             * @name            10
             * @namespace       config.themeBase.space
             * @type            String
             * @default         0.375rem
             *
             * Specify the "10" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '0.375rem',

            /**
             * @name            20
             * @namespace       config.themeBase.space
             * @type            String
             * @default         0.75rem
             *
             * Specify the "20" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '0.75rem',

            /**
             * @name            30
             * @namespace       config.themeBase.space
             * @type            String
             * @default         1.5rem
             *
             * Specify the "30" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '1.5rem',

            /**
             * @name            40
             * @namespace       config.themeBase.space
             * @type            String
             * @default         2.25rem
             *
             * Specify the "40" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '2.25rem',

            /**
             * @name            50
             * @namespace       config.themeBase.space
             * @type            String
             * @default         3rem
             *
             * Specify the "50" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '3rem',

            /**
             * @name            60
             * @namespace       config.themeBase.space
             * @type            String
             * @default         3.75rem
             *
             * Specify the "60" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '3.75rem',

            /**
             * @name            70
             * @namespace       config.themeBase.space
             * @type            String
             * @default         4.5rem
             *
             * Specify the "70" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '4.5rem',

            /**
             * @name            80
             * @namespace       config.themeBase.space
             * @type            String
             * @default         5.25
             *
             * Specify the "80" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '5.25',

            /**
             * @name            90
             * @namespace       config.themeBase.space
             * @type            String
             * @default         6rem
             *
             * Specify the "90" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '6rem',

            /**
             * @name            100
             * @namespace       config.themeBase.space
             * @type            String
             * @default         6.75rem
             *
             * Specify the "100" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '6.75rem',
        },

        margin: {
            /**
             * @name            default
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.default]
             *
             * Specify the "default" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[theme.space.default]',

            /**
             * @name            0
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.0]
             *
             * Specify the "0" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '[theme.space.0]',

            /**
             * @name            10
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.10]
             *
             * Specify the "10" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '[theme.space.10]',

            /**
             * @name            20
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.20]
             *
             * Specify the "20" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '[theme.space.20]',

            /**
             * @name            30
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.30]
             *
             * Specify the "30" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '[theme.space.30]',

            /**
             * @name            40
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.40]
             *
             * Specify the "40" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '[theme.space.40]',

            /**
             * @name            50
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.50]
             *
             * Specify the "50" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '[theme.space.50]',

            /**
             * @name            60
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.60]
             *
             * Specify the "60" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '[theme.space.60]',

            /**
             * @name            70
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.70]
             *
             * Specify the "70" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '[theme.space.70]',

            /**
             * @name            80
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.80]
             *
             * Specify the "80" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '[theme.space.80]',

            /**
             * @name            90
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.90]
             *
             * Specify the "90" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '[theme.space.90]',

            /**
             * @name            100
             * @namespace       config.themeBase.margin
             * @type            String
             * @default         [theme.space.100]
             *
             * Specify the "100" space used for margins
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '[theme.space.100]',
        },

        padding: {
            /**
             * @name            default
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.default]
             *
             * Specify the "default" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[theme.space.default]',

            /**
             * @name            0
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.0]
             *
             * Specify the "0" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '[theme.space.0]',

            /**
             * @name            10
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.10]
             *
             * Specify the "10" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '[theme.space.10]',

            /**
             * @name            20
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.20]
             *
             * Specify the "20" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '[theme.space.20]',

            /**
             * @name            30
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.30]
             *
             * Specify the "30" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '[theme.space.30]',

            /**
             * @name            40
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.40]
             *
             * Specify the "40" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '[theme.space.40]',

            /**
             * @name            50
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.50]
             *
             * Specify the "50" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '[theme.space.50]',

            /**
             * @name            60
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.60]
             *
             * Specify the "60" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '[theme.space.60]',

            /**
             * @name            70
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.70]
             *
             * Specify the "70" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '[theme.space.70]',

            /**
             * @name            80
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.80]
             *
             * Specify the "80" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '[theme.space.80]',

            /**
             * @name            90
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.90]
             *
             * Specify the "90" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '[theme.space.90]',

            /**
             * @name            100
             * @namespace       config.themeBase.padding
             * @type            String
             * @default         [theme.space.90]
             *
             * Specify the "100" space used for paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '[theme.space.100]',
        },

        media: {
            /**
             * @name              defaultAction
             * @namespace         config.themeBase.media
             * @type              String
             * @values            >,<,=,>=,<=
             * @default           >=
             *
             * Specify the default action to apply if you don't specify one in your media
             * mixin call like ```@include Sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
             * the above media will be the same as ```@include Sugar.media('>=tablet') {...}```
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            defaultAction: '>=',

            /**
             * @name              defaultQuery
             * @namespace         config.themeBase.media
             * @type              String
             * @default           screen
             *
             * Specify the default query to base all the generated ones upon
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            defaultQuery: 'screen',

            queries: {
                /**
                 * @name          mobile
                 * @namespace     config.themeBase.media.queries
                 * @type          Object
                 * @default       {'min-width': 0, 'max-width': 639}
                 *
                 * Specify the media query arguments needed to target mobile
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                mobile: {
                    'min-width': 0,
                    'max-width': 639,
                },

                /**
                 * @name          tablet
                 * @namespace     config.themeBase.media.queries
                 * @type          Object
                 * @default       {'min-width': 640, 'max-width': 1279}
                 *
                 * Specify the media query arguments needed to target tablet
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                tablet: {
                    'min-width': 640,
                    'max-width': 1279,
                },

                /**
                 * @name          desktop
                 * @namespace     config.themeBase.media.queries
                 * @type          Object
                 * @default       {'min-width': 1280, 'max-width': null}
                 *
                 * Specify the media query arguments needed to target desktop
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                desktop: {
                    'min-width': 1280,
                    'max-width': null,
                },
            },
        },

        components: {
            's-code-example': {
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.components.s-code-example
                 * @type          Object
                 * @default       [theme.ui.default.rhythmVertical]
                 *
                 * Specify the vertical rhythm props for the "s-code-example" component
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
        },

        ui: {
            default: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      1.5em
                 *
                 * Specify the default padding inline for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '1.5em',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      0.75em
                 *
                 * Specify the default padding block for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '0.75em',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      [theme.border.radius.default]
                 *
                 * Specify the default border radius for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.border.radius.default]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      [theme.border.width.default]
                 *
                 * Specify the default border width for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.border.width.default]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      [theme.transition.fast]
                 *
                 * Specify the default transition for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.transition.fast]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      main
                 *
                 * Specify the default color for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: 'main',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      solid
                 *
                 * Specify the default style for ui's.
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: 'solid',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.default
                 * @type          String
                 * @default      [theme.depth.default]
                 *
                 * Specify the default depth for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.depth.default]',

                rhythmVertical: {
                    /**
                     * @name          margin-bottom
                     * @namespace     config.themeBase.ui.default.rhythmVertical
                     * @type          Number
                     * @default      60
                     *
                     * Specify the default margin bottom when in vertical rhythm scope for ui's
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'margin-bottom': 60,
                },
            },
            form: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      0.75em
                 *
                 * Specify the default padding inline for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '0.75em',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      0.375em
                 *
                 * Specify the default padding block for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '0.375em',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      [theme.border.radius.default]
                 *
                 * Specify the default border radius for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.border.radius.default]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      [theme.border.width.default]
                 *
                 * Specify the default border width for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.border.width.default]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      [theme.transition.fast]
                 *
                 * Specify the default transition for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.transition.fast]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the outline is enabled for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      accent
                 *
                 * Specify the default color for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: 'accent',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      solid
                 *
                 * Specify the default style for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: 'solid',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.form
                 * @type          String
                 * @default      [theme.depth.default]
                 *
                 * Specify the default depth for form items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.depth.default]',
                rhythmVertical: {
                    /**
                     * @name          margin-bottom
                     * @namespace     config.themeBase.ui.form.rhythmVertical
                     * @type          Number
                     * @default      40
                     *
                     * Specify the default margin bottom for form items when in vertical rhythm scope
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    'margin-bottom': 40,
                },
            },
            outline: {
                /**
                 * @name          active
                 * @namespace     config.themeBase.ui.outline
                 * @type          Boolean
                 * @default      true
                 *
                 * Specify if the outline is activated by default for ui elements
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                active: true,
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.outline
                 * @type          String
                 * @default      10px
                 *
                 * Specify the border width for outline ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '10px',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.outline
                 * @type          String
                 * @default      [theme.border.radius.default]
                 *
                 * Specify the border radius for outline ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.border.radius.default]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.outline
                 * @type          String
                 * @default      all .2s ease-out
                 *
                 * Specify the transition for outline ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: 'all .2s ease-out',
            },
            scrollbar: {
                /**
                 * @name          size
                 * @namespace     config.themeBase.ui.scrollbar
                 * @type          String
                 * @default      2px
                 *
                 * Specify the size (width/height) for scrollbar
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                size: '2px',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.scrollbar
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for scrollbar
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
            },
            button: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.button
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.button
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.button
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.button
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.button
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.button
                 * @type          Boolean
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if you want the outline on your button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.button
                 * @type          Number
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for your button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.button
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.button
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.button
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            avatar: {
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.avatar
                 * @type          String
                 * @default      2px
                 *
                 * Specify the default border width for avatar ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '2px',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.avatar
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for avatar ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.avatar
                 * @type          Number
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for your avatar ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.avatar
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for avatar ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.avatar
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your avatar ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.avatar
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your avatar ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            colorPicker: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.form.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for colorPicker items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.colorPicker
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your colorPicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            datePicker: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: ['theme.ui.form.defaultColor'],
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.form.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for datePicker items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.datePicker
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your datePicker ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            input: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.paddingInline]
                 *
                 * Specify the default padding inline for input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.defaultColor]
                 *
                 * Specify the default color for input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.input
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: 'solid',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.input
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for input items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.input
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.input
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            radio: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      [theme.ui.form.paddingInline]
                 *
                 * Specify the default padding inline for radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      0.5em
                 *
                 * Specify the default border radius for radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '0.5em',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for radio items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.radio
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.radio
                 * @type          String
                 * @default      [theme.ui.form.defaultColor]
                 *
                 * Specify the default color for radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.radio
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.radio
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your radio ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            checkbox: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      [theme.ui.form.paddingInline]
                 *
                 * Specify the default padding inline for checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      0.2em
                 *
                 * Specify the default border radius for checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '0.2em',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for checkbox items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.checkbox
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your checkbox ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            range: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.paddingInline]
                 *
                 * Specify the default padding inline for range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.defaultColor]
                 *
                 * Specify the default color for range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.range
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.range
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for range items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.range
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.range
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your range ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            label: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.form.paddingInline]
                 *
                 * Specify the default padding inline for label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.label
                 * @type          Number
                 * @default      inline
                 *
                 * Specify the default style for your label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: 'inline',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.label
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for label items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.label
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your label ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            select: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.paddingInline]
                 *
                 * Specify the default padding inline for select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.form.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.paddingBlock]
                 *
                 * Specify the default padding block for select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.form.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.form.transition]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for select items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.select
                 * @type          String
                 * @default      [theme.ui.form.defaultColor]
                 *
                 * Specify the default color for select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.select
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.form.defaultStyle]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.select
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.select
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your select ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            switch: {
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.switch
                 * @type          String
                 * @default      [theme.ui.form.borderRadius]
                 *
                 * Specify the default border radius for switch ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.form.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.switch
                 * @type          String
                 * @default      [theme.ui.form.borderWidth]
                 *
                 * Specify the default border width for switch ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.form.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.switch
                 * @type          String
                 * @default      [theme.ui.form.transition]
                 *
                 * Specify the default transition for switch ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.switch
                 * @type          String
                 * @default      [theme.ui.form.depth]
                 *
                 * Specify the default depth for switch items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.form.depth]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.switch
                 * @type          String
                 * @default      [theme.ui.form.defaultColor]
                 *
                 * Specify the default color for switch ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.form.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.switch
                 * @type          Number
                 * @default      [theme.ui.form.defaultStyle]
                 *
                 * Specify the default style for your switch ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.form.defaultStyle]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.switch
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.switch
                 * @type          Object
                 * @default      [theme.ui.form.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your switch ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.form.rhythmVertical]',
            },
            dropdown: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your dropdown ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for dropdown items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.dropdown
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
            },
            list: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.list
                 * @type          Number
                 * @default      ul
                 *
                 * Specify the default style for your list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: 'ul',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for list items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          bulletChar
                 * @namespace     config.themeBase.ui.list
                 * @type          String
                 * @default      ●
                 *
                 * Specify if the bullet character to use
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                bulletChar: '●',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.list
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your list ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            fsTree: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for fsTree items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          bulletChar
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          String
                 * @default      ●
                 *
                 * Specify if the bullet character to use
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                bulletChar: '●',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.fsTree
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your fsTree ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            tabs: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.tabs
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your tabs ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.tabs
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for tabs items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: 0,
                /**
                 * @name          outline
                 * @namespace     config.themeBase.ui.tabs
                 * @type          Object
                 * @default      [theme.ui.outline.active]
                 *
                 * Specify if the focus outline is activated for this ui element
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                outline: '[theme.ui.outline.active]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.tabe
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your tabe ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            terminal: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.terminal
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.terminal
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for terminal items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.terminal
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your terminal ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            tooltip: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your tooltip ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for tooltip items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          arrowSize
                 * @namespace     config.themeBase.ui.tooltip
                 * @type          Object
                 * @default      20px
                 *
                 * Specify if the arrow size of the tooltips
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                arrowSize: '20px',
            },
            code: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.padding.50]
                 *
                 * Specify the default padding inline for code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.padding.50]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.padding.50]
                 *
                 * Specify the default padding block for code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.padding.50]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.code
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.code
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for code items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.code
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your code ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            blockquote: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for blockquote items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: '[theme.ui.default.depth]',
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.blockquote
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your blockquote ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            table: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.ui.default.paddingInline]
                 *
                 * Specify the default padding inline for table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '[theme.ui.default.paddingInline]',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.ui.default.paddingBlock]
                 *
                 * Specify the default padding block for table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '[theme.ui.default.paddingBlock]',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.border.width.10]
                 *
                 * Specify the default border width for table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.border.width.10]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.table
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.table
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for table items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: 0,
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.table
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your table ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            badge: {
                /**
                 * @name          paddingInline
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default         0.65em
                 *
                 * Specify the default padding inline for badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingInline: '.65em',
                /**
                 * @name          paddingBlock
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default      0.35em
                 *
                 * Specify the default padding block for badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                paddingBlock: '.35em',
                /**
                 * @name          borderRadius
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default      [theme.ui.default.borderRadius]
                 *
                 * Specify the default border radius for badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderRadius: '[theme.ui.default.borderRadius]',
                /**
                 * @name          borderWidth
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default      [theme.ui.default.borderWidth]
                 *
                 * Specify the default border width for badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                borderWidth: '[theme.ui.default.borderWidth]',
                /**
                 * @name          transition
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default      [theme.ui.default.transition]
                 *
                 * Specify the default transition for badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                transition: '[theme.ui.default.transition]',
                /**
                 * @name          defaultColor
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default      [theme.ui.default.defaultColor]
                 *
                 * Specify the default color for badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultColor: '[theme.ui.default.defaultColor]',
                /**
                 * @name          defaultStyle
                 * @namespace     config.themeBase.ui.badge
                 * @type          Number
                 * @default      [theme.ui.default.defaultStyle]
                 *
                 * Specify the default style for your badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                defaultStyle: '[theme.ui.default.defaultStyle]',
                /**
                 * @name          depth
                 * @namespace     config.themeBase.ui.badge
                 * @type          String
                 * @default      [theme.ui.default.depth]
                 *
                 * Specify the default depth for badge items
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                depth: 0,
                /**
                 * @name          rhythmVertical
                 * @namespace     config.themeBase.ui.badge
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your badge ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            loader: {
                /**
                 * @name          duration
                 * @namespace     config.themeBase.ui.loader
                 * @type          String
                 * @default      1s
                 *
                 * Specify the duration of a loader
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                duration: '1s',
                /**
                 * @name          easing
                 * @namespace     config.themeBase.ui.loader
                 * @type          String
                 * @default      linear
                 *
                 * Specify the easing of a loader
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                easing: 'linear',
            },
            loaderSpinner: {
                /**
                 * @name          duration
                 * @namespace     config.themeBase.ui.loaderSpinner
                 * @type          String
                 * @default      [theme.ui.loader.duration]
                 *
                 * Specify the duration of the spinner loader
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                duration: '[theme.ui.loader.duration]',
                /**
                 * @name          duration
                 * @namespace     config.themeBase.ui.loaderSpinner
                 * @type          String
                 * @default      [theme.ui.loader.easing]
                 *
                 * Specify the easing of the spinner loader
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                easing: '[theme.ui.loader.easing]',
            },
        },

        typo: {
            /**
             * @name          h1
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the h1 typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            h1: {
                'font-family': 'title',
                'font-size': 90,
                'line-height': 1.3,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          h2
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the h2 typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            h2: {
                'font-family': 'title',
                'font-size': 80,
                'line-height': 1.3,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          h3
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the h3 typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            h3: {
                'font-family': 'title',
                'font-size': 70,
                'line-height': 1.3,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          h4
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the h4 typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            h4: {
                'font-family': 'title',
                'font-size': 60,
                'line-height': 1.3,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          h5
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the h5 typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            h5: {
                'font-family': 'title',
                'font-size': 50,
                'line-height': 1.3,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 40,
                },
            },
            /**
             * @name          h6
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the h6 typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            h6: {
                'font-family': 'title',
                'font-size': 40,
                'line-height': 1.3,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 40,
                },
            },
            /**
             * @name          p
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the p typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            p: {
                'font-family': 'default',
                'font-size': 30,
                'line-height': 1.8,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          lead
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the lead typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            lead: {
                'font-family': 'default',
                'font-size': 50,
                'line-height': 1.6,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          hr
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the hr typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            hr: {
                color: '[theme.color.main.color]',
                opacity: 0.2,
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          pre
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the pre typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            pre: {
                'font-family': 'code',
                color: ['main', 'text'],
                'background-color': ['main', 'surface'],
                'line-height': 1.5,
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                depth: '[theme.ui.default.depth]',
                rhythmVertical: {
                    'margin-bottom': 50,
                },
            },
            /**
             * @name          code
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the code typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            'code:not(pre > code)': {
                display: 'inline-block',
                'font-family': 'code',
                color: ['main', 'text'],
                'background-color': ['accent', 'surface'],
                borderRadius: 10,
                paddingInline: 10,
                paddingBlock: 0,
            },
            /**
             * @name          a
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the a typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            a: {
                color: 'accent',
            },
            /**
             * @name          quote
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the quote typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            quote: {
                'font-family': 'quote',
            },
            /**
             * @name          b
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the b typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            b: {
                'font-weight': 'bold',
            },
            /**
             * @name          bold
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the bold typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            bold: {
                'font-weight': 'bold',
            },
            /**
             * @name          strong
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the strong typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            strong: {
                'font-weight': 'bold',
            },
            /**
             * @name          i
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the i typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            i: {
                'font-style': 'italic',
            },
            /**
             * @name          italic
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the italic typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            italic: {
                'font-style': 'italic',
            },
            /**
             * @name          em
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the em typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            em: {
                'font-style': 'italic',
            },
            /**
             * @name          small
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the small typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            small: {
                'font-size': '0.5em',
            },
            /**
             * @name          mark
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the mark typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            mark: {
                'background-color': '[theme.color.accent.color]',
                color: '[theme.color.accent.foreground]',
            },
            /**
             * @name          del
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the del typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            del: {
                'text-decoration': 'line-through',
            },
            /**
             * @name          ins
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the ins typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            ins: {
                'text-decoration': 'underline',
            },
            /**
             * @name          sub
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the sub typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            sub: {
                'vertical-align': 'sub',
                'font-size': '0.6em',
            },
            /**
             * @name          sup
             * @namespace     config.themeBase.typo
             * @type          Object
             * @default      {}
             *
             * Specify the css object for the sup typo element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            sup: {
                'vertical-align': 'sup',
                'font-size': '0.6em',
            },
        },
    };
}
