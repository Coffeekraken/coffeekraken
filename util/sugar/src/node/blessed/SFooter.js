const __blessed = require('blessed');
const __SComponent = require('./SComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __countLine = require('../string/countLine');
const __terminalLink = require('terminal-link');

/**
 * @name                  SFooter
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class represent a footer that you can add to your blessed based UI
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SFooter = require('@coffeekraken/sugar/node/blessed/SFooter');
 * new SFooter({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFooter extends __SComponent {
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
          authors: [],
          website: null,
          blessed: {
            width: '100%',
            height: 1,
            padding: {
              top: 0,
              bottom: 0,
              left: 1,
              right: 1
            }
          }
        },
        settings
      )
    );

    if (this._settings.authors.length) {
      const authArray = [];
      this._settings.authors.forEach((auth) => {
        authArray.push(auth.name);
      });
      this._authorsBox = __blessed.text({
        right: 0,
        tags: true,
        style: {
          bg: this._settings.blessed.style.bg,
          fg: this._settings.blessed.style.fg
        },
        content: __parseHtml(`Made by <bold>${authArray.join(', ')}</bold>`)
      });
      this.append(this._authorsBox);
    }

    this._copyrightBox = __blessed.text({
      left: 0,
      style: {
        bg: this._settings.blessed.style.bg,
        fg: this._settings.blessed.style.fg
      },
      content: __parseHtml(`MIT ©${new Date().getFullYear()} Coffeekraken`)
    });
    this.append(this._copyrightBox);
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
    if (this._authorsBox) {
      // this._authorsBox.width = __countLine(this._authorsBox.content);
    }

    super.update();
  }
};
