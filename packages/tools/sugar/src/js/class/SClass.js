// @shared
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        define(["require", "exports", "../object/deepMerge", "../is/plainObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var SClass = /** @class */ (function () {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SClass(settings) {
            if (settings === void 0) { settings = {}; }
            // static usableAsMixin = true;
            /**
             * @name            _settings
             * @type            ISClassSettings
             * @private
             *
             * Store the class settings
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            this.$init(settings);
        }
        Object.defineProperty(SClass.prototype, "id", {
            /**
             * @name            id
             * @type            String
             * @get
             *
             * Access the id setted in the ```_settings.id```
             * By default, the id will be the ```constructor.name```
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings.id || this.constructor.name;
            },
            enumerable: false,
            configurable: true
        });
        SClass.mixin = function (mixins, Cls) {
            // const mixinProps = {};
            var mixinInitStack = [];
            if (!mixins)
                mixins = [];
            // function bindProps(ctx: any) {
            //   // console.log(mixinProps);
            //   Object.keys(mixinProps).forEach((mixinName) => {
            //     ctx[mixinName] = {};
            //     Object.getOwnPropertyNames(mixinProps[mixinName]).forEach(
            //       (propName) => {
            //         if (mixinName === 'default') {
            //           ctx[propName] = mixinProps[mixinName][propName].bind(ctx);
            //         } else {
            //           ctx[mixinName][propName] = mixinProps[mixinName][propName].bind(
            //             ctx
            //           );
            //         }
            //       }
            //     );
            //   });
            // }
            function callInitStack(ctx, settings) {
                mixinInitStack.forEach(function (initFn) {
                    var bindedInitFn = initFn.bind(ctx);
                    bindedInitFn(settings);
                });
            }
            var BaseClass;
            if (!Cls) {
                var SClassBase = /** @class */ (function () {
                    function SClassBase() {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var superArgs = args;
                        var settings = args[args.length - 1];
                        if (plainObject_1.default(settings)) {
                            superArgs.pop();
                        }
                        callInitStack(this, settings);
                    }
                    return SClassBase;
                }());
                BaseClass = SClassBase;
            }
            else {
                // mixins.push(SClass);
                var SClassBase = /** @class */ (function (_super) {
                    __extends(SClassBase, _super);
                    function SClassBase() {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var _this = this;
                        var superArgs = args;
                        var settings = args[args.length - 1];
                        if (plainObject_1.default(settings)) {
                            superArgs.pop();
                        }
                        _this = _super.apply(this, superArgs) || this;
                        callInitStack(_this, settings);
                        return _this;
                    }
                    return SClassBase;
                }(Cls));
                BaseClass = SClassBase;
            }
            var defaultMixinSettings = {
                initFnName: '$init'
                // as: undefined
            };
            var _loop_1 = function (i) {
                var mixin = mixins[i];
                var mixinSettings = deepMerge_1.default(defaultMixinSettings, mixin.mixinSettings || {});
                if (mixin.usableAsMixin === undefined || mixin.usableAsMixin !== true) {
                    throw "The class \"<yellow>" + mixin.name + "</yellow>\" cannot be used as a mixin...";
                }
                // mixinProps[mixinName] = {};
                var hasInit = false;
                console.log(mixin.prototype);
                Object.getOwnPropertyNames(mixin.prototype).forEach(function (name) {
                    // console.log(mixin.name, name);
                    if (name === mixinSettings.initFnName) {
                        hasInit = true;
                        mixinInitStack.push(mixin.prototype[name]);
                    }
                    else if (name !== 'constructor') {
                        var desc = (Object.getOwnPropertyDescriptor(mixin.prototype, name));
                        // desc.enumerable = true;
                        Object.defineProperty(BaseClass.prototype, name, __assign({}, desc));
                    }
                });
                if (!hasInit) {
                    mixinInitStack.push(function (settings) {
                        if (settings === void 0) { settings = {}; }
                        // @ts-ignore
                        this._settings = deepMerge_1.default(this._settings, settings || {});
                    });
                }
            };
            for (var i = mixins.length - 1; i >= 0; i--) {
                _loop_1(i);
            }
            return BaseClass;
        };
        SClass.prototype.$init = function (settings) {
            if (settings === void 0) { settings = {}; }
            // saving the settings
            this.$setSettings(settings);
            // interface
            this.$applyInterface();
        };
        SClass.prototype.$applyInterface = function () {
            // apply the interface if exists
            if (this.constructor.interface) {
                this.constructor.interface.apply(this);
            }
        };
        SClass.prototype.$setSettings = function (settings) {
            if (settings === void 0) { settings = {}; }
            // saving the settings
            if (this.constructor.settingsInterface) {
                this._settings = deepMerge_1.default(this.constructor.settingsInterface.defaults(), settings);
            }
            else {
                this._settings = settings;
            }
        };
        return SClass;
    }());
    // const cls: ISClass = SClass;
    exports.default = SClass;
});
//# sourceMappingURL=SClass.js.map