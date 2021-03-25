var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/string/toString", "@coffeekraken/sugar/shared/console/parseHtml", "@coffeekraken/sugar/shared/object/clone", "@coffeekraken/sugar/shared/is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
    const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
    const clone_1 = __importDefault(require("@coffeekraken/sugar/shared/object/clone"));
    const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
    class SDescriptorResult extends s_class_1.default {
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
                `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVzY3JpcHRvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9FQUE2QztJQU83QywwRkFBb0U7SUFDcEUsNkZBQXVFO0lBQ3ZFLG9GQUE4RDtJQUM5RCw4RUFBMEQ7SUF5RDFELE1BQU0saUJBQWtCLFNBQVEsaUJBQVE7UUE2RHRDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQ0UsVUFBd0IsRUFDeEIsS0FBVSxFQUNWLGtCQUF3QztZQUV4QyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUEzRVo7Ozs7Ozs7OztlQVNHO1lBQ0gsWUFBTyxHQUFRLEVBQUUsQ0FBQztZQWtFaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUztZQUNQLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsQ0FBQyxVQUFrQztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUFFLE9BQU87WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUs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