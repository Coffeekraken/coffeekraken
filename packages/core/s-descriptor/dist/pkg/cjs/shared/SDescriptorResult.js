"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const console_1 = require("@coffeekraken/sugar/console");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
class SDescriptorResult extends s_class_1.default {
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
            this._originalValue = (0, object_1.__clone)(value, { deep: true });
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
        if ((0, is_1.__isNode)()) {
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
            `${(0, string_1.__toString)(this.value, {
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
            `${(0, string_1.__toString)(this._descriptorSettings, {
                beautify: true,
            })}`,
        ];
        return (0, console_1.__parseHtml)(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${settingsArray.join('\n')}
    `).trim();
    }
}
const Cls = SDescriptorResult;
exports.default = SDescriptorResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBSTdDLHlEQUEwRDtBQUMxRCwrQ0FBa0Q7QUFDbEQsdURBQXFEO0FBQ3JELHVEQUF3RDtBQW1EeEQsTUFBTSxpQkFBa0IsU0FBUSxpQkFBUTtJQTZEcEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxVQUF3QixFQUN4QixLQUFVLEVBQ1Ysa0JBQXdDO1FBRXhDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQTNFZDs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBa0VkLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUM5QyxJQUFJO1lBQ0EsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFBLGdCQUFPLEVBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ0wsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsR0FBRyxDQUFDLFVBQWtDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ0osSUFBSSxJQUFBLGFBQVEsR0FBRSxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDM0I7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3hCLG9FQUFvRTtTQUN2RTtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUztRQUNMLDJCQUEyQjtRQUMzQixNQUFNLFdBQVcsR0FBRztZQUNoQix1QkFBdUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSx3QkFBd0I7WUFDMUUsRUFBRTtZQUNGLEdBQUcsSUFBQSxtQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCLENBQUMsRUFBRTtZQUNKLEVBQUU7U0FDTCxDQUFDO1FBRUYsZ0JBQWdCO1FBQ2hCLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLFVBQVUsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sWUFBWSxLQUFLLEVBQUU7Z0JBQzNELE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QztpQkFBTSxJQUNILFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVM7Z0JBQzFDLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUNwRDtnQkFDRSxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdEQ7aUJBQU0sSUFDSCxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTO2dCQUMxQyxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFDbEQ7Z0JBQ0UsT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQzFDO1lBQ0QsV0FBVyxDQUFDLElBQUksQ0FDWixJQUNJLE9BQU8sVUFBVSxDQUFDLFVBQVUsS0FBSyxRQUFRO2dCQUNyQyxDQUFDLENBQUMsY0FBYyxVQUFVLENBQUMsVUFBVSxhQUFhO2dCQUNsRCxDQUFDLENBQUMsRUFDVixTQUFTLE1BQU0sV0FBVyxPQUFPLEVBQUUsQ0FDdEMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsV0FBVztRQUNYLE1BQU0sYUFBYSxHQUFhO1lBQzVCLEVBQUU7WUFDRixpQ0FBaUM7WUFDakMsRUFBRTtZQUNGLEdBQUcsSUFBQSxtQkFBVSxFQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDcEMsUUFBUSxFQUFFLElBQUk7YUFDakIsQ0FBQyxFQUFFO1NBQ1AsQ0FBQztRQUVGLE9BQU8sSUFBQSxxQkFBVyxFQUFDO0VBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ3JCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNWLENBQUM7Q0FDSjtBQUVELE1BQU0sR0FBRyxHQUEyQixpQkFBaUIsQ0FBQztBQUV0RCxrQkFBZSxpQkFBaUIsQ0FBQyJ9