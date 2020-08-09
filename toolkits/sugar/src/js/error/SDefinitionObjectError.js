import __SError from './SError';
import __validateObjectDefinitionObjectOutputString from '../validation/object/validateObjectDefinitionObjectOutputString';

export default class SDefinitionObjectError extends __SError {
  constructor(issuesObj) {
    const string = __validateObjectDefinitionObjectOutputString(issuesObj);
    super(string);
  }
}
