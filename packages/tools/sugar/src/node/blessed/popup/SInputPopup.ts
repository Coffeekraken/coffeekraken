const __deepMerge = require('../../object/deepMerge');
const __SInput = require('../form/SInput');
const __SBlessedPopup = require('./SBlessedPopup');
const __activeSpace = require('../../core/activeSpace');

/**
 * @name                  SBlessedInputPopup
 * @namespace           sugar.node.blessed.popup
 * @type                  Class
 * @extends               SBlessedPopup
 *
 * This class represent a simple input in a popup
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - closeDelay (500) {Number}: The delay before closing the popup when the input has been validated
 * - $input ({}) {Object}: An object of settings passed to the SInput instance constructor
 *
 * @example       js
 * const SBlessedInputPopup = require('@coffeekraken/sugar/node/blessed/popup/SBlessedInputPopup');
 * new SBlessedInputPopup({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBlessedInputPopup extends __SBlessedPopup {
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
        this.parent.remove(this);
        this.promise.resolve(value);
      }, this._settings.closeDelay);
    });

    this.append(this.$input);
  }

  update() {
    super.update();
    this.height = this.$content.getScrollHeight() + 5;
  }
};
