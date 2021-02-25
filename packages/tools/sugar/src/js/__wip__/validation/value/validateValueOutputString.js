// @ts-nocheck
import __parseHtml from '../../console/parseHtml';
import __toString from '../../string/toString';
import __deepMerge from '../../object/deepMerge';
/**
 * @name                validateValueOutputString
 * @namespace           sugar.js.validation.value
 * @type                Function
 * @status              wip
 *
 * This function take the resulting object of the ```validateValue``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateValueResultObj           The validateValue resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateValueOutputString(validateValueResultObj, settings = {}) {
    const issuesArray = [];
    settings = __deepMerge({
        name: settings.name || validateValueResultObj.name,
        interface: settings.interface || validateValueResultObj.interface
    });
    if (settings.name) {
        issuesArray.push(`<yellow>│</yellow> ${settings.name}\n<yellow>│</yellow>`);
    }
    if (validateValueResultObj.received) {
        const string = `<yellow>│</yellow> - Received value: <yellow>${__toString(validateValueResultObj.received.value, { beautify: true })}</yellow>`;
        issuesArray.push(string);
    }
    validateValueResultObj.issues.forEach((issue) => {
        if (validateValueResultObj.messages[issue]) {
            issuesArray.push(`<yellow>│</yellow> - ${validateValueResultObj.messages[issue]}`);
        }
    });
    return __parseHtml(issuesArray.join('\n')) + '\n';
}
export default validateValueOutputString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVWYWx1ZU91dHB1dFN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlVmFsdWVPdXRwdXRTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLHlCQUF5QixDQUFDO0FBQ2xELE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBR2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLHlCQUF5QixDQUFDLHNCQUFzQixFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV2QixRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3JCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxJQUFJLHNCQUFzQixDQUFDLElBQUk7UUFDbEQsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTLElBQUksc0JBQXNCLENBQUMsU0FBUztLQUNsRSxDQUFDLENBQUM7SUFFSCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsUUFBUSxDQUFDLElBQUksc0JBQXNCLENBQUMsQ0FBQztLQUM3RTtJQUVELElBQUksc0JBQXNCLENBQUMsUUFBUSxFQUFFO1FBQ25DLE1BQU0sTUFBTSxHQUFHLGdEQUFnRCxVQUFVLENBQ3ZFLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ3JDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUNuQixXQUFXLENBQUM7UUFFYixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFCO0lBRUQsc0JBQXNCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzlDLElBQUksc0JBQXNCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQ2Qsd0JBQXdCLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNqRSxDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDcEQsQ0FBQztBQUNELGVBQWUseUJBQXlCLENBQUMifQ==