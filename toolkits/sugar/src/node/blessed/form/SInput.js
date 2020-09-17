const __blessed = require('blessed');
const __SComponent = require('../SComponent');
const __deepMerge = require('../../object/deepMerge');
const __SPromise = require('../../promise/SPromise');
const __color = require('../../color/color');
const __escapeStack = require('../../terminal/escapeStack');
const __activeSpace = require('../../core/activeSpace');

/**
 * @name                  SInput
 * @namespace           sugar.node.blessed.input
 * @type                  Class
 *
 * This class represent a simple input
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 * - escapeKey (false) {Boolean}: Specify if you want to reject the input promise on escape key press
 * - placeholder (null) {String}: Specify a placeholder
 * - width (null) {String|Number}: This is the normal blessed component width parameter but you can specify "auto" if you want the input to adapt his width depending on his content
 *
 * // TODO: document the "promise" and "$input" properties
 *
 * @example       js
 * const SInput = require('@coffeekraken/sugar/node/blessed/form/SInput');
 * new SInput({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SInput extends __SComponent {
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
        focus: true,
        placeholder: null,
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
      },
      settings
    );

    super({
      // width: '100%',
      // height: null,
    });

    this._escapeKeyPromise = null;

    this.$input = __blessed.textbox(inputSettings);
    this.promise = new __SPromise();

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
};
