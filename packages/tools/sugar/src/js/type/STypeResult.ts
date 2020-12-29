// @shared

import ISTypeResult, {
  ISTypeResultCtor,
  ISTypeResultData
} from './interface/ISTypeResult';
import __deepMerge from '../object/deepMerge';
import __isNode from '../is/node';
import __toString from '../string/toString';
import __parseHtml from '../console/parseHtml';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISTypeResultCtor = class STypeResult implements ISTypeResult {
  /**
   * @name        _data
   * @type        ISTypeResultData
   * @private
   *
   * Store the interface result data like the SType.apply retuls, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _data: ISTypeResultData;

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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
  toConsole(): string {
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
    const issuesArray: string[] = [];
    Object.keys(this._data.issues).forEach((ruleId) => {
      // @ts-ignore
      const issueObj = this._data.issues[ruleId];
      let message: string[] = [];
      if (issueObj.expected.type) {
        message.push(`- Expected "<yellow>${issueObj.expected.type}</yellow>"`);
      }
      if (issueObj.received.type) {
        message.push(`- Received "<red>${issueObj.received.type}</red>"`);
      }
      if (issueObj.message) {
        message.push(
          ['<underline>Details:</underline>', issueObj.message].join('\n')
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
        beautify: true
      })}`
    ];

    return __parseHtml(`
${headerArray.join('\n')}
${issuesArray.join('\n')}
${settingsArray.join('\n')}
    `).trim();
  }
};
export = Cls;
