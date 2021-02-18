export default {
  /**
   * @name            defaultFontSize
   * @namespace       config.fonts
   * @type            String|Number
   * @default         16
   *
   * Specify which of the font-sizes values is the default one.
   * The default one mean that it's the base font-size applied to
   * all the website through the ```body``` element
   *
   * @since           2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  defaultFontSize: 16,

  /**
   * @name            defaultFontFamily
   * @namespace       config.fonts
   * @type            String
   * @default         default
   *
   * Specify which of the font families has to be used as the default one
   * to be applied on all the website through the ```body``` element
   *
   * @since           2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  defaultFontFamily: 'default',

  /**
   * @name            families
   * @namespace       config.fonts
   * @type            Object
   *
   * Store the font families that will be available in the project
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  families: {
    /**
     * @name            default
     * @namespace       config.fonts.families
     * @type            Object
     *
     * Declare the <primary>default</primary> font face
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    default: {
      'font-family': 'Titillium Web',
      'font-weight': 400,
      import:
        'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap'
    },

    /**
     * @name            title
     * @namespace       config.fonts.families
     * @type            Object
     *
     * Declare the <primary>title</primary> font face
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    title: {
      'font-family': 'Titillium Web',
      'font-weight': 700,
      import:
        'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap'
    },

    /**
     * @name            quote
     * @namespace       config.fonts.families
     * @type            Object
     *
     * Declare the <primary>quote</primary> font face
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    quote: {
      'font-family': 'Palatino, Times, Georgia, serif',
      'font-weight': 'normal',
      'font-style': 'normal',
      'font-display': 'auto',
      'cap-height': 0.65
    },

    /**
     * @name            code
     * @namespace       config.fonts.families
     * @type            Object
     *
     * Declare the <primary>code</primary> font face
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
   * @name            sizes
   * @namespace       config.fonts
   * @type            Object
   *
   * Store the font sizes that will be available in the project
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sizes: {
    /**
     * @name          0
     * @namespace     config.fonts.sizes
     * @type          String
     * @default       0px
     *
     * Declare the font size <primary>0</primary>
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    0: '0px',

    /**
     * @name          10
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
     * @type          String
     * @default       20px
     *
     * Declare the font size <primary>50</primary>
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    50: '20px',

    /**
     * @name          60
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
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
     * @namespace     config.fonts.sizes
     * @type          String
     * @default       52px
     *
     * Declare the font size <primary>90</primary>
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    90: '52px',

    /**
     * @name          100
     * @namespace     config.fonts.sizes
     * @type          String
     * @default       68px
     *
     * Declare the font size <primary>100</primary>
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    100: '68px'
  }
};
