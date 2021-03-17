// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/toString", "../console/parseHtml", "../object/clone", "../is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../string/toString"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var clone_1 = __importDefault(require("../object/clone"));
    var node_1 = __importDefault(require("../is/node"));
    var SDescriptorResult = /** @class */ (function () {
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
        function SDescriptorResult(descriptor, value, descriptorSettings) {
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
        SDescriptorResult.prototype.hasIssues = function () {
            return Object.keys(this._issues).length >= 1;
        };
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
        SDescriptorResult.prototype.add = function (ruleResult) {
            if (!ruleResult.__ruleObj.id)
                return;
            this._issues[ruleResult.__ruleObj.id] = ruleResult;
        };
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
        SDescriptorResult.prototype.toString = function () {
            if (node_1.default()) {
                return this.toConsole();
            }
            else {
                return "The method \"toHtml\" has not being integrated for now...";
            }
        };
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
        SDescriptorResult.prototype.toConsole = function () {
            var _this = this;
            // handle descriptor header
            var headerArray = [
                "<underline><magenta>" + this._descriptor.name + "</magenta></underline>",
                '',
                "" + toString_1.default(this.value, {
                    beautify: true
                }),
                ''
            ];
            // handle issues
            var issuesArray = [];
            Object.keys(this._issues).forEach(function (ruleId) {
                var ruleResult = _this._issues[ruleId];
                var message = '';
                if (ruleResult.__ruleObj.message !== undefined &&
                    typeof ruleResult.__ruleObj.message === 'function') {
                    message = ruleResult.__ruleObj.message(ruleResult);
                }
                else if (ruleResult.__ruleObj.message !== undefined &&
                    typeof ruleResult.__ruleObj.message === 'string') {
                    message = ruleResult.__ruleObj.message;
                }
                issuesArray.push("-" + (typeof ruleResult.__propName === 'string'
                    ? " [<magenta>" + ruleResult.__propName + "</magenta>]"
                    : '') + " <red>" + ruleId + "</red>: " + message);
            });
            // settings
            var settingsArray = [
                '',
                "<underline>Settings</underline>",
                '',
                "" + toString_1.default(this._descriptorSettings, {
                    beautify: true
                })
            ];
            return parseHtml_1.default("\n" + headerArray.join('\n') + "\n" + issuesArray.join('\n') + "\n" + (this._descriptorSettings.verbose ? settingsArray.join('\n') : '') + "\n    ").trim();
        };
        return SDescriptorResult;
    }());
    var Cls = SDescriptorResult;
    exports.default = SDescriptorResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvZGVzY3JpcHRvci9TRGVzY3JpcHRvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFRVixnRUFBNEM7SUFDNUMsbUVBQStDO0lBQy9DLDBEQUFzQztJQUN0QyxvREFBa0M7SUFxRGxDO1FBNkRFOzs7Ozs7Ozs7V0FTRztRQUNILDJCQUNFLFVBQXdCLEVBQ3hCLEtBQVUsRUFDVixrQkFBd0M7WUF6RTFDOzs7Ozs7Ozs7ZUFTRztZQUNILFlBQU8sR0FBUSxFQUFFLENBQUM7WUFpRWhCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUM5QyxJQUFJO2dCQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBTyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILHFDQUFTLEdBQVQ7WUFDRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCwrQkFBRyxHQUFILFVBQUksVUFBa0M7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFBRSxPQUFPO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFV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