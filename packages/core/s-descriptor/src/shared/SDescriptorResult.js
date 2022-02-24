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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString() {
        if (__isNode()) {
            return this.toConsole();
        }
        else {
            return this.toConsole();
            // return `The method "toHtml" has not being integrated for now...`;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toConsole() {
        // handle descriptor header
        const headerArray = [
            `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
            '',
            `${__toString(this.value, {
                beautify: true,
            })}`,
            '',
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
            else if (ruleResult.__ruleObj.message !== undefined && typeof ruleResult.__ruleObj.message === 'string') {
                message = ruleResult.__ruleObj.message;
            }
            issuesArray.push(`-${typeof ruleResult.__propName === 'string' ? ` [<magenta>${ruleResult.__propName}</magenta>]` : ''} <red>${ruleId}</red>: ${message}`);
        });
        // settings
        const settingsArray = [
            '',
            `<underline>Settings</underline>`,
            '',
            `${__toString(this._descriptorSettings, {
                beautify: true,
            })}`,
        ];
        return __parseHtml(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${settingsArray.join('\n')}
    `).trim();
    }
}
const Cls = SDescriptorResult;
export default SDescriptorResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVzY3JpcHRvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUk3QyxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQXFEMUQsTUFBTSxpQkFBa0IsU0FBUSxRQUFRO0lBNkRwQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFVBQXdCLEVBQUUsS0FBVSxFQUFFLGtCQUF3QztRQUN0RixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUF2RWQ7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQThEZCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7UUFDOUMsSUFBSTtZQUNBLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUztRQUNMLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEdBQUcsQ0FBQyxVQUFrQztRQUNsQyxJQUFJLENBQUMsVUFBVSxD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