module.exports = {
  // import some settings
  borders: '[config.borders]',
  classes: '[config.classes]',
  components: '[config.components]',
  colors: '[config.colors]',
  fonts: '[config.fonts]',
  filters: '[config.filters]',
  'look-and-feel': '[config.look-and-feel]',
  margins: '[config.margins]',
  media: '[config.media]',
  paddings: '[config.paddings]',
  ratios: '[config.ratios]',
  sizes: '[config.sizes]',
  // spaces: '[config.spaces]',
  transitions: '[config.transitions]',
  typography: '[config.typography]',

  helpers: {
    flex: {
      /**
       * @name        ordersCount
       * @namespace   config.scss.helpers.flex
       * @type        Number
       * @default     20
       *
       * Specify how many flex order ```.s-flex-order-{i}``` you want to be generated
       *
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      ordersCount: 20
    }
  },

  /**
   * @name                sharedResources
   * @namespace           config.scss
   * @type                Boolean
   * @default             ['sugar']
   *
   * This options tells the sugar scss compiler which "frameworks" or "toolkit" you want to sharedResources automatically.
   * For now you can specify these:
   * - sugar: Import the coffeekraken sugar scss toolkit in your scss
   *
   * @since             2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sharedResources: ['sugar'],

  /**
   * @name          settingsMode
   * @namespace     config.scss
   * @type          String
   * @values        inline, variables
   * @default       variables
   *
   * Set the settings mode to use.
   * - inline: The values will be put directly in the css
   * - variables: The values will be passed using the var(...) css function
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  settingsMode: 'variables',

  /**
   * @name          unit
   * @namespace     config.scss
   * @type          String
   * @default       rem
   *
   * Set the base unit to use across the system
   *
   * @since         1.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'border-box': true
};
