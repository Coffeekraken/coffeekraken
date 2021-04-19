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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVHlwZVJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUNBLDhFQUEwRDtJQUMxRCwwRkFBb0U7SUFDcEUsNkZBQXVFO0lBb0V2RSxNQUFNLFdBQVc7UUFpR2Y7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxJQUFzQjtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBaEdEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksVUFBVTtZQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksS0FBSztZQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDMUIsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksUUFBUTtZQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksUUFBUTtZQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksTUFBTTtZQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksUUFBUTtZQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDN0IsQ0FBQztRQWdCRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUztZQUNQLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVE7WUFD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