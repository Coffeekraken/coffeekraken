import __SError from './SError';
import __validateValueOutputString from '../validation/value/validateValueOutputString';

/**
 * @todo    Doc
 */

export default class SValueValidationError extends __SError {
  constructor(issuesObj) {
    const string = __validateValueOutputString(issuesObj);
    super(string);
  }
}
