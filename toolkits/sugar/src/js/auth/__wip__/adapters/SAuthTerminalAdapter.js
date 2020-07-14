const __SAuthAdapter = require('./SAuthAdapter');
const __blessed = require('blessed');
const __terminalKit = require('terminal-kit');
const __parseHtml = require('../../../terminal/parseHtml');
const __ora = require('ora');

/**
 * @name                            STerminalAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Terminal SAuth adapter that allows you to ask the auth informations through the terminal
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STerminalAuthAdapter extends __SAuthAdapter {
  /**
   * @name                          constructor
   * @type                          Function
   *
   * Construct the STerminalAuthAdapter instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {
    super(['basic', 'bearer']);
  }

  _resetScreen() {
    // if (this._screen) this._screen.destroy();
    if (!this._screen) {
      this._screen = __blessed.screen({
        smartCSR: true
      });
      this._screen.key(['C-c'], function (ch, key) {
        return process.exit(0);
      });
    }

    if (this._container) {
      this._screen.remove(this._container);
      this._container.destroy();
    }

    this._container = __blessed.form({
      top: 'center',
      left: 'center',
      width: process.stdout.columns < 50 ? '90%' : '50%',
      // tags: true,
      keys: true,
      vi: false,
      style: {
        fg: 'white'
      }
    });
    this._screen.append(this._container);
  }

  /**
   * @name                      _success
   * @type                      Function
   * @async
   *
   * Display the success message to the user
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _success() {
    return new Promise((resolve, reject) => {
      this._isValidating = false;
      clearTimeout(this._validationTimeout);

      this._resetScreen();

      const success = __blessed.box({
        width: '100%',
        content: __parseHtml(
          '<green>✓ Your auth info have been validated!</green>'
        ),
        align: 'center'
      });

      this._container.height = 1;
      this._container.append(success);
      this._screen.render();

      setTimeout(() => {
        resolve();

        this._screen.destroy();
      }, 2000);
    });
  }

  /**
   * @name                      _validation
   * @type                      Function
   * @async
   *
   * Display the validation message to the user
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _validation() {
    if (!this._isValidating) this._isValidating = true;

    this._resetScreen();

    if (!this._oraLoader) {
      this._oraLoader = __ora(
        'Please wait while your auth info are validated...'
      );
    }

    const loading = __blessed.text({
      content: this._oraLoader.frame(),
      align: 'center'
    });

    this._container.height = 1;
    this._container.append(loading);
    this._screen.render();

    if (this._isValidating) {
      this._validationTimeout = setTimeout(() => {
        this._validation();
      }, 20);
    }

    return true;
  }

  /**
   * @name                      _basic
   * @type                      Function
   * @async
   *
   * Ask the user for username, password
   *
   * @param             {Object}              [settings={}]       An object of settings. Here's the options available:
   * - title (null) {String}: The title to display on top of the form
   * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
   * - info (null) {String}: An info message to display to the user
   * @return            {Promise}                     A promise that will be resolved with the getted username, password
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _basic(settings = {}) {
    return new Promise((resolve, reject) => {
      this._resetScreen();

      this._isValidating = false;
      clearTimeout(this._validationTimeout);

      const titleY = 0;
      const title = __blessed.text({
        height: 1,
        top: titleY,
        style: {
          fg: 'yellow'
        },
        content: settings.title || 'Basic auth'
      });

      const infoY = settings.info ? titleY + 2 : titleY;
      const info = __blessed.text({
        top: infoY,
        style: {
          fg: 'white'
        },
        content: settings.info || ''
      });

      const errorY = settings.error ? infoY + 2 : infoY;
      const error = __blessed.text({
        height: 1,
        top: errorY,
        style: {
          fg: 'red'
        },
        content: settings.error || ''
      });

      const usernameLabelY = errorY + 2;
      const usernameLabel = __blessed.text({
        height: 1,
        top: usernameLabelY,
        style: {
          fg: 'white'
        },
        content: 'Username: '
      });

      const usernameY = usernameLabelY + 2;
      const username = __blessed.textbox({
        name: 'username',
        height: 3,
        top: usernameY,
        mouse: true,
        style: {
          fg: 'black',
          bg: '#ffffff',
          focus: {
            bg: 'yellow',
            fg: 'black'
          }
        },
        inputOnFocus: true,
        padding: {
          top: 1,
          bottom: 1,
          left: 2,
          right: 2
        }
      });

      const passwordLabelY = usernameY + 4;
      const passwordLabel = __blessed.text({
        height: 1,
        top: passwordLabelY,
        style: {
          fg: 'white'
        },
        content: 'Password: '
      });

      const passwordY = passwordLabelY + 2;
      const password = __blessed.textbox({
        name: 'password',
        height: 3,
        top: passwordY,
        mouse: true,
        style: {
          fg: 'black',
          bg: '#ffffff',
          focus: {
            bg: 'yellow',
            fg: 'black'
          }
        },
        censor: true,
        inputOnFocus: true,
        padding: {
          top: 1,
          bottom: 1,
          left: 2,
          right: 2
        }
      });

      const buttonY = passwordY + 4;
      const button = __blessed.button({
        height: 3,
        width: 15,
        top: buttonY,
        right: 0,
        align: 'center',
        mouse: true,
        style: {
          fg: 'black',
          bg: 'yellow',
          hover: {
            bg: 'cyan'
          }
        },
        content: '✔ Login',
        padding: {
          top: 1,
          bottom: 1,
          left: 2,
          right: 2
        }
      });

      this._container.append(title);

      if (settings.info) {
        this._container.append(info);
      }
      if (settings.error) {
        this._container.append(error);
      }

      this._container.append(usernameLabel);
      this._container.append(username);
      this._container.append(passwordLabel);
      this._container.append(password);
      this._container.append(button);

      this._screen.render();

      username.focus();

      username.key(['enter'], (e) => {
        this._container.submit();
      });
      password.key(['enter'], (e) => {
        this._container.submit();
      });
      button.on('press', (e) => {
        this._container.submit();
      });

      this._container.on('submit', (e) => {
        resolve({
          username: e.username,
          password: e.password
        });
      });
    });
  }

  /**
   * @name                      _bearer
   * @type                      Function
   * @async
   *
   * Ask the user for bearer auth info (token)
   *
   * @param             {Object}              [settings={}]       An object of settings. Here's the options available:
   * - title (null) {String}: The title displayed on top of the form
   * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
   * - info (null) {String}: An info message to display to the user
   * @return            {Promise}                     A promise that will be resolved with the getted username, password
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _bearer(settings = {}) {
    return new Promise((resolve, reject) => {
      this._resetScreen();

      this._isValidating = false;
      clearTimeout(this._validationTimeout);

      const titleY = 0;
      const title = __blessed.text({
        height: 1,
        top: titleY,
        style: {
          fg: 'yellow'
        },
        content: settings.title || 'Bearer auth'
      });

      const infoY = settings.info ? titleY + 2 : titleY;
      const info = __blessed.text({
        top: infoY,
        style: {
          fg: 'white'
        },
        content: settings.info || ''
      });

      const errorY = settings.error ? infoY + 2 : infoY;
      const error = __blessed.text({
        top: errorY,
        style: {
          fg: 'red'
        },
        content: settings.error || ''
      });

      const tokenLabelY = errorY + 2;
      const tokenLabel = __blessed.text({
        height: 1,
        top: tokenLabelY,
        style: {
          fg: 'white'
        },
        content: 'Bearer token: '
      });

      const tokenY = tokenLabelY + 2;
      const token = __blessed.textbox({
        name: 'token',
        height: 3,
        top: tokenY,
        mouse: true,
        style: {
          fg: 'black',
          bg: '#ffffff',
          focus: {
            bg: 'yellow',
            fg: 'black'
          }
        },
        inputOnFocus: true,
        padding: {
          top: 1,
          bottom: 1,
          left: 2,
          right: 2
        }
      });

      const buttonY = tokenY + 4;
      const button = __blessed.button({
        height: 3,
        width: 15,
        top: buttonY,
        right: 0,
        align: 'center',
        mouse: true,
        style: {
          fg: 'black',
          bg: 'yellow',
          hover: {
            bg: 'cyan'
          }
        },
        content: '✔ Login',
        padding: {
          top: 1,
          bottom: 1,
          left: 2,
          right: 2
        }
      });

      this._container.append(title);

      if (settings.info) {
        this._container.append(info);
      }
      if (settings.error) {
        this._container.append(error);
      }

      this._container.append(tokenLabel);
      this._container.append(token);
      this._container.append(button);

      this._screen.render();

      token.focus();

      token.key(['enter'], (e) => {
        this._container.submit();
      });
      button.on('press', (e) => {
        this._container.submit();
      });

      this._container.on('submit', (e) => {
        resolve({
          token: e.token
        });
      });
    });
  }
};
