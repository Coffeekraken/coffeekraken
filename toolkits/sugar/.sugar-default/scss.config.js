module.exports = {
  // import some settings
  borders: '@config.borders',
  classes: '@config.classes',
  colors: '@config.colors',
  fonts: '@config.fonts',
  filters: '@config.filters',
  'look-and-feel': '@config.look-and-feel',
  media: '@config.media',
  sizes: '@config.sizes',
  spaces: '@config.spaces',
  transitions: '@config.transitions',
  typography: '@config.typography',

  helpers: {
    flex: {
      /**
       * @name        order-count
       * @namespace   config.scss.helpers.flex
       * @type        Number
       * @default     20
       *
       * Specify how many flex order ```.s-flex-order-{i}``` you want to be generated
       *
       * @since       2.0.0
       * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      'order-count': 20
    }
  },

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
  'border-box': true
};
