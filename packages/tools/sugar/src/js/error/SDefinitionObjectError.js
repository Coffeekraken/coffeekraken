import __SError from './SError';
import __validateObjectDefinitionObjectOutputString from '../validation/object/validateObjectDefinitionObjectOutputString';
/**
 * @todo      Doc
 */
export default class SDefinitionObjectError extends __SError {
    constructor(issuesObj) {
        const string = __validateObjectDefinitionObjectOutputString(issuesObj);
        super(string);
    }
}
