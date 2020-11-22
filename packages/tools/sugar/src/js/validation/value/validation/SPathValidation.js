import __SValidation from '../../SValidation';
import __isPath from '../../../is/path';
/**
 * @name          SPathValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "path" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPathValidation extends __SValidation {
    static exec(value, checkExistence = true) {
        // if (__isNode()) {
        //   const checkPath = require('@coffeekraken/sugar/node/fs/isPath');
        //   return checkPath(value, checkExistence);
        // } else {
        return __isPath(value);
        // }
    }
}
SPathValidation.message = 'This value must be a valid <yellow>path</yellow> and you\'ve passed "<red>%0</red>"';
export default SPathValidation;
