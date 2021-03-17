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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvaW50ZXJmYWNlL1NJbnRlcmZhY2VSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQThDO0lBQzlDLG9EQUFrQztJQWlDbEM7UUE0QkU7Ozs7Ozs7OztXQVNHO1FBQ0gsMEJBQVksSUFBZ0M7WUFBaEMscUJBQUEsRUFBQSxTQUFnQztZQXJDNUM7Ozs7Ozs7OztlQVNHO1lBQ0gsVUFBSyxHQUEwQixFQUFFLENBQUM7WUE0QmhDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQWpCRCxzQkFBSSxtQ0FBSztZQVZUOzs7Ozs7Ozs7ZUFTRztpQkFDSDs7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUFFLE9BQU8sU0FBUyxDQUFDO2dCQUN2QyxPQUFPLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxnQkFBZ0IsMENBQUUsS0FBSyxDQUFDO1lBQzdDLENBQUM7OztXQUFBO1FBZ0JEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxvQ0FBUyxHQUFUO1lBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQkFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxtQ0FBUSxHQUFSO1lBQ0UsSUFBSSxjQUFRLEVBQUUsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxPQUFPLDJEQUF5RCxDQUFDO2FBQ2xFO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsb0NBQVMsR0FBVDtZQUNFLElBQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsT0FBTyxDQUFBLE9BQ1QsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FDbkIsQ0FBQSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUNILHVCQUFDO0lBQUQsQ0FBQyxBQW5HRCxJQW1HQztJQUNELElBQU0sR0FBRyxHQUEwQixnQkFBZ0IsQ0FBQztJQUNwRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9