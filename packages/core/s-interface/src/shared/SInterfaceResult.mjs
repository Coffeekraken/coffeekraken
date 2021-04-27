import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isNode from '@coffeekraken/sugar/shared/is/node';
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
        this._data = __deepMerge({}, data);
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
        if (__isNode()) {
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
export default SInterfaceResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1pbnRlcmZhY2Uvc3JjL3NoYXJlZC9TSW50ZXJmYWNlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBaUMxRCxNQUFNLGdCQUFnQjtJQTRCcEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUE4QixFQUFFO1FBckM1Qzs7Ozs7Ozs7O1dBU0c7UUFDSCxVQUFLLEdBQTBCLEVBQUUsQ0FBQztRQTRCaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUEzQkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLOztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQ3ZDLE9BQU8sTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLGdCQUFnQiwwQ0FBRSxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQWdCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7WUFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxRQUFRLEVBQUUsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxPQUFPLHlEQUF5RCxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUztRQUNQLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0IsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPO0VBQ1QsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDbkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUM7Q0FDRjtBQUNELE1BQU0sR0FBRyxHQUEwQixnQkFBZ0IsQ0FBQztBQUNwRCxlQUFlLGdCQUFnQixDQUFDIn0=