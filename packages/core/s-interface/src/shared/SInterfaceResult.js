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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2VSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw0RkFBc0U7SUFDdEUsOEVBQTBEO0lBaUMxRCxNQUFNLGdCQUFnQjtRQTRCcEI7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxPQUE4QixFQUFFO1lBckM1Qzs7Ozs7Ozs7O2VBU0c7WUFDSCxVQUFLLEdBQTBCLEVBQUUsQ0FBQztZQTRCaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBM0JEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksS0FBSzs7WUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQUUsT0FBTyxTQUFTLENBQUM7WUFDdkMsbUJBQU8sSUFBSSxDQUFDLEtBQUssMENBQUUsZ0JBQWdCLDBDQUFFLEtBQUssQ0FBQztRQUM3QyxDQUFDO1FBZ0JEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTO1lBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQkFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRO1lBQ04sSUFBSSxjQUFRLEVBQUUsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxPQUFPLHlEQUF5RCxDQUFDO2FBQ2xFO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsU0FBUztZQUNQLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsT0FBTztFQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ25CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO0tBQ0Y7SUFDRCxNQUFNLEdBQUcsR0FBMEIsZ0JBQWdCLENBQUM7SUFDcEQsa0JBQWUsZ0JBQWdCLENBQUMifQ==