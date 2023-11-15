/**
 * @name                    themeLayout
 * @as                      Layout
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme layout available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function (api) {
    return {
        offset: {
            /**
             * @name                top
             * @namespace           config.themeLayout.offset.default
             * @type                String
             * @default             0
             *
             * Specify an offset top for your layout. This can be due to a sticky navigation, etc...
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            top: 0,
            /**
             * @name                right
             * @namespace           config.themeLayout.offset.default
             * @type                String
             * @default             0
             *
             * Specify an offset right for your layout. This can be due to a sticky navigation, etc...
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            right: 0,
            /**
             * @name                bottom
             * @namespace           config.themeLayout.offset.default
             * @type                String
             * @default             0
             *
             * Specify an offset bottom for your layout. This can be due to a sticky navigation, etc...
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            bottom: 0,
            /**
             * @name                left
             * @namespace           config.themeLayout.offset.default
             * @type                String
             * @default             0
             *
             * Specify an offset left for your layout. This can be due to a sticky navigation, etc...
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            left: 0,
        },
        container: {
            /**
             * @name                default
             * @namespace           config.themeLayout.container.default
             * @type                String
             * @default             1280px
             *
             * Specify the "default" container max-width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            default: '1280px',
            /**
             * @name                wide
             * @namespace           config.themeLayout.container
             * @type                String
             * @default             1440px
             *
             * Specify the "wide" container max-width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            wide: '1440px',
            /**
             * @name                full
             * @namespace           config.themeLayout.container
             * @type                String
             * @default             none
             *
             * Specify the "full" container max-width for your theme
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            full: 'none',
        },
        grid: {
            /**
             * @name                1
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.grid
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
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1
             *
             * Specify the 1 layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1': '1',
            /**
             * @name                12
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2
             *
             * Specify the 2 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '12': '1 2',
            /**
             * @name                1_2
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 _ 2
             *
             * Specify the 2 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_2': '1 _ 2',
            /**
             * @name                21
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             2 1
             *
             * Specify the 2 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '21': '2 1',
            /**
             * @name                2_1
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             2 _ 1
             *
             * Specify the 2 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '2_1': '2 _ 1',
            /**
             * @name                123
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '123': '1 2 3',
            /**
             * @name                12_3
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 _ 3
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '12_33': '1 2 _ 3 3',
            /**
             * @name                1_23
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 _ 2 3
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_23': '1 _ 2 3',
            /**
             * @name                1_2_3
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 _ 2 _ 3
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_2_3': '1 _ 2 _ 3',
            /**
             * @name                321
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             3 2 1
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '321': '3 2 1',
            /**
             * @name                32_1
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             2 3 _ 1
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '32_1': '3 2 _ 1',
            /**
             * @name                3_21
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             3 _ 2 1
             *
             * Specify the 3 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '3_21': '3 _ 2 1',
            /**
             * @name                1234
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 4
             *
             * Specify the 4 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1234': '1 2 3 4',
            /**
             * @name                12_34
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 _ 3 4
             *
             * Specify the 4 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '12_34': '1 2 _ 3 4',
            /**
             * @name                123_4
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 _ 4
             *
             * Specify the 4 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '123_4': '1 2 3 _ 4',
            /**
             * @name                1_234
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 _ 2 3 4
             *
             * Specify the 4 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_234': '1 _ 2 3 4',
            /**
             * @name                1_2_3_4
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 _ 2 _ 3 _ 4
             *
             * Specify the 4 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_2_3_4': '1 _ 2 _ 3 _ 4',
            /**
             * @name                122
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 2
             *
             * Specify the 2 columns (1/3 - 2/3) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '122': '1 2 2',
            /**
             * @name                221
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 2
             *
             * Specify the 2 columns (1/3 - 2/3) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '221': '2 2 1',
            /**
             * @name                122
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 1 2
             *
             * Specify the 2 columns (2/3 - 1/3) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '112': '1 1 2',
            /**
             * @name                211
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 1 2
             *
             * Specify the 2 columns (2/3 - 1/3) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '211': '2 1 1',
            /**
             * @name                1222
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 2 2
             *
             * Specify the 2 columns (1/4 - 3/4) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1222': '1 2 2 2',
            /**
             * @name                2221
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 2 2
             *
             * Specify the 2 columns (1/4 - 3/4) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '2221': '2 2 2 1',
            /**
             * @name                1112
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 1 1 2
             *
             * Specify the 2 columns (3/4 - 1/4) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1112': '1 1 1 2',
            /**
             * @name                12222
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 2 2 2
             *
             * Specify the 2 columns (1/5 - 4/5) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '12222': '1 2 2 2 2',
            /**
             * @name                11112
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 1 1 1 2
             *
             * Specify the 2 columns (4/5 - 1/5) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '11112': '1 1 1 1 2',
            /**
             * @name                22221
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             2 2 2 2 1
             *
             * Specify the 2 columns (4/5 - 1/5) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '22221': '2 2 2 2 1',
            /**
             * @name                122222
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 2 2 2 2
             *
             * Specify the 2 columns (1/6 - 5/6) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '122222': '1 2 2 2 2 2',
            /**
             * @name                111112
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 1 1 1 1 2
             *
             * Specify the 2 columns (1/6 - 5/6) layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '111112': '1 1 1 1 1 2',
            /**
             * @name                12345
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 4 5
             *
             * Specify the 5 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '12345': '1 2 3 4 5',
            /**
             * @name                123_45
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 _ 4 5
             *
             * Specify the 5 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '123_45': '1 2 3 _ 4 5',
            /**
             * @name                12_345
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 _ 3 4 5
             *
             * Specify the 5 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '12_345': '1 2 _ 3 4 5',
            /**
             * @name                1_2345
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 _ 2 3 4 5
             *
             * Specify the 5 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_2345': '1 _ 2 3 4 5',
            /**
             * @name                1234_5
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 4 _ 5
             *
             * Specify the 5 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1234_5': '1 2 3 4 _ 5',
            /**
             * @name                1_2_3_4_5
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 4 _ 5
             *
             * Specify the 5 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '1_2_3_4_5': '1 _ 2 _ 3 _ 4 _ 5',
            /**
             * @name                123456
             * @namespace           config.themeLayout.layout
             * @type                String
             * @default             1 2 3 4 5 6
             *
             * Specify the 6 columns layout for your theme.
             * For more information on how layouts works, check out the `@coffeekraken/s-sugarcss-plugin` "layout" mixin documentation.
             *
             * @since               2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            '123456': '1 2 3 4 5 6',
        },
    };
}
