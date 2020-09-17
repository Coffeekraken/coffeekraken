import __get from '../../object/get';
import __SValueValidationError from '../../error/SValueValidationError';
import __isOfType from '../../is/ofType';
import __deepMerge from '../../object/deepMerge';
import __typeof from '../../value/typeof';
import __isNode from '../../is/node';
import __isPath from '../../is/path';
import __toString from '../../string/toString';

import __SRequiredValidation from './validation/SRequiredValidation';
import __SPathValidation from './validation/SPathValidation';
import __STypeValidation from './validation/STypeValidation';
import __SValuesValidation from './validation/SValuesValidation';

const _validationsObj = {
  required: {
    class: __SRequiredValidation,
    args: []
  },
  path: {
    class: __SPathValidation,
    args: ['%definitionObj.path.exists']
  },
  type: {
    class: __STypeValidation,
    args: ['%definitionObj.type']
  },
  values: {
    class: __SValuesValidation,
    args: ['%definitionObj.values']
  }
};

/**
 * @name          validateValue
 * @namespace     sugar.js.validation.value
 * @type          Function
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - name ('unnamed') {String}: Specify a name. Useful for debugging
 * - extendFn (null) {Function}: Specify a function that will be called after the default validations checks and before the return or throw statements. It will have as arguments the "value" to check, the "definitionObj" and the "settings" object. You then can make your checks and return an array of "issues" like ["path","other"], etc...
 * @return         {Boolean|Object}           true if the check is passed, an Array of String describing the issue if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateValue from '@coffeekraken/sugar/js/validation/value/validateValue';
 * validateValue(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateValue(value, definitionObj, settings = {}) {
  settings = __deepMerge(
    {
      name: 'unnamed',
      throw: true,
      extendFn: null,
      validationsObj: _validationsObj
    },
    settings
  );

  if (
    (value === null || value === undefined) &&
    definitionObj.default !== undefined
  ) {
    value = definitionObj.default;
  }

  let issueObj = {
    $expected: definitionObj,
    $received: {
      type: __typeof(value),
      value
    },
    $name: settings.name,
    $issues: [],
    $messages: {}
  };

  Object.keys(settings.validationsObj).forEach((validationName, i) => {
    if (!_validationsObj[validationName]) {
      issueObj.$issues.push(`definitionObj.${validationName}.unknown`);
      issueObj.$messages[
        `definitionObj.${validationName}.unknown`
      ] = `The specified "<yellow>${validationName}</yellow>" validation is <red>not supported</red>`;
    }
    if (!definitionObj[validationName]) return;

    const validationObj = Object.assign(
      {},
      settings.validationsObj[validationName]
    );

    validationObj.args = validationObj.args.map((arg) => {
      if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
        arg = definitionObj[arg.replace('%definitionObj.', '')];
      }
      return arg;
    });

    const validationResult = validationObj.class.apply(
      value,
      ...validationObj.args
    );
    if (validationResult !== true) {
      issueObj.$issues.push(validationName);
      issueObj.$messages[validationName] = validationResult;
    }
  });

  if (settings.extendFn && typeof settings.extendFn === 'function') {
    const additionalIssues =
      settings.extendFn(value, definitionObj, settings) || [];
    issueObj.$issues = [
      ...issueObj.$issues,
      ...(additionalIssues.$issues || [])
    ];
    issueObj.$messages = [
      ...issueObj.$messages,
      ...(additionalIssues.$messages || [])
    ];
  }

  if (!issueObj.$issues.length) return true;
  if (settings.throw) {
    throw new __SValueValidationError(issueObj);
  }
  return issueObj;
}
