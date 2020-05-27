const __blessed = require('blessed');
const __SComponent = require('../SComponent');
const __deepMerge = require('../../object/deepMerge');
const __parseHtml = require('../../terminal/parseHtml');
const __color = require('../../color/color');
const __escapeStack = require('../../terminal/escapeStack');
const __activeSpace = require('../../core/activeSpace');

/**
 * @name                  SPopup
 * @namespace             sugar.node.blessed.popup
 * @type                  Class
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SPopup = require('@coffeekraken/sugar/node/blessed/popup/SPopup');
 * const myPopup = new SPopup();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPopup extends __SComponent {
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
          title: null,
          description: null,
          width: '80%',
          height: 200,
          top: '50%',
          left: '50%',
          style: {
            bg: __color('terminal.primary').toString()
          },
          padding: {
            top: 0,
            bottom: 1,
            left: 2,
            right: 2
          }
        },
        settings
      )
    );

    if (this._settings.title) {
      this._titleBox = __blessed.box({
        top: 0,
        height: 3,
        style: {
          bg: __color('terminal.primary').toString(),
          fg: __color('terminal.black').toString()
        },
        padding: {
          top: 1,
          bottom: 1,
          left: 0,
          right: 0
        },
        content: __parseHtml(this._settings.title)
      });
    }

    if (this._settings.description) {
      this._descriptionBox = __blessed.box({
        top: this._titleBox ? this._titleBox.height : 0,
        height: 2,
        style: {
          bg: __color('terminal.black').toString(),
          fg: __color('terminal.white').toString()
        },
        padding: {
          top: 1,
          bottom: 0,
          left: 2,
          right: 2
        },
        content: __parseHtml(this._settings.description)
      });
    }

    if (this._titleBox) super.append(this._titleBox);
    if (this._descriptionBox) super.append(this._descriptionBox);

    let contentTop = 0;
    if (this._titleBox) contentTop += this._titleBox.height;
    if (this._descriptionBox) contentTop += this._descriptionBox.height;
    this._contentBox = __blessed.box({
      left: 0,
      right: 0,
      top: contentTop,
      height: 'shrink',
      style: {
        bg: __color('terminal.black').toString()
      },
      scrollable: true,
      mouse: true,
      keys: true,

      padding: {
        top: 1,
        left: 2,
        bottom: 1,
        right: 2
      }
    });
    super.append(this._contentBox);

    __activeSpace.append('popup');

    __escapeStack(() => {
      __activeSpace.previous();
      this.parent.remove(this);
    });
  }

  /**
   * @name            append
   * @type            Function
   * @override
   *
   * This method is simply used to append content inside the popup
   *
   * @return        {SComponent}            Return this component to maintain chainability
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  append(content) {
    this._contentBox.append(content);
    return this;
  }

  /**
   * @name            update
   * @type            Function
   * @override
   *
   * This method simply draw the header
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    this.height = this._contentBox.getScrollHeight() + 7;

    this.top = `50%-${Math.round(this.height / 2)}`;
    this.left = `50%-${Math.round(this.width / 2)}`;

    // this._contentBox.height = this.height - 6;

    super.update();
  }
};
