module.exports = {
  /**
   * @name            border-radius
   * @namespace       config.look-and-feel
   * @type            String
   * @default         0em
   *
   * Specify the border radius that have to be applied on most of the components
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'border-radius': '0.2em',

  /**
   * @name            padding
   * @namespace       config.look-and-feel
   * @type            String
   * @default         [config.look-and-feel.padding-vertical] [config.look-and-feel.padding-horizontal]
   *
   * Specify the vertical padding that have to be applied on most of the components
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  padding: '0.8em 1.4em',

  /**
   * @name            padding-vertical
   * @namespace       config.look-and-feel
   * @type            String
   * @default         0.8em
   *
   * Specify the vertical padding that have to be applied on most of the components
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'padding-vertical': '0.8em',

  /**
   * @name            padding-horizontal
   * @namespace       config.look-and-feel
   * @type            String
   * @default         1.4em
   *
   * Specify the horizontal padding that have to be applied on most of the components
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'padding-horizontal': '1.4em',

  /**
   * @name            disabled-opacity
   * @namespace       config.look-and-feel
   * @type            Number
   * @default         0.5
   *
   * Specify the disabled opacity that have to be applied on most of the components
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'disabled-opacity': 0.5,

  /**
   * @name            line-height
   * @namespace       config.look-and-feel
   * @type            Number
   * @default         1.4
   *
   * Specify the line height that have to be applied on most of the components
   *
   * @since           1.0.0
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  'line-height': 1.5,

  shadow: {
    layers: 6,
    startX: 0,
    startY: '1px',
    startBlur: '2px',
    color: 'rgba(0,0,0,0.08)'
  }
};
