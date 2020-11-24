"use strict";
// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __SAuthAdapter = require('./SAuthAdapter');
var __blessed = require('blessed');
var __terminalKit = require('terminal-kit');
var __parseHtml = require('../../../terminal/parseHtml');
var __ora = require('ora');
/**
 * @name                            STerminalAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Terminal SAuth adapter that allows you to ask the auth informations through the terminal
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = /** @class */ (function (_super) {
    __extends(STerminalAuthAdapter, _super);
    /**
     * @name                          constructor
     * @type                          Function
     *
     * Construct the STerminalAuthAdapter instance
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function STerminalAuthAdapter() {
        return _super.call(this, ['basic', 'bearer']) || this;
    }
    STerminalAuthAdapter.prototype._resetScreen = function () {
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
    };
    /**
     * @name                      _success
     * @type                      Function
     * @async
     *
     * Display the success message to the user
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    STerminalAuthAdapter.prototype._success = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._isValidating = false;
            clearTimeout(_this._validationTimeout);
            _this._resetScreen();
            var success = __blessed.box({
                width: '100%',
                content: __parseHtml('<green>✓ Your auth info have been validated!</green>'),
                align: 'center'
            });
            _this._container.height = 1;
            _this._container.append(success);
            _this._screen.render();
            setTimeout(function () {
                resolve();
                _this._screen.destroy();
            }, 2000);
        });
    };
    /**
     * @name                      _validation
     * @type                      Function
     * @async
     *
     * Display the validation message to the user
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    STerminalAuthAdapter.prototype._validation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isValidating)
                    this._isValidating = true;
                this._resetScreen();
                if (!this._oraLoader) {
                    this._oraLoader = __ora('Please wait while your auth info are validated...');
                }
                loading = __blessed.text({
                    content: this._oraLoader.frame(),
                    align: 'center'
                });
                this._container.height = 1;
                this._container.append(loading);
                this._screen.render();
                if (this._isValidating) {
                    this._validationTimeout = setTimeout(function () {
                        _this._validation();
                    }, 20);
                }
                return [2 /*return*/, true];
            });
        });
    };
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
    STerminalAuthAdapter.prototype._basic = function (settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        return new Promise(function (resolve, reject) {
            _this._resetScreen();
            _this._isValidating = false;
            clearTimeout(_this._validationTimeout);
            var titleY = 0;
            var title = __blessed.text({
                height: 1,
                top: titleY,
                style: {
                    fg: 'yellow'
                },
                content: settings.title || 'Basic auth'
            });
            var infoY = settings.info ? titleY + 2 : titleY;
            var info = __blessed.text({
                top: infoY,
                style: {
                    fg: 'white'
                },
                content: settings.info || ''
            });
            var errorY = settings.error ? infoY + 2 : infoY;
            var error = __blessed.text({
                height: 1,
                top: errorY,
                style: {
                    fg: 'red'
                },
                content: settings.error || ''
            });
            var usernameLabelY = errorY + 2;
            var usernameLabel = __blessed.text({
                height: 1,
                top: usernameLabelY,
                style: {
                    fg: 'white'
                },
                content: 'Username: '
            });
            var usernameY = usernameLabelY + 2;
            var username = __blessed.textbox({
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
            var passwordLabelY = usernameY + 4;
            var passwordLabel = __blessed.text({
                height: 1,
                top: passwordLabelY,
                style: {
                    fg: 'white'
                },
                content: 'Password: '
            });
            var passwordY = passwordLabelY + 2;
            var password = __blessed.textbox({
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
            var buttonY = passwordY + 4;
            var button = __blessed.button({
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
            _this._container.append(title);
            if (settings.info) {
                _this._container.append(info);
            }
            if (settings.error) {
                _this._container.append(error);
            }
            _this._container.append(usernameLabel);
            _this._container.append(username);
            _this._container.append(passwordLabel);
            _this._container.append(password);
            _this._container.append(button);
            _this._screen.render();
            username.focus();
            username.key(['enter'], function (e) {
                _this._container.submit();
            });
            password.key(['enter'], function (e) {
                _this._container.submit();
            });
            button.on('press', function (e) {
                _this._container.submit();
            });
            _this._container.on('submit', function (e) {
                resolve({
                    username: e.username,
                    password: e.password
                });
            });
        });
    };
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
    STerminalAuthAdapter.prototype._bearer = function (settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        return new Promise(function (resolve, reject) {
            _this._resetScreen();
            _this._isValidating = false;
            clearTimeout(_this._validationTimeout);
            var titleY = 0;
            var title = __blessed.text({
                height: 1,
                top: titleY,
                style: {
                    fg: 'yellow'
                },
                content: settings.title || 'Bearer auth'
            });
            var infoY = settings.info ? titleY + 2 : titleY;
            var info = __blessed.text({
                top: infoY,
                style: {
                    fg: 'white'
                },
                content: settings.info || ''
            });
            var errorY = settings.error ? infoY + 2 : infoY;
            var error = __blessed.text({
                top: errorY,
                style: {
                    fg: 'red'
                },
                content: settings.error || ''
            });
            var tokenLabelY = errorY + 2;
            var tokenLabel = __blessed.text({
                height: 1,
                top: tokenLabelY,
                style: {
                    fg: 'white'
                },
                content: 'Bearer token: '
            });
            var tokenY = tokenLabelY + 2;
            var token = __blessed.textbox({
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
            var buttonY = tokenY + 4;
            var button = __blessed.button({
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
            _this._container.append(title);
            if (settings.info) {
                _this._container.append(info);
            }
            if (settings.error) {
                _this._container.append(error);
            }
            _this._container.append(tokenLabel);
            _this._container.append(token);
            _this._container.append(button);
            _this._screen.render();
            token.focus();
            token.key(['enter'], function (e) {
                _this._container.submit();
            });
            button.on('press', function (e) {
                _this._container.submit();
            });
            _this._container.on('submit', function (e) {
                resolve({
                    token: e.token
                });
            });
        });
    };
    return STerminalAuthAdapter;
}(__SAuthAdapter));
