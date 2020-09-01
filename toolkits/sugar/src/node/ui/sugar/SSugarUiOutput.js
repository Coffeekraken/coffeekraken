const __SComponent = require('../../blessed/SComponent');
const __sugarHeading = require('../../ascii/sugarHeading');
const __blessed = require('blessed');
const __parseHtml = require('../../terminal/parseHtml');

/**
 * @name                SSugarUiOutput
 * @namespace           node.ui.sugar
 * @type                Class
 * @extends             SComponent
 *
 * This class represent the Sugar UI interface in the terminal.
 *
 * @param           {SPromise}          source        The source from where to get data
 * @param           {Object}          [initialParams={}]        An object of initial params
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUiOutput extends __SComponent {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source, initialParams = {}) {
    super({
      screen: true
    });

    const $centeredBox = __blessed.box({
      width: 'shrink',
      height: 'shrink',
      top: 'center',
      left: 'center',
      style: {},
      content: __parseHtml(
        __sugarHeading({
          borders: false
        })
      )
    });

    const $metasBox = __blessed.box({
      width: 'shrink',
      height: 'shrink',
      top: '50%+3',
      left: '50%-13',
      tags: true,
      align: 'center',
      style: {},
      content: __parseHtml(
        `
   UI started at:
<cyan>http://127.0.0.1:3000</cyan>
        `
      )
    });

    this.append($centeredBox);
    this.append($metasBox);

    // $centeredBox.top =
    //   Math.round($centeredBox.screen.rows / 2) -
    //   Math.round($centeredBox.height / 2);
    // $centeredBox.left =
    //   Math.round($centeredBox.screen.cols / 2) -
    //   Math.round($centeredBox.width / 2);
  }
};
