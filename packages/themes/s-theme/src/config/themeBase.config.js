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
        color: {
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
                ts: '#0374C1',
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