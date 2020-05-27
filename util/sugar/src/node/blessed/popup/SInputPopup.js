const __deepMerge = require('../../object/deepMerge');
const __SInput = require('../form/SInput');
const __SPopup = require('./SPopup');

/**
 * @name                  SInputPopup
 * @namespace             sugar.node.blessed.popup
 * @type                  Class
 * @extends               SPopup
 *
 * This class represent a simple input in a popup
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - closeDelay (500) {Number}: The delay before closing the popup when the input has been validated
 * - $input ({}) {Object}: An object of settings passed to the SInput instance constructor
 *
 * @example       js
 * const SInputPopup = require('@coffeekraken/sugar/node/blessed/popup/SInputPopup');
 * new SInputPopup({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SInputPopup extends __SPopup {
  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          style: {
            bg: 'red'
          },
          closeDelay: 500,
          $input: {}
        },
        settings
      )
    );

    // create an input
    this.$input = new __SInput(this._settings.$input);

    this.on('detach', () => {
      if (!this.$input.promise.isPending()) return;
      this.$input.promise.cancel();
    });

    this.$input.promise.on('resolve', (value) => {
      setTimeout(() => {
        this.detach();
      }, this._settings.closeDelay);
    });

    this.append(this.$input);
  }
};
