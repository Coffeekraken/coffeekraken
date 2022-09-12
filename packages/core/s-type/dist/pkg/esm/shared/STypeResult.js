import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import { __toString } from '@coffeekraken/sugar/string';
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
        if (__isNode()) {
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
            `${__toString(this._data.value, {
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
            `${__toString(this._data.settings, {
                beautify: true,
            })}`,
        ];
        return __parseHtml(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${this.settings.verbose ? settingsArray.join('\n') : ''}
    `).trim();
    }
}
const Cls = STypeResult;
export default STypeResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQW9FeEQsTUFBTSxXQUFXO0lBaUdiOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBc0I7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQWhHRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFnQkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7UUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDNUIsT0FBTyxLQUFLLENB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