module.exports = {
  /**
   * @name            default
   * @namespace       sugar.config.fonts
   * @type            Object
   *
   * Declare the <primary>default</primary> font face
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  default: {
    'font-family': 'Roboto',
    import: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
  },

  /**
   * @name            title
   * @namespace       sugar.config.fonts
   * @type            Object
   *
   * Declare the <primary>title</primary> font face
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  title: {
    'font-family': 'Roboto',
    'font-weight': 700,
    import:
      'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap'
  },

  /**
   * @name            quote
   * @namespace       sugar.config.fonts
   * @type            Object
   *
   * Declare the <primary>quote</primary> font face
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @namespace       sugar.config.fonts
   * @type            Object
   *
   * Declare the <primary>code</primary> font face
   *
   * @since       2.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  code: {
    'font-family': 'Menlo, Monaco, Consolas, Courier New, monospace',
    'font-weight': 'normal',
    'font-style': 'normal',
    'font-display': 'auto',
    'cap-height': 0.65
  }
};
