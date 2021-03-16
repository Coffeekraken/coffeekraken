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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __parseHtml = require('../../../console/parseHtml');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0F1dGhUZXJtaW5hbEFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQXV0aFRlcm1pbmFsQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVkLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pELElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyQyxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDMUQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTdCOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLE9BQU87SUFBc0Msd0NBQWM7SUFDaEU7Ozs7Ozs7T0FPRztJQUNIO2VBQ0Usa0JBQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELDJDQUFZLEdBQVo7UUFDRSw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUM5QixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQkFDekMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENB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