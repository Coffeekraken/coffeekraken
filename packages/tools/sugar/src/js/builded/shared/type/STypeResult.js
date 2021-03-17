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
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = __importDefault(require("../is/node"));
    var toString_1 = __importDefault(require("../string/toString"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var STypeResult = /** @class */ (function () {
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
        Object.defineProperty(STypeResult.prototype, "typeString", {
            /**
             * @name       typeString
             * @type       string
             * @get
             *
             * Access the type in string format
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._data.typeString;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STypeResult.prototype, "value", {
            /**
             * @name       value
             * @type       string
             * @get
             *
             * Access the value passed to be type validated
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._data.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STypeResult.prototype, "received", {
            /**
             * @name       received
             * @type       ISTypeResultReceived
             * @get
             *
             * Access the received descriptor object
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._data.received;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STypeResult.prototype, "expected", {
            /**
             * @name       expected
             * @type       ISTypeResultExpected
             * @get
             *
             * Access the expected descriptor object
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._data.expected;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STypeResult.prototype, "issues", {
            /**
             * @name       issues
             * @type       ISTypeResultIssueObj[]
             * @get
             *
             * Access the issues array
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._data.issues;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(STypeResult.prototype, "settings", {
            /**
             * @name       settings
             * @type       ISTypeResultSettings
             * @get
             *
             * Access the settings object
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._data.settings;
            },
            enumerable: false,
            configurable: true
        });
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
            return parseHtml_1.default("\n" + headerArray.join('\n') + "\n" + issuesArray.join('\n') + "\n" + (this.settings.verbose ? settingsArray.join('\n') : '') + "\n    ").trim();
        };
        return STypeResult;
    }());
    var Cls = STypeResult;
    exports.default = STypeResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvdHlwZS9TVHlwZVJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUVBLG9EQUFrQztJQUNsQyxnRUFBNEM7SUFDNUMsbUVBQStDO0lBb0UvQztRQWlHRTs7Ozs7Ozs7O1dBU0c7UUFDSCxxQkFBWSxJQUFzQjtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBdEZELHNCQUFJLG1DQUFVO1lBVmQ7Ozs7Ozs7OztlQVNHO2lCQUNIO2dCQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDL0IsQ0FBQzs7O1dBQUE7UUFZRCxzQkFBSSw4QkFBSztZQVZUOzs7Ozs7Ozs7ZUFTRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBWUQsc0JBQUksaUNBQVE7WUFWWjs7Ozs7Ozs7O2VBU0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQVlELHNCQUFJLGlDQUFRO1lBVlo7Ozs7Ozs7OztlQVNHO2lCQUNIO2dCQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFZRCxzQkFBSSwrQkFBTTtZQVZWOzs7Ozs7Ozs7ZUFTRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBWUQsc0JBQUksaUNBQVE7WUFWWjs7Ozs7Ozs7O2VBU0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQWdCRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsK0JB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