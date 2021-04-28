var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
    class SInterfaceResult {
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
        constructor(data = {}) {
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
        get value() {
            var _a, _b;
            if (this.hasIssues())
                return undefined;
            return (_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.descriptorResult) === null || _b === void 0 ? void 0 : _b.value;
        }
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
        hasIssues() {
            if (this._data.descriptorResult)
                return this._data.descriptorResult.hasIssues();
            return false;
        }
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
        toString() {
            if (node_1.default()) {
                return this.toConsole();
            }
            else {
                return `The method "toHtml" has not being integrated for now...`;
            }
        }
        /**
         * @name          toConsole
         * @type          Function
         *
         * This method simply returns you a terminal compatible string
         * of the interface checking result
         *
         * @return        {String}                A string compatible with the terminal
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        toConsole() {
            const stringArray = [];
            if (this._data.descriptorResult) {
                stringArray.push(this._data.descriptorResult.toConsole());
            }
            return `
${stringArray.join('\n')}
    `.trim();
        }
    }
    const Cls = SInterfaceResult;
    exports.default = SInterfaceResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1pbnRlcmZhY2Uvc3JjL3NoYXJlZC9TSW50ZXJmYWNlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNEZBQXNFO0lBQ3RFLDhFQUEwRDtJQWlDMUQsTUFBTSxnQkFBZ0I7UUE0QnBCOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksT0FBOEIsRUFBRTtZQXJDNUM7Ozs7Ozs7OztlQVNHO1lBQ0gsVUFBSyxHQUEwQixFQUFFLENBQUM7WUE0QmhDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQTNCRDs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLEtBQUs7O1lBQ1AsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUFFLE9BQU8sU0FBUyxDQUFDO1lBQ3ZDLE9BQU8sTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLGdCQUFnQiwwQ0FBRSxLQUFLLENBQUM7UUFDN0MsQ0FBQztRQWdCRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUztZQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUTtZQUNOLElBQUksY0FBUSxFQUFFLEVBQUU7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsT0FBTyx5REFBeUQsQ0FBQzthQUNsRTtRQUNILENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILFNBQVM7WUFDUCxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7WUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFO2dCQUMvQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUMzRDtZQUNELE9BQU87RUFDVCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNuQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQztLQUNGO0lBQ0QsTUFBTSxHQUFHLEdBQTBCLGdCQUFnQixDQUFDO0lBQ3BELGtCQUFlLGdCQUFnQixDQUFDIn0=