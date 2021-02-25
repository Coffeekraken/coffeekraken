// @shared
import __deepMerge from '../object/deepMerge';
import __isNode from '../is/node';
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
     * @return        {String}                A string compatible with the terminal
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2VSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUVWLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQWlDbEMsTUFBTSxnQkFBZ0I7SUE0QnBCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBOEIsRUFBRTtRQXJDNUM7Ozs7Ozs7OztXQVNHO1FBQ0gsVUFBSyxHQUEwQixFQUFFLENBQUM7UUE0QmhDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBM0JEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSzs7UUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUN2QyxtQkFBTyxJQUFJLENBQUMsS0FBSywwQ0FBRSxnQkFBZ0IsMENBQUUsS0FBSyxDQUFDO0lBQzdDLENBQUM7SUFnQkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO1lBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUTtRQUNOLElBQUksUUFBUSxFQUFFLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUN6QjthQUFNO1lBQ0wsT0FBTyx5REFBeUQsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFNBQVM7UUFDUCxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTztFQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ25CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0Y7QUFDRCxNQUFNLEdBQUcsR0FBMEIsZ0JBQWdCLENBQUM7QUFDcEQsZUFBZSxnQkFBZ0IsQ0FBQyJ9