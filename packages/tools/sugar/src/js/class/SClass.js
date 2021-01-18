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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
            // saving the settings
            setSettings(this, settings);
            // interface
            applyInterface(this);
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
        SClass.extends = function (Cls) {
            var SClass = /** @class */ (function (_super) {
                __extends(SClass, _super);
                function SClass(settings) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var _this = _super.apply(this, args) || this;
                    _this._settings = {};
                    // saving the settings
                    setSettings(_this, settings);
                    // interface
                    applyInterface(_this);
                    return _this;
                }
                Object.defineProperty(SClass.prototype, "id", {
                    get: function () {
                        return this._settings.id || this.constructor.name;
                    },
                    enumerable: false,
                    configurable: true
                });
                SClass.prototype.expose = function (instance, settings) {
                    expose(this, instance, settings);
                };
                return SClass;
            }(Cls));
            return SClass;
        };
        SClass.prototype.expose = function (instance, settings) {
            expose(this, instance, settings);
        };
        return SClass;
    }());
    function expose(ctx, instance, settings) {
        settings = deepMerge_1.default({
            as: undefined,
            props: []
        }, settings);
        if (settings.as && typeof settings.as === 'string') {
            ctx[settings.as] = instance;
        }
        if (settings.props) {
            settings.props.forEach(function (prop) {
                ctx[prop] = instance[prop].bind(instance);
            });
        }
    }
    function applyInterface(ctx) {
        // apply the interface if exists
        if (ctx.constructor.interface) {
            ctx.constructor.interface.apply(ctx);
        }
    }
    function setSettings(ctx, settings) {
        if (settings === void 0) { settings = {}; }
        // saving the settings
        if (ctx.constructor.settingsInterface) {
            ctx._settings = deepMerge_1.default(ctx.constructor.settingsInterface.defaults(), settings);
        }
        else {
            ctx._settings = settings;
        }
    }
    // const cls: ISClass = SClass;
    exports.default = SClass;
});
//# sourceMappingURL=SClass.js.map