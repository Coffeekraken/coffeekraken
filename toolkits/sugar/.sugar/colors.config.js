/**
 * @name                colors
 * @namespace           config
 * @type                Object
 *
 * This config file delare the colors used in the project. Each colors are defined
 * by a ```color``` property that contain the actual color hexadecimal code and can
 * have a ```modifiers``` property that specify some color variants like "light", "dark", etc...
 * Here's the list of available modifiers actions:
 * - hue {Deg}
 * - lighten {Percent}
 * - darken {Percent}
 * - saturate {Percent}
 * - desaturate {Percent}
 * - grayscale {Boolean}
 * - complement {Boolean}
 * - invert {Boolean}
 * - opacity {Percent}
 * - mix {Color}
 * - lightness {Percent}
 * - saturation {Percent}
 *
 * @example         js
 * {
 *    scss: {
 *      colors: {
 *        default: {
 *          color: '#ff0000',
 *          modifiers: {
 *            light: '-lighten 10% -opacity 50%'
 *          }
 *        }
 *      }
 *    }
 * }
 *
 * @since           1.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {
  /**
   * @name                default
   * @namespace           config.colors
   * @type                Color
   * @default             #848e91
   *
   * Specify the <default>default</default> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#848e91) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: {
    color: '#848e91',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                title
   * @namespace           config.colors
   * @type                Color
   * @default             #2b3438
   *
   * Specify the <title>title</title> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#2b3438) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  title: {
    color: '#2b3438',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                text
   * @namespace           config.colors
   * @type                Color
   * @default             #848e91
   *
   * Specify the <text>text</text> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#848e91) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  text: {
    color: '#848e91',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                link
   * @namespace           config.colors
   * @type                Color
   * @default             primary
   *
   * Specify the <link>link</link> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#primary) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  link: {
    color: 'primary',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                light
   * @namespace           config.colors
   * @type                Object
   * @default             #f8f9fa
   *
   * Specify the <light>light</light> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#f8f9fa) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  light: {
    color: '#f8f9fa',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                dark
   * @namespace           config.colors
   * @type                Object
   * @default             #343a40
   *
   * Specify the <dark>dark</dark> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#343a40) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  dark: {
    color: '#343a40',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                primary
   * @namespace           config.colors
   * @type                Color
   * @default             #f2bc2b
   *
   * Specify the <primary>primary</primary> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#f2bc2b) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  primary: {
    color: '#f2bc2b',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                secondary
   * @namespace           config.colors
   * @type                Color
   * @default             #2b3438
   *
   * Specify the <secondary>secondary</secondary> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#2b3438) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  secondary: {
    color: '#2b3438',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                success
   * @namespace           config.colors
   * @type                Color
   * @default             #5cb85c
   *
   * Specify the <success>success</success> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#5cb85c) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  success: {
    color: '#5cb85c',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                warning
   * @namespace           config.colors
   * @type                Color
   * @default             #f0ad4e
   *
   * Specify the <warning>warning</warning> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#f0ad4e) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  warning: {
    color: '#f0ad4e',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                error
   * @namespace           config.colors
   * @type                Color
   * @default             #d9534f
   *
   * Specify the <error>error</error> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#d9534f) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error: {
    color: '#d9534f',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  },

  /**
   * @name                info
   * @namespace           config.colors
   * @type                Color
   * @default             #2199e8
   *
   * Specify the <info>info</info> color value and modifiers.
   * The color object format has to follow these guidelines:
   * - color (#2199e8) {Color}: Specify the default color
   * - modifiers ({}) (Object): Specify the modifiers available for this color:
   *   - light (-opacity 33%) {String}: The light modifier
   *   - dark (-darken 10%) {String}: The dark modifier
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  info: {
    color: '#2199e8',
    modifiers: {
      light: '-opacity 33%',
      dark: '-darken 10%'
    }
  }
};
