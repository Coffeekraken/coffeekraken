// @ts-nocheck

import __blessed from 'blessed';
import __SBlessedComponent from '../SBlessedComponent';
import __deepMerge from '../../../shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __color from '../../../shared/color/color';
import __escapeStack from '../../terminal/escapeStack';
import __activeSpace from '../../../shared/core/activeSpace';

/**
 * @name                  SBlessedInput
 * @namespace           sugar.node.blessed.input
 * @type                  Class
 * @status              wip
 *
 * This class represent a simple input
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - escapeKey (false) {Boolean}: Specify if you want to reject the input promise on escape key press
 * - placeholder (null) {String}: Specify a placeholder
 * - width (null) {String|Number}: This is the normal blessed component width parameter but you can specify "auto" if you want the input to adapt his width depending on his content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedInput from '@coffeekraken/sugar/node/blessed/form/SBlessedInput';
 * new SBlessedInput({});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SBlessedInput extends __SBlessedComponent {
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
    const inputSettings = __deepMerge(
      {
        id: 'SInput',
        focus: true,
        placeholder: null,
        blessed: {
          width: '100%',
          height: 3,
          keys: true,
          mouse: true,
          inputOnFocus: true,
          style: {
            bg: __color('terminal.cyan').toString(),
            fg: __color('terminal.black').toString()
          },
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 2
          }
        }
      },
      settings
    );

    super({
      // width: '100%',
      // height: null,
    });

    this._escapeKeyPromise = null;

    this.$input = __blessed.textbox(inputSettings);
    this.promise = new __SPromise({
      id: this._settings.id
    });

    this.$input.height =
      inputSettings.padding.top + inputSettings.padding.bottom + 1;
    this.height = inputSettings.padding.top + inputSettings.padding.bottom + 1;

    this.$input.on('blur', () => {
      console.log('blue');
      if (this.$input.focused) {
        console.log('remove');
      }
    });

    this.$input.on('focus', () => {
      __activeSpace.append('form.input');
      this._escapeKeyPromise = __escapeStack(() => {
        __activeSpace.remove('.form.input');
      });
    });

    this.$input.on('attach', () => {
      setTimeout(() => {
        if (inputSettings.focus) this.$input.focus();
        let placeholderPressed = false;
        if (inputSettings.placeholder) {
          const placeholder = inputSettings.placeholder.toString();
          if (inputSettings.width === 'auto') {
            this.$input.width =
              placeholder.length +
              this.$input.padding.left +
              this.$input.padding.right +
              2;
          }
          this.$input.setValue(placeholder);
        }
        let isBackspace = false;
        this.$input.onceKey('backspace,space,escape', () => {
          isBackspace = true;
        });
        this.$input.on('keypress', (value, key) => {
          setTimeout(() => {
            if (inputSettings.placeholder && !placeholderPressed) {
              if (!isBackspace) {
                this.$input.setValue(value);
              }
              placeholderPressed = true;
            }
            if (inputSettings.width === 'auto') {
              this.$input.width =
                this.$input.getValue().length +
                this.$input.padding.left +
                this.$input.padding.right +
                2;
            }
            this.update();
          });
        });
        this.$input.on('submit', (value) => {
          this.promise.resolve(value);
          this.$input.style.bg = __color('terminal.green').toString();
          if (inputSettings.width === 'auto') {
            this.$input.width =
              this.$input.getValue().length +
              this.$input.padding.left +
              this.$input.padding.right;
          }
          __activeSpace.remove('.form.input');
          if (this._escapeKeyPromise) this._escapeKeyPromise.cancel();
          this.update();
        });
        this.$input.on('cancel', () => {
          this.promise.cancel();
          this.$input.style.bg = __color('terminal.red').toString();
          if (inputSettings.width === 'auto') {
            this.$input.width =
              this.$input.getValue().length +
              this.$input.padding.left +
              this.$input.padding.right;
          }
          __activeSpace.remove('.form.input');
          if (this._escapeKeyPromise) this._escapeKeyPromise.cancel();
          this.update();
        });
        this.update();
      });
    });

    this.append(this.$input);
  }
}
