import { __parseHtml } from '@coffeekraken/sugar/console';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import { __toString } from '@coffeekraken/sugar/string';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISTypeResultTypeObj {
    type: string;
    value?: any;
}

export interface ISTypeResultIssueObj {
    expected: ISTypeResultTypeObj;
    received: ISTypeResultTypeObj;
    message?: string;
}

export interface ISTypeResultSettings {
    id?: string;
    name?: string;
    throw?: boolean;
    verbose?: boolean;
    customTypes?: boolean;
    interfaces?: boolean;
}

export interface ISTypeResultExpected {
    type: string;
}
export interface ISTypeResultReceived {
    type: string;
}

export interface ISTypeResultData {
    typeString: string;
    value: any;
    expected: ISTypeResultExpected;
    received: ISTypeResultReceived;
    issues: ISTypeResultIssueObj[];
    settings: ISTypeResultSettings;
}

export interface ISTypeResultCtor {
    new (data: ISTypeResultData): ISTypeResult;
}
export interface ISTypeResult {
    typeString?: string;
    value?: any;
    expected: ISTypeResultExpected;
    received: ISTypeResultReceived;
    issues: ISTypeResultIssueObj[];
    settings: ISTypeResultSettings;
    hasIssues(): boolean;
    toString(): string;
    toConsole(): string;
}

class STypeResult implements ISTypeResult {
    /**
     * @name        _data
     * @type        ISTypeResultData
     * @private
     *
     * Store the interface result data like the SType.apply retuls, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _data: ISTypeResultData;

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
    get typeString(): string {
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
    get value(): any {
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
    get received(): ISTypeResultReceived {
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
    get expected(): ISTypeResultExpected {
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
    get issues(): ISTypeResultIssueObj[] {
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
    get settings(): ISTypeResultSettings {
        return this._data.settings;
    }

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
    constructor(data: ISTypeResultData) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    hasIssues() {
        if (this._data) return true;
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
    toString(): string {
        if (__isNode()) {
            return this.toConsole();
        } else {
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
    toConsole(): string {
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
        const issuesArray: string[] = [];
        Object.keys(this._data.issues).forEach((ruleId) => {
            // @ts-ignore
            const issueObj = this._data.issues[ruleId];
            const message: string[] = [];
            if (issueObj.expected.type) {
                message.push(
                    `- Expected "<yellow>${issueObj.expected.type}</yellow>"`,
                );
            }
            if (issueObj.received.type) {
                message.push(
                    `- Received "<red>${issueObj.received.type}</red>"`,
                );
            }
            if (issueObj.message) {
                message.push(
                    ['<underline>Details:</underline>', issueObj.message].join(
                        '\n',
                    ),
                );
            }
            issuesArray.push(message.join('\n'));
        });

        // settings
        const settingsArray: string[] = [
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

const Cls: ISTypeResultCtor = STypeResult;

export default STypeResult;
