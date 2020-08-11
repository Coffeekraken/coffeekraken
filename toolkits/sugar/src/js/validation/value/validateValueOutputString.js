import __parseHtml from '../../console/parseHtml';
import __toString from '../../string/toString';

/**
 * @name                validateValueOutputString
 * @namespace           js.validation.value
 * @type                Function
 *
 * This function take the resulting object of the ```validateValue``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateValueResultObj           The validateValue resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
 *
 * @example       js
 * import validateValueOutputString from '@coffeekraken/sugar/js/validation/object/validateValueOutputString';
 * import validateValue from '@coffeekraken/sugar/js/validation/object/validateValue';
 * const resultObj = validateValue(true, {
 *    type: 'String',
 *    required: true
 * });
 * validateValueOutputString(resultObj);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateValueOutputString(validateValueResultObj) {
  let issuesArray = [];

  if (validateValueResultObj.name) {
    issuesArray.push(
      `<yellow>│</yellow> <underline><bold>${validateValueResultObj.name}</bold></underline>\n<yellow>│</yellow>`
    );
  }

  if (validateValueResultObj.received) {
    issuesArray.push(
      `<yellow>│</yellow> - Received value: <yellow>${__toString(
        validateValueResultObj.received.value,
        { beautify: true }
      )}</yellow>`
    );
  }

  validateValueResultObj.issues.forEach((issue) => {
    switch (issue.toLowerCase()) {
      case 'definitionobject.unknown':
        issuesArray.push(
          `<yellow>│</yellow> This passed definition object property "<cyan>${__toString(
            validateValueResultObj.name || 'unnamed'
          )}</cyan>" is not supported...`
        );
        break;
      case 'required':
        issuesArray.push(
          `<yellow>│</yellow> - This value is <green>required</green>`
        );
        break;
      case 'type':
        issuesArray.push(
          `<yellow>│</yellow> - The value type has to be <green>${validateValueResultObj.expected.type}</green> but you passed <red>${validateValueResultObj.received.type}</red>`
        );
        break;
      case 'values':
        issuesArray.push(
          `<yellow>│</yellow> - The allowed values are [${validateValueResultObj.expected.values
            .map((v) => {
              return `"<green>${v}</green>"`;
            })
            .join(', ')}]`
        );
        break;
      case 'static':
        issuesArray.push(
          `<yellow>│</yellow> - This value has to be a <green>static</green> one`
        );
        break;
    }
  });

  return __parseHtml(issuesArray.join('\n')) + '\n';
}
