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
        define(["require", "exports", "../object/deepMerge", "../is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var node_1 = __importDefault(require("../is/node"));
    var SInterfaceResult = /** @class */ (function () {
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SInterfaceResult(data) {
            if (data === void 0) { data = {}; }
            /**
             * @name        _data
             * @type        ISInterfaceResultData
             * @private
             *
             * Store the interface result data like the SDescriptorResult instance, etc...
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._data = {};
            this._data = deepMerge_1.default({}, data);
        }
        Object.defineProperty(SInterfaceResult.prototype, "value", {
            /**
             * @name        value
             * @type        Object
             * @get
             *
             * Access to the resulting value
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                var _a, _b;
                if (this.hasIssues())
                    return undefined;
                return (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.descriptorResult) === null || _b === void 0 ? void 0 : _b.value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name          hasIssues
         * @type          Function
         *
         * Return true if some issues have been detected, false if not
         *
         * @return        {Boolean}       true if has some issues, false if not
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterfaceResult.prototype.hasIssues = function () {
            if (this._data.descriptorResult)
                return this._data.descriptorResult.hasIssues();
            return false;
        };
        /**
         * @name             toString
         * @type              Functio n
         *
         * This method return a string terminal compatible or html of this result object
         *
         * @return        {String}                The result object in string format
         *
         * @since          2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterfaceResult.prototype.toString = function () {
            if (node_1.default()) {
                return this.toConsole();
            }
            else {
                return "The method \"toHtml\" has not being integrated for now...";
            }
        };
        /**
         * @name          toConsole
         * @type          Function
         *
         * This method simply returns you a terminal compatible string
         * of the interface checking result
         *
         * @return        {String}                A string compatible with the terminal
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterfaceResult.prototype.toConsole = function () {
            var stringArray = [];
            if (this._data.descriptorResult) {
                stringArray.push(this._data.descriptorResult.toConsole());
            }
            return ("\n" + stringArray.join('\n') + "\n    ").trim();
        };
        return SInterfaceResult;
    }());
    var Cls = SInterfaceResult;
    exports.default = SInterfaceResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2UvU0ludGVyZmFjZVJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFDOUMsb0RBQWtDO0lBaUNsQztRQTRCRTs7Ozs7Ozs7O1dBU0c7UUFDSCwwQkFBWSxJQUFnQztZQUFoQyxxQkFBQSxFQUFBLFNBQWdDO1lBckM1Qzs7Ozs7Ozs7O2VBU0c7WUFDSCxVQUFLLEdBQTBCLEVBQUUsQ0FBQztZQTRCaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBakJELHNCQUFJLG1DQUFLO1lBVlQ7Ozs7Ozs7OztlQVNHO2lCQUNIOztnQkFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQUUsT0FBTyxTQUFTLENBQUM7Z0JBQ3ZDLE9BQU8sTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLGdCQUFnQiwwQ0FBRSxLQUFLLENBQUM7WUFDN0MsQ0FBQzs7O1dBQUE7UUFnQkQ7Ozs7Ozs7Ozs7V0FVRztRQUNILG9DQUFTLEdBQVQ7WUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO2dCQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILG1DQUFRLEdBQVI7WUFDRSxJQUFJLGNBQVEsRUFBRSxFQUFFO2dCQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE9BQU8sMkRBQXlELENBQUM7YUFDbEU7UUFDSCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxvQ0FBUyxHQUFUO1lBQ0UsSUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDL0IsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDM0Q7WUFDRCxPQUFPLENBQUEsT0FDVCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUNuQixDQUFBLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0gsdUJBQUM7SUFBRCxDQUFDLEFBbkdELElBbUdDO0lBQ0QsSUFBTSxHQUFHLEdBQTBCLGdCQUFnQixDQUFDO0lBQ3BELGtCQUFlLGdCQUFnQixDQUFDIn0=