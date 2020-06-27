const __SColor = require('../../../js/color/SColor');
const __sugarConfig = require('../config/sugar');

/**
 * @namespace           node.color
 * @src             ../../../js/color/SColor.js
 * @extends         SColor
 */
module.exports = class SColor extends __SColor {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(color) {
    super(color);
  }

  /**
   * @name            getColor
   * @type            Function
   * @override
   *
   * This method take as parameter the passed color to the constructor and has to return the
   * actual real color like color from the static colors listed in the SColor class or maybe
   * from the Sugar configured colors
   *
   * @param       {String}      color         The passed color to the constructor
   * @return      {String}                    The actual real color taken from the Sugar config or somewhere else...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getColor(color) {
    // try to get the color from the sugar config
    let sugarConfigColor;
    if (color.match(/terminal\./)) {
      sugarConfigColor = __sugarConfig(
        `terminal.colors.${color.replace('terminal.', '')}`
      );
    } else {
      sugarConfigColor = __sugarConfig(`colors.${color}`);
    }
    if (sugarConfigColor && sugarConfigColor.color)
      return sugarConfigColor.color;
    if (sugarConfigColor) return sugarConfigColor;
    return super.getColor(color);
  }
};
