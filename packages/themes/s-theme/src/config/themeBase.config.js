export default function (env, config) {
    return {
        easing: {
            default: 'cubic-bezier(0.700, 0.000, 0.305, 0.995)',
        },
        timing: {
            slow: '.6s',
            default: '.3s',
            fast: '.1s',
        },
        transition: {
            slow: 'all [theme.timing.slow] [theme.easing.default]',
            default: 'all [theme.timing.default] [theme.easing.default]',
            fast: 'all [theme.timing.fast] [theme.easing.default]',
        },
        helpers: {
            clearfix: {
                /**
                 * @name            default
                 * @namespace       theme.helpers.clearfix
                 * @type            String
                 * @values          'overflow' | 'facebook' | 'float' | 'micro' | 'after'
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
                 * @namespace       theme.helpers.disabled
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
                 * @namespace           theme.helpers.truncate
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
                    'max-width': '1280px',
                },
                full: {
                    'max-width': 'none',
                },
            },
            grid: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
                11: 11,
                12: 12,
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
                '122222': '1 2 2 2 2 2',
                '111112': '1 1 1 1 1 2',
                '12345': '1 2 3 4 5',
                '123456': '1 2 3 4 5 6',
            },
        },
        ratio: {
            '1': 1,
            '21-9': 21 / 9,
            '16-9': 16 / 9,
            '2-3': 2 / 3,
            '4-3': 4 / 3,
            '3-4': 3 / 4,
        },
        scalable: {
            margin: false,
            padding: true,
            font: true,
        },
        scale: {
            '01': 0.1,
            '02': 0.2,
            '03': 0.3,
            '04': 0.4,
            '05': 0.5,
            '06': 0.6,
            '07': 0.7,
            '08': 0.8,
            '09': 0.9,
            '10': 1,
            '11': 1.1,
            '12': 1.2,
            '13': 1.3,
            '14': 1.4,
            '15': 1.5,
            '16': 1.6,
            '17': 1.7,
            '18': 1.8,
            '19': 1.9,
            '20': 2,
        },
        opacity: {
            '0': 0,
            '10': 0.1,
            '20': 0.2,
            '30': 0.3,
            '40': 0.4,
            '50': 0.5,
            '60': 0.6,
            '70': 0.7,
            '80': 0.8,
            '90': 0.9,
            '100': 1,
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
            '100': '100%',
        },
        depth: {
            default: '[theme.depth.50]',
            0: '0',
            10: `0px 0.6px 0.4px rgba(0, 0, 0, 0.006),
  0px 1.3px 1px rgba(0, 0, 0, 0.008),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),
  0px 20px 15px rgba(0, 0, 0, 0.02)`,
            20: `0px 0.6px 0.4px rgba(0, 0, 0, 0.006),
  0px 1.3px 1px rgba(0, 0, 0, 0.008),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),
  0px 20px 15px rgba(0, 0, 0, 0.02)`,
            30: `0px 0.6px 0.4px rgba(0, 0, 0, 0.008),
  0px 1.3px 1px rgba(0, 0, 0, 0.012),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),
  0px 20px 15px rgba(0, 0, 0, 0.03)`,
            40: `0px 0.8px 0.6px rgba(0, 0, 0, 0.008),
  0px 2px 1.3px rgba(0, 0, 0, 0.012),
  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),
  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),
  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),
  0px 30px 20px rgba(0, 0, 0, 0.03)`,
            50: `0px 1px 0.8px rgba(0, 0, 0, 0.011),
  0px 2.3px 2px rgba(0, 0, 0, 0.016),
  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),
  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),
  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),
  0px 35px 30px rgba(0, 0, 0, 0.04)`,
            60: `0px 1px 0.7px rgba(0, 0, 0, 0.011),
  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),
  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),
  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),
  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),
  0px 35px 25px rgba(0, 0, 0, 0.04)`,
            70: `0px 1.1px 0.8px rgba(0, 0, 0, 0.011),
  0px 2.7px 2px rgba(0, 0, 0, 0.016),
  0px 5px 3.8px rgba(0, 0, 0, 0.02),
  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),
  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),
  0px 40px 30px rgba(0, 0, 0, 0.04)`,
            80: `0px 1.1px 1px rgba(0, 0, 0, 0.011),
  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),
  0px 5px 4.4px rgba(0, 0, 0, 0.02),
  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),
  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),
  0px 40px 35px rgba(0, 0, 0, 0.04)`,
            90: `0px 1.4px 1.1px rgba(0, 0, 0, 0.011),
  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),
  0px 6.1px 5px rgba(0, 0, 0, 0.02),
  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),
  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),
  0px 49px 40px rgba(0, 0, 0, 0.04)`,
            100: `0px 1.4px 1.4px rgba(0, 0, 0, 0.011),
  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),
  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),
  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),
  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),
  0px 49px 52px rgba(0, 0, 0, 0.04)`,
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
             * @default       0.25rem
             *
             * Declare the font size <s-color="accent">50</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            0: '0.25rem',
            /**
             * @name          5
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       0.5rem
             *
             * Declare the font size <s-color="accent">50</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            5: '0.5rem',
            /**
             * @name          10
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       0.65rem
             *
             * Declare the font size <s-color="accent">10</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '0.65rem',
            /**
             * @name          20
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       0.75rem
             *
             * Declare the font size <s-color="accent">20</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '0.75rem',
            /**
             * @name          30
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       1rem
             *
             * Declare the font size <s-color="accent">30</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '1rem',
            /**
             * @name          40
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       1.25rem
             *
             * Declare the font size <s-color="accent">40</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '1.25rem',
            /**
             * @name          50
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       1.50rem
             *
             * Declare the font size <s-color="accent">50</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '1.50em',
            /**
             * @name          60
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       2rem
             *
             * Declare the font size <s-color="accent">60</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '2rem',
            /**
             * @name          70
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       2.5rem
             *
             * Declare the font size <s-color="accent">70</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '2.5rem',
            /**
             * @name          80
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       3rem
             *
             * Declare the font size <s-color="accent">80</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '3rem',
            /**
             * @name          90
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       4rem
             *
             * Declare the font size <s-color="accent">90</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '4rem',
            /**
             * @name          100
             * @namespace     config.theme.themes.default.size
             * @type          String
             * @default       5rem
             *
             * Declare the font size <s-color="accent">100</s-color>
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '5rem',
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
                    import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap',
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
                    import: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap',
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
                    'cap-height': 0.65,
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
                    'cap-height': 0.65,
                },
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
                 * @default       [theme.size.default]
                 *
                 * Declare the font size <s-color="accent">default</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '[theme.size.default]',
                /**
                 * @name          0
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.0]
                 *
                 * Declare the font size <s-color="accent">0</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '[theme.size.0]',
                /**
                 * @name          5
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.5]
                 *
                 * Declare the font size <s-color="accent">5</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                5: '[theme.size.5]',
                /**
                 * @name          10
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.10]
                 *
                 * Declare the font size <s-color="accent">10</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '[theme.size.10]',
                /**
                 * @name          20
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.20]
                 *
                 * Declare the font size <s-color="accent">20</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '[theme.size.20]',
                /**
                 * @name          30
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.30]
                 *
                 * Declare the font size <s-color="accent">30</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '[theme.size.30]',
                /**
                 * @name          40
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.40]
                 *
                 * Declare the font size <s-color="accent">40</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '[theme.size.40]',
                /**
                 * @name          50
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default       [theme.size.50]
                 *
                 * Declare the font size <s-color="accent">50</s-color>
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
                 * Declare the font size <s-color="accent">60</s-color>
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
                 * Declare the font size <s-color="accent">70</s-color>
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
                 * Declare the font size <s-color="accent">80</s-color>
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
                 * Declare the font size <s-color="accent">90</s-color>
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '[theme.size.90]',
                /**
                 * @name          10
                 * @namespace     config.theme.themes.default.font.size
                 * @type          String
                 * @default      [theme.size.100]
                 *
                 * Declare the font size <s-color="accent">100</s-color>
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
                 * @namespace         config.theme.themes.border.width
                 * @type              Number
                 * @default           [theme.border.width.10]
                 *
                 * Specify the <s-color="accent">default</s-color> border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                default: '[theme.border.width.10]',
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
                90: '24px',
                /**
                 * @name              100
                 * @namespace         config.theme.themes.border.width
                 * @type              Number
                 * @default           30px
                 *
                 * Specify the <s-color="accent">90</s-color> border width
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                100: '30px',
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
                 * @default           0
                 *
                 * Specify the <s-color="accent">0</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                0: '0',
                /**
                 * @name              10
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           4px
                 *
                 * Specify the <s-color="accent">10</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                10: '4px',
                /**
                 * @name              20
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           8px
                 *
                 * Specify the <s-color="accent">20</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                20: '8px',
                /**
                 * @name              30
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           12px
                 *
                 * Specify the <s-color="accent">30</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                30: '12px',
                /**
                 * @name              40
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           16px
                 *
                 * Specify the <s-color="accent">40</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                40: '16px',
                /**
                 * @name              50
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           20px
                 *
                 * Specify the <s-color="accent">50</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                50: '20px',
                /**
                 * @name              60
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           26px
                 *
                 * Specify the <s-color="accent">60</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                60: '26px',
                /**
                 * @name              70
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           32px
                 *
                 * Specify the <s-color="accent">70</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                70: '32px',
                /**
                 * @name              80
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           40px
                 *
                 * Specify the <s-color="accent">80</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                80: '40px',
                /**
                 * @name              90
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           50px
                 *
                 * Specify the <s-color="accent">90</s-color> border radius
                 *
                 * @since             2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                90: '50px',
                /**
                 * @name              100
                 * @namespace         config.theme.themes.default.border.radius
                 * @type              Number
                 * @default           60px
                 *
                 * Specify the <s-color="accent">90</s-color> border radius
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
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         3rem
             *
             * Specify the <primary>default</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            default: '3rem',
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
             * @default         0.375rem
             *
             * Specify the <primary>10</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            10: '0.375rem',
            /**
             * @name            20
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         0.75rem
             *
             * Specify the <primary>20</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            20: '0.75rem',
            /**
             * @name            30
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         1.5rem
             *
             * Specify the <primary>30</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            30: '1.5rem',
            /**
             * @name            40
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         2.25rem
             *
             * Specify the <primary>40</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            40: '2.25rem',
            /**
             * @name            50
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         3rem
             *
             * Specify the <primary>50</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            50: '3rem',
            /**
             * @name            60
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         3.75rem
             *
             * Specify the <primary>60</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            60: '3.75rem',
            /**
             * @name            70
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         4.5rem
             *
             * Specify the <primary>70</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            70: '4.5rem',
            /**
             * @name            80
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         5.25
             *
             * Specify the <primary>80</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            80: '5.25',
            /**
             * @name            90
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         6rem
             *
             * Specify the <primary>90</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            90: '6rem',
            /**
             * @name            100
             * @namespace       config.theme.themes.default.space
             * @type            String
             * @default         6.75rem
             *
             * Specify the <primary>100</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '6.75rem',
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
            90: '[theme.space.90]',
            /**
             * @name            100
             * @namespace       config.theme.themes.default.margin
             * @type            String
             * @default         [theme.space.100]
             *
             * Specify the <primary>100</s-color> space used for padding and margin
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '[theme.space.100]',
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
            90: '[theme.space.90]',
            /**
             * @name            100
             * @namespace       config.theme.themes.default.padding
             * @type            String
             * @default         [theme.space.90]
             *
             * Specify the <primary>100</s-color> space used for padding and padding
             *
             * @since           1.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            100: '[theme.space.100]',
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
                    'max-width': 639,
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
                    'max-width': 1279,
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
                    'max-width': null,
                },
            },
        },
        components: {
            's-code-example': {
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
        },
        ui: {
            default: {
                paddingInline: '1.5em',
                paddingBlock: '0.75em',
                borderRadius: '[theme.border.radius.default]',
                borderWidth: '[theme.border.width.default]',
                transition: '[theme.transition.fast]',
                defaultColor: 'main',
                depth: '[theme.depth.default]',
                rhythmVertical: {
                    'margin-bottom': 40,
                },
            },
            form: {
                paddingInline: '0.75em',
                paddingBlock: '0.375em',
                borderRadius: '[theme.border.radius.default]',
                borderWidth: '[theme.border.width.default]',
                transition: '[theme.transition.fast]',
                outline: '[theme.ui.outline.active]',
                defaultColor: 'accent',
                depth: '[theme.depth.default]',
                rhythmVertical: {
                    'margin-bottom': 40,
                },
            },
            outline: {
                active: true,
                borderWidth: '10px',
                borderRadius: '[theme.border.radius.default]',
                transition: 'all .2s ease-out',
            },
            scrollbar: {
                size: '2px',
                defaultColor: '[theme.ui.default.defaultColor]',
            },
            button: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.default.depth]',
                defaultStyle: 'solid',
                defaultColor: '[theme.ui.default.defaultColor]',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            avatar: {
                borderWidth: '2px',
                borderRadius: '[theme.ui.default.borderRadius]',
                transition: '[theme.ui.default.transition]',
                depth: '[theme.ui.default.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            colorPicker: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            datePicker: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            input: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                defaultStyle: 'solid',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            radio: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '0.5em',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            checkbox: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '0.2em',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            range: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                defaultStyle: 'solid',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            label: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                depth: '[theme.ui.form.depth]',
                defaultStyle: 'inline',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            select: {
                paddingInline: '[theme.ui.form.paddingInline]',
                paddingBlock: '[theme.ui.form.paddingBlock]',
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.form.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            switch: {
                borderRadius: '[theme.ui.form.borderRadius]',
                borderWidth: '[theme.ui.form.borderWidth]',
                transition: '[theme.ui.default.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.form.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            dropdown: {
                paddingInline: '[theme.ui.default.paddingBlock]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                outline: '[theme.ui.outline.active]',
                depth: '[theme.ui.default.depth]',
                defaultStyle: 'solid',
                defaultColor: '[theme.ui.default.defaultColor]',
            },
            list: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                bulletChar: '●',
                depth: '[theme.ui.default.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'ul',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            fsTree: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                bulletChar: '●',
                depth: '[theme.ui.default.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            tabs: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                outline: '[theme.ui.outline.active]',
                depth: 0,
                defaultStyle: 'solid',
            },
            terminal: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                depth: '[theme.ui.default.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            tooltip: {
                paddingInline: '[theme.ui.default.paddingBlock]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                depth: '[theme.ui.default.depth]',
                arrowSize: '20px',
            },
            // pre: {
            //   paddingInline: '[theme.ui.default.paddingInline]',
            //        paddingBlock: '[theme.ui.default.paddingBlock]',
            //   borderRadius: '[theme.ui.default.borderRadius]',
            //   transition: '[theme.ui.default.transition]',
            //   depth: '[theme.ui.default.depth]',
            //   lineHeight: 2,
            //   styles: ['default'],
            //   defaultColor: '[theme.ui.default.defaultColor]',
            //   'rhythmVertical': '[theme.ui.default.rhythmVertical]'
            // },
            code: {
                paddingInline: '[theme.padding.50]',
                paddingBlock: '[theme.padding.50]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                depth: '[theme.ui.default.depth]',
                styles: ['default:default'],
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            blockquote: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                depth: '[theme.ui.default.depth]',
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            table: {
                paddingInline: '[theme.ui.default.paddingInline]',
                paddingBlock: '[theme.ui.default.paddingBlock]',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.border.width.10]',
                transition: '[theme.ui.default.transition]',
                depth: 0,
                defaultColor: '[theme.ui.default.defaultColor]',
                defaultStyle: 'solid',
                formatText: true,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            badge: {
                paddingInline: '.65em',
                paddingBlock: '.35em',
                borderRadius: '[theme.ui.default.borderRadius]',
                borderWidth: '[theme.ui.default.borderWidth]',
                transition: '[theme.ui.default.transition]',
                defaultStyle: 'solid',
                depth: 0,
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
            loader: {
                duration: '1s',
                easing: 'linear',
            },
            loaderSpinner: {
                duration: '[theme.ui.loader.duration]',
                easing: '[theme.ui.loader.easing]',
            },
        },
        typo: {
            h1: {
                'font-family': 'title',
                'font-size': 90,
                'line-height': 1,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 40,
                },
            },
            h2: {
                'font-family': 'title',
                'font-size': 80,
                'line-height': 1,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 30,
                },
            },
            h3: {
                'font-family': 'title',
                'font-size': 70,
                'line-height': 1,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 30,
                },
            },
            h4: {
                'font-family': 'title',
                'font-size': 60,
                'line-height': 1.2,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 30,
                },
            },
            h5: {
                'font-family': 'title',
                'font-size': 50,
                'line-height': 1.2,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 20,
                },
            },
            h6: {
                'font-family': 'title',
                'font-size': 40,
                'line-height': 1.2,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 20,
                },
            },
            p: {
                'font-family': 'default',
                'font-size': 30,
                'line-height': 1.5,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 30,
                },
            },
            lead: {
                'font-family': 'default',
                'font-size': 50,
                'line-height': 1.2,
                'max-width': '55ch',
                rhythmVertical: {
                    'margin-bottom': 30,
                },
            },
            hr: {
                color: '[theme.color.main.color]',
                opacity: 0.2,
                rhythmVertical: {
                    'margin-bottom': 30,
                },
            },
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
                    'margin-bottom': 30,
                },
            },
            'code:not(pre > code)': {
                display: 'inline-block',
                'font-family': 'code',
                color: ['main', 'text'],
                'background-color': ['main', 'surface'],
                paddingInline: 0,
                paddingBlock: 0,
            },
            a: {
                color: 'accent',
            },
            quote: {
                'font-family': 'quote',
            },
            b: {
                'font-weight': 'bold',
            },
            bold: {
                'font-weight': 'bold',
            },
            strong: {
                'font-weight': 'bold',
            },
            i: {
                'font-style': 'italic',
            },
            italic: {
                'font-style': 'italic',
            },
            em: {
                'font-style': 'italic',
            },
            small: {
                'font-size': '0.5em',
            },
            mark: {
                'background-color': '[theme.color.accent.color]',
                color: '[theme.color.accent.foreground]',
            },
            del: {
                'text-decoration': 'line-through',
            },
            ins: {
                'text-decoration': 'underline',
            },
            sub: {
                'vertical-align': 'sub',
                'font-size': '0.6em',
            },
            sup: {
                'vertical-align': 'sup',
                'font-size': '0.6em',
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVCYXNlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoZW1lQmFzZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osT0FBTyxFQUFFLDBDQUEwQztTQUN0RDtRQUVELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsS0FBSztTQUNkO1FBRUQsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLGdEQUFnRDtZQUN0RCxPQUFPLEVBQUUsbURBQW1EO1lBQzVELElBQUksRUFBRSxnREFBZ0Q7U0FDekQ7UUFFRCxPQUFPLEVBQUU7WUFDTCxRQUFRLEVBQUU7Z0JBQ047Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILE9BQU8sRUFBRSxVQUFVO2FBQ3RCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsUUFBUSxFQUFFO2dCQUNOOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxLQUFLLEVBQUUsRUFBRTthQUNaO1NBQ0o7UUFFRCxNQUFNLEVBQUU7WUFDSixTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFO29CQUNMLFdBQVcsRUFBRSxRQUFRO2lCQUN4QjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsV0FBVyxFQUFFLE1BQU07aUJBQ3RCO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0os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