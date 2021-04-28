"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1pbnRlcmZhY2Uvc3JjL3NoYXJlZC9TSW50ZXJmYWNlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLDhFQUEwRDtBQWlDMUQsTUFBTSxnQkFBZ0I7SUE0QnBCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBOEIsRUFBRTtRQXJDNUM7Ozs7Ozs7OztXQVNHO1FBQ0gsVUFBSyxHQUEwQixFQUFFLENBQUM7UUE0QmhDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQTNCRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7O1FBQ1AsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDdkMsT0FBTyxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsZ0JBQWdCLDBDQUFFLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBZ0JEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtZQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVE7UUFDTixJQUFJLGNBQVEsRUFBRSxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNMLE9BQU8seURBQXlELENBQUM7U0FDbEU7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTO1FBQ1AsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtZQUMvQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU87RUFDVCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNuQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBQ0QsTUFBTSxHQUFHLEdBQTBCLGdCQUFnQixDQUFDO0FBQ3BELGtCQUFlLGdCQUFnQixDQUFDIn0=