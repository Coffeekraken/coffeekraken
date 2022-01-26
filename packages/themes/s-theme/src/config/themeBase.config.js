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
             * @name                offsize
             * @namespace           config.themeBase.scalable
             * @type                Boolean
             * @default             false
             *
             * Specify if the "offsize" are scalable in your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            offsize: false,
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
                    'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
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
             * @default         5.25rem
             *
             * Specify the "80" space used for margins and paddings
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '5.25rem',
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
        offsize: {
            /**
             * @name            default
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.default]
             *
             * Specify the "default" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[theme.space.default]',
            /**
             * @name            0
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.0]
             *
             * Specify the "0" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '[theme.space.0]',
            /**
             * @name            10
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.10]
             *
             * Specify the "10" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '[theme.space.10]',
            /**
             * @name            20
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.20]
             *
             * Specify the "20" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '[theme.space.20]',
            /**
             * @name            30
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.30]
             *
             * Specify the "30" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '[theme.space.30]',
            /**
             * @name            40
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.40]
             *
             * Specify the "40" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '[theme.space.40]',
            /**
             * @name            50
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.50]
             *
             * Specify the "50" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '[theme.space.50]',
            /**
             * @name            60
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.60]
             *
             * Specify the "60" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '[theme.space.60]',
            /**
             * @name            70
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.70]
             *
             * Specify the "70" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '[theme.space.70]',
            /**
             * @name            80
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.80]
             *
             * Specify the "80" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '[theme.space.80]',
            /**
             * @name            90
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.90]
             *
             * Specify the "90" space used for offsize
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '[theme.space.90]',
            /**
             * @name            100
             * @namespace       config.themeBase.offsize
             * @type            String
             * @default         [theme.space.100]
             *
             * Specify the "100" space used for offsize
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
        /**
         * @name            ui
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeUi" config for UI elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ui: '[config.themeUi]',
        /**
         * @name            typo
         * @namespace       config.themeBase
         * @type            Object
         * @default         {}
         *
         * Reference the "themeTypo" config for typo elements definition
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        typo: '[config.themeTypo]',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVCYXNlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lQmFzZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSwwQ0FBMEM7U0FDdEQ7UUFFRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEtBQUs7WUFDZDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEtBQUs7U0FDZDtRQUVELFVBQVUsRUFBRTtZQUNSOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsZ0RBQWdEO1lBQ3REOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsbURBQW1EO1lBQzVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsZ0RBQWdEO1NBQ3pEO1FBRUQsT0FBTyxFQUFFO1lBQ0wsUUFBUSxFQUFFO2dCQUNOOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxPQUFPLEVBQUUsVUFBVTthQUN0QjtZQUNELFFBQVEsRUFBRTtnQkFDTjs7Ozs7Ozs7Ozs7bUJBV0c7Z0JBQ0gsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELFFBQVEsRUFBRTtnQkFDTjs7Ozs7Ozs7Ozs7bUJBV0c7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7YUFDWjtTQUNKO1FBRUQsTUFBTSxFQUFFO1lBQ0osU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRTtvQkFDTDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxXQUFXLEVBQUUsUUFBUTtpQkFDeEI7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGOzs7Ozs7Ozs7O3VCQVVHO29CQUNILFdBQVcsRUFBRSxNQUFNO2lCQUN0QjthQUNKO1lBQ0QsSUFBSSxFQUFF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VDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLENBQUM7WUFDUDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUc7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLENBQUM7U0FDVjtRQUVELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsQ0FBQztZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRztZQUNUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsQ0FBQztTQUNYO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxHQUFHO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxNQUFNO1NBQ2hCO1FBRUQsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxHQUFHO1lBQ1I7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxNQUFNO1NBQ2hCO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxrQkFBa0I7WUFDM0I7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxHQUFHO1lBQ047Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRTs7Ozs7b0NBS29CO1lBQ3hCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUU7Ozs7O29DQUtvQjtZQUN4Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFOzs7OztvQ0FLb0I7WUFDeEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRTs7Ozs7b0NBS29CO1lBQ3hCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUU7Ozs7O29DQUtvQjtZQUN4Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFOzs7OztvQ0FLb0I7WUFDeEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRTs7Ozs7b0NBS29CO1lBQ3hCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUU7Ozs7O29DQUtvQjtZQUN4Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsRUFBRSxFQUFFOzs7OztvQ0FLb0I7WUFDeEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRTs7Ozs7b0NBS21CO1NBQzNCO1FBRUQsS0FBSyxFQUFFO1lBQ0gsU0FBUyxFQUFFO2dCQUNQOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSw0QkFBNEI7Z0JBQ25DOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2dCQUNoQjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsU0FBUztnQkFDYjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsU0FBUztnQkFDYjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUztnQkFDZDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxHQUFHLEVBQUUsU0FBUzthQUNqQjtTQUNKO1FBRUQsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxNQUFNO1lBRWY7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxTQUFTO1lBRVo7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxRQUFRO1lBRVg7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxTQUFTO1lBRWI7Ozs7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