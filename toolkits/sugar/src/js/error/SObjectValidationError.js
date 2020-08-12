import __SError from './SError';
import __validateObjectOutputString from '../validation/object/validateObjectOutputString';

export default class SObjectValidationError extends __SError {
  constructor(issuesObj) {
    console.log(issuesObj);
    const string = __validateObjectOutputString(issuesObj);
    super(string);
  }
}
