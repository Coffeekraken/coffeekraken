module.exports = {
  /**
   * @name            font-family
   * @namespace       sugar.config.typography
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
   * @namespace       sugar.config.typography
   * @type            String
   * @default         14px
   *
   * Set the font size to use by default
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'font-size': '14px',

  /**
   * @name            font-sizes
   * @namespace       sugar.config.typography
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
   * @namespace       sugar.config.typography
   * @type            Number
   * @default         55
   *
   * Optimal letters count in a line
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'line-letters-count': 55,

  format: {
    'h1 h2 h3 h4 h5 h6': {
      'font-family': 'title'
    },
    h1: {
      'font-size': 'bigger'
    },
    h2: {
      'font-size': 'big'
    },
    h3: {
      'font-size': 'medium'
    },
    h4: {
      'font-size': 'default'
    },
    h5: {
      'font-size': 'small'
    },
    h6: {
      'font-size': 'smaller'
    },
    p: {
      'font-size': 'medium',
      'line-height': '2rem'
    },
    'blockquote code': {
      'font-family': 'code',
      'font-size': 'default'
    }
  }
};
