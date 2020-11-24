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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "blessed", "../object/deepMerge", "../color/color", "../process/onProcessExit"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var blessed_1 = __importDefault(require("blessed"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var color_1 = __importDefault(require("../color/color"));
    var onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
    var __activeScreen = null;
    return (_a = /** @class */ (function (_super) {
            __extends(SBlessedComponent, _super);
            /**
             * @name                  constructor
             * @type                  Function
             * @constructor
             *
             * Constructor
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            function SBlessedComponent(settings) {
                if (settings === void 0) { settings = {}; }
                var _this = this;
                // store the settings
                settings = deepMerge_2.default({
                    screen: true,
                    container: true,
                    maxRenderInterval: 100,
                    framerate: null
                }, settings);
                // check if need to create a screen
                if (!__activeScreen && settings.screen !== false) {
                    __activeScreen = blessed_1.default.screen({
                        smartCSR: true,
                        cursor: {
                            artificial: true,
                            shape: {
                                bg: color_1.default('terminal.primary').toString(),
                                ch: '|'
                                // ch: '█'
                            },
                            blink: true
                        }
                    });
                    __activeScreen.on('destroy', function () {
                        __activeScreen = null;
                    });
                    if (settings.attach === undefined) {
                        settings.attach = true;
                    }
                    if (settings.container === true) {
                        settings.container = {
                            // width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            padding: {
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            },
                            style: {}
                        };
                    }
                }
                else {
                    settings.container = false;
                }
                // extends parent
                delete settings.screen;
                _this = _super.call(this, settings) || this;
                /**
                 * @name                  _settings
                 * @type                  Object
                 * @private
                 *
                 * Store the component settings
                 *
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                _this._settings = {};
                /**
                 * @name                  update
                 * @type                  Function
                 *
                 * This method simply update the screen if the component is a child of one
                 *
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                _this._renderAfterNotAllowedTimeout = null;
                _this._screen = __activeScreen;
                global.screen = __activeScreen;
                // keep track of the component status
                _this._isDisplayed = false;
                _this.on('attach', function () {
                    _this._isDisplayed = true;
                    setTimeout(function () {
                        _this.update();
                    }, 200);
                });
                _this.on('detach', function () {
                    _this._isDisplayed = false;
                });
                // save the settings
                _this._settings = settings;
                _this._allowRender = true;
                // this._renderBuffer = setInterval(() => {
                //   this._allowRender = true;
                // }, settings.maxRenderInterval);
                // set render interval if not set already
                if (settings.framerate && !SBlessedComponent._framerateInterval) {
                    _this.setFramerate(settings.framerate);
                }
                var container;
                if (settings.container) {
                    container = blessed_1.default.box(settings.container);
                    __activeScreen.container = container;
                    __activeScreen.append(container);
                    __activeScreen.append = function () {
                        var _a;
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        (_a = __activeScreen.container).append.apply(_a, args);
                    };
                }
                onProcessExit_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            global._screen && global._screen.destroy();
                        }
                        catch (e) { }
                        this._destroyed = true;
                        this._allowRender = false;
                        this.detach();
                        return [2 /*return*/, true];
                    });
                }); });
                if (_this._settings.attach) {
                    (__activeScreen.container || __activeScreen).append(_this);
                }
                if (!_this._settings.attach) {
                    if (_this.parent) {
                        _this.update();
                    }
                    else {
                        _this.on('attach', function () {
                            setTimeout(function () {
                                _this.update();
                            });
                        });
                    }
                }
                return _this;
            }
            /**
             * @name                  setFramerate
             * @type                  Function
             *
             * This method allows you to simply change the interval timeout between the screen renders process.
             * Note that calling this will change the GLOBAL render screen interval so use with caution...
             *
             * @param       {Number}          interval          The interval between screen rendering processes in ms
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SBlessedComponent.prototype.setFramerate = function (framerate) {
                var _this = this;
                clearInterval(SBlessedComponent._framerateInterval);
                SBlessedComponent._framerateInterval = setInterval(function () {
                    if (!_this.isDisplayed())
                        return;
                    _this.update();
                }, 1000 / framerate);
            };
            SBlessedComponent.prototype.update = function () {
                if (this.isDestroyed())
                    return;
                // if (!this._allowRender) {
                //   if (!this._settings.framerate && !this._renderAfterNotAllowedTimeout) {
                //     this._renderAfterNotAllowedTimeout = setTimeout(() => {
                //       clearTimeout(this._renderAfterNotAllowedTimeout);
                //       this.update();
                //     }, 200);
                //   }
                //   return;
                // }
                // this._allowRender = false;
                // clearTimeout(this._updateTimeout);
                // this._updateTimeout = setTimeout(() => {
                //   this._allowRender = true;
                //   if (!this._settings.framerate) this.update();
                // }, this._settings.maxRenderInterval);
                if (this._screen) {
                    this._screen.render();
                }
            };
            /**
             * @name                isDisplayed
             * @type                Function
             *
             * Check if the component is in the display list of the screen
             *
             * @return      {Boolean}             true if is displayed, false if not
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SBlessedComponent.prototype.isDisplayed = function () {
                return this._isDisplayed;
            };
            /**
             * @name                  isDestroyed
             * @type                  Function
             *
             * Check if the component (screen) has been destroyed
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SBlessedComponent.prototype.isDestroyed = function () {
                return this._destroyed === true;
            };
            /**
             * @name                  allowRender
             * @type                  Function
             *
             * Check if the component allow a render at this particular time
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SBlessedComponent.prototype.allowRender = function () {
                return this._allowRender;
            };
            return SBlessedComponent;
        }(blessed_1.default.box)),
        /**
         * @name                  _framerateInterval
         * @type                  Function
         * @private
         * @static
         *
         * Store the setInterval that render the screen
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a._framerateInterval = null,
        _a);
});
