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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL2NsYXNzL1NDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDZFQUF5RDtJQUV6RCxrRUFBMEM7SUFDMUMsb0VBQWdEO0lBQ2hELGtFQUE4QztJQUM5QyxzREFBa0M7SUFnRWxDO1FBa0hFOzs7Ozs7Ozs7V0FTRztRQUNILGdCQUFZLFFBQThCO1lBQTlCLHlCQUFBLEVBQUEsYUFBOEI7WUEzSDFDOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBb0IsRUFBRSxDQUFDO1lBRWhDOzs7Ozs7Ozs7ZUFTRztZQUNJLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztZQXNHaEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsZUFBZTtZQUNmLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDNUIsWUFBWTtZQUNaLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBOUZELHNCQUFXLHNCQUFFO1lBWGI7Ozs7Ozs7Ozs7ZUFVRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BELENBQUM7OztXQUFBO1FBYUQsc0JBQVcsd0JBQUk7aUJBR2Y7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN0RCxDQUFDO1lBaEJEOzs7Ozs7Ozs7O2VBVUc7aUJBQ0gsVUFBZ0IsS0FBSztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzlCLENBQUM7OztXQUFBO1FBZUQsc0JBQUksaUNBQWE7WUFWakI7Ozs7Ozs7Oztl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