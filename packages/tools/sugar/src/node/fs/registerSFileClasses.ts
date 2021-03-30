import __SFile from './SFile';
import __sugarConfig from '../../shared/config/sugar';

/**
 * @name            registerSFileClasses
 * @namespace       sugar.node.fs
 * @type            Function
 *
 * This function is responsivle to register the SFile classes with their proper
 * extensions.
 *
 * @since       2.0.0
 */
export default () => {
  const map: Record<string, string> = __sugarConfig('fs.sFileClassesMap');
  Object.keys(map).forEach((key) => {
    const cls = require(map[key]).default;
    key
      .split(',')
      .map((l) => l.trim())
      .forEach((pattern) => {
        __SFile.registerClass(pattern, cls);
      });
  });
};
