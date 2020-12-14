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
    var toString_1 = __importDefault(require("../string/toString"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var clone_1 = __importDefault(require("../object/clone"));
    var node_1 = __importDefault(require("../is/node"));
    /**
     * @name                SDescriptorResult
     * @namespace           sugar.js.descriptor
     * @type                Class
     *
     * This class is the main one that MUST be used as parent one
     * when creating any descriptor like object, string, etc...
     *
     * @param       {ISDescriptorResultSettings}      settings        An object of setting to configure your descriptor instance
     *
     * @todo         doc
     * @todo        tests
     * @todo        add possibility to set a "details" on each rules for better returns
     *
     * @example       js
     * import SDescriptorResult from '@coffeekraken/sugar/js/descriptor/SDescriptorResult';
     * class MyDescriptor extends SDescriptorResult {
     *    constructor(settings) {
     *      super(settings);
     *      // do something...
     *    }
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var Cls = /** @class */ (function () {
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
                this._originalValue = clone_1.default(value, true);
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
            return parseHtml_1.default("\n" + headerArray.join('\n') + "\n" + issuesArray.join('\n') + "\n" + settingsArray.join('\n') + "\n    ").trim();
        };
        return SDescriptorResult;
    }());
    return Cls;
});
//# sourceMappingURL=module.js.map