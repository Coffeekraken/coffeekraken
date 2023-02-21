"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("@coffeekraken/sugar/console");
const is_1 = require("@coffeekraken/sugar/is");
const string_1 = require("@coffeekraken/sugar/string");
class STypeResult {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString() {
        if ((0, is_1.__isNode)()) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toConsole() {
        // handle descriptor header
        const headerArray = [
            `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
            '',
            '<underline>Received value</underline>',
            '',
            `${(0, string_1.__toString)(this._data.value, {
                beautify: true,
            })}`,
            '',
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
            `${(0, string_1.__toString)(this._data.settings, {
                beautify: true,
            })}`,
        ];
        return (0, console_1.__parseHtml)(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${this.settings.verbose ? settingsArray.join('\n') : ''}
    `).trim();
    }
}
const Cls = STypeResult;
exports.default = STypeResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQTBEO0FBQzFELCtDQUFrRDtBQUNsRCx1REFBd0Q7QUF3RXhELE1BQU0sV0FBVztJQWlHYjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQXNCO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFoR0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBZ0JEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUTtRQUNKLElBQUksSUFBQSxhQUFRLEdBQUUs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