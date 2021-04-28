var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/is/node", "@coffeekraken/sugar/shared/string/toString", "@coffeekraken/sugar/shared/console/parseHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
    const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
    const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
    class STypeResult {
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
        constructor(data) {
            this._data = data;
        }
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
        get typeString() {
            return this._data.typeString;
        }
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
        get value() {
            return this._data.value;
        }
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
        get received() {
            return this._data.received;
        }
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
        get expected() {
            return this._data.expected;
        }
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
        get issues() {
            return this._data.issues;
        }
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
        get settings() {
            return this._data.settings;
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
        hasIssues() {
            if (this._data)
                return true;
            return false;
        }
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
        toString() {
            if (node_1.default()) {
                return this.toConsole();
            }
            else {
                return `The method "toHtml" has not being integrated for now...`;
            }
        }
        /**
         * @name          toConsole
         * @type          Function
         *
         * This method simply returns you a terminal compatible string
         * of the interface checking result
         *
         * @return        {String}                A string compatible with the terminal
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        toConsole() {
            // handle descriptor header
            const headerArray = [
                `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
                '',
                '<underline>Received value</underline>',
                '',
                `${toString_1.default(this._data.value, {
                    beautify: true
                })}`,
                ''
            ];
            // handle issues
            const issuesArray = [];
            Object.keys(this._data.issues).forEach((ruleId) => {
                // @ts-ignore
                const issueObj = this._data.issues[ruleId];
                const message = [];
                if (issueObj.expected.type) {
                    message.push(`- Expected "<yellow>${issueObj.expected.type}</yellow>"`);
                }
                if (issueObj.received.type) {
                    message.push(`- Received "<red>${issueObj.received.type}</red>"`);
                }
                if (issueObj.message) {
                    message.push(['<underline>Details:</underline>', issueObj.message].join('\n'));
                }
                issuesArray.push(message.join('\n'));
            });
            // settings
            const settingsArray = [
                '',
                `<underline>Settings</underline>`,
                '',
                `${toString_1.default(this._data.settings, {
                    beautify: true
                })}`
            ];
            return parseHtml_1.default(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${this.settings.verbose ? settingsArray.join('\n') : ''}
    `).trim();
        }
    }
    const Cls = STypeResult;
    exports.default = STypeResult;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL1NUeXBlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQ0EsOEVBQTBEO0lBQzFELDBGQUFvRTtJQUNwRSw2RkFBdUU7SUFvRXZFLE1BQU0sV0FBVztRQWlHZjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLElBQXNCO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFoR0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxVQUFVO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMvQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxLQUFLO1lBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxRQUFRO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxRQUFRO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxNQUFNO1lBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxRQUFRO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBZ0JEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTO1lBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUM1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