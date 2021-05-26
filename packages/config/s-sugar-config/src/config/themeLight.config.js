export default {
    transition: {
        slow: 'all 1s ease-in-out',
        default: 'all .5s ease-in-out',
        fast: 'all .2s ease-in-out'
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
        10: `0 0.1px 0.1px rgba(0, 0, 0, 0.02),
            0 0.1px 0.1px rgba(0, 0, 0, 0.028),
            0 0.3px 0.3px rgba(0, 0, 0, 0.035),
            0 0.4px 0.4px rgba(0, 0, 0, 0.042),
            0 0.8px 0.8px rgba(0, 0, 0, 0.05),
            0 2px 2px rgba(0, 0, 0, 0.07)`,
        20: `0 0.1px 0.1px rgba(0, 0, 0, 0.02),
            0 0.3px 0.3px rgba(0, 0, 0, 0.028),
            0 0.5px 0.6px rgba(0, 0, 0, 0.035),
            0 0.9px 1.1px rgba(0, 0, 0, 0.042),
            0 1.7px 2.1px rgba(0, 0, 0, 0.05),
            0 4px 5px rgba(0, 0, 0, 0.07)
            `,
        30: `0 0.6px 0.5px rgba(0, 0, 0, 0.017),
            0 1.5px 1.1px rgba(0, 0, 0, 0.024),
            0 2.8px 2.1px rgba(0, 0, 0, 0.03),
            0 4.9px 3.8px rgba(0, 0, 0, 0.036),
            0 9.2px 7.1px rgba(0, 0, 0, 0.043),
            0 22px 17px rgba(0, 0, 0, 0.06)
            `,
        40: `0 0.2px 0.2px rgba(0, 0, 0, 0.02),
            0 0.4px 0.5px rgba(0, 0, 0, 0.028),
            0 0.8px 0.9px rgba(0, 0, 0, 0.035),
            0 1.3px 1.6px rgba(0, 0, 0, 0.042),
            0 2.5px 2.9px rgba(0, 0, 0, 0.05),
            0 6px 7px rgba(0, 0, 0, 0.07)`,
        50: `0 0.3px 0.3px rgba(0, 0, 0, 0.02),
            0 0.7px 0.7px rgba(0, 0, 0, 0.028),
            0 1.3px 1.3px rgba(0, 0, 0, 0.035),
            0 2.2px 2.2px rgba(0, 0, 0, 0.042),
            0 4.2px 4.2px rgba(0, 0, 0, 0.05),
            0 10px 10px rgba(0, 0, 0, 0.07)`,
        60: `0 0.3px 0.3px rgba(0, 0, 0, 0.02),
            0 0.8px 0.8px rgba(0, 0, 0, 0.028),
            0 1.5px 1.5px rgba(0, 0, 0, 0.035),
            0 2.7px 2.7px rgba(0, 0, 0, 0.042),
            0 5px 5px rgba(0, 0, 0, 0.05),
            0 12px 12px rgba(0, 0, 0, 0.07)`,
        70: `0 0.4px 0.4px rgba(0, 0, 0, 0.02),
            0 0.9px 0.9px rgba(0, 0, 0, 0.028),
            0 1.8px 1.8px rgba(0, 0, 0, 0.035),
            0 3.1px 3.1px rgba(0, 0, 0, 0.042),
            0 5.8px 5.8px rgba(0, 0, 0, 0.05),
            0 14px 14px rgba(0, 0, 0, 0.07)`,
        80: `0 0.4px 0.4px rgba(0, 0, 0, 0.02),
            0 1.1px 1.1px rgba(0, 0, 0, 0.028),
            0 2px 2px rgba(0, 0, 0, 0.035),
            0 3.6px 3.6px rgba(0, 0, 0, 0.042),
            0 6.7px 6.7px rgba(0, 0, 0, 0.05),
            0 16px 16px rgba(0, 0, 0, 0.07)`,
        90: `0 0.5px 0.5px rgba(0, 0, 0, 0.02),
            0 1.3px 1.3px rgba(0, 0, 0, 0.028),
            0 2.4px 2.4px rgba(0, 0, 0, 0.035),
            0 4.2px 4.2px rgba(0, 0, 0, 0.042),
            0 7.9px 7.9px rgba(0, 0, 0, 0.05),
            0 19px 19px rgba(0, 0, 0, 0.07)`,
        100: `0 0.6px 0.6px rgba(0, 0, 0, 0.02),
            0 1.5px 1.5px rgba(0, 0, 0, 0.028),
            0 2.8px 2.8px rgba(0, 0, 0, 0.035),
            0 4.9px 4.9px rgba(0, 0, 0, 0.042),
            0 9.2px 9.2px rgba(0, 0, 0, 0.05),
            0 22px 22px rgba(0, 0, 0, 0.07)`
    },
    gradient: {
        defaultType: 'linear',
        defaultAngle: 45,
        defaultModifier: '70'
    },
    colorSchema: {
        default: 'default',
        accent: 'primary',
        complementary: 'secondary'
    },
    color: {
        /**
         * @name                default
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #848e91
         *
         * Specify the <default>default</default> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: {
            default: '#848e91'
        },
        /**
         * @name                ui
         * @namespace           config.theme.themes.ui.color
         * @type                Color
         * @ui             #BDBDBD
         *
         * Specify the <ui>ui</ui> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ui: {
            default: '#BDBDBD'
        },
        /**
         * @name                title
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #2b3438
         *
         * Specify the <title>title</title> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        title: {
            default: '#2b3438'
        },
        /**
         * @name                text
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #848e91
         *
         * Specify the <text>text</text> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        text: {
            default: '#848e91'
        },
        /**
         * @name                link
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             primary
         *
         * Specify the <link>link</link> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        link: {
            default: '#f2bc2b'
        },
        /**
         * @name                primary
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #f2bc2b
         *
         * Specify the <primary>primary</primary> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        primary: {
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
         * @name                secondary
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #2b3438
         *
         * Specify the <secondary>secondary</secondary> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        secondary: {
            default: '#6d858f'
        },
        /**
         * @name                surface
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #ffffff
         *
         * Specify the <surface>surface</surface> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        surface: {
            default: '#ffffff'
        },
        /**
         * @name                background
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #FAFAFA
         *
         * Specify the <background>background</background> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        background: {
            default: '#FAFAFA'
        },
        /**
         * @name                success
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #5cb85c
         *
         * Specify the <success>success</success> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        success: {
            default: '#5cb85c'
        },
        /**
         * @name                warning
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #f0ad4e
         *
         * Specify the <warning>warning</warning> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        warning: {
            default: '#f0ad4e'
        },
        /**
         * @name                error
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #d9534f
         *
         * Specify the <error>error</error> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        error: {
            default: '#d9534f'
        },
        /**
         * @name                info
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #2199e8
         *
         * Specify the <info>info</info> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        info: {
            default: '#2199e8'
        },
        /**
         * @name                extension
         * @namespace           config.theme.themes.default.color
         * @type                Color
         * @default             #2b3438
         *
         * Specify the <primary>extension</primary> color value and modifiers.
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        extension: {
            default: '[config.theme.themes.default.color.primary.default]',
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
         * Declare the font size <primary>default</primary>
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
         * Declare the font size <primary>50</primary>
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
         * Declare the font size <primary>50</primary>
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
         * Declare the font size <primary>10</primary>
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
         * Declare the font size <primary>20</primary>
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
         * Declare the font size <primary>30</primary>
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
         * Declare the font size <primary>40</primary>
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
         * Declare the font size <primary>50</primary>
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
         * Declare the font size <primary>60</primary>
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
         * Declare the font size <primary>70</primary>
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
         * Declare the font size <primary>80</primary>
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
         * Declare the font size <primary>90</primary>
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
             * Declare the <primary>default</primary> font face
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
             * Declare the <primary>title</primary> font face
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
             * Declare the <primary>quote</primary> font face
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
             * Declare the <primary>code</primary> font face
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
             * Declare the font size <primary>default</primary>
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
             * Declare the font size <primary>50</primary>
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
             * Declare the font size <primary>50</primary>
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
             * Declare the font size <primary>10</primary>
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
             * Declare the font size <primary>20</primary>
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
             * Declare the font size <primary>30</primary>
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
             * Declare the font size <primary>40</primary>
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
             * Declare the font size <primary>50</primary>
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
             * Declare the font size <primary>60</primary>
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
             * Declare the font size <primary>70</primary>
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
             * Declare the font size <primary>80</primary>
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
             * Declare the font size <primary>90</primary>
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
             * Declare the font size <primary>100</primary>
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
             * Specify the <primary>0</primary> border size
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
             * Specify the <primary>10</primary> border size
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
             * Specify the <primary>20</primary> border size
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
             * Specify the <primary>30</primary> border size
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
             * Specify the <primary>40</primary> border size
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
             * Specify the <primary>50</primary> border size
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
             * Specify the <primary>60</primary> border size
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
             * Specify the <primary>70</primary> border size
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
             * Specify the <primary>80</primary> border size
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
             * Specify the <primary>90</primary> border size
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
             * Specify the <primary>0</primary> border radius
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
             * Specify the <primary>0</primary> border radius
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
             * Specify the <primary>10</primary> border radius
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
             * Specify the <primary>20</primary> border radius
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
             * Specify the <primary>30</primary> border radius
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
             * Specify the <primary>40</primary> border radius
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
             * Specify the <primary>50</primary> border radius
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
             * Specify the <primary>60</primary> border radius
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
             * Specify the <primary>70</primary> border radius
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
             * Specify the <primary>80</primary> border radius
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
             * Specify the <primary>90</primary> border radius
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
            'background-color': '[config.theme.themes.default.color.primary.30]'
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
            padding: '1em 2em',
            borderRadius: '[config.theme.themes.default.border.radius.default]',
            transition: '[config.theme.themes.default.transition.fast]',
            styles: ['default', 'outlined', 'text']
        },
        form: {
            padding: '0.5em 0.8em',
            borderRadius: '[config.theme.themes.default.border.radius.default]',
            transition: '[config.theme.themes.default.transition.fast]',
            styles: ['default:default'],
            colors: ['ui:default']
        },
        list: {
            padding: '0.5em 0.8em',
            borderRadius: '[config.theme.themes.default.border.radius.default]',
            transition: '[config.theme.themes.default.transition.fast]',
            styles: ['default'],
            colors: ['primary:default']
        }
    },
    space: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         1rem
         *
         * Specify the <primary>default</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '1rem',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         0.5rem
         *
         * Specify the <primary>0</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '0rem',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         0.2rem
         *
         * Specify the <primary>10</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '0.2rem',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         0.4rem
         *
         * Specify the <primary>20</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '0.4rem',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         0.3rem
         *
         * Specify the <primary>30</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '0.6rem',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         0.5rem
         *
         * Specify the <primary>40</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '0.8rem',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         1rem
         *
         * Specify the <primary>50</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '1rem',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         1.2rem
         *
         * Specify the <primary>60</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '1.2rem',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         1.4rem
         *
         * Specify the <primary>70</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '1.4rem',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         1.6rem
         *
         * Specify the <primary>80</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '1.6rem',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         1.8rem
         *
         * Specify the <primary>90</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '1.8rem',
        /**
         * @name            100
         * @namespace       config.theme.themes.default.space
         * @type            String
         * @default         2rem
         *
         * Specify the <primary>100</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        100: '2rem'
    },
    margin: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.default]
         *
         * Specify the <primary>default</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '[config.theme.themes.default.space.default]',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.0]
         *
         * Specify the <primary>0</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '[config.theme.themes.default.space.0]',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.10]
         *
         * Specify the <primary>10</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '[config.theme.themes.default.space.10]',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.20]
         *
         * Specify the <primary>20</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '[config.theme.themes.default.space.20]',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.30]
         *
         * Specify the <primary>30</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '[config.theme.themes.default.space.30]',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.40]
         *
         * Specify the <primary>40</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '[config.theme.themes.default.space.40]',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.50]
         *
         * Specify the <primary>50</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '[config.theme.themes.default.space.50]',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.60]
         *
         * Specify the <primary>60</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '[config.theme.themes.default.space.60]',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.70]
         *
         * Specify the <primary>70</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '[config.theme.themes.default.space.70]',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.80]
         *
         * Specify the <primary>80</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '[config.theme.themes.default.space.80]',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.margin
         * @type            String
         * @default         [config.theme.themes.default.space.90]
         *
         * Specify the <primary>90</primary> space used for padding and margin
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '[config.theme.themes.default.space.90]'
    },
    padding: {
        /**
         * @name            default
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.default]
         *
         * Specify the <primary>default</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        default: '[config.theme.themes.default.space.default]',
        /**
         * @name            0
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.0]
         *
         * Specify the <primary>0</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        0: '[config.theme.themes.default.space.0]',
        /**
         * @name            10
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.10]
         *
         * Specify the <primary>10</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        10: '[config.theme.themes.default.space.10]',
        /**
         * @name            20
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.20]
         *
         * Specify the <primary>20</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        20: '[config.theme.themes.default.space.20]',
        /**
         * @name            30
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.30]
         *
         * Specify the <primary>30</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        30: '[config.theme.themes.default.space.30]',
        /**
         * @name            40
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.40]
         *
         * Specify the <primary>40</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        40: '[config.theme.themes.default.space.40]',
        /**
         * @name            50
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.50]
         *
         * Specify the <primary>50</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        50: '[config.theme.themes.default.space.50]',
        /**
         * @name            60
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.60]
         *
         * Specify the <primary>60</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        60: '[config.theme.themes.default.space.60]',
        /**
         * @name            70
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.70]
         *
         * Specify the <primary>70</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        70: '[config.theme.themes.default.space.70]',
        /**
         * @name            80
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.80]
         *
         * Specify the <primary>80</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        80: '[config.theme.themes.default.space.80]',
        /**
         * @name            90
         * @namespace       config.theme.themes.default.padding
         * @type            String
         * @default         [config.theme.themes.default.space.90]
         *
         * Specify the <primary>90</primary> space used for padding and padding
         *
         * @since           1.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        90: '[config.theme.themes.default.space.90]'
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
            // devices based media queries
            // 'iphone-4': require('./media/iphone-4-4s'),
            // 'iphone-4s': require('./media/iphone-4-4s'),
            // 'iphone-5': require('./media/iphone-5-5s-5c-5se'),
            // 'iphone-5s': require('./media/iphone-5-5s-5c-5se'),
            // 'iphone-5c': require('./media/iphone-5-5s-5c-5se'),
            // 'iphone-5se': require('./media/iphone-5-5s-5c-5se'),
            // 'iphone-6': require('./media/iphone-6-6s-7-8'),
            // 'iphone-6s': require('./media/iphone-6-6s-7-8'),
            // 'iphone-7': require('./media/iphone-6-6s-7-8'),
            // 'iphone-8': require('./media/iphone-6-6s-7-8'),
            // 'iphone-6+': require('./media/iphone-6+-7+-8+'),
            // 'iphone-7+': require('./media/iphone-6+-7+-8+'),
            // 'iphone-8+': require('./media/iphone-6+-7+-8+'),
            // 'iphone-x': require('./media/iphone-x'),
            // 'galaxy-s3': require('./media/galaxy-s3'),
            // 'galaxy-s4': require('./media/galaxy-s4-s5-note3'),
            // 'galaxy-s5': require('./media/galaxy-s4-s5-note3'),
            // 'galaxy-note3': require('./media/galaxy-s4-s5-note3'),
            // 'galaxy-s6': require('./media/galaxy-s6'),
            // pixel: require('./media/pixel'),
            // 'pixel-xl': require('./media/pixel-xl'),
            // 'htc-one': require('./media/htc-one'),
            // windows: require('./media/windows'),
            // 'ipad-1': require('./media/ipad-1-2-mini-air'),
            // 'ipad-2': require('./media/ipad-1-2-mini-air'),
            // 'ipad-mini': require('./media/ipad-1-2-mini-air'),
            // 'ipad-air': require('./media/ipad-1-2-mini-air'),
            // 'ipad-3': require('./media/ipad-3-4-pro9'),
            // 'ipad-4': require('./media/ipad-3-4-pro9'),
            // 'ipad-pro9': require('./media/ipad-3-4-pro9'),
            // 'ipad-pro10': require('./media/ipad-pro10'),
            // 'ipad-pro12': require('./media/ipad-pro12'),
            // 'galaxy-tab2': require('./media/galaxy-tab2'),
            // 'galaxy-tabs': require('./media/galaxy-tabs'),
            // 'nexus-7': require('./media/nexus-7'),
            // 'nexus-8': require('./media/nexus-7'),
            // 'nexus-9': require('./media/nexus-9'),
            // 'kindle-fire-hd-7': require('./media/kindle-fire-hd-7'),
            // 'kindle-fire-hd-8': require('./media/kindle-fire-hd-8')
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVMaWdodC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZUxpZ2h0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ2IsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLElBQUksRUFBRSxxQkFBcUI7S0FDNUI7SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTLEVBQUU7WUFDVCxXQUFXLEVBQUUsUUFBUTtTQUN0QjtRQUNELE1BQU0sRUFBRTtZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsT0FBTztZQUNkLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsV0FBVztZQUNwQixRQUFRLEVBQUUsYUFBYTtTQUN4QjtLQUNGO0lBRUQsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLEVBQUUsRUFBRSxHQUFHLENBQUM7UUFDZCxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDWixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDWixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7S0FDYjtJQUVELEtBQUssRUFBRTtRQUNMLENBQUMsRUFBRSxHQUFHO1FBQ04sRUFBRSxFQUFFOzs7OzswQ0FLa0M7UUFDdEMsRUFBRSxFQUFFOzs7Ozs7YUFNSztRQUNULEVBQUUsRUFBRTs7Ozs7O2FBTUs7UUFDVCxFQUFFLEVBQUU7Ozs7OzBDQUtrQztRQUN0QyxFQUFFLEVBQUU7Ozs7OzRDQUtvQztRQUN4QyxFQUFFLEVBQUU7Ozs7OzRDQUtvQztRQUN4QyxFQUFFLEVBQUU7Ozs7OzRDQUtvQztRQUN4QyxFQUFFLEVBQUU7Ozs7OzRDQUtvQztRQUN4QyxFQUFFLEVBQUU7Ozs7OzRDQUtvQztRQUN4QyxH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