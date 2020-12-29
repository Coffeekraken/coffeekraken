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
        define(["require", "exports", "../is/node", "../string/toString", "../console/parseHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    var node_1 = __importDefault(require("../is/node"));
    var toString_1 = __importDefault(require("../string/toString"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    /**
     * @name            STypeResult
     * @namespace       sugar.js.type
     * @type            Class
     *
     * This class represent what you will get back from the ```SType.apply``` method.
     * You will be able to generate some string terminal version of the return as well as some html
     * version if needed
     *
     * @todo        integrate ```toHtml``` method
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var Cls = /** @class */ (function () {
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function STypeResult(data) {
            this._data = data;
        }
        /**
         * @name          hasIssues
         * @type          Function
         *
         * Return true if some issues have been detected, false if not
         *
         * @return        {Boolean}       true if has some issues, false if not
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        STypeResult.prototype.hasIssues = function () {
            if (this._data)
                return true;
            return false;
        };
        /**
         * @name             toString
         * @type              Functio n
         *
         * This method return a string terminal compatible or html of this result object
         *
         * @return        {String}                The result object in string format
         *
         * @since          2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        STypeResult.prototype.toString = function () {
            if (node_1.default()) {
                return this.toConsole();
            }
            else {
                return "The method \"toHtml\" has not being integrated for now...";
            }
        };
        /**
         * @name          toConsole
         * @type          Function
         *
         * This method simply returns you a terminal compatible string
         * of the interface checking result
         *
         * @return        {String}                A string compatible with the terminal
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        STypeResult.prototype.toConsole = function () {
            var _this = this;
            // handle descriptor header
            var headerArray = [
                "<underline><magenta>" + this._data.settings.name + "</magenta></underline>",
                '',
                '<underline>Received value</underline>',
                '',
                "" + toString_1.default(this._data.value, {
                    beautify: true
                }),
                ''
            ];
            // handle issues
            var issuesArray = [];
            Object.keys(this._data.issues).forEach(function (ruleId) {
                // @ts-ignore
                var issueObj = _this._data.issues[ruleId];
                var message = [];
                if (issueObj.expected.type) {
                    message.push("- Expected \"<yellow>" + issueObj.expected.type + "</yellow>\"");
                }
                if (issueObj.received.type) {
                    message.push("- Received \"<red>" + issueObj.received.type + "</red>\"");
                }
                if (issueObj.message) {
                    message.push(['<underline>Details:</underline>', issueObj.message].join('\n'));
                }
                issuesArray.push(message.join('\n'));
            });
            // settings
            var settingsArray = [
                '',
                "<underline>Settings</underline>",
                '',
                "" + toString_1.default(this._data.settings, {
                    beautify: true
                })
            ];
            return parseHtml_1.default("\n" + headerArray.join('\n') + "\n" + issuesArray.join('\n') + "\n" + settingsArray.join('\n') + "\n    ").trim();
        };
        return STypeResult;
    }());
    return Cls;
});
//# sourceMappingURL=STypeResult.js.map