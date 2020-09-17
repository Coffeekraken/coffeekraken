module.exports = {
  /**
   * @name            font-family
   * @namespace       config.typography
   * @type            String
   * @default         default
   *
   * Set the font to use by default. Has to be a font that exists in the config ```fonts```
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'font-family': 'default',

  /**
   * @name            font-size
   * @namespace       config.typography
   * @type            String
   * @default         16px
   *
   * Set the font size to use by default
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'font-size': '16px',

  /**
   * @name            font-sizes
   * @namespace       config.typography
   * @type            Object
   * @default         null
   *
   * Object of font-sizes by media. The object format is { size: media }
   *
   * @example         js
   * {
   *   typography: {
   *     'font-sizes': {
   *       '20px': '(min-width: 500px) and (max-width: 1500px)'
   *     }
   *   }
   * }
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'font-sizes': null,

  /**
   * @name            line-letters-count
   * @namespace       config.typography
   * @type            Number
   * @default         55
   *
   * Optimal letters count in a line
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'line-letters-count': 55,

  /**
   * @name              text-format-class
   * @namespace         config.typography
   * @type              String
   * @default           tf
   *
   * Specify the scope class name to generate in order to apply the text formatting on some elements
   *
   * @since             1.0.0
   * @see               https://www.npmjs.com/package/modularscale-sass
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'text-format-class': 'tf',

  /**
   * @name              vertical-rhythm-class
   * @namespace         config.typography
   * @type              String
   * @default           vr
   *
   * Specify the scope class name to generate in order to apply the vertical rhythm on some elements
   *
   * @since             1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'vertical-rhythm-class': 'vr',

  /**
   * @name            titles
   * @namespace       config.typography
   * @type            Object
   * @default         {}
   *
   * Set the typography classes parameters like for h1, h2, etc...
   * These will gives you access to classes formated like that: s-#{$key} => s-h1, s-h2, s-h3, etc...
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  titles: {
    h1: {
      'font-family': 'title',
      'font-size': 'bigger'
    },
    h2: {
      'font-family': 'title',
      'font-size': 'big'
    },
    h3: {
      'font-family': 'title',
      'font-size': 'medium'
    },
    h4: {
      'font-family': 'title',
      'font-size': 'default'
    },
    h5: {
      'font-family': 'title',
      'font-size': 'small'
    },
    h6: {
      'font-family': 'title',
      'font-size': 'smaller'
    }
  },

  /**
   * @name            paragraphs
   * @namespace       config.typography
   * @type            Object
   * @default         {}
   *
   * Set the typography classes parameters like for all the paragraphs.
   * These will gives you access to classes formated like that: s-p--#{$key} => s-p, s-p--head, etc...
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  paragraphs: {
    default: {
      'font-family': 'title',
      'font-size': 'medium',
      'line-height': '2rem'
    },
    head: {
      'font-family': 'default',
      'font-size': 'big',
      'line-height': '3rem'
    }
  }
  // blockquote: {
  //   'font-family': 'code',
  //   'font-size': 'default'
  // },
  // code: {
  //   'font-family': 'code',
  //   'font-size': 'default'
  // }
  // }
};
