// @shared
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
        define(["require", "exports", "../class/getExtendsStack", "../is/plainObject", "../object/deepAssign", "../object/deepMerge", "../object/get"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var deepAssign_1 = __importDefault(require("../object/deepAssign"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var get_1 = __importDefault(require("../object/get"));
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
            /**
             * @name            _interfacesStack
             * @type            Object
             * @private
             *
             * Store the interfaces objects by class
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._interfacesStack = {};
            generateInterfacesStack(this);
            // set settings
            setSettings(this, settings);
            // interface
            applyInterfaces(this);
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
        Object.defineProperty(SClass.prototype, "name", {
            get: function () {
                return this._settings.name || this.constructor.name;
            },
            /**
             * @name            name
             * @type            String
             * @get
             *
             * Access the name setted in the ```_settings.name```
             * By default, the name will be the ```constructor.name```
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            set: function (value) {
                this._settings.name = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SClass.prototype, "formattedName", {
            /**
             * @name      formattedName
             * @type      String
             * @get
             *
             * Access the process name and (not the same as a node process name)
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                var name = "<yellow>" + (this.name || '') + "</yellow>";
                if (this.id) {
                    name += " <cyan>" + this.id + "</cyan>";
                }
                return name;
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
                    _this._interfacesStack = {};
                    generateInterfacesStack(_this);
                    // set settings
                    setSettings(_this, settings);
                    // interface
                    applyInterfaces(_this);
                    return _this;
                }
                Object.defineProperty(SClass.prototype, "id", {
                    get: function () {
                        return this._settings.id || this.constructor.name;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(SClass.prototype, "name", {
                    get: function () {
                        return this._settings.name || this.constructor.name;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(SClass.prototype, "formattedName", {
                    get: function () {
                        var name = "<yellow>" + (this.name || '') + "</yellow>";
                        if (this.id) {
                            name += " <cyan>" + this.id + "</cyan>";
                        }
                        return name;
                    },
                    enumerable: false,
                    configurable: true
                });
                SClass.prototype.expose = function (instance, settings) {
                    return expose(this, instance, settings);
                };
                SClass.prototype.applyInterface = function (name, on) {
                    return applyInterface(this, name, on);
                };
                SClass.prototype.getInterface = function (name) {
                    return getInterface(this, name);
                };
                return SClass;
            }(Cls));
            return SClass;
        };
        SClass.prototype.expose = function (instance, settings) {
            return expose(this, instance, settings);
        };
        SClass.prototype.applyInterface = function (name, on) {
            return applyInterface(this, name, on);
        };
        SClass.prototype.getInterface = function (name) {
            return getInterface(this, name);
        };
        return SClass;
    }());
    function generateInterfacesStack(ctx) {
        // get all the interfaces to apply
        var extendsStack = getExtendsStack_1.default(ctx, {
            includeBaseClass: true
        });
        Object.keys(extendsStack).forEach(function (className) {
            var cls = extendsStack[className];
            if (cls.interfaces) {
                ctx._interfacesStack[className] = cls.interfaces;
            }
        });
    }
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
    function getInterfaceObj(ctx, name) {
        var interfaceObj = get_1.default(ctx._interfacesStack, name);
        if (!interfaceObj) {
            var keys = Object.keys(ctx._interfacesStack);
            for (var i = 0; i < keys.length; i++) {
                var interfacesObj = ctx._interfacesStack[keys[i]];
                if (interfacesObj[name] !== undefined) {
                    interfaceObj = interfacesObj[name];
                    break;
                }
            }
        }
        if (name === 'settings' && interfaceObj.on === undefined) {
            if (ctx.settings !== undefined)
                interfaceObj.on = 'settings';
            else if (ctx._settings !== undefined)
                interfaceObj.on = '_settings';
        }
        return interfaceObj;
    }
    function getInterface(ctx, name) {
        var interfaceObj = getInterfaceObj(ctx, name);
        if (plainObject_1.default(interfaceObj))
            return interfaceObj.class;
        return interfaceObj;
    }
    function applyInterfaces(ctx) {
        var keys = Object.keys(ctx._interfacesStack);
        var _loop_1 = function (i) {
            var interfacesObj = ctx._interfacesStack[keys[i]];
            var className = keys[i];
            Object.keys(interfacesObj).forEach(function (name) {
                var interfaceObj = interfacesObj[name];
                var settings = Object.assign({}, __assign({ apply: false, on: name === 'this' ? ctx : undefined }, interfaceObj));
                if (settings.apply !== true)
                    return;
                if (settings.on) {
                    if (typeof settings.on === 'string' &&
                        get_1.default(ctx, settings.on) !== undefined) {
                        applyInterface(ctx, className + "." + name, settings.on);
                    }
                    else if (typeof settings.on === 'object') {
                        applyInterface(ctx, className + "." + name, settings.on);
                    }
                    else if (ctx[name] !== undefined) {
                        applyInterface(ctx, className + "." + name);
                    }
                }
            });
        };
        for (var i = keys.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
    }
    function applyInterface(ctx, name, on) {
        if (on === void 0) { on = null; }
        var interfaceObj = getInterfaceObj(ctx, "" + name);
        if (!interfaceObj) {
            throw new Error("You try to apply the interface named \"<yellow>" + name + "</yellow>\" on the context \"<cyan>" + ctx.name + "</cyan>\" but it does not exists...");
        }
        if (on !== undefined)
            interfaceObj.on = on;
        if (!interfaceObj) {
            throw "Sorry the the asked interface \"<yellow>" + name + "</yellow>\" does not exists on the class \"<cyan>" + ctx.constructor.name + "</cyan>\"";
        }
        if (name.includes('.')) {
            name = name.split('.').slice(1).join('.');
        }
        // apply the interface if exists
        if (plainObject_1.default(interfaceObj)) {
            var onValue = void 0;
            if (interfaceObj.on && typeof interfaceObj.on === 'string') {
                onValue = get_1.default(ctx, interfaceObj.on);
            }
            else if (interfaceObj.on && typeof interfaceObj.on === 'object') {
                onValue = interfaceObj.on;
            }
            else {
                onValue = get_1.default(ctx, name);
            }
            var applyId = ctx.constructor.name;
            if (ctx.id)
                applyId += "(" + ctx.id + ")";
            if (name)
                applyId += "." + name;
            if (interfaceObj.on && interfaceObj.on.constructor)
                applyId += "." + interfaceObj.on.constructor.name;
            if (interfaceObj.on && interfaceObj.on.id)
                applyId += "(" + interfaceObj.on.id + ")";
            var res = void 0;
            if (name === 'this') {
                res = interfaceObj.class.apply(onValue || {}, {
                    id: applyId,
                    complete: true,
                    throw: true
                });
                deepAssign_1.default(ctx, res.value);
                return ctx;
            }
            else {
                // if (typeof interfaceObj.on !== 'string') {
                //   nativeConsole.trace('COCO', interfaceObj.on);
                // }
                res = interfaceObj.class.apply(onValue, {
                    id: applyId,
                    complete: true,
                    throw: true
                });
                if (interfaceObj.on && typeof interfaceObj.on === 'object') {
                    var returnValue = deepAssign_1.default(interfaceObj.on, res.value);
                    return returnValue;
                }
                else if (interfaceObj.on && typeof interfaceObj.on === 'string') {
                    return deepAssign_1.default(get_1.default(ctx, interfaceObj.on), res.value);
                }
                else if (ctx[name] !== undefined) {
                    return ctx[name];
                }
                else if (!res.hasIssues()) {
                    return res.value;
                    // throw `You try to apply the interface "<yellow>${interfaceObj.class.name}</yellow>" on a data "<cyan>${interfaceObj.on}</cyan>" that seems to be inexistant`;
                }
            }
        }
    }
    function setSettings(ctx, settings) {
        if (settings === void 0) { settings = {}; }
        // saving the settings
        ctx._settings = settings;
        if (!ctx._settings.id)
            ctx._settings.id = ctx.constructor.name;
    }
    // const cls: ISClass = SClass;
    exports.default = SClass;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jbGFzcy9TQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFViw2RUFBeUQ7SUFFekQsa0VBQTBDO0lBQzFDLG9FQUFnRDtJQUNoRCxrRUFBOEM7SUFDOUMsc0RBQWtDO0lBZ0VsQztRQWtIRTs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBWSxRQUE4QjtZQUE5Qix5QkFBQSxFQUFBLGFBQThCO1lBM0gxQzs7Ozs7Ozs7O2VBU0c7WUFDSCxjQUFTLEdBQW9CLEVBQUUsQ0FBQztZQUVoQzs7Ozs7Ozs7O2VBU0c7WUFDSSxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7WUFzR2hDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLGVBQWU7WUFDZixXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLFlBQVk7WUFDWixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQTlGRCxzQkFBVyxzQkFBRTtZQVhiOzs7Ozs7Ozs7O2VBVUc7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwRCxDQUFDOzs7V0FBQTtRQWFELHNCQUFXLHdCQUFJO2lCQUdmO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDdEQsQ0FBQztZQWhCRDs7Ozs7Ozs7OztlQVVHO2lCQUNILFVBQWdCLEtBQUs7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDOzs7V0FBQTtRQWVELHNCQUFJLGlDQUFhO1lBVmpCOzs7Ozs7Ozs7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