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
        define(["require", "exports", "../descriptor/SDescriptor", "../object/deepMerge", "./getAvailableInterfaceTypes", "./SInterfaceResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SDescriptor_1 = __importDefault(require("../descriptor/SDescriptor"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
    var SInterfaceResult_1 = __importDefault(require("./SInterfaceResult"));
    // @ts-ignore
    (global || window)._registeredInterfacesTypes = {};
    var SInterface = /** @class */ (function () {
        /**
         * @name              constructor
         * @type              Function
         * @constructor
         *
         * Constructor
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SInterface(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * @name              _definition
             * @type              ISInterfaceDefinitionMap
             * @private
             *
             * This property store all the SDescriptor rules that this interface
             * implements for each properties
             *
             * @since             2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._definition = {};
            /**
             * @name              _settings
             * @type              ISInterfaceSettings
             * @private
             *
             * This property store all the settings for your SInterface instance
             *
             * @since             2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {
                arrayAsValue: false,
                throw: false,
                complete: true
            };
            // @ts-ignore
            this._settings = deepMerge_1.default(this.constructor.settings, this._settings, settings);
            if (this._settings.name === undefined)
                this._settings.name =
                    this.constructor.overridedName || this.constructor.name;
            this._definition = this.constructor.definition;
        }
        Object.defineProperty(SInterface, "definition", {
            get: function () {
                if (!this._definition.help) {
                    this._definition.help = {
                        type: 'Boolean',
                        description: "Display the help for this \"<yellow>" + this.name + "</yellow>\" interface...",
                        default: false
                    };
                }
                return this._definition;
            },
            set: function (value) {
                this._definition = value;
            },
            enumerable: false,
            configurable: true
        });
        SInterface.registerRenderer = function (rendererClass) {
            if (!rendererClass.id) {
                throw new Error("Sorry but the interface renderer \"<yellow>" + rendererClass.name + "</yellow>\" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...");
            }
            this._registeredRenderers[rendererClass.id] = rendererClass;
        };
        /**
         * @name      overrie
         * @type      Function
         * @static
         *
         * This static method is usefull to make a duplicate of the base interface with some updates
         * in the definition object.
         *
         * @param     {Object}      definition      A definition object to override or extends the base one
         * @return    {SInterface}                  A new interface overrided with your new values
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.override = function (definition) {
            var _this = this;
            var SInterfaceOverrided = /** @class */ (function (_super) {
                __extends(SInterfaceOverrided, _super);
                function SInterfaceOverrided() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SInterfaceOverrided.overridedName = _this.name + " (overrided)";
                SInterfaceOverrided.definition = deepMerge_1.default(_this.definition, definition);
                return SInterfaceOverrided;
            }(this));
            return SInterfaceOverrided;
        };
        /**
         * @name            getAvailableTypes
         * @type            Function
         * @static
         *
         * This static method allows you to get the types that have been make widely available
         * using the ```makeAvailableAsType``` method.
         *
         * @return      {Object<SInterface>}          An object listing all the interface types maked available widely
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.getAvailableTypes = function () {
            return getAvailableInterfaceTypes_1.default();
        };
        /**
         * @name            makeAvailableAsType
         * @type            Function
         * @static
         *
         * This static method allows you to promote your interface at the level where it can be
         * used in the "type" interface definition property like so "Object<MyCoolType>"
         *
         * @param       {String}      [name=null]       A custom name to register your interface. Otherwise take the class name and register two types: MyClassInterface => MyClassInterface && MyClass
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.makeAvailableAsType = function (name) {
            if (name === void 0) { name = null; }
            var n = (name || this.name).toLowerCase();
            if (global !== undefined) {
                // @ts-ignore
                global._registeredInterfacesTypes[n] = this;
                // @ts-ignore
                global._registeredInterfacesTypes[n.replace('interface', '')] = this;
            }
            else if (window !== undefined) {
                // @ts-ignore
                window._registeredInterfacesTypes[n] = this;
                // @ts-ignore
                window._registeredInterfacesTypes[n.replace('interface', '')] = this;
            }
        };
        /**
         * @name              defaults
         * @type              Function
         * @static
         *
         * This function simply returns you the default interface values in object format
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.defaults = function () {
            var result = this.apply({}, {
                complete: true,
                throw: false
            });
            if (!result.hasIssues())
                return result.value;
            return {};
        };
        /**
         * @name              apply
         * @type              Function
         * @static
         *
         * This static method allows you to apply the interface on an object instance.
         * By default, if something is wrong in your class implementation, an error with the
         * description of what's wrong will be thrown. You can change that behavior if you prefer having
         * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
         *
         * @param       {Any}                instance              The instance to apply the interface on
         * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
         * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
         * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
         * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.apply = function (instance, settings) {
            if (settings === void 0) { settings = {}; }
            // instanciate a new SInterface
            var int = new this(settings);
            return int.apply(instance, settings);
        };
        /**
         * @name            help
         * @type            Function
         * @static
         *
         * This static method allows you to get back the help using the
         * passed renderer. Awailable rendered are for now:
         * - terminal (default): The default terminal renderer
         * - more to come depending on needs...
         *
         * @param         {String}          [renderer="terminal"]        The registered renderer you want to use.
         * @param         {ISInterfaceRendererSettings}     [settings={}]     Some settings to configure your render
         *
         * @setting     {'terminal'}        [renderer="terminal"]       The renderer you want to use.
         * @setting     {Array<String>}     [exclude=['help']]                An array of properties you don't want to render
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.render = function (renderer, settings) {
            if (renderer === void 0) { renderer = 'terminal'; }
            var set = deepMerge_1.default({
                renderer: 'terminal',
                exclude: ['help']
            }, settings);
            // check that the renderer is registered
            if (!this._registeredRenderers[renderer]) {
                throw new Error("Sorry but the requested renderer \"<yellow>" + renderer + "</yellow>\" does not exists... Here's the available renderers: <green>" + Object.keys(this._registeredRenderers).join(', ') + "</green>");
            }
            // instanciate the renderer and render the interface
            var rendererInstance = new this._registeredRenderers[renderer](this, set);
            return rendererInstance.render();
        };
        /**
         * @name              apply
         * @type              Function
         *
         * This method allows you to apply the interface on an object instance.
         * By default, if something is wrong in your class implementation, an error with the
         * description of what's wrong will be thrown. You can change that behavior if you prefer having
         * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
         *
         * @param       {Any}                instance              The instance to apply the interface on
         * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
         * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.prototype.apply = function (instance, settings) {
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            var descriptor = new SDescriptor_1.default(__assign({ id: settings.id, name: settings.name, type: 'Object', rules: this._definition, arrayAsValue: settings.arrayAsValue, complete: settings.complete === undefined ? true : settings.complete, throw: false }, (settings.descriptorSettings || {})));
            var descriptorResult = descriptor.apply(instance);
            // nativeConsole.log('in', this._definition);
            // instanciate a new interface result object
            var interfaceResult = new SInterfaceResult_1.default({
                descriptorResult: descriptorResult
            });
            if (interfaceResult.hasIssues() && settings.throw) {
                throw interfaceResult.toString();
            }
            // return new result object
            return interfaceResult;
        };
        /**
         * @name              definition
         * @type              ISDescriptorRules
         * @static
         *
         * This property store all the SDescriptor rules that this interface
         * implements for each properties
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        // static definition: ISDescriptorRules = {};
        // @ts-ignore
        SInterface._definition = {};
        /**
         * @name      registerRenderer
         * @type      Function
         * @static
         *
         * This static method allows you to register a renderer that you can then
         * use through the ```interface.render('{rendererId}')``` interface method
         *
         * @param     {SInterfaceRenderer}      rendererClass       The renderer class you want to register
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface._registeredRenderers = {};
        /**
         * @name              settings
         * @type              ISInterfaceSettings
         * @static
         *
         * This property store all the settings for your SInterface class. These settings
         * can be overrided at instance level
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.settings = {};
        return SInterface;
    }());
    exports.default = SInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlL19TSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMEVBR21DO0lBRW5DLGtFQUE4QztJQUM5Qyw0RkFBd0U7SUFFeEUsd0VBQTJFO0lBdUUzRSxhQUFhO0lBQ2IsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0lBQ25EO1FBb1FFOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFZLFFBQWtDO1lBQWxDLHlCQUFBLEVBQUEsYUFBa0M7WUF0SjlDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxnQkFBVyxHQUE2QixFQUFFLENBQUM7WUFlM0M7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUF3QjtnQkFDL0IsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQztZQStHQSxhQUFhO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUNwQixJQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFDZCxRQUFRLENBQ1QsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUztnQkFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUNYLElBQUksQ0FBQyxXQUFZLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBRW5FLElBQUksQ0FBQyxXQUFXLEdBQVMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDeEQsQ0FBQztRQTNRRCxzQkFBVyx3QkFBVTtpQkFBckI7Z0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FB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