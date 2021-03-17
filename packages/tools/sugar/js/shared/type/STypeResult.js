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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL3R5cGUvU1R5cGVSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFFQSxvREFBa0M7SUFDbEMsZ0VBQTRDO0lBQzVDLG1FQUErQztJQW9FL0M7UUFpR0U7Ozs7Ozs7OztXQVNHO1FBQ0gscUJBQVksSUFBc0I7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztRQXRGRCxzQkFBSSxtQ0FBVTtZQVZkOzs7Ozs7Ozs7ZUFTRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQy9CLENBQUM7OztXQUFBO1FBWUQsc0JBQUksOEJBQUs7WUFWVDs7Ozs7Ozs7O2VBU0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQVlELHNCQUFJLGlDQUFRO1lBVlo7Ozs7Ozs7OztlQVNHO2lCQUNIO2dCQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFZRCxzQkFBSSxpQ0FBUTtZQVZaOzs7Ozs7Ozs7ZUFTRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzdCLENBQUM7OztXQUFBO1FBWUQsc0JBQUksK0JBQU07WUFWVjs7Ozs7Ozs7O2VBU0c7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMzQixDQUFDOzs7V0FBQTtRQVlELHNCQUFJLGlDQUFRO1lBVlo7Ozs7Ozs7OztlQVNHO2lCQUNIO2dCQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDN0IsQ0FBQzs7O1dBQUE7UUFnQkQ7Ozs7Ozs7Ozs7V0FVRztRQUNILCtC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