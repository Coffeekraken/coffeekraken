"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL1NUeXBlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsOEVBQTBEO0FBQzFELDBGQUFvRTtBQUNwRSw2RkFBdUU7QUFvRXZFLE1BQU0sV0FBVztJQWlHZjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQXNCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFoR0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBZ0JEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVCLE9BQU8sS0FB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