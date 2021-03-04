"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const clone_1 = __importDefault(require("../object/clone"));
const node_1 = __importDefault(require("../is/node"));
class SDescriptorResult {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(descriptor, value, descriptorSettings) {
        /**
         * @name      _issues
         * @type      Object
         * @private
         *
         * Store the result objects added with the ```add``` method
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._issues = {};
        this._descriptor = descriptor;
        this._descriptorSettings = descriptorSettings;
        try {
            this._originalValue = clone_1.default(value, { deep: true });
        }
        catch (e) {
            this._originalValue = value;
        }
        this.value = value;
    }
    /**
     * @name           hasIssues
     * @type           Function
     *
     * This method return true if theirs no issues, false if not
     *
     * @return        {Boolean}           true if no issue(s), false if not
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hasIssues() {
        return Object.keys(this._issues).length >= 1;
    }
    /**
     * @name           add
     * @type           Function
     *
     * This method is used to add a rule result to the global descriptor result.
     *
     * @param         {ISDescriptorResultRule}        ruleResult      The rule result object you want to add
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    add(ruleResult) {
        if (!ruleResult.__ruleObj.id)
            return;
        this._issues[ruleResult.__ruleObj.id] = ruleResult;
    }
    /**
     * @name             toString
     * @type              Functio n
     *
     * This method return a string terminal compatible of this result object
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
     * @name             toConsole
     * @type              Function
     *
     * This method return a string terminal compatible of this result object
     *
     * @return        {String}                The result object in string format
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toConsole() {
        // handle descriptor header
        const headerArray = [
            `<underline><magenta>${this._descriptor.name}</magenta></underline>`,
            '',
            `${toString_1.default(this.value, {
                beautify: true
            })}`,
            ''
        ];
        // handle issues
        const issuesArray = [];
        Object.keys(this._issues).forEach((ruleId) => {
            const ruleResult = this._issues[ruleId];
            let message = '';
            if (ruleResult.__ruleObj.message !== undefined &&
                typeof ruleResult.__ruleObj.message === 'function') {
                message = ruleResult.__ruleObj.message(ruleResult);
            }
            else if (ruleResult.__ruleObj.message !== undefined &&
                typeof ruleResult.__ruleObj.message === 'string') {
                message = ruleResult.__ruleObj.message;
            }
            issuesArray.push(`-${typeof ruleResult.__propName === 'string'
                ? ` [<magenta>${ruleResult.__propName}</magenta>]`
                : ''} <red>${ruleId}</red>: ${message}`);
        });
        // settings
        const settingsArray = [
            '',
            `<underline>Settings</underline>`,
            '',
            `${toString_1.default(this._descriptorSettings, {
                beautify: true
            })}`
        ];
        return parseHtml_1.default(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${this._descriptorSettings.verbose ? settingsArray.join('\n') : ''}
    `).trim();
    }
}
const Cls = SDescriptorResult;
exports.default = SDescriptorResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVzY3JpcHRvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7QUFRVixrRUFBNEM7QUFDNUMscUVBQStDO0FBQy9DLDREQUFzQztBQUN0QyxzREFBa0M7QUFxRGxDLE1BQU0saUJBQWlCO0lBNkRyQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLFVBQXdCLEVBQ3hCLEtBQVUsRUFDVixrQkFBd0M7UUF6RTFDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQU8sR0FBUSxFQUFFLENBQUM7UUFpRWhCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUM5QyxJQUFJO1lBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ1AsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsR0FBRyxDQUFDLFVBQWtDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxjQUFRLEVBQUUsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxPQUFPLHlEQUF5RCxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ1AsMkJBQTJCO1FBQzNCLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLHVCQUF1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksd0JBQXdCO1lBQ3BFLEVBQUU7WUFDRixHQUFHLGtCQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDeEIsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLEVBQUU7WUFDSixFQUFFO1NBQ0gsQ0FBQztRQUVGLGdCQUFnQjtRQUNoQixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7WUFDekIsSUFDRSxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTO2dCQUMxQyxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFDbEQ7Z0JBQ0EsT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNLElBQ0wsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUztnQkFDMUMsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQ2hEO2dCQUNBLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzthQUN4QztZQUNELFdBQVcsQ0FBQyxJQUFJLENBQ2QsSUFDRSxPQUFPLFVBQVUsQ0FBQyxVQUFVLEtBQUssUUFBUTtnQkFDdkMsQ0FBQyxDQUFDLGNBQWMsVUFBVSxDQUFDLFVBQVUsYUFBYTtnQkFDbEQsQ0FBQyxDQUFDLEVBQ04sU0FBUyxNQUFNLFdBQVcsT0FBTyxFQUFFLENBQ3BDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFdBQVc7UUFDWCxNQUFNLGFBQWEsR0FBYTtZQUM5QixFQUFFO1lBQ0YsaUNBQWlDO1lBQ2pDLEVBQUU7WUFDRixHQUFHLGtCQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUN0QyxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsRUFBRTtTQUNMLENBQUM7UUFFRixPQUFPLG1CQUFXLENBQUM7RUFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDdEIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtLQUM3RCxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0Y7QUFFRCxNQUFNLEdBQUcsR0FBMkIsaUJBQWlCLENBQUM7QUFFdEQsa0JBQWUsaUJBQWlCLENBQUMifQ==