const __blessed = require('blessed');
const __SBlessedComponent = require('./SBlessedComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __color = require('../color/color');
const __ora = require('ora');
const __countLine = require('../string/countLine');

/**
 * @name                  SBlessedFooter
 * @namespace           sugar.node.blessed
 * @type                  Class
 *
 * This class represent a footer that you can add to your blessed based UI
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SBlessedFooter = require('@coffeekraken/sugar/node/blessed/SBlessedFooter');
 * new SBlessedFooter({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBlessedFooter extends __SBlessedComponent {
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
          width: '100%',
          height: 10,
          position: {
            top: '100%-1',
            left: 0
          },
          style: {
            bg: __color('terminal.primary').toString(),
            fg: __color('terminal.black').toString()
          },
          padding: {
            top: 0,
            bottom: 0,
            left: 1,
            right: 0
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
      let content = __parseHtml(
        ` Made by <bold>${authArray.join(', ')}</bold>`
      );
      this._authorsBox = __blessed.box({
        top: 0,
        right: 0,
        height: 1,
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        style: {
          bg: 'black',
          fg: 'white'
        }
      });
      this._authorsBox.setContent(content);
      this.append(this._authorsBox);
    }

    this._copyrightBox = __blessed.text({
      left: 0,
      style: {
        bg: this._settings.style.bg,
        fg: this._settings.style.fg
      },
      content: __parseHtml(`MIT ©${new Date().getFullYear()} Coffeekraken`)
    });
    this.append(this._copyrightBox);

    this._commandsStatusBox = __blessed.text({
      position: {
        right: __countLine(this._authorsBox.getContent())
      },
      style: {
        bg: this._settings.style.bg,
        fg: this._settings.style.fg,
        bg: 'red'
      },
      tags: true
    });
    this.append(this._commandsStatusBox);

    // setTimeout(this.update.bind(this));
    // setInterval(this._updateStatusBar.bind(this), 100);
  }

  /**
   * @name            _updateStatusBar
   * @type            Function
   * @private
   *
   * This method simply update the status bar with the commands statuses
   *
   * @since         2.0.0
   *
   */
  _updateStatusBar() {
    let commandsStatusTextArray = [];
    for (let key in this._settings.commands) {
      const commandInstance = this._settings.commands[key];
      if (!commandInstance._footerSpinner) {
        commandInstance._footerSpinner = __ora(commandInstance.name);
      }
      if (commandInstance.state === 'running') {
        commandInstance._footerSpinner.color = 'black';
        commandsStatusTextArray.push(
          `{${__color(
            'terminal.cyan'
          ).toString()}-bg} ${commandInstance._footerSpinner.frame()} (${
            commandInstance.key
          }) {/${__color('terminal.cyan').toString()}-bg}`
        );
      } else if (commandInstance.isWatching()) {
        commandInstance._footerSpinner.color = 'black';
        commandsStatusTextArray.push(
          `{${__color(
            'terminal.primary'
          ).toString()}-bg} ${commandInstance._footerSpinner.frame()} (${
            commandInstance.key
          }) {/${__color('terminal.primary').toString()}-bg}`
        );
      } else if (commandInstance.state === 'success') {
        commandInstance._footerSpinner.color = 'black';
        commandsStatusTextArray.push(
          `{${__color(
            'terminal.green'
          ).toString()}-bg} ${commandInstance._footerSpinner.frame()} (${
            commandInstance.key
          }) {/${__color('terminal.green').toString()}-bg}`
        );
      } else if (commandInstance.state === 'error') {
        commandInstance._footerSpinner.color = 'black';
        commandsStatusTextArray.push(
          `{${__color(
            'terminal.red'
          ).toString()}-bg} ${commandInstance._footerSpinner.frame()} (${
            commandInstance.key
          }) {/${__color('terminal.red').toString()}-bg}`
        );
      }
    }
    this._commandsStatusBox.width = __countLine(
      __blessed.stripTags(commandsStatusTextArray.join(''))
    );
    this._commandsStatusBox.right =
      __countLine(this._authorsBox.getContent()) + 1;
    this._commandsStatusBox.setContent(commandsStatusTextArray.join(''));
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
      this._authorsBox.width = __countLine(this._authorsBox.content) + 1;
    }
    this.position.height = 1;

    // update status bar
    // this._updateStatusBar();

    super.update();
  }
};
