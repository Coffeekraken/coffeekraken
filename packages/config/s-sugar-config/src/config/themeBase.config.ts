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
        import:
          'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
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
        import:
          'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
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
  },

  ui: {
    button: {
      padding: '[theme.padding.20] [theme.padding.30]',
      borderRadius: '[theme.border.radius.default]',
      transition: '[theme.transition.fast]',
      defaultStyle: 'gradient',
      ':gradient': {}
      // ':outline': {},
      // ':text': {}
    },
    form: {
      padding: '10 20',
      borderRadius: '[theme.border.radius.default]',
      transition: '[theme.transition.fast]',
      styles: ['default:default']
    },
    list: {
      padding: '0.5em 0.8em',
      borderRadius: '[theme.border.radius.default]',
      transition: '[theme.transition.fast]',
      styles: ['default'],
      colors: ['primary:default']
    }
  }

  //   typo: {
  //     h1: {
  //       'font-family': 'title',
  //       'font-size': 80,
  //       color: 'primary',
  //       'margin-bottom': 80
  //     },
  //     h2: {
  //       'font-family': 'title',
  //       'font-size': 70,
  //       color: 'primary',
  //       'margin-bottom': 70
  //     },
  //     h3: {
  //       'font-family': 'title',
  //       'font-size': 60,
  //       color: 'text',
  //       'margin-bottom': 60
  //     },
  //     h4: {
  //       'font-family': 'title',
  //       'font-size': 50,
  //       color: 'text',
  //       'margin-bottom': 50
  //     },
  //     h5: {
  //       'font-family': 'title',
  //       'font-size': 40,
  //       color: 'text',
  //       'margin-bottom': 50
  //     },
  //     h6: {
  //       'font-family': 'title',
  //       'font-size': 30,
  //       color: 'text',
  //       'margin-bottom': 50
  //     },
  //     'p-lead': {
  //       'font-family': 'default',
  //       'font-size': 70,
  //       color: 'text',
  //       'margin-bottom': 50
  //     },
  //     p: {
  //       'font-family': 'default',
  //       'font-size': 50,
  //       color: 'text',
  //       'margin-bottom': 50
  //     },
  //     b: {
  //       'font-weight': 'bold'
  //     },
  //     strong: {
  //       'font-weight': 'bold'
  //     },
  //     i: {
  //       'font-style': 'italic'
  //     },
  //     em: {
  //       'font-style': 'italic'
  //     },
  //     small: {
  //       'font-size': '0.5em'
  //     },
  //     mark: {
  //       'background-color': '[theme.color.primary.30]'
  //     },
  //     del: {
  //       'text-decoration': 'line-through'
  //     },
  //     ins: {
  //       'text-decoration': 'underline'
  //     },
  //     sub: {
  //       'vertical-align': 'sub',
  //       'font-size': '0.6em'
  //     },
  //     sup: {
  //       'vertical-align': 'sup',
  //       'font-size': '0.6em'
  //     }
  //   }
};
