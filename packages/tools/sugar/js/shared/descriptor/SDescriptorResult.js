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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Rlc2NyaXB0b3JSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2Rlc2NyaXB0b3IvU0Rlc2NyaXB0b3JSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBUVYsZ0VBQTRDO0lBQzVDLG1FQUErQztJQUMvQywwREFBc0M7SUFDdEMsb0RBQWtDO0lBcURsQztRQTZERTs7Ozs7Ozs7O1dBU0c7UUFDSCwyQkFDRSxVQUF3QixFQUN4QixLQUFVLEVBQ1Ysa0JBQXdDO1lBekUxQzs7Ozs7Ozs7O2VBU0c7WUFDSCxZQUFPLEdBQVEsRUFBRSxDQUFDO1lBaUVoQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUM5QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsSUFBSTtnQkFDRixJQUFJLENBQUMsY0FBYyxHQUFHLGVBQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN0RDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxxQ0FBUyxHQUFUO1lBQ0UsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsK0JBQUcsR0FBSCxVQUFJLFVBQWtDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQUUsT0FBTztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFB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