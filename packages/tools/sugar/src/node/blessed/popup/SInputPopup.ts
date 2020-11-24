// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __SInput from '../form/SInput';
import __SBlessedPopup from './SBlessedPopup';
import __activeSpace from '../../core/activeSpace';

/**
 * @name                  SBlessedInputPopup
 * @namespace           sugar.node.blessed.popup
 * @type                  Class
 * @extends               SBlessedPopup
 * @wip
 *
 * This class represent a simple input in a popup
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - closeDelay (500) {Number}: The delay before closing the popup when the input has been validated
 * - $input ({}) {Object}: An object of settings passed to the SInput instance constructor
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedInputPopup from '@coffeekraken/sugar/node/blessed/popup/SBlessedInputPopup';
 * new SBlessedInputPopup({});
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SBlessedInputPopup extends __SBlessedPopup {
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
}
