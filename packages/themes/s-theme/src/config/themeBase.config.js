(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                fast: 'all [theme.timing.fast] [theme.easing.default]',
            },
            helpers: {
                /**
                 * @name            states
                 * @namespace       config.themeBase.helpers
                 * @type            String[]
                 * @default         ['mounted','active','loading']
                 *
                 * Specify some states for which you want to generate helper classes like `s-when:mounted`, `s-until:loading`, etc...
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                states: ['mounted', 'active', 'loading'],
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    default: 'overflow',
                },
                disabled: {
                    /**
                     * @name            opacity
                     * @namespace       config.themeBase.helpers.disabled
                     * @type            Number
                     * @default         0.4
                     *
                     * Specify the opacity of disabled items applied either using the `@sugar.disabled` mixin, of through
                     * the `s-disabled` helper class
                     *
                     * @cince       2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    opacity: 0.4,
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    count: 10,
                },
                order: {
                    /**
                     * @name               count
                     * @namespace           config.themeBase.helpers.order
                     * @type                Number
                     * @default             20
                     *
                     * Specify how many s-order:{i} classes you want to generate. By default this count is set to 20.
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    count: 20,
                }
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
                         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        'max-width': '1280px',
                    },
                    wide: {
                        /**
                         * @name                max-width
                         * @namespace           config.themeBase.layout.container.wide
                         * @type                String
                         * @default             1640px
                         *
                         * Specify the "wide" container max-width for your theme
                         *
                         * @since               2.0.0
                         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        'max-width': '1640px',
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
                         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '12': '1 2',
                    /**
                     * @name                1_2
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 _ 2
                     *
                     * Specify the 2 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1_2': '1 _ 2',
                    /**
                     * @name                21
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             2 1
                     *
                     * Specify the 2 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '21': '2 1',
                    /**
                     * @name                2_1
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             2 _ 1
                     *
                     * Specify the 2 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '2_1': '2 _ 1',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '123': '1 2 3',
                    /**
                     * @name                12_3
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 _ 3
                     *
                     * Specify the 3 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '12_3': '1 2 _ 3',
                    /**
                     * @name                1_23
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 _ 2 3
                     *
                     * Specify the 3 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1_23': '1 _ 2 3',
                    /**
                     * @name                1_2_3
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 _ 2 _ 3
                     *
                     * Specify the 3 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1_2_3': '1 _ 2 _ 3',
                    /**
                     * @name                321
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             3 2 1
                     *
                     * Specify the 3 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '321': '3 2 1',
                    /**
                     * @name                32_1
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             2 3 _ 1
                     *
                     * Specify the 3 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '32_1': '3 2 _ 1',
                    /**
                     * @name                3_21
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             3 _ 2 1
                     *
                     * Specify the 3 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '3_21': '3 _ 2 1',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1234': '1 2 3 4',
                    /**
                     * @name                12_34
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 _ 3 4
                     *
                     * Specify the 4 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '12_34': '1 2 _ 3 4',
                    /**
                     * @name                123_4
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 3 _ 4
                     *
                     * Specify the 4 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '123_4': '1 2 3 _ 4',
                    /**
                     * @name                1_234
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 _ 2 3 4
                     *
                     * Specify the 4 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1_234': '1 _ 2 3 4',
                    /**
                     * @name                1_2_3_4
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 _ 2 _ 3 _ 4
                     *
                     * Specify the 4 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1_2_3_4': '1 _ 2 _ 3 _ 4',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '122': '1 2 2',
                    /**
                     * @name                221
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 2
                     *
                     * Specify the 2 columns (1/3 - 2/3) layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '221': '2 2 1',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '112': '1 1 2',
                    /**
                     * @name                211
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 1 2
                     *
                     * Specify the 2 columns (2/3 - 1/3) layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '211': '2 1 1',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1222': '1 2 2 2',
                    /**
                     * @name                2221
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 2 2
                     *
                     * Specify the 2 columns (1/4 - 3/4) layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '2221': '2 2 2 1',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '11112': '1 1 1 1 2',
                    /**
                     * @name                22221
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             2 2 2 2 1
                     *
                     * Specify the 2 columns (4/5 - 1/5) layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '22221': '2 2 2 2 1',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '12345': '1 2 3 4 5',
                    /**
                     * @name                123_45
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 3 _ 4 5
                     *
                     * Specify the 5 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '123_45': '1 2 3 _ 4 5',
                    /**
                     * @name                12_345
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 _ 3 4 5
                     *
                     * Specify the 5 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '12_345': '1 2 _ 3 4 5',
                    /**
                    * @name                1_2345
                    * @namespace           config.themeBase.layout.layout
                    * @type                String
                    * @default             1 _ 2 3 4 5
                    *
                    * Specify the 5 columns layout for your theme.
                    * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                    *
                    * @since               2.0.0
                    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    */
                    '1_2345': '1 _ 2 3 4 5',
                    /**
                    * @name                1234_5
                    * @namespace           config.themeBase.layout.layout
                    * @type                String
                    * @default             1 2 3 4 _ 5
                    *
                    * Specify the 5 columns layout for your theme.
                    * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                    *
                    * @since               2.0.0
                    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                    */
                    '1234_5': '1 2 3 4 _ 5',
                    /**
                     * @name                1_2_3_4_5
                     * @namespace           config.themeBase.layout.layout
                     * @type                String
                     * @default             1 2 3 4 _ 5
                     *
                     * Specify the 5 columns layout for your theme.
                     * For more information on how layouts works, check out the `@coffeekraken/s-postcss-sugar-plugin` "layout" mixin documentation.
                     *
                     * @since               2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    '1_2_3_4_5': '1 _ 2 _ 3 _ 4 _ 5',
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
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                '100': '100%',
            },
            depth: {
                /**
                 * @name                default
                 * @namespace           config.themeBase.depth
                 * @type                String
                 * @default             [theme.depth.0]
                 *
                 * Specify the default depth for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                default: '[theme.depth.0]',
                /**
                 * @name                0
                 * @namespace           config.themeBase.depth
                 * @type                String
                 * @default             0
                 *
                 * Specify the 0 depth for your theme
                 *
                 * @since               2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                100: `0px 1.4px 1.4px rgba(0, 0, 0, 0.011),
  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),
  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),
  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),
  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),
  0px 49px 52px rgba(0, 0, 0, 0.04)`,
            },
            color: {
            // extension: {
            //     /**
            //      * @name                color
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             [theme.color.accent.color]
            //      *
            //      * Specify the color extension value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     color: '[theme.color.accent.color]',
            //     /**
            //      * @name                blade
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #ff2d20
            //      *
            //      * Specify the blade extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     blade: '#ff2d20',
            //     /**
            //      * @name                php
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #8892BF
            //      *
            //      * Specify the php extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     php: '#8892BF',
            //     /**
            //      * @name                js
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #f7df1e
            //      *
            //      * Specify the js extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     js: '#f7df1e',
            //     /**
            //      * @name                ts
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #0374C1
            //      *
            //      * Specify the ts extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     ts: '#0374C1',
            //     /**
            //      * @name                node
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #68A063
            //      *
            //      * Specify the node extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     node: '#68A063',
            //     /**
            //      * @name                css
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #498FE1
            //      *
            //      * Specify the css extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     css: '#498FE1',
            //     /**
            //      * @name                scss
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #CF649A
            //      *
            //      * Specify the scss extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     scss: '#CF649A',
            //     /**
            //      * @name                sass
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #CF649A
            //      *
            //      * Specify the sass extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     sass: '#CF649A',
            //     /**
            //      * @name                json
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #000000
            //      *
            //      * Specify the json extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     json: '#000000',
            //     /**
            //      * @name                jpg
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #B2C0E1
            //      *
            //      * Specify the jpg extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     jpg: '#B2C0E1',
            //     /**
            //      * @name                jpeg
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #B2C0E1
            //      *
            //      * Specify the jpeg extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     jpeg: '#B2C0E1',
            //     /**
            //      * @name                pdf
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #E7786E
            //      *
            //      * Specify the pdf extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     pdf: '#E7786E',
            //     /**
            //      * @name                doc
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #60D7FD
            //      *
            //      * Specify the doc extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     doc: '#60D7FD',
            //     /**
            //      * @name                psd
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #F9D659
            //      *
            //      * Specify the psd extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     psd: '#F9D659',
            //     /**
            //      * @name                mp3
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #E98C61
            //      *
            //      * Specify the mp3 extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     mp3: '#E98C61',
            //     /**
            //      * @name                png
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #C29DFB
            //      *
            //      * Specify the png extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     png: '#C29DFB',
            //     /**
            //      * @name                aac
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #B1C5C9
            //      *
            //      * Specify the aac extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     aac: '#B1C5C9',
            //     /**
            //      * @name                zip
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #9CC04E
            //      *
            //      * Specify the zip extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     zip: '#9CC04E',
            //     /**
            //      * @name                dmg
            //      * @namespace           config.themeBase.color.extension
            //      * @type                Color
            //      * @default             #E36E4B
            //      *
            //      * Specify the dmg extension color value
            //      *
            //      * @since               2.0.0
            //      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     dmg: '#E36E4B',
            // },
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                10: '0.65rem',
                /**
                 * @name          15
                 * @namespace     config.themeBase.size
                 * @type          String
                 * @default       0.7rem
                 *
                 * Declare the font size "10"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                15: '0.7rem',
                /**
                 * @name          20
                 * @namespace     config.themeBase.size
                 * @type          String
                 * @default       0.75rem
                 *
                 * Declare the font size "20"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                20: '0.75rem',
                /**
                 * @name          25
                 * @namespace     config.themeBase.size
                 * @type          String
                 * @default       0.9rem
                 *
                 * Declare the font size "20"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                25: '0.9rem',
                /**
                 * @name          30
                 * @namespace     config.themeBase.size
                 * @type          String
                 * @default       1.1rem
                 *
                 * Declare the font size "30"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                30: '1.1rem',
                /**
                 * @name          40
                 * @namespace     config.themeBase.size
                 * @type          String
                 * @default       1.25rem
                 *
                 * Declare the font size "40"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    100: '30px',
                },
                radius: {
                    /**
                     * @name              default
                     * @namespace         config.themeBase.border.radius
                     * @type              Number
                     * @default           5px
                     *
                     * Specify the "default" border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    default: '5px',
                    /**
                     * @name              0
                     * @namespace         config.themeBase.border.radius
                     * @type              Number
                     * @default           0
                     *
                     * Specify the "0" border radius
                     *
                     * @since             2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    tablet: {
                        'min-width': 640,
                        'max-width': 1279,
                    },
                    /**
                     * @name          desktop
                     * @namespace     config.themeBase.media.queries
                     * @type          Object
                     * @default       {'min-width': 1280, 'max-width': 2047}
                     *
                     * Specify the media query arguments needed to target desktop
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    desktop: {
                        'min-width': 1280,
                        'max-width': 2047,
                    },
                    /**
                     * @name          wide
                     * @namespace     config.themeBase.media.queries
                     * @type          Object
                     * @default       {'min-width': 2048, 'max-width': null}
                     *
                     * Specify the media query arguments needed to target wide
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    wide: {
                        'min-width': 2048,
                        'max-width': null,
                    },
                    /**
                     * @name          dwarf
                     * @namespace     config.themeBase.media.queries
                     * @type          Object
                     * @default       {'min-width': 2048, 'max-width': null}
                     *
                     * Specify the media query arguments needed to target dwarf.
                     * Dwarf here means small height screen.
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    dwarf: {
                        'min-height': null,
                        'max-height': 700,
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            typo: '[config.themeTypo]',
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVCYXNlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lQmFzZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxPQUFPLEVBQUUsMENBQTBDO2FBQ3REO1lBRUQsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxLQUFLO2dCQUNYOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxLQUFLO2FBQ2Q7WUFFRCxVQUFVLEVBQUU7Z0JBQ1I7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLGdEQUFnRDtnQkFDdEQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLG1EQUFtRDtnQkFDNUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLGdEQUFnRDthQUN6RDtZQUVELE9BQU8sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQztnQkFDdEMsUUFBUSxFQUFFO29CQUNOOzs7Ozs7Ozs7Ozt1QkFXRztvQkFDSCxPQUFPLEVBQUUsVUFBVTtpQkFDdEI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNOOzs7Ozs7Ozs7Ozt1QkFXRztvQkFDSCxPQUFPLEVBQUUsR0FBRztpQkFDZjtnQkFDRCxRQUFRLEVBQUU7b0JBQ047Ozs7Ozs7Ozs7O3VCQVdHO29CQUNILEtBQUssRUFBRSxFQUFFO2lCQUNaO2dCQUNELEtBQUssRUFBRTtvQkFDSDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsRUFBRTtpQkFDWjthQUNKO1lBRUQsTUFBTSxFQUFFO2dC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O2dCQUNILE1BQU0sRUFBRSxLQUFLO2dCQUNiOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxJQUFJO2dCQUNiOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxJQUFJO2FBQ2I7WUFFRCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1A7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1Q7Ozs7Ozs7Ozs7bUJB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