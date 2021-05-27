export default {
    transition: {
        slow: 'all 6s ease-in-out',
        default: 'all .3s ease-in-out',
        fast: 'all .1s ease-in-out'
    },
    layout: {
        container: {
            'max-width': '1280px'
        },
        layout: {
            '1': '1',
            '12': '1 2',
            '123': '1 2 3',
            '1234': '1 2 3 4',
            '122': '1 2 2',
            '112': '1 1 2',
            '12345': '1 2 3 4 5',
            '123456': '1 2 3 4 5 6'
        }
    },
    ratio: {
        '1-1': 1,
        '16-9': 16 / 9,
        '2-3': 2 / 3,
        '4-3': 4 / 3,
        '3-4': 3 / 4
    },
    depth: {
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
    gradient: {
        defaultType: 'linear',
        defaultAngle: 45,
        defaultModifier: '70'
    },
    color: {
        /**
         * @name                default
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #ffffff
         *
         * Specify the <s-color="default">default</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: {
            default: '#ffffff'
        },
        /**
         * @name                text
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #848e91
         *
         * Specify the <s-color="text">text</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        text: {
            default: '#848e91'
        },
        /**
         * @name                title
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #2b3438
         *
         * Specify the <s-color="title">title</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        title: {
            default: '#2b3438'
        },
        /**
         * @name                link
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             [config.theme.themes.dark.color.accent]
         *
         * Specify the <s-color="link">link</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        link: {
            default: '[config.theme.themes.dark.color.accent]'
        },
        /**
         * @name                ui
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #474059
         *
         * Specify the <s-color="ui">ui</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ui: {
            default: '#474059',
            text: '--lighten 40',
            placeholder: '--lighten 20',
            surface: '--lighten 0',
            background: '--lighten 0',
            border: '--lighten 0',
            ':hover': {
                text: '--lighten 40',
                placeholder: '--lighten 30',
                surface: '--lighten 0',
                background: '--lighten 10',
                border: '--lighten 0'
            },
            ':focus': {
                text: '--lighten 40',
                placeholder: '--lighten 30',
                surface: '--lighten 10',
                background: '--lighten 10',
                border: '--lighten 0'
            }
        },
        /**
         * @name                accent
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #f2bc2b
         *
         * Specify the <s-color="accent">accent</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        accent: {
            default: '#f2d72b',
            text: '--darken 30',
            highlight: '--lighten 0',
            surface: '--lighten 45',
            foreground: '--darken 0',
            ':hover': {
                surface: '--lighten 35',
                foreground: '--darken 40'
            },
            ':focus': {
                surface: '--lighten 20',
                foreground: '--darken 40'
            },
            ':active': {
                surface: '--lighten 0',
                foreground: '--lighten 50'
            }
        },
        /**
         * @name                complementary
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #7F43FF
         *
         * Specify the <s-color="complementary">complementary</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        complementary: {
            default: '#7F43FF'
        },
        /**
         * @name                surface
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #1D1B23
         *
         * Specify the <s-color="surface">surface</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        surface: {
            default: '#1D1B23'
        },
        /**
         * @name                background
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #1D1B23
         *
         * Specify the <s-color="background">background</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        background: {
            default: '#1D1B23'
        },
        /**
         * @name                success
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #B5F168
         *
         * Specify the <s-color="success">success</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        success: {
            default: '#B5F168'
        },
        /**
         * @name                warning
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FFD501
         *
         * Specify the <s-color="warning">warning</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        warning: {
            default: '#FFD501'
        },
        /**
         * @name                error
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FF4370
         *
         * Specify the <s-color="error">error</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        error: {
            default: '#FF4370'
        },
        /**
         * @name                info
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FDA622
         *
         * Specify the <s-color="info">info</s-color> color value.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        info: {
            default: '#FDA622'
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
            default: '[config.theme.themes.dark.color.primary.default]',
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
            dmg: '#E36E4B'
        }
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
                'font-weight': 400,
                import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
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
                'font-family': '"Menlo, Monaco, Consolas, Courier New, monospace"',
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
             * @name          5
             * @namespace     config.theme.themes.default.font.size
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
             * @default       10px
             *
             * Declare the font size <s-color="accent">20</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '10px',
            /**
             * @name          30
             * @namespace     config.theme.themes.default.font.size
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
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       14px
             *
             * Declare the font size <s-color="accent">40</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '14px',
            /**
             * @name          50
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       16px
             *
             * Declare the font size <s-color="accent">50</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '16px',
            /**
             * @name          60
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       24px
             *
             * Declare the font size <s-color="accent">60</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '24px',
            /**
             * @name          70
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       32px
             *
             * Declare the font size <s-color="accent">70</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '32px',
            /**
             * @name          80
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default       40px
             *
             * Declare the font size <s-color="accent">80</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '40px',
            /**
             * @name          90
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default      48px
             *
             * Declare the font size <s-color="accent">90</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '48px',
            /**
             * @name          10
             * @namespace     config.theme.themes.default.font.size
             * @type          String
             * @default      56px
             *
             * Declare the font size <s-color="accent">100</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '56px'
        }
    },
    border: {
        size: {
            /**
             * @name              0
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           0
             *
             * Specify the <s-color="accent">0</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0px',
            /**
             * @name              10
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           1px
             *
             * Specify the <s-color="accent">10</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '1px',
            /**
             * @name              20
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           2px
             *
             * Specify the <s-color="accent">20</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '2px',
            /**
             * @name              30
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           4px
             *
             * Specify the <s-color="accent">30</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '4px',
            /**
             * @name              40
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           6px
             *
             * Specify the <s-color="accent">40</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '6px',
            /**
             * @name              50
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           8px
             *
             * Specify the <s-color="accent">50</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '8px',
            /**
             * @name              60
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           12px
             *
             * Specify the <s-color="accent">60</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '12px',
            /**
             * @name              70
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           16px
             *
             * Specify the <s-color="accent">70</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '16px',
            /**
             * @name              80
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           20px
             *
             * Specify the <s-color="accent">80</s-color> border size
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '20px',
            /**
             * @name              90
             * @namespace         config.theme.themes.border.size
             * @type              Number
             * @default           24px
             *
             * Specify the <s-color="accent">90</s-color> border size
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
    typo: {
        h1: {
            'font-family': 'title',
            'font-size': 80,
            color: 'primary',
            'margin-bottom': 80
        },
        h2: {
            'font-family': 'title',
            'font-size': 70,
            color: 'primary',
            'margin-bottom': 70
        },
        h3: {
            'font-family': 'title',
            'font-size': 60,
            color: 'text',
            'margin-bottom': 60
        },
        h4: {
            'font-family': 'title',
            'font-size': 50,
            color: 'text',
            'margin-bottom': 50
        },
        h5: {
            'font-family': 'title',
            'font-size': 40,
            color: 'text',
            'margin-bottom': 50
        },
        h6: {
            'font-family': 'title',
            'font-size': 30,
            color: 'text',
            'margin-bottom': 50
        },
        'p-lead': {
            'font-family': 'default',
            'font-size': 70,
            color: 'text',
            'margin-bottom': 50
        },
        p: {
            'font-family': 'default',
            'font-size': 50,
            color: 'text',
            'margin-bottom': 50
        },
        b: {
            'font-weight': 'bold'
        },
        strong: {
            'font-weight': 'bold'
        },
        i: {
            'font-style': 'italic'
        },
        em: {
            'font-style': 'italic'
        },
        small: {
            'font-size': '0.5em'
        },
        mark: {
            'background-color': '[config.theme.themes.light.color.primary.30]'
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
    },
    ui: {
        button: {
            padding: '10 30',
            borderRadius: '[config.theme.themes.light.border.radius.default]',
            transition: '[config.theme.themes.light.transition.fast]',
            defaultStyle: 'gradient',
            ':gradient': {}
            // ':outline': {},
            // ':text': {}
        },
        form: {
            padding: '10 20',
            borderRadius: '[config.theme.themes.light.border.radius.default]',
            transition: '[config.theme.themes.light.transition.fast]',
            styles: ['default:default']
        },
        list: {
            padding: '0.5em 0.8em',
            borderRadius: '[config.theme.themes.light.border.radius.default]',
            transition: '[config.theme.themes.light.transition.fast]',
            styles: ['default'],
            colors: ['primary:default']
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
         * @default         6px
         *
         * Specify the <primary>10</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '6px',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         12px
         *
         * Specify the <primary>20</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '12px',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         24px
         *
         * Specify the <primary>30</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '24px',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         26px
         *
         * Specify the <primary>40</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '36px',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         48px
         *
         * Specify the <primary>50</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '48px',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         60px
         *
         * Specify the <primary>60</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '60px',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         72px
         *
         * Specify the <primary>70</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '72px',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         84px
         *
         * Specify the <primary>80</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '84px',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         96px
         *
         * Specify the <primary>90</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '96px',
        /**
         * @name            100
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         108px
         *
         * Specify the <primary>100</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        100: '108px'
    },
    margin: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.default]
         *
         * Specify the <primary>default</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '[config.theme.themes.light.space.default]',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.0]
         *
         * Specify the <primary>0</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '[config.theme.themes.light.space.0]',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.10]
         *
         * Specify the <primary>10</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '[config.theme.themes.light.space.10]',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.20]
         *
         * Specify the <primary>20</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '[config.theme.themes.light.space.20]',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.30]
         *
         * Specify the <primary>30</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '[config.theme.themes.light.space.30]',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.40]
         *
         * Specify the <primary>40</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '[config.theme.themes.light.space.40]',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.50]
         *
         * Specify the <primary>50</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '[config.theme.themes.light.space.50]',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.60]
         *
         * Specify the <primary>60</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '[config.theme.themes.light.space.60]',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.70]
         *
         * Specify the <primary>70</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '[config.theme.themes.light.space.70]',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.80]
         *
         * Specify the <primary>80</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '[config.theme.themes.light.space.80]',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.light.space.90]
         *
         * Specify the <primary>90</s-color> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '[config.theme.themes.light.space.90]'
    },
    padding: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.default]
         *
         * Specify the <primary>default</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '[config.theme.themes.light.space.default]',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.0]
         *
         * Specify the <primary>0</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '[config.theme.themes.light.space.0]',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.10]
         *
         * Specify the <primary>10</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '[config.theme.themes.light.space.10]',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.20]
         *
         * Specify the <primary>20</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '[config.theme.themes.light.space.20]',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.30]
         *
         * Specify the <primary>30</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '[config.theme.themes.light.space.30]',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.40]
         *
         * Specify the <primary>40</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '[config.theme.themes.light.space.40]',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.50]
         *
         * Specify the <primary>50</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '[config.theme.themes.light.space.50]',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.60]
         *
         * Specify the <primary>60</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '[config.theme.themes.light.space.60]',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.70]
         *
         * Specify the <primary>70</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '[config.theme.themes.light.space.70]',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.80]
         *
         * Specify the <primary>80</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '[config.theme.themes.light.space.80]',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.light.space.90]
         *
         * Specify the <primary>90</s-color> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '[config.theme.themes.light.space.90]'
    },
    media: {
        /**
         * @name              defaultAction
         * @namespace         config.theme.themes.default.media
         * @type              String
         * @values            >,<,=,>=,<=
         * @default           =
         *
         * Specify the default action to apply if you don't specify one in your media
         * mixin call like ```@include Sugar.media('tablet') {...}```. If the defaultAction is set to ">=",
         * the above media will be the same as ```@include Sugar.media('>=tablet') {...}```
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        defaultAction: '=',
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
             * @default       {'min-width': null, 'max-width': 639}
             *
             * Specify the media query arguments needed to target mobile
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            mobile: {
                'min-width': null,
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVEYXJrLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lRGFyay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixJQUFJLEVBQUUscUJBQXFCO0tBQzVCO0lBRUQsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFO1lBQ1QsV0FBVyxFQUFFLFFBQVE7U0FDdEI7UUFDRCxNQUFNLEVBQUU7WUFDTixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLE9BQU87WUFDZCxNQUFNLEVBQUUsU0FBUztZQUNqQixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLFdBQVc7WUFDcEIsUUFBUSxFQUFFLGFBQWE7U0FDeEI7S0FDRjtJQUVELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQ2QsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ1osS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ1osS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO0tBQ2I7SUFFRCxLQUFLLEVBQUU7UUFDTCxDQUFDLEVBQUUsR0FBRztRQUNOLEVBQUUsRUFBRSw4QkFBOEI7UUFDbEMsRUFBRSxFQUFFLCtCQUErQjtRQUNuQyxFQUFFLEVBQUUsK0JBQStCO1FBQ25DLEVBQUUsRUFBRSwrQkFBK0I7UUFDbkMsRUFBRSxFQUFFOzBDQUNrQztRQUN0QyxFQUFFLEVBQUU7MENBQ2tDO1FBQ3RDLEVBQUUsRUFBRTs7MkNBRW1DO1FBQ3ZDLEVBQUUsRUFBRTs7OzRDQUdvQztRQUN4QyxFQUFFLEVBQUU7Ozs7NENBSW9DO1FBQ3hDLEdBQUcsRUFBRTs7Ozs7NENBS21DO0tBQ3pDO0lBRUQsUUFBUSxFQUFFO1FBQ1IsV0FBVyxFQUFFLFFBQVE7UUFDckIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsZUFBZSxFQUFFLElBQUk7S0FDdEI7SUFFRCxLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLHlDQUF5QztTQUNuRDtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUU7WUFDRixPQUFPLEVBQUUsU0FBUztZQUNsQixJQUFJLEVBQUUsY0FBYztZQUNwQixXQUFXLEVBQUUsY0FBYztZQUMzQixPQUFPLEVBQUUsYUFBYTtZQUN0QixVQUFVLEVBQUUsYUFBYTtZQUN6QixNQUFNLEVBQUUsYUFBYTtZQUNyQixRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsVUFBVSxFQUFFLGNBQWM7Z0JBQzFCLE1BQU0sRUFBRSxhQUFhO2FBQ3RCO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxjQUFjO2dCQUNwQixXQUFXLEVBQUUsY0FBYztnQkFDM0IsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLFVBQVUsRUFBRSxjQUFjO2dCQUMxQixNQUFNLEVBQUUsYUFBYTthQUN0QjtTQUNGO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFFBQVEsRUFBRTtnQkFDUixPQUFPLEVBQUUsY0FBYztnQkFDdkIsVUFBVSxFQUFFLGFBQWE7YUFDMUI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLFVBQVUsRUFBRSxhQUFhO2FBQzFCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULE9BQU8sRUFBRSxhQUFhO2dCQUN0QixVQUFVLEVBQUUsY0FBYzthQUMzQjtTQUNGO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGFBQWEsRUFBRTtZQUNiLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRTtZQUNMLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRTtZQUNULE9BQU8sRUFBRSxrREFBa0Q7WUFDM0QsS0FBSyxFQUFFLFNBQVM7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxFQUFFLEVBQUUsU0FBUztZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxFQUFFLFNBQVM7WUFDZCxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsU0FBUztTQUNmO0tBQ0Y7SUFFRCxJQUFJLEVBQUU7UUFDSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLE1BQU07UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsQ0FBQyxFQUFFLENBQUM7UUFFSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsQ0FBQyxFQUFFLEtBQUs7UUFFUjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLEtBQUs7UUFFVDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLEtBQUs7UUFFVDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07S0FDWDtJQUVELElBQUksRUFBRTtRQUNKOzs7Ozs7Ozs7V0FTRztRQUNILE1BQU0sRUFBRTtZQUNOOzs7Ozs7Ozs7ZUFTRztZQUNILE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsaUJBQWlCO2dCQUNoQyxhQUFhLEVBQUUsR0FBRztnQkFDbEIsTUFBTSxFQUNKLDhFQUE4RTthQUNqRjtZQUVEOzs7Ozs7Ozs7ZUFTRztZQUNILEtBQUssRUFBRTtnQkFDTCxhQUFhLEVBQUUsaUJBQWlCO2dCQUNoQyxhQUFhLEVBQUUsR0FBRztnQkFDbEIsTUFBTSxFQUNKLDhFQUE4RTthQUNqRjtZQUVEOzs7Ozs7Ozs7ZUFTRztZQUNILEtBQUssRUFBRTtnQkFDTCxhQUFhLEVBQUUsbUNBQW1DO2dCQUNsRCxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsWUFBWSxFQUFFLFFBQVE7Z0JBQ3RCLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixZQUFZLEVBQUUsSUFBSTthQUNuQjtZQUVEOzs7Ozs7Ozs7ZUFTRztZQUNILElBQUksRUFBRTtnQkFDSixhQUFhLEVBQUUsbURBQW1EO2dCQUNsRSxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsWUFBWSxFQUFFLFFBQVE7Z0JBQ3RCLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixZQUFZLEVBQUUsSUFBSTthQUNuQjtTQUNGO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxNQUFNO1lBRWY7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxDQUFDO1lBRUo7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxLQUFLO1lBRVI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxLQUFLO1lBRVQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxNQUFNO1NBQ1o7S0FDRjtJQUVELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxDQUFDLEVBQUUsS0FBSztZQUVSOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsS0FBSztZQUVUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsS0FBSztZQUVUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsS0FBSztZQUVUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsS0FBSztZQUVUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsS0FBSztZQUVUOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsTUFBTTtZQUVWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsTUFBTTtZQUVWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsTUFBTTtZQUVWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxFQUFFLEVBQUUsTUFBTTtTQUNYO1FBRUQsTUFBTSxFQUFFO1lBQ047Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxNQUFNO1lBRWY7Ozs7Ozs7Ozs7ZUFVRztZQUNILENBQUMsRUFBRSxLQUFLO1lBRVI7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxLQUFLO1lBRVQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxLQUFLO1lBRVQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxLQUFLO1lBRVQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxLQUFLO1lBRVQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1lBRVY7Ozs7Ozs7Ozs7ZUFVRztZQUNILEVBQUUsRUFBRSxNQUFNO1NBQ1g7S0FDRjtJQUVELElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRTtZQUNGLGFBQWEsRUFBRSxPQUFPO1lBQ3RCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsZUFBZSxFQUFFLEVBQUU7U0FDcEI7UUFDRCxFQUFFLEVBQUU7WUFDRixhQUFhLEVBQUUsT0FBTztZQUN0QixXQUFXLEVBQUUsRUFBRTtZQUNmLEtBQUssRUFBRSxTQUFTO1lBQ2hCLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsYUFBYSxFQUFFLE9BQU87WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsYUFBYSxFQUFFLFNBQVM7WUFDeEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsYUFBYSxFQUFFLFNBQVM7WUFDeEIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLGVBQWUsRUFBRSxFQUFFO1NBQ3BCO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsYUFBYSxFQUFFLE1BQU07U0FDdEI7UUFDRCxNQUFNLEVBQUU7WUFDTixhQUFhLEVBQUUsTUFBTTtTQUN0QjtRQUNELENBQUMsRUFBRTtZQUNELFlBQVksRUFBRSxRQUFRO1NBQ3ZCO1FBQ0QsRUFBRSxFQUFFO1lBQ0YsWUFBWSxFQUFFLFFBQVE7U0FDdkI7UUFDRCxLQUFLLEVBQUU7WUFDTCxXQUFXLEVBQUUsT0FBTztTQUNyQjtRQUNELElBQUksRUFBRTtZQUNKLGtCQUFrQixFQUFFLDhDQUE4QztTQUNuRTtRQUNELEdBQUcsRUFBRTtZQUNILGlCQUFpQixFQUFFLGNBQWM7U0FDbEM7UUFDRCxHQUFHLEVBQUU7WUFDSCxpQkFBaUIsRUFBRSxXQUFXO1NBQy9CO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixXQUFXLEVBQUUsT0FBTztTQUNyQjtRQUNELEdBQUcsRUFBRTtZQUNILGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsV0FBVyxFQUFFLE9BQU87U0FDckI7S0FDRjtJQUVELEVBQUUsRUFBRTtRQUNGLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFlBQVksRUFBRSxtREFBbUQ7WUFDakUsVUFBVSxFQUFFLDZDQUE2QztZQUN6RCxZQUFZLEVBQUUsVUFBVTtZQUN4QixXQUFXLEVBQUUsRUFBRTtZQUNmLGtCQUFrQjtZQUNsQixjQUFjO1NBQ2Y7UUFDRCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsT0FBTztZQUNoQixZQUFZLEVBQUUsbURBQW1EO1lBQ2pFLFVBQVUsRUFBRSw2Q0FBNkM7WUFDekQsTUFBTSxFQUFFLENBQUMsaUJBQWlCLENBQUM7U0FDNUI7UUFDRCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsYUFBYTtZQUN0QixZQUFZLEVBQUUsbURBQW1EO1lBQ2pFLFVBQVUsRUFBRSw2Q0FBNkM7WUFDekQsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ25CLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1NBQzVCO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLE1BQU07UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsQ0FBQyxFQUFFLEdBQUc7UUFFTjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLEtBQUs7UUFFVDs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsRUFBRSxFQUFFLE1BQU07UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsR0FBRyxFQUFFLE9BQU87S0FDYjtJQUVELE1BQU0sRUFBRTtRQUNOOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsMkNBQTJDO1FBRXBEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxDQUFDLEVBQUUscUNBQXFDO1FBRXhDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO1FBRTFDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxFQUFFLEVBQUUsc0NBQXNDO0tBQzNDO0lBRUQsT0FBTyxFQUFFO1FBQ1A7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSwyQ0FBMkM7UUFFcEQ7Ozs7Ozs7Ozs7V0FVRztRQUNILENBQUMsRUFBRSxxQ0FBcUM7UUFFeEM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILEVBQUUsRUFBRSxzQ0FBc0M7S0FDM0M7SUFFRCxLQUFLLEVBQUU7UUFDTDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsYUFBYSxFQUFFLEdBQUc7UUFFbEI7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksRUFBRSxRQUFRO1FBRXRCLE9BQU8sRUFBRTtZQUNQOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFdBQVcsRUFBRSxHQUFHO2FBQ2pCO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRTtnQkFDTixXQUFXLEVBQUUsR0FBRztnQkFDaEIsV0FBVyxFQUFFLElBQUk7YUFDbEI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixXQUFXLEVBQUUsSUFBSTthQUNsQjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=