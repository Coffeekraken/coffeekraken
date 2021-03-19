import __deepMerge from '../object/deepMerge';
import ISDescriptor, {
  ISDescriptorSettings,
  ISDescriptorRule
} from './SDescriptor';

import __toString from '../string/toString';
import __parseHtml from '../console/parseHtml';
import __clone from '../object/clone';
import __isNode from '../is/node';

/**
 * @name                SDescriptorResult
 * @namespace           sugar.js.descriptor
 * @type                Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDescriptorResultRule {
  __ruleObj: ISDescriptorRule;
  [key: string]: any;
}

export interface ISDescriptorResultCtor {
  new (
    descriptor: ISDescriptor,
    value: any,
    descriptorSettings: ISDescriptorSettings
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

class SDescriptorResult implements ISDescriptorResult {
  /**
   * @name      _issues
   * @type      Object
   * @private
   *
   * Store the result objects added with the ```add``` method
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    descriptor: ISDescriptor,
    value: any,
    descriptorSettings: ISDescriptorSettings
  ) {
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString(): string {
    if (__isNode()) {
      return this.toConsole();
    } else {
      return `The method "toHtml" has not being integrated for now...`;
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toConsole(): string {
    // handle descriptor header
    const headerArray = [
      `<underline><magenta>${this._descriptor.name}</magenta></underline>`,
      '',
      `${__toString(this.value, {
        beautify: true
      })}`,
      ''
    ];

    // handle issues
    const issuesArray: string[] = [];
    Object.keys(this._issues).forEach((ruleId) => {
      const ruleResult = this._issues[ruleId];
      let message: string = '';
      if (
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
        } <red>${ruleId}</red>: ${message}`
      );
    });

    // settings
    const settingsArray: string[] = [
      '',
      `<underline>Settings</underline>`,
      '',
      `${__toString(this._descriptorSettings, {
        beautify: true
      })}`
    ];

    return __parseHtml(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${this._descriptorSettings.verbose ? settingsArray.join('\n') : ''}
    `).trim();
  }
}

const Cls: ISDescriptorResultCtor = SDescriptorResult;

export default SDescriptorResult;
