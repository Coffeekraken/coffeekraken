import __SClass from '@coffeekraken/s-class';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __isNode } from '@coffeekraken/sugar/is';
import { __clone } from '@coffeekraken/sugar/object';
import { __toString } from '@coffeekraken/sugar/string';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBSTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQTREeEQsTUFBTSxpQkFBa0IsU0FBUSxRQUFRO0lBNkRwQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLFVBQXdCLEVBQ3hCLEtBQVUsRUFDVixrQkFBd0M7UUFFeEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBM0VkOzs7Ozs7Ozs7V0FTRztRQUNILFlBQU8sR0FBUSxFQUFFLENBQUM7UUFrRWQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1FBQzlDLElBQUk7WUFDQSxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7UUFDTCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxHQUFHLENBQUMsVUFBa0M7UUFD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