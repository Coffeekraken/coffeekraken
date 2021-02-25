"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __SAuthAdapter = require('./SAuthAdapter');
const __blessed = require('blessed');
const __terminalKit = require('terminal-kit');
const __parseHtml = require('../../../console/parseHtml');
const __ora = require('ora');
/**
 * @name                            STerminalAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Terminal SAuth adapter that allows you to ask the auth informations through the terminal
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STerminalAuthAdapter extends __SAuthAdapter {
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the STerminalAuthAdapter instance
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _success() {
        return new Promise((resolve, reject) => {
            this._isValidating = false;
            clearTimeout(this._validationTimeout);
            this._resetScreen();
            const success = __blessed.box({
                width: '100%',
                content: __parseHtml('<green>✓ Your auth info have been validated!</green>'),
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _validation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._isValidating)
                this._isValidating = true;
            this._resetScreen();
            if (!this._oraLoader) {
                this._oraLoader = __ora('Please wait while your auth info are validated...');
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
        });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0F1dGhUZXJtaW5hbEFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQXV0aFRlcm1pbmFsQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyQyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDMUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTdCOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLG9CQUFxQixTQUFRLGNBQWM7SUFDaEU7Ozs7Ozs7T0FPRztJQUNIO1FBQ0UsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFlBQVk7UUFDViw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUM5QixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQkFDekMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDL0IsR0FBRyxFQUFFLFFBQVE7WUFDYixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsRCxjQUFjO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsS0FBSztZQUNULEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsT0FBTzthQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUV0QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDNUIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLFdBQVcsQ0FDbEIsc0RBQXNELENBQ3ZEO2dCQUNELEtBQUssRUFBRSxRQUFRO2FBQ2hCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXRCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7Z0JBRVYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNHLFdBQVc7O1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRW5ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQ3JCLG1EQUFtRCxDQUNwRCxDQUFDO2FBQ0g7WUFFRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLEtBQUssRUFBRSxRQUFRO2FBQ2hCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXRCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ1I7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXBCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUV0QyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDM0IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxRQUFRO2lCQUNiO2dCQUNELE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSyxJQUFJLFlBQVk7YUFDeEMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2xELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLEdBQUcsRUFBRSxLQUFLO2dCQUNWLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsT0FBTztpQkFDWjtnQkFDRCxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFO2FBQzdCLENBQUMsQ0FBQztZQUVILE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNsRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUMzQixNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsTUFBTTtnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLEtBQUs7aUJBQ1Y7Z0JBQ0QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTthQUM5QixDQUFDLENBQUM7WUFFSCxNQUFNLGNBQWMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLE1BQU0sRUFBRSxDQUFDO2dCQUNULEdBQUcsRUFBRSxjQUFjO2dCQUNuQixLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLE9BQU87aUJBQ1o7Z0JBQ0QsT0FBTyxFQUFFLFlBQVk7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxTQUFTLEdBQUcsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUNyQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUNqQyxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO29CQUNYLEVBQUUsRUFBRSxTQUFTO29CQUNiLEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsUUFBUTt3QkFDWixFQUFFLEVBQUUsT0FBTztxQkFDWjtpQkFDRjtnQkFDRCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxjQUFjLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNyQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsY0FBYztnQkFDbkIsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO2lCQUNaO2dCQUNELE9BQU8sRUFBRSxZQUFZO2FBQ3RCLENBQUMsQ0FBQztZQUVILE1BQU0sU0FBUyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDckMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDO2dCQUNULEdBQUcsRUFBRSxTQUFTO2dCQUNkLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsT0FBTztvQkFDWCxFQUFFLEVBQUUsU0FBUztvQkFDYixLQUFLLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLFFBQVE7d0JBQ1osRUFBRSxFQUFFLE9BQU87cUJBQ1o7aUJBQ0Y7Z0JBQ0QsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLE9BQU8sRUFBRTtvQkFDUCxHQUFHLEVBQUUsQ0FBQztvQkFDTixNQUFNLEVBQUUsQ0FBQztvQkFDVCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsQ0FBQztpQkFDVDthQUNGLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDOUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsR0FBRyxFQUFFLE9BQU87Z0JBQ1osS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO29CQUNYLEVBQUUsRUFBRSxRQUFRO29CQUNaLEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsTUFBTTtxQkFDWDtpQkFDRjtnQkFDRCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFOUIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXRCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVqQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLENBQUM7b0JBQ04sUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO29CQUNwQixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7aUJBQ3JCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxPQUFPLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUMzQixNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsTUFBTTtnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLFFBQVE7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLElBQUksYUFBYTthQUN6QyxDQUFDLENBQUM7WUFFSCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDMUIsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO2lCQUNaO2dCQUNELE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUU7YUFDN0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2xELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLEdBQUcsRUFBRSxNQUFNO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsS0FBSztpQkFDVjtnQkFDRCxPQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO2FBQzlCLENBQUMsQ0FBQztZQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDaEMsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsT0FBTztpQkFDWjtnQkFDRCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzFCLENBQUMsQ0FBQztZQUVILE1BQU0sTUFBTSxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDOUIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO29CQUNYLEVBQUUsRUFBRSxTQUFTO29CQUNiLEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsUUFBUTt3QkFDWixFQUFFLEVBQUUsT0FBTztxQkFDWjtpQkFDRjtnQkFDRCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUM5QixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxHQUFHLEVBQUUsT0FBTztnQkFDWixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLE9BQU87b0JBQ1gsRUFBRSxFQUFFLFFBQVE7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEVBQUUsRUFBRSxNQUFNO3FCQUNYO2lCQUNGO2dCQUNELE9BQU8sRUFBRSxTQUFTO2dCQUNsQixPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7YUFDRixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU5QixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRS9CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdEIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQztvQkFDTixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDIn0=