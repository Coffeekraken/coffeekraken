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
   * Specify the <default>default</default> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: {
    color: '#848e91'
  },

  /**
   * @name                title
   * @namespace           config.colors
   * @type                Color
   * @default             #2b3438
   *
   * Specify the <title>title</title> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  title: {
    color: '#2b3438'
  },

  /**
   * @name                text
   * @namespace           config.colors
   * @type                Color
   * @default             #848e91
   *
   * Specify the <primary>text</primary> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  text: {
    color: '#848e91'
  },

  /**
   * @name                link
   * @namespace           config.colors
   * @type                Color
   * @default             primary
   *
   * Specify the <primary>link</primary> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  link: {
    color: 'primary'
  },

  /**
   * @name                primary
   * @namespace           config.colors
   * @type                Color
   * @default             #f2bc2b
   *
   * Specify the <primary>primary</primary> color value
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
   * Specify the <secondary>secondary</secondary> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  secondary: {
    color: '#2b3438'
  },

  /**
   * @name                success
   * @namespace           config.colors
   * @type                Color
   * @default             #5cb85c
   *
   * Specify the <success>success</success> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  success: {
    color: '#5cb85c'
  },

  /**
   * @name                warning
   * @namespace           config.colors
   * @type                Color
   * @default             #f0ad4e
   *
   * Specify the <warning>warning</warning> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  warning: {
    color: '#f0ad4e'
  },

  /**
   * @name                error
   * @namespace           config.colors
   * @type                Color
   * @default             #d9534f
   *
   * Specify the <error>error</error> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error: {
    color: '#d9534f'
  },

  /**
   * @name                info
   * @namespace           config.colors
   * @type                Color
   * @default             #2199e8
   *
   * Specify the <info>info</info> color value
   *
   * @since             2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  info: {
    color: '#2199e8'
  }
};
