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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGVzY3JpcHRvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9FQUE2QztJQU83QywwRkFBb0U7SUFDcEUsNkZBQXVFO0lBQ3ZFLG9GQUE4RDtJQUM5RCw4RUFBMEQ7SUF5RDFELE1BQU0saUJBQWtCLFNBQVEsaUJBQVE7UUE2RHRDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQ0UsVUFBd0IsRUFDeEIsS0FBVSxFQUNWLGtCQUF3QztZQUV4QyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUEzRVo7Ozs7Ozs7OztlQVNHO1lBQ0gsWUFBTyxHQUFRLEVBQUUsQ0FBQztZQWtFaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUztZQUNQLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsQ0FBQyxVQUFrQztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUFFLE9BQU87WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNyRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVE7WUFDTixJQUFJLGNBQVEsRUFBRSxFQUFFO2dCQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE9BQU8seURBQXlELENBQUM7YUFDbEU7UUFDSCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVM7WUFDUCwyQkFBMkI7WUFDM0IsTUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLHVCQUF1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksd0JBQXdCO2dCQUNwRSxFQUFFO2dCQUNGLEdBQUcsa0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUN4QixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLEVBQUU7Z0JBQ0osRUFBRTthQUNILENBQUM7WUFFRixnQkFBZ0I7WUFDaEIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksVUFBVSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxZQUFZLEtBQUssRUFBRTtvQkFDN0QsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUN0QztxQkFBTSxJQUNMLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVM7b0JBQzFDLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUNsRDtvQkFDQSxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3BEO3FCQUFNLElBQ0wsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUztvQkFDMUMsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQ2hEO29CQUNBLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztpQkFDeEM7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FDZCxJQUNFLE9BQU8sVUFBVSxDQUFDLFVBQVUsS0FBSyxRQUFRO29CQUN2QyxDQUFDLENBQUMsY0FBYyxVQUFVLENBQUMsVUFBVSxhQUFhO29CQUNsRCxDQUFDLENBQUMsRUFDTixTQUFTLE1BQU0sV0FBVyxPQUFPLEVBQUUsQ0FDcEMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsV0FBVztZQUNYLE1BQU0sYUFBYSxHQUFhO2dCQUM5QixFQUFFO2dCQUNGLGlDQUFpQztnQkFDakMsRUFBRTtnQkFDRixHQUFHLGtCQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO29CQUN0QyxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLEVBQUU7YUFDTCxDQUFDO1lBRUYsT0FBTyxtQkFBVyxDQUFDO0VBQ3JCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDN0QsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUNGO0lBRUQsTUFBTSxHQUFHLEdBQTJCLGlCQUFpQixDQUFDO0lBRXRELGtCQUFlLGlCQUFpQixDQUFDIn0=