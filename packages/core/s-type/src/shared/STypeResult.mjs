import __isNode from '@coffeekraken/sugar/shared/is/node';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toConsole() {
        // handle descriptor header
        const headerArray = [
            `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
            '',
            '<underline>Received value</underline>',
            '',
            `${__toString(this._data.value, {
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
            `${__toString(this._data.settings, {
                beautify: true
            })}`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL1NUeXBlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBb0V2RSxNQUFNLFdBQVc7SUFpR2Y7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxJQUFzQjtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBaEdEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQWdCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUztRQUNQ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