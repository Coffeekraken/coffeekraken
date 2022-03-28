import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type { ISDescriptorSettings, ISDescriptorRule } from './SDescriptor';
import ISDescriptor from './SDescriptor';

import __toString from '@coffeekraken/sugar/shared/string/toString';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __isNode from '@coffeekraken/sugar/shared/is/node';

/**
 * @name                SDescriptorResult
 * @namespace           sugar.js.descriptor
 * @type                Class
 * @extends             SClass
 *
 * This class is the main one that MUST be used as parent one
 * when creating any descriptor like object, string, etc...
 *
 * @param       {ISDescriptorResultSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @todo         doc
 * @todo        tests
 * @todo        add possibility to set a "details" on each rules for better returns
 *
 * @example       js
 * import SDescriptorResult from '@coffeekraken/sugar/js/descriptor/SDescriptorResult';
 * class MyDescriptor extends SDescriptorResult {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDescriptorResultObj {}

export interface ISDescriptorResultRule {
    __error: Error;
    __ruleObj: ISDescriptorRule;
    [key: string]: any;
}

export interface ISDescriptorResultCtor {
    new (
        descriptor: ISDescriptor,
        value: any,
        descriptorSettings: ISDescriptorSettings,
    ): ISDescriptorResult;
}

export interface ISDescriptorResult {
    _issues: any;
    _descriptor: ISDescriptor;
    _descriptorSettings: ISDescriptorSettings;
    _originalValue: any;
    value: any;
    hasIssues(): boolean;
    add(ruleResult: ISDescriptorResultRule): void;
    toConsole(): string;
}

class SDescriptorResult extends __SClass implements ISDescriptorResult {
    /**
     * @name      _issues
     * @type      Object
     * @private
     *
     * Store the result objects added with the ```add``` method
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _issues: any = {};

    /**
     * @name          _descriptor
     * @type          IDescriptor
     * @private
     *
     * Store the descriptor assiciated with this result object
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _descriptor: ISDescriptor;

    /**
     * @name          _descriptorSettings
     * @type          IDescriptor
     * @private
     *
     * Store the descriptor settings assiciated with this result object
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _descriptorSettings: ISDescriptorSettings;

    /**
     * @name          value
     * @type          any
     * @private
     *
     * Store the value that has been validated
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    value: any;

    /**
     * @name          _originalValue
     * @type          any
     * @private
     *
     * Store the value that has to been validated
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _originalValue: any;

    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        descriptor: ISDescriptor,
        value: any,
        descriptorSettings: ISDescriptorSettings,
    ) {
        super({});
        this._descriptor = descriptor;
        this._descriptorSettings = descriptorSettings;
        try {
            this._originalValue = __clone(value, { deep: true });
        } catch (e) {
            this._originalValue = value;
        }
        this.value = value;
    }

    /**
     * @name           hasIssues
     * @type           Function
     *
     * This method return true if theirs no issues, false if not
     *
     * @return        {Boolean}           true if no issue(s), false if not
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    hasIssues(): boolean {
        return Object.keys(this._issues).length >= 1;
    }

    /**
     * @name           add
     * @type           Function
     *
     * This method is used to add a rule result to the global descriptor result.
     *
     * @param         {ISDescriptorResultRule}        ruleResult      The rule result object you want to add
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    add(ruleResult: ISDescriptorResultRule): void {
        if (!ruleResult.__ruleObj.id) return;
        this._issues[ruleResult.__ruleObj.id] = ruleResult;
    }

    /**
     * @name             toString
     * @type              Functio n
     *
     * This method return a string terminal compatible of this result object
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
            return this.toConsole();
            // return `The method "toHtml" has not being integrated for now...`;
        }
    }

    /**
     * @name             toConsole
     * @type              Function
     *
     * This method return a string terminal compatible of this result object
     *
     * @return        {String}                The result object in string format
     *
     * @since          2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toConsole(): string {
        // handle descriptor header
        const headerArray = [
            `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
            '',
            `${__toString(this.value, {
                beautify: true,
            })}`,
            '',
        ];

        // handle issues
        const issuesArray: string[] = [];
        Object.keys(this._issues).forEach((ruleId) => {
            const ruleResult = this._issues[ruleId];
            let message = '';
            if (ruleResult.__error && ruleResult.__error instanceof Error) {
                message = ruleResult.__error.message;
            } else if (
                ruleResult.__ruleObj.message !== undefined &&
                typeof ruleResult.__ruleObj.message === 'function'
            ) {
                message = ruleResult.__ruleObj.message(ruleResult);
            } else if (
                ruleResult.__ruleObj.message !== undefined &&
                typeof ruleResult.__ruleObj.message === 'string'
            ) {
                message = ruleResult.__ruleObj.message;
            }
            issuesArray.push(
                `-${
                    typeof ruleResult.__propName === 'string'
                        ? ` [<magenta>${ruleResult.__propName}</magenta>]`
                        : ''
                } <red>${ruleId}</red>: ${message}`,
            );
        });

        // settings
        const settingsArray: string[] = [
            '',
            `<underline>Settings</underline>`,
            '',
            `${__toString(this._descriptorSettings, {
                beautify: true,
            })}`,
        ];

        return __parseHtml(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${settingsArray.join('\n')}
    `).trim();
    }
}

const Cls: ISDescriptorResultCtor = SDescriptorResult;

export default SDescriptorResult;
