const __blessed = require('blessed');
const __SComponent = require('./SComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __countLine = require('../string/countLine');
const __terminalLink = require('terminal-link');
const __SPromise = require('../promise/SPromise');
const __multiple = require('../class/multipleExtends');
const __color = require('../color/color');
const __escapeStack = require('../terminal/escapeStack');

/**
 * @name                  SInput
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class represent a simple input
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SInput = require('@coffeekraken/sugar/node/blessed/SInput');
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
    super(
      __deepMerge(
        {
          focus: true,
          placeholder: null,
          width: 0,
          height: 1,
          keys: true,
          mouse: true,
          inputOnFocus: true,
          style: {
            bg: __color('terminal.primary').toString(),
            fg: __color('terminal.black').toString()
          },
          padding: {
            left: 1,
            right: 1
          }
        },
        settings
      )
    );

    this._input = __blessed.textbox({
      ...this._settings
    });
    this._input.promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {}
    );

    this._input.on('focus', () => {
      __escapeStack(() => {});
    });

    this._input.on('attach', () => {
      setTimeout(() => {
        if (this._settings.focus) this._input.focus();
        let placeholderPressed = false;
        if (this._settings.placeholder) {
          const placeholder = this._settings.placeholder.toString();
          this.width =
            placeholder.length +
            this._input.padding.left +
            this._input.padding.right +
            2;
          this._input.setValue(placeholder);
        }
        let isBackspace = false;
        this._input.onceKey('backspace,space', () => {
          isBackspace = true;
        });
        this._input.on('keypress', (value) => {
          setTimeout(() => {
            if (this._settings.placeholder && !placeholderPressed) {
              if (!isBackspace) {
                this._input.setValue(value);
              }
              placeholderPressed = true;
            }
            this._input.width =
              this._input.getValue().length +
              this._input.padding.left +
              this._input.padding.right +
              2;
            this.update();
          });
        });
        this._input.on('submit', (value) => {
          this._input.promise.resolve(value);
          this._input.style.bg = __color('terminal.green').toString();
          this._input.width =
            this._input.getValue().length +
            this._input.padding.left +
            this._input.padding.right;
          this.update();
        });
        this._input.on('cancel', () => {
          this._input.promise.cancel();
          this._input.style.bg = __color('terminal.red').toString();
          this._input.width =
            this._input.getValue().length +
            this._input.padding.left +
            this._input.padding.right;
          this.update();
        });
        this.update();
      });
    });

    this.append(this._input);

    return this._input;
  }
};
