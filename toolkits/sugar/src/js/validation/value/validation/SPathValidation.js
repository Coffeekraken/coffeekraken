import __SValidation from '../../SValidation';
import __isPath from '../../../is/path';
import __isNode from '../../../is/node';

/**
 * @name          SPathValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "required" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPathValidation extends __SValidation {
  static message =
    'This value must be a valid <yellow>path</yellow> and you\'ve passed "<red>%0</red>"';
  static exec(value, checkExistence = true) {
    if (__isNode()) {
      const checkPath = require('@coffeekraken/sugar/node/fs/isPath');
      return checkPath(value, checkExistence);
    } else {
      return __isPath(value);
    }
  }
}

export default SPathValidation;
