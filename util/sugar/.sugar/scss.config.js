module.exports = {
  // import some settings
  colors: '@config.colors',
  fonts: '@config.fonts',
  filters: '@config.filters',
  'look-and-feel': '@config.look-and-feel',
  'modular-scale': '@config.modular-scale',
  sizes: '@config.sizes',
  spaces: '@config.spaces',
  transitions: '@config.transitions',
  typography: '@config.typography',

  /**
   * @name          unit
   * @namespace     config.scss
   * @type          String
   * @default       rem
   *
   * Set the base unit to use across the system
   *
   * @since         1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  unit: 'rem',

  /**
   * @name          reset
   * @namspace      config.scss
   * @type          Boolean
   * @default       true
   *
   * Specify if you want a reset to be applied or not
   *
   * @since       1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  reset: true,

  /**
   * @name            border-box
   * @namespace       config.scss
   * @type            Boolean
   * @default         true
   *
   * Set if need to set all as border box model
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'border-box': true,

  /**
   * @name              text-format-scope-class
   * @namespace         config.scss
   * @type              String
   * @default           tf
   *
   * Specify the scope class name to generate in order to apply the text formatting on some elements
   *
   * @since             1.0.0
   * @see               https://www.npmjs.com/package/modularscale-sass
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'text-format-scope-class': 'tf',

  /**
   * @name              vertical-rhythm-scope-class
   * @namespace         config.scss
   * @type              String
   * @default           vr
   *
   * Specify the scope class name to generate in order to apply the vertical rhythm on some elements
   *
   * @since             1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'vertical-rhythm-scope-class': 'vr'
};
