import __SClass from '@coffeekraken/s-class';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __isNode from '@coffeekraken/sugar/shared/is/node';
class SDescriptorResult extends __SClass {
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
        super({});
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
            this._originalValue = __clone(value, { deep: true });
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
        if (__isNode()) {
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
            `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
            '',
            `${__toString(this.value, {
                beautify: true
            })}`,
            ''
        ];
        // handle issues
        const issuesArray = [];
        Object.keys(this._issues).forEach((ruleId) => {
            const ruleResult = this._issues[ruleId];
            let message = '';
            if (ruleResult.__error && ruleResult.__error instanceof Error) {
                message = ruleResult.__error.message;
            }
            else if (ruleResult.__ruleObj.message !== undefined &&
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
            `${__toString(this._descriptorSettings, {
                beautify: true
            })}`
        ];
        return __parseHtml(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${this._descriptorSettings.verbose ? settingsArray.join('\n') : ''}
    `).trim();
    }
}
const Cls = SDescriptorResult;
export default SDescriptorResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVzY3JpcHRvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQU83QyxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQXlEMUQsTUFBTSxpQkFBa0IsU0FBUSxRQUFRO0lBNkR0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLFVBQXdCLEVBQ3hCLEtBQVUsRUFDVixrQkFBd0M7UUFFeEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBM0VaOzs7Ozs7Ozs7V0FTRztRQUNILFlBQU8sR0FBUSxFQUFFLENBQUM7UUFrRWhCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUM5QyxJQUFJO1lBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ1AsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsR0FBRyxDQUFDLFVBQWtDO1FBQ3BDLElBQUksQ0FBQyxVQUFV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