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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0F1dGhUZXJtaW5hbEFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQXV0aFRlcm1pbmFsQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRCxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzlDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzFELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUU3Qjs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sQ0FBQyxPQUFPO0lBQXNDLHdDQUFjO0lBQ2hFOzs7Ozs7O09BT0c7SUFDSDtlQUNFLGtCQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCwyQ0FBWSxHQUFaO1FBQ0UsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0JBQ3pDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFD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