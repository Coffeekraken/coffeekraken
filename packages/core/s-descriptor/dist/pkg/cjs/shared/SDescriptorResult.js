"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const clone_1 = __importDefault(require("@coffeekraken/sugar/shared/object/clone"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
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
            this._originalValue = (0, clone_1.default)(value, { deep: true });
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
        if ((0, node_1.default)()) {
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
            `${(0, toString_1.default)(this.value, {
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
            `${(0, toString_1.default)(this._descriptorSettings, {
                beautify: true,
            })}`,
        ];
        return (0, parseHtml_1.default)(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${settingsArray.join('\n')}
    `).trim();
    }
}
const Cls = SDescriptorResult;
exports.default = SDescriptorResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBSTdDLDZGQUF1RTtBQUN2RSw4RUFBMEQ7QUFDMUQsb0ZBQThEO0FBQzlELDBGQUFvRTtBQXlEcEUsTUFBTSxpQkFBa0IsU0FBUSxpQkFBUTtJQTZEcEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxVQUF3QixFQUN4QixLQUFVLEVBQ1Ysa0JBQXdDO1FBRXhDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQTNFZDs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBa0VkLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUM5QyxJQUFJO1lBQ0EsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFBLGVBQU8sRUFBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7UUFDTCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxHQUFHLENBQUMsVUFBa0M7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN2RCxDQUFD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