export default {
    transition: {
        slow: 'all 6s ease-in-out',
        default: 'all .3s ease-in-out',
        fast: 'all .1s ease-in-out'
    },
    layout: {
        container: {
            default: {
                'max-width': '1280px'
            },
            full: {
                'max-width': 'none'
            }
        },
        layout: {
            '1': '1',
            '12': '1 2',
            '123': '1 2 3',
            '1234': '1 2 3 4',
            '122': '1 2 2',
            '112': '1 1 2',
            '1222': '1 2 2 2',
            '1112': '1 1 1 2',
            '12222': '1 2 2 2 2',
            '11112': '1 1 1 1 2',
            '12345': '1 2 3 4 5',
            '123456': '1 2 3 4 5 6'
        }
    },
    ratio: {
        '1': 1,
        '1-1': 1,
        '16-9': 16 / 9,
        '2-3': 2 / 3,
        '4-3': 4 / 3,
        '3-4': 3 / 4
    },
    width: {
        '0': '0',
        '10': '10%',
        '20': '20%',
        '30': '30%',
        '40': '40%',
        '50': '50%',
        '60': '60%',
        '70': '70%',
        '80': '80%',
        '90': '90%',
        '100': '100%'
    },
    depth: {
        default: '[theme.depth.50]',
        0: '0',
        10: `0 0px 2px rgba(0, 0, 0, 0.2)`,
        20: `0 1px 4px rgba(0, 0, 0, 0.16)`,
        30: `0 2px 6px rgba(0, 0, 0, 0.14)`,
        40: `0 4px 12px rgba(0, 0, 0, 0.1)`,
        50: `0 0.5px 1.5px rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(0, 0, 0, 0.1)`,
        60: `0 0.8px 2px rgba(0, 0, 0, 0.05),
            0 6px 16px rgba(0, 0, 0, 0.1)`,
        70: `0 0.6px 1.1px rgba(0, 0, 0, 0.024),
            0 2px 3.6px rgba(0, 0, 0, 0.036),
            0 9px 16px rgba(0, 0, 0, 0.06)`,
        80: `0 0.5px 0.9px rgba(0, 0, 0, 0.021),
            0 1.5px 2.5px rgba(0, 0, 0, 0.03),
            0 3.6px 6px rgba(0, 0, 0, 0.039),
            0 12px 20px rgba(0, 0, 0, 0.06)`,
        90: `0 0.5px 0.7px rgba(0, 0, 0, 0.019),
            0 1.4px 1.7px rgba(0, 0, 0, 0.027),
            0 2.8px 3.5px rgba(0, 0, 0, 0.033),
            0 5.8px 7.3px rgba(0, 0, 0, 0.041),
            0 16px 20px rgba(0, 0, 0, 0.06)`,
        100: `0 0.6px 0.7px rgba(0, 0, 0, 0.017),
            0 1.3px 1.7px rgba(0, 0, 0, 0.024),
            0 2.5px 3.3px rgba(0, 0, 0, 0.03),
            0 4.5px 5.8px rgba(0, 0, 0, 0.036),
            0 8.4px 10.9px rgba(0, 0, 0, 0.043),
            0 20px 26px rgba(0, 0, 0, 0.06)`
    },
    size: {
        /**
         * @name          default
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       16px
         *
         * Declare the font size <s-color="accent">default</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '16px',
        /**
         * @name          0
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       0
         *
         * Declare the font size <s-color="accent">50</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: 0,
        /**
         * @name          5
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       2px
         *
         * Declare the font size <s-color="accent">50</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        5: '4px',
        /**
         * @name          10
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       4px
         *
         * Declare the font size <s-color="accent">10</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '4px',
        /**
         * @name          20
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       8px
         *
         * Declare the font size <s-color="accent">20</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '8px',
        /**
         * @name          30
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       12px
         *
         * Declare the font size <s-color="accent">30</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '12px',
        /**
         * @name          40
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       16px
         *
         * Declare the font size <s-color="accent">40</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '16px',
        /**
         * @name          50
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       24px
         *
         * Declare the font size <s-color="accent">50</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '24px',
        /**
         * @name          60
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       32px
         *
         * Declare the font size <s-color="accent">60</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '32px',
        /**
         * @name          70
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       40px
         *
         * Declare the font size <s-color="accent">70</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '40px',
        /**
         * @name          80
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       48px
         *
         * Declare the font size <s-color="accent">80</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '48px',
        /**
         * @name          90
         * @namespace     config.theme.themes.default.size
         * @type          String
         * @default       56px
         *
         * Declare the font size <s-color="accent">90</s-color>
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '56px'
    },
    font: {
        /**
         * @name            family
         * @namespace       config.theme.themes.default.font
         * @type            Object
         *
         * Store the font family that will be available in the project
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        family: {
            /**
             * @name            default
             * @namespace       config.theme.themes.default.fonts.family
             * @type            Object
             *
             * Declare the <s-color="accent">default</s-color> font face
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: {
                'font-family': '"Titillium Web"',
                'font-weight': 400,
                import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
            },
            /**
             * @name            title
             * @namespace       config.theme.themes.default.fonts.family
             * @type            Object
             *
             * Declare the <s-color="accent">title</s-color> font face
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            title: {
                'font-family': '"Titillium Web"',
                'font-weight': 600,
                import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap'
            },
            /**
             * @name            quote
             * @namespace       config.theme.themes.default.fonts.family
             * @type            Object
             *
             * Declare the <s-color="accent">quote</s-color> font face
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            quote: {
                'font-family': '"Palatino, Times, Georgia, serif"',
                'font-weight': 'normal',
                'font-style': 'normal',
                'font-display': 'auto',
                'cap-height': 0.65
            },
            /**
             * @name            code
             * @namespace       config.theme.themes.default.fonts.family
             * @type            Object
             *
             * Declare the <s-color="accent">code</s-color> font face
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            code: {
                'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
                'font-weight': 'normal',
                'font-style': 'normal',
                'font-display': 'auto',
                'cap-height': 0.65
            }
        },
        /**
         * @name            size
         * @namespace       config.theme.themes.default.font
         * @type            Object
         *
         * Store the font size that will be available in the project
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        size: {
            /**
             * @name          default
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       16px
             *
             * Declare the font size <s-color="accent">default</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '16px',
            /**
             * @name          0
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       0
             *
             * Declare the font size <s-color="accent">50</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: 0,
            /**
             * @name          10
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       8px
             *
             * Declare the font size <s-color="accent">10</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '8px',
            /**
             * @name          20
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       12px
             *
             * Declare the font size <s-color="accent">20</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '12px',
            /**
             * @name          30
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       16px
             *
             * Declare the font size <s-color="accent">30</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '16px',
            /**
             * @name          40
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       20px
             *
             * Declare the font size <s-color="accent">40</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '20px',
            /**
             * @name          50
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       24px
             *
             * Declare the font size <s-color="accent">50</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '24px',
            /**
             * @name          60
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       32px
             *
             * Declare the font size <s-color="accent">60</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '32px',
            /**
             * @name          70
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       40px
             *
             * Declare the font size <s-color="accent">70</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '40px',
            /**
             * @name          80
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       48px
             *
             * Declare the font size <s-color="accent">80</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '48px',
            /**
             * @name          90
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default      56px
             *
             * Declare the font size <s-color="accent">90</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '56px',
            /**
             * @name          10
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default      64px
             *
             * Declare the font size <s-color="accent">100</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '64px'
        }
    },
    border: {
        width: {
            /**
             * @name              default
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           [theme.border.width.20]
             *
             * Specify the <s-color="accent">default</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '[theme.border.width.20]',
            /**
             * @name              0
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           0
             *
             * Specify the <s-color="accent">0</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0px',
            /**
             * @name              10
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           1px
             *
             * Specify the <s-color="accent">10</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '1px',
            /**
             * @name              20
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           2px
             *
             * Specify the <s-color="accent">20</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '2px',
            /**
             * @name              30
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           4px
             *
             * Specify the <s-color="accent">30</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '4px',
            /**
             * @name              40
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           6px
             *
             * Specify the <s-color="accent">40</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '6px',
            /**
             * @name              50
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           8px
             *
             * Specify the <s-color="accent">50</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '8px',
            /**
             * @name              60
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           12px
             *
             * Specify the <s-color="accent">60</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '12px',
            /**
             * @name              70
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           16px
             *
             * Specify the <s-color="accent">70</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '16px',
            /**
             * @name              80
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           20px
             *
             * Specify the <s-color="accent">80</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '20px',
            /**
             * @name              90
             * @namespace         config.theme.themes.border.width
             * @type              Number
             * @default           24px
             *
             * Specify the <s-color="accent">90</s-color> border width
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '24px'
        },
        radius: {
            /**
             * @name              default
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           10px
             *
             * Specify the <s-color="accent">0</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '10px',
            /**
             * @name              0
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           0px
             *
             * Specify the <s-color="accent">0</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0px',
            /**
             * @name              10
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           2px
             *
             * Specify the <s-color="accent">10</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '2px',
            /**
             * @name              20
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           4px
             *
             * Specify the <s-color="accent">20</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '4px',
            /**
             * @name              30
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           6px
             *
             * Specify the <s-color="accent">30</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '6px',
            /**
             * @name              40
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           8px
             *
             * Specify the <s-color="accent">40</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '8px',
            /**
             * @name              50
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           10px
             *
             * Specify the <s-color="accent">50</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '10px',
            /**
             * @name              60
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           12px
             *
             * Specify the <s-color="accent">60</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '12px',
            /**
             * @name              70
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           14px
             *
             * Specify the <s-color="accent">70</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '14px',
            /**
             * @name              80
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           16px
             *
             * Specify the <s-color="accent">80</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '16px',
            /**
             * @name              90
             * @namespace         config.theme.themes.default.border.radius
             * @type              Number
             * @default           18px
             *
             * Specify the <s-color="accent">90</s-color> border radius
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '18px'
        }
    },
    space: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         48px
         *
         * Specify the <primary>default</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '48px',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         0
         *
         * Specify the <primary>0</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '0',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         12px
         *
         * Specify the <primary>10</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '12px',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         24px
         *
         * Specify the <primary>20</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '24px',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         36px
         *
         * Specify the <primary>30</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '36px',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         48px
         *
         * Specify the <primary>40</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '48px',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         60px
         *
         * Specify the <primary>50</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '60px',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         72px
         *
         * Specify the <primary>60</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '72px',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         84px
         *
         * Specify the <primary>70</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '84px',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         96px
         *
         * Specify the <primary>80</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '96px',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         108px
         *
         * Specify the <primary>90</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '108px',
        /**
         * @name            100
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         120px
         *
         * Specify the <primary>100</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        100: '120px'
    },
    margin: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.default]
         *
         * Specify the <primary>default</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '[theme.space.default]',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.0]
         *
         * Specify the <primary>0</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '[theme.space.0]',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.10]
         *
         * Specify the <primary>10</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '[theme.space.10]',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.20]
         *
         * Specify the <primary>20</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '[theme.space.20]',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.30]
         *
         * Specify the <primary>30</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '[theme.space.30]',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.40]
         *
         * Specify the <primary>40</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '[theme.space.40]',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.50]
         *
         * Specify the <primary>50</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '[theme.space.50]',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.60]
         *
         * Specify the <primary>60</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '[theme.space.60]',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.70]
         *
         * Specify the <primary>70</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '[theme.space.70]',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.80]
         *
         * Specify the <primary>80</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '[theme.space.80]',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [theme.space.90]
         *
         * Specify the <primary>90</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '[theme.space.90]'
    },
    padding: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.default]
         *
         * Specify the <primary>default</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '[theme.space.default]',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.0]
         *
         * Specify the <primary>0</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '[theme.space.0]',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.10]
         *
         * Specify the <primary>10</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '[theme.space.10]',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.20]
         *
         * Specify the <primary>20</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '[theme.space.20]',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.30]
         *
         * Specify the <primary>30</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '[theme.space.30]',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.40]
         *
         * Specify the <primary>40</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '[theme.space.40]',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.50]
         *
         * Specify the <primary>50</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '[theme.space.50]',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.60]
         *
         * Specify the <primary>60</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '[theme.space.60]',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.70]
         *
         * Specify the <primary>70</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '[theme.space.70]',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.80]
         *
         * Specify the <primary>80</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '[theme.space.80]',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [theme.space.90]
         *
         * Specify the <primary>90</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '[theme.space.90]'
    },
    media: {
        /**
         * @name              defaultAction
         * @namespace         config.theme.themes.default.media
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
         * @namespace         config.theme.themes.default.media
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
             * @namespace     config.theme.themes.default.media.queries
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
                'max-width': 639
            },
            /**
             * @name          tablet
             * @namespace     config.theme.themes.default.media.queries
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
                'max-width': 1279
            },
            /**
             * @name          desktop
             * @namespace     config.theme.themes.default.media.queries
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
                'max-width': null
            }
        }
    },
    components: {
        's-code-example': {
            ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        }
    },
    ui: {
        default: {
            padding: '[theme.padding.10] [theme.padding.20]',
            borderRadius: '[theme.border.radius.default]',
            borderWidth: '[theme.border.width.default]',
            transition: '[theme.transition.fast]',
            defaultColor: 'accent',
            depth: '[theme.depth.default]',
            ':rhythmVertical': {
                'margin-bottom': 40
            }
        },
        button: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            defaultStyle: 'default'
        },
        input: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            defaultStyle: 'default',
        },
        select: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            defaultStyle: 'default',
        },
        switch: {
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            defaultStyle: 'default'
        },
        list: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            styles: ['default'],
            defaultColor: '[theme.ui.default.defaultColor]',
            ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        },
        tabs: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: 0,
            defaultStyle: 'default'
        },
        terminal: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            defaultColor: '[theme.ui.default.defaultColor]',
            ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        },
        tooltip: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            maxWidth: '30ch',
            arrowSize: '20px'
        },
        // pre: {
        //   padding: '[theme.ui.default.padding]',
        //   borderRadius: '[theme.ui.default.borderRadius]',
        //   transition: '[theme.ui.default.transition]',
        //   depth: '[theme.ui.default.depth]',
        //   lineHeight: 2,
        //   styles: ['default'],
        //   defaultColor: '[theme.ui.default.defaultColor]',
        //   ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        // },
        code: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            styles: ['default:default'],
            ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        },
        blockquote: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            borderWidth: '[theme.ui.default.borderWidth]',
            transition: '[theme.ui.default.transition]',
            depth: '[theme.ui.default.depth]',
            defaultColor: '[theme.ui.default.defaultColor]',
            ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        },
        table: {
            padding: '[theme.ui.default.padding]',
            borderRadius: '[theme.ui.default.borderRadius]',
            borderWidth: '[theme.border.width.10]',
            transition: '[theme.ui.default.transition]',
            depth: 0,
            defaultColor: '[theme.ui.default.defaultColor]',
            ':rhythmVertical': '[theme.ui.default.:rhythmVertical]'
        },
        badge: {
            padding: '.35em .65em',
            borderRadius: '[theme.ui.default.borderRadius]',
            transition: '[theme.ui.default.transition]',
            depth: 0
        },
    },
    typo: {
        h1: {
            'font-family': 'title',
            'font-size': 100,
            'line-height': 1,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 40
            }
        },
        h2: {
            'font-family': 'title',
            'font-size': 90,
            'line-height': 1,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        h3: {
            'font-family': 'title',
            'font-size': 80,
            'line-height': 1,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        h4: {
            'font-family': 'title',
            'font-size': 70,
            'line-height': 1,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        h5: {
            'font-family': 'title',
            'font-size': 60,
            'line-height': 1,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 20
            }
        },
        h6: {
            'font-family': 'title',
            'font-size': 50,
            'line-height': 1,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 20
            }
        },
        p: {
            'font-family': 'default',
            'font-size': 40,
            'line-height': 1.5,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        'p-lead': {
            'font-family': 'default',
            'font-size': 50,
            'line-height': 1.2,
            'max-width': '55ch',
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        hr: {
            color: '[theme.color.main.color]',
            opacity: 0.2,
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        pre: {
            'font-family': 'code',
            color: ['ui', 'text'],
            'background-color': ['ui', 'surface'],
            'line-height': 1.5,
            padding: 20,
            ':rhythmVertical': {
                'margin-bottom': 30
            }
        },
        'code:not(pre > code)': {
            'display': 'inline-block',
            'font-family': 'code',
            color: ['ui', 'text'],
            'background-color': ['ui', 'surface'],
            padding: 0
        },
        a: {
            'color': 'accent'
        },
        quote: {
            'font-family': 'quote'
        },
        b: {
            'font-weight': 'bold'
        },
        bold: {
            'font-weight': 'bold'
        },
        strong: {
            'font-weight': 'bold'
        },
        i: {
            'font-style': 'italic'
        },
        italic: {
            'font-style': 'italic'
        },
        em: {
            'font-style': 'italic'
        },
        small: {
            'font-size': '0.5em'
        },
        mark: {
            'background-color': '[theme.color.accent.color]',
            'color': '[theme.color.accent.foreground]'
        },
        del: {
            'text-decoration': 'line-through'
        },
        ins: {
            'text-decoration': 'underline'
        },
        sub: {
            'vertical-align': 'sub',
            'font-size': '0.6em'
        },
        sup: {
            'vertical-align': 'sup',
            'font-size': '0.6em'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVCYXNlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lQmFzZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixJQUFJLEVBQUUscUJBQXFCO0tBQzVCO0lBRUQsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxRQUFRO2FBQ3RCO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxNQUFNO2FBQ3BCO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsU0FBUztZQUNqQixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLFdBQVc7WUFDcEIsT0FBTyxFQUFFLFdBQVc7WUFDcEIsT0FBTyxFQUFFLFdBQVc7WUFDcEIsUUFBUSxFQUFFLGFBQWE7U0FDeEI7S0FDRjtJQUVELEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRSxDQUFDO1FBQ04sS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLEVBQUUsRUFBRSxHQUFHLENBQUM7UUFDZCxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDWixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDWixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7S0FDYjtJQUVELEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLEtBQUs7UUFDWCxJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsSUFBSSxFQUFFLEtBQUs7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