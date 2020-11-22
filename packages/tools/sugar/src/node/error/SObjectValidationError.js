import __SError from './SError';
import __validateObjectOutputString from '../validation/object/validateObjectOutputString';
/**
 * @todo    Doc
 */
export default class SObjectValidationError extends __SError {
    constructor(issuesObj) {
        const string = __validateObjectOutputString(issuesObj);
        super(string);
    }
}
