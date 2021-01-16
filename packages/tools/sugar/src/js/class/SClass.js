// @shared
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
    var cls = /** @class */ (function () {
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
            if (this.constructor.settingsInterface) {
                this._settings = deepMerge_1.default(this.constructor.settingsInterface.defaults(), settings);
            }
            else {
                this._settings = settings;
            }
            // apply the interface if exists
            if (this.constructor.interface) {
                this.constructor.interface.apply(this);
            }
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
        return SClass;
    }());
    exports.default = cls;
});
//# sourceMappingURL=SClass.js.map